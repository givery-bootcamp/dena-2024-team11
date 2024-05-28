import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { APIService } from "../../shared/services";
import { useState } from 'react';

type Post = {
  name: string;
  message: string;
};

type PostProps = {
  posts: Post[];
};

type PostItemProps = {
  post: Post;
};

export function BulletinBoard() {
  const posts: Post[] = [
    {
      name: "Toma",
      message: "とてもいい掲示板です。",
    },
    {
      name: "Chono",
      message: "そうは思わない",
    },
  ];
  return (
    <>
      <PostList posts={posts} />
      <InputBox />
    </>
  );
  // const { hello } = useAppSelector((state) => state.hello);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(APIService.getHello());
  // }, [dispatch]);
  // return <div>{hello?.message}</div>;
}

export function PostList({ posts }: PostProps) {
  const postListItems = posts.map((post) => (
    <li>
      <PostItem post={post} />
    </li>
  ));
  return <ul>{postListItems}</ul>;
}

export function InputBox() {
  const [filterText, setFilterText] = useState('');
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('送信内容: ' + filterText);    
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
