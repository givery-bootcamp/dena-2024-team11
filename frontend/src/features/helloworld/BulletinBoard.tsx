import "./BulletinBoard.scss";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { APIService } from "../../shared/services";
import { useState, useEffect, useRef, CSSProperties } from 'react';
import { BoardElement } from "../../shared/models";
import { actions } from "../../shared/store";

type PostProps = {
  posts: BoardElement[];
  isThread?: boolean;
};

type PostItemProps = {
  post: BoardElement;
  isThread?: boolean;
};

type InputBoxProps = {
  parentId: number | null;
};

export function BulletinBoard() {
  // const [posts, dispatch] = useReducer(postsReducer, initialPosts);
 // const [posts, setPosts] = useState(initialPosts);
  //最新のDBを取得してstoreを更新

  const { posts, replies } = useAppSelector((state) => state.posts);
  const noparents = posts.filter((post) => post.parentId === -1);
  const selectedThreadId = useAppSelector((state) => state.thread.SelectedThreadId);
  const childs = replies.filter((post) => post.parentId === selectedThreadId);
  const parentPost = posts.filter((post) => post.id === selectedThreadId);
  const showModal = useAppSelector((state) => state.modal.showModal);
  const modalPosition = useAppSelector((state) => state.modal.position);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(APIService.getBoard());
    if (selectedThreadId === null) {
      return;
    }
    dispatch(APIService.getReplies(selectedThreadId));
  }, [dispatch]);
  return (
    <div>
      {showModal && <AddStampModal stamps={["saikou", "akebono", "madamada"]} position={modalPosition}/>}
      <div className="bulletin-with-thread">
        <div className="bulletin-board">
          <PostList posts={noparents}/>
          <InputBox parentId={-1}/>
        </div>
        <div>
          <PostList posts={parentPost} isThread={true}/>
          <PostList posts={childs} />
          <InputBox parentId={selectedThreadId}/>        
        </div>
      </div>
    </div>
  );


  // const { hello } = useAppSelector((state) => state.hello);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(APIService.getHello());
  // }, [dispatch]);
  // return <div>{hello?.message}</div>;
}

export function PostList({ posts, isThread = false }: PostProps) {
  const postListItems = posts.map((post, id) => (
    <li key={id.toString()}>
      <PostItem post={post} isThread={isThread} />
    </li>
  ));
  return <ul className="post-list">{postListItems}</ul>;
}

export function InputBox({parentId}: InputBoxProps) {
  const [filterText, setFilterText] = useState('');
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (parentId === null) {
      return;
    }
    if (parentId > -1) {
      dispatch(APIService.postReply({message: filterText, parentId: parentId}));
    } else {
      dispatch(APIService.postBoard(filterText));
    }
    setFilterText("");
  }
  if (parentId === null) {
    return <div></div>;
  } 
  return (
    <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      value={filterText} 
      placeholder="Search..."
      onChange={(e) => setFilterText(e.target.value)}
    />
    <input
      type="submit"
      value="Submit"
    />
      
    {/* <label>
      <input 
        type="checkbox" 
        checked={inStockOnly} />
      {' '}
      Only show products in stock
    </label> */}
  </form>
  );
}

export function PostItem({ post, isThread }: PostItemProps) {
  const dispatch = useAppDispatch();
  // function resetParentId() {
  //   return post.parentId;
  // }

  //本来はpostからreactionを取得
  const stamps = ["saikou", "akebono", "madamada"];
  const reactionButtons = stamps.map((reaction, index) => {
    return (
      <li key={index.toString()}>
        <ReactionButton str={reaction}/>
      </li>
    )
  })

  return (
        <div className="message-block">
          <img className="message-author-image" src="/images/tanigawa.png"></img>
          <div className="message-not-image-block">
            <div className="message-author-name">
              {post.id} -&gt; {post.parentId}: 
              {post.name}
            </div>
            <div className="message-message">
              <MessageItem str={post.message}/>
            </div>
            <div className="message-stamp-block">
              <ul className="message-stamp-list">
                {reactionButtons}
                <li key="add">
                  <AddReactionButton/>
                </li>
              </ul>
              {/* <img className="message-stamp-image" src="/images/thumbsup.png"></img>
              <img className="message-stamp-add" src="/images/stamp.png"></img> */}
              {/* <ReactionButton str="emoji"/> */}
            </div>
            {isThread || post.parentId === -1 && <div className="message-reply-block">
              <img className="message-reply-image1" src="/images/chono.png"></img>
              <img className="message-reply-image2" src="/images/tanigawa.png"></img>
              <button className="message-reply-button" onClick={() => {
                dispatch(actions.SelectThread(post.id));
                dispatch(APIService.getReplies(post.id));
              }}>返信する</button>
            </div>}
          </div>

        </div>
  );

}

export function MessageItem ({str} : {str:string}) {
  return <div>{str}</div>
}

export function ReactionButton ({str} : {str:string}) {
  const [isClicked, setIsClicked] = useState(false);
  const [stampCount, setStampCount] = useState(1);
  function onClick() {
    //本来はここでAPIを叩き、結果に応じて処理を分ける
    if(!isClicked) setStampCount(stampCount+1);
    else setStampCount(stampCount-1);
    setIsClicked(!isClicked);
  }
  return (
    <button className={"scalable-button stamp-button " + (isClicked ? "after-click-stamp" : "before-click-stamp")} onClick={onClick}>
      <img className="emoji-block" src = {"images/"+ str + ".png"} alt="stamp image"/>
      <div className={isClicked ? "after-click-count-block" : "before-click-count-block"}>
        <span>{stampCount}</span>
      </div>
    </button> 
  );
}

export function AddReactionButton() {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  function onMouseEnter() {
    setIsHover(true);
  }
  function onMouseLeave() {
    setIsHover(false);
  }

  function onClick() {
    const rect = ref.current?.getBoundingClientRect();
    if(rect?.top === undefined && rect?.left === undefined) return;
    const top = rect?.top;
    const left = rect?.left;
    dispatch(actions.ShowModal({
      showModal: true,
      position: {
        top: top,
        left: left,
      }
    }));
  }

  return (
    <button className={"scalable-button stamp-button add-stamp"}
      ref={ref}
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
      onClick={onClick}>
      <img className="emoji-block" src={"/images/_face" + (isHover ? "_hover" : "") + ".png"} alt="add stamp"/>
    </button> 
  );
}

export function AddStampModal({stamps, position}: {stamps: string[], position: {top: number, left: number}}) {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalWidth = 300;
  const modalHeight = 500;
  const modalTop = Math.max(position.top - modalHeight - 10 + window.scrollY, 10);
  const modalLeft = Math.max(position.left + window.scrollX, 200);
  const reactionButtons = stamps.map((reaction, index) => {
    return (
      <li key={index.toString()}>
        <StampItem stampName={reaction}/>
      </li>
    )
  });
  function onMouseDown(e: React.MouseEvent) {
    if(modalRef.current?.contains(e.target as Node)) return;
    dispatch(actions.ShowModal({
      showModal: false,
      position: {
        top: 0,
        left: 0,
      }
    }));
  }
  const modalStyle:CSSProperties = {
    position: 'absolute',
    top: `${modalTop}px`,
    left: `${modalLeft}px`,
    width: `${modalWidth}px`,
    height: `${modalHeight}px`,
  }
  return (
    <div className="overlay" onMouseDown={onMouseDown}>
      <div className="modal-modal" style={modalStyle}  ref={modalRef}>
        <ul className="modal-stamp-list">{reactionButtons}</ul>
      </div>
    </div>
  );
}

export function StampItem({stampName}: {stampName: string}) {
  function onClick() {
    alert(`hello, ${stampName}`);
  }
  return (
    <button className="stamp-item-button" onClick={onClick}>
      <img className="stamp-item-image" src={"/images/" + stampName + ".png"} alt={stampName}/>
    </button>
  )
}

