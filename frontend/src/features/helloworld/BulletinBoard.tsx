import "./BulletinBoard.scss";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { APIService } from "../../shared/services";
import { useState, useEffect } from 'react';
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(APIService.getBoard());
    if (selectedThreadId === null) {
      return;
    }
    dispatch(APIService.getReplies(selectedThreadId));
  }, [dispatch]);
  return (
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
              {/* <img className="message-stamp-image" src="/images/thumbsup.png"></img>
              <img className="message-stamp-add" src="/images/stamp.png"></img> */}
              <ReactionButton str="emoji"/>
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
  return (
  <button className="after_click_stamp">
    < img className="emoji-block" src = {"images/"+ str + ".png"} alt="stamp image"/>
    <div className="count-block">2</div>
  </button> 
  );
}

