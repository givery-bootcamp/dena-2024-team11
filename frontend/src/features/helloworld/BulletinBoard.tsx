import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { APIService } from "../../shared/services";

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
  return <div>Hello world!</div>;
}

export function PostItem({ post }: PostItemProps) {
  return <div></div>;
}
