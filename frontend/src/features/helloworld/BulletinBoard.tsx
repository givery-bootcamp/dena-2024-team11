import "./BulletinBoard.scss";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { APIService } from "../../shared/services";
import { useState, useEffect } from 'react';
import { BoardElement } from "../../shared/models";
import { actions } from "../../shared/store";

type PostProps = {
  posts: BoardElement[];
};

type PostItemProps = {
  post: BoardElement;
};

type InputBoxProps = {
  parentId: number | null;
};

export function BulletinBoard() {
  // const [posts, dispatch] = useReducer(postsReducer, initialPosts);
 // const [posts, setPosts] = useState(initialPosts);
  //最新のDBを取得してstoreを更新

  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(APIService.getHello());
  }, [dispatch]);
  const noparents = posts.filter((post) => post.parentId === -1);
  const selectedThreadId = useAppSelector((state) => state.thread.SelectedThreadId);
  const zeroparents = posts.filter((post) => post.parentId === selectedThreadId);
  const parentPost = posts.filter((post) => post.id === selectedThreadId);
  return (
    <div className="bulletin-with-thread">
      <div className="bulletin-board">
        <PostList posts={noparents} />
        <InputBox parentId={-1}/>
      </div>
      <div>
        <PostList posts={parentPost}/>
        <PostList posts={zeroparents} />
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

export function PostList({ posts }: PostProps) {
  const postListItems = posts.map((post, id) => (
    <li key={id.toString()}>
      <PostItem post={post} />
    </li>
  ));
  return <ul>{postListItems}</ul>;
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

export function PostItem({ post }: PostItemProps) {
  const dispatch = useAppDispatch();
  // function resetParentId() {
  //   return post.parentId;
  // }
  return (
        <div>
          {post.id} -&gt; {post.parentId}: 
          {post.name}
          <MessageItem str={post.message}/>
          {post.parentId === -1 && <button onClick={() => {
            dispatch(actions.SelectThread(post.id));
          }}>Reply</button>}

        </div>
  );

}

export function MessageItem ({str} : {str:string}) {
  return <div>{str}</div>
}
