import "./BulletinBoard.scss";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { APIService } from "../../shared/services";
import { useState, useEffect, useRef, CSSProperties } from 'react';
import { BoardElement, ModalInfo } from "../../shared/models";
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
  const modalInfo = useAppSelector((state) => state.modal.modalInfo);
  const dispatch = useAppDispatch();
  const stamps = [
    "saikou", 
    "akebono", 
    "madamada",
    "emoji",
    "yonezawa",
    "gyokairui",
    "nigeteiiyo",
    "tamanegi",
    "togyushi",
    "shishamo",
    "curtain",
    "radiotaisou",
    "huyuhanabe",
    "toripaitan",
    "nureginu",
    "nurumenoonsen",
    "yonsama",
    "mokkouyoubondo",
    "kochujan",
    "itiran",
    "sonnanokankeinee",
    "sorehakankeiaru",
    "kinouhagomen",
    "tuyomenopanti",
    "zukounosensei",
    "kodomogatabeteru",
    "totyuudesyouga",
    "obondegohan",
    "zaurusu",
    "bad",
    "good",
    "notgood",
    "soso",
  ];
  useEffect(() => {
    dispatch(APIService.getBoard());
    if (selectedThreadId === null) {
      return;
    }
    dispatch(APIService.getReplies(selectedThreadId));
  }, [dispatch]);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="board-with-modal">
      {showModal && <AddStampModal stamps={stamps} modalInfo={modalInfo}/>}
      <div className="bulletin-with-thread">
        <div className="bulletin-board">
          <div className="scroll-board" ref={ref}>
            <PostList posts={noparents}/>
          </div>
          <div className="input-areà">
            <InputBox parentId={-1}/>
          </div>
        </div>
        { (selectedThreadId !== null) && (
          <div className="bulletin-thread" >
            <div className="thread-title">スレッド</div>
            <PostList posts={parentPost} isThread={true}/>
            <div className="reply-line">
              <div className="reply-line-text">{childs.length.toString()} 件の返信</div>
              <hr className="border-line"/>
            </div>
            <PostList posts={childs} />
            <InputBox parentId={selectedThreadId}/>        
         </div> 
        )}
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
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.login.user.id);

  function onMouseEnter() {
    setIsHover(true);
  }
  function onMouseLeave() {
    setIsHover(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (parentId === null) {
      return;
    }
    if (parentId > -1) {
      dispatch(APIService.postReply({message: filterText, parentId: parentId, userId: userId}));
    } else {
      dispatch(APIService.postBoard({
        message: filterText, 
        userId: userId}
      ));
    }
    setFilterText("");
  }
  if (parentId === null) {
    return <div></div>;
  } 
  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        className="input-text"
        //rows={1}
        type="text"
        value={filterText} 
        placeholder="Srackへのメッセージ"
        onChange={(e) => setFilterText(e.target.value)}
      />
      <input
        className="submit-button"
        type="image"
        name="submit"
        src={"images/submit" + (isHover ? "_hover" : "") + ".png"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </form>
  );
}

export function PostItem({ post, isThread }: PostItemProps) {
  const dispatch = useAppDispatch();
  // function resetParentId() {
  //   return post.parentId;
  // }

  //本来はpostからreactionを取得
  const stamps = post.stamps;
  // const {postStamps, replyStamps} = useAppSelector((state) => state.stamp);
  // const stamps = post.parentId === -1 ? 
  //   postStamps.find(postStamp => postStamp.postId === post.id)?.stamps :
  //   replyStamps.find(postStamp => postStamp.postId === post.id)?.stamps;
  // if(stamps === undefined) return;
  // const stamps = [
  //   {
  //     name: "saikou",
  //     isIncluded: false,
  //     count: 2,
  //   },
  //   {
  //     name: "akebono",
  //     isIncluded: false,
  //     count: 3,
  //   },
  //   {
  //     name: "madamada",
  //     isIncluded: false,
  //     count: 2,
  //   }
  // ]

  const reactionButtons = stamps?.map((stamp, index) => {
    const stampIsIncluded = stamp.users.find(userId => userId === 1) !== undefined;
    return (
      <li key={index.toString()}>
        <ReactionButton stampName={stamp.name} isIncluded={stampIsIncluded} count={stamp.count} post={post}/>
      </li>
    )
  });
  return (
        <div className="message-block">
          <img className="message-author-image" src={post.user.icon || "/images/tanigawa.png"}></img>
          <div className="message-not-image-block">
            <div className="message-author-name">
              {post.id} -&gt; {post.parentId}: 
              {post.user.name}
            </div>
            <div className="message-message">
              <MessageItem str={post.message}/>
            </div>
            <div className="message-stamp-block">
              <ul className="message-stamp-list">
                {reactionButtons}
                <li key="add">
                  <AddReactionButton post={post}/>
                </li>
              </ul>
              {/* <img className="message-stamp-image" src="/images/thumbsup.png"></img>
              <img className="message-stamp-add" src="/images/stamp.png"></img> */}
              {/* <ReactionButton str="emoji"/> */}
            </div>
            {isThread || post.parentId === -1 && <div className="message-reply-block">
              <button className="message-reply-button" onClick={() => {
                dispatch(actions.SelectThread(post.id));
                dispatch(APIService.getReplies(post.id));
              }}>{!post.num_reply ? "返信する" : post.num_reply + "件の返信"}</button>
            </div>}
          </div>

        </div>
  );

}

export function MessageItem ({str} : {str:string}) {
  return <div>{str}</div>
}

export function ReactionButton ({stampName, isIncluded, count, post} : {stampName:string, isIncluded:boolean, count:number, post:BoardElement}) {
  // const [isClicked, setIsClicked] = useState(isIncluded);
  // const [stampCount, setStampCount] = useState(count);
  const dispatch = useAppDispatch();
  const type = post.parentId === -1 ? "post" : "reply";
  const userId = useAppSelector((state) => state.login.user.id);
  function onClick() {
    if (isIncluded) {
      if(type === "post") {
        dispatch(APIService.removeStampPost({
          postId: post.id,
          userId: userId,
          stampName: stampName,
        }));
      } else if(type === "reply") {
        //ToDo: reply
      }
      // dispatch(actions.RemoveStamp({
      //   type: type,
      //   userId: userId,
      //   postId: post.id,
      //   stamp: {
      //     name: stampName,
      //     isIncluded: false,
      //     count: -1,
      //   },
      // }));
    } else {
      if(type === "post") {
        dispatch(APIService.addStampPost({
          postId: post.id,
          userId: userId,
          stampName: stampName,
        }));
      } else if(type === "reply"){
        //ToDo:
      }
      // dispatch(
      //   actions.AddStamp({
      //   type: type,
      //   userId: userId,
      //   postId: post.id,
      //   stamp: {
      //     name: str,
      //     isIncluded: true,
      //     count: 1,
      //   },
      // }));
    }
    // if(!isClicked) setStampCount(count+1);
    // else setStampCount(stampCount-1);
    // setIsClicked(!isClicked);
  }
  return (
    <button className={"scalable-button stamp-button " + (isIncluded ? "after-click-stamp" : "before-click-stamp")} onClick={onClick}>
      <img className="emoji-block" src = {"images/"+ stampName + ".png"} alt="stamp image"/>
      <div className={isIncluded ? "after-click-count-block" : "before-click-count-block"}>
        <span>{count}</span>
      </div>
    </button> 
  );
}

export function AddReactionButton({post}: {post: BoardElement}) {
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
      modalInfo: {
        post: post,
        position: {
          top: top,
          left: left,
        }
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

export function AddStampModal({stamps, modalInfo}: {stamps: string[], modalInfo: ModalInfo}) {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalWidth = 300;
  const modalHeight = 500;
  const modalTop = Math.max(modalInfo.position.top - modalHeight - 10 + window.scrollY, 10 + window.scrollY);
  const modalLeft = Math.min(modalInfo.position.left + window.scrollX + 100, window.innerWidth - modalWidth - 10 + window.scrollX);
  const reactionButtons = stamps.map((reaction, index) => {
    return (
      modalInfo.post && 
      <li key={index.toString()}>
        <StampItem stampName={reaction} post={modalInfo.post}/>
      </li>
    )
  });
  function onMouseDown(e: React.MouseEvent) {
    if(modalRef.current?.contains(e.target as Node)) return;
    dispatch(actions.ShowModal({
      showModal: false,
      modalInfo: {
        post: null,
        position: {
          top: 0,
          left: 0,
        }
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

export function StampItem({stampName, post}: {stampName: string, post: BoardElement}) {
  const dispatch = useAppDispatch();
  // const postStamps = useAppSelector((state) => state.stamp.postStamps);
  // const {postStamps, replyStamps} = useAppSelector((state) => state.stamp);
  const type = post.parentId === -1 ? "post" : "reply";
  const userId = useAppSelector((state) => state.login.user.id);
  function onClick() {
    // alert(`hello, ${stampName}`);
    //本当はここでストアを評価して、自分が押したかどうかを調べる
    //const stamps = type === "post" ? postStamps : replyStamps;
    const stamps = post.stamps;
    // const postStamp = stamps.find(postStamp => postStamp.postId === post.id);
    const stamp = stamps.find(stamp => stamp.name === stampName);
    const isIncluded = stamp?.users.find(user => user === userId) !== undefined;
    if (stamp === undefined) {
      if(type === "post") {
        dispatch(APIService.addStampPost({
          postId: post.id,
          userId: userId,
          stampName: stampName,
        }));
      } else if(type === "reply") {
        //ToDO:
      }

      // dispatch(actions.AddStamp({
      //   type: type,
      //   userId: userId,
      //   postId: post.id,
      //   stamp: {
      //     name: stampName,
      //     isIncluded: true,
      //     count: 1,
      //   },
      // }));
    } else if (!isIncluded) {
      if(type === "post") {
        dispatch(APIService.addStampPost({
          postId: post.id,
          userId: userId,
          stampName: stampName,
        }));
      } else if(type === "reply") {
        //ToDO:
      }
      // dispatch(actions.AddStamp({
      //   type: type,
      //   userId: userId,
      //   postId: post.id,
      //   stamp: {
      //     name: stampName,
      //     isIncluded: true,
      //     count: 1,
      //   },
      // }));
    } else if (isIncluded) {
      if(type === "post") {
        dispatch(APIService.removeStampPost({
          postId: post.id,
          userId: userId,
          stampName: stampName,
        }));
      } else if(type === "reply") {
        //ToDO:
      }
      // dispatch(actions.RemoveStamp({
      //   type: type,
      //   userId: userId,
      //   postId: post.id,
      //   stamp: {
      //     name: stampName,
      //     isIncluded: false,
      //     count: 0,
      //   },
      // }));
    }

    dispatch(actions.ShowModal({
      showModal: false,
      modalInfo: {
        post: post,
        position: {
          top: 0,
          left: 0,
        }
      }
    }));
  }
  return (
    <button className="stamp-item-button" onClick={onClick}>
      <img className="stamp-item-image" src={"/images/" + stampName + ".png"} alt={stampName}/>
    </button>
  )
}

