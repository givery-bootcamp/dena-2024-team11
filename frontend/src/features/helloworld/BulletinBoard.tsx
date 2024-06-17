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

export function BulletinBoard() {
  // const [posts, dispatch] = useReducer(postsReducer, initialPosts);
 // const [posts, setPosts] = useState(initialPosts);
  const { posts } = useAppSelector((state) => state.posts);
  return (
    <div className="bulletin-with-thread">
      <div className="bulletin-board">
        <PostList posts={posts} />
        <InputBox/>
      </div>
      <div>
        <MessageThread/>
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

export function InputBox() {
  const [filterText, setFilterText] = useState('');
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(APIService.postBoard(filterText));
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
          {post.name}
          <MessageItem str={post.message}/>
        </div>
  );

}

export function MessageItem ({str} : {str:string}) {
  return <div>{str}</div>
}

