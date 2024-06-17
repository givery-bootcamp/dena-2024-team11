import { useReducer } from "react";
import "./BulletinBoard.scss";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { APIService } from "../../shared/services";
import { useState } from 'react';
import { BoardElement } from "../../shared/models";
import { MessageThread } from "./MessageThread";

type PostProps = {
  posts: BoardElement[];
};

type PostItemProps = {
  post: BoardElement;
};

type PlaceProps = {
  parentId: number;
};

export function BulletinBoard() {
  // const [posts, dispatch] = useReducer(postsReducer, initialPosts);
 // const [posts, setPosts] = useState(initialPosts);
  const { posts } = useAppSelector((state) => state.posts);
  const noparents = posts.filter((post) => post.parentId === -1);
  const zeroparents = posts.filter((post) => post.parentId === 0);
  return (
    <div className="bulletin-with-thread">
      <div className="bulletin-board">
        <PostList posts={noparents} />
        <InputBox parentId={-1}/>
      </div>
      <div>
        <PostList posts={zeroparents} />
        <InputBox parentId={0}/>        
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

export function InputBox({parentId}: PlaceProps) {
  const [filterText, setFilterText] = useState(''); 
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (parentId > -1) {
      dispatch(APIService.postReply({message: filterText, parentId: parentId}));
    } else {
      dispatch(APIService.postBoard(filterText));
    }
    setFilterText("");
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
  return (
        <div>
          {post.id} -&gt; {post.parentId}: 
          {post.name}
          <MessageItem str={post.message}/>
        </div>
  );

}

export function MessageItem ({str} : {str:string}) {
  return <div>{str}</div>
}

