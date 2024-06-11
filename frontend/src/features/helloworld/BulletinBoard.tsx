import { useReducer } from "react";

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

type InputBoxProps = {
  dispatch: React.Dispatch<PostReducerAction>
}

type PostReducerAction = {
  type: string;
  message: string;
};

const initialPosts: Post[] = [
  {
    name: "Toma",
    message: "とてもいい掲示板です。",
  },
  {
    name: "Chono",
    message: "そうは思わない",
  },
];

export function BulletinBoard() {
  const [posts, dispatch] = useReducer(postsReducer, initialPosts);
 // const [posts, setPosts] = useState(initialPosts);
  
  return (
    <>
      <PostList posts={posts} />
      <InputBox dispatch={dispatch}/>
    </>
  );
  // const { hello } = useAppSelector((state) => state.hello);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(APIService.getHello());
  // }, [dispatch]);
  // return <div>{hello?.message}</div>;
}

function postsReducer(posts: Post[], action: PostReducerAction): Post[] {
  if(action.type === 'post') {
    return [
      ...posts,
      {
        name: "Toma",
        message: action.message,
      }
    ];
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}

export function PostList({ posts }: PostProps) {
  const postListItems = posts.map((post, id) => (
    <li id={id.toString()}>
      <PostItem post={post} />
    </li>
  ));
  return <ul>{postListItems}</ul>;
}

export function InputBox({ dispatch }: InputBoxProps) {
  const [filterText, setFilterText] = useState('');
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({
      type: 'post',
      message: filterText,
    });
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
