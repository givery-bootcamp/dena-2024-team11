import { createAsyncThunk } from '@reduxjs/toolkit';

import { BoardElement, Hello } from '../models';

const API_ENDPOINT_PATH =
  import.meta.env.VITE_API_ENDPOINT_PATH ?? '';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});

//parentIdが-1のポストは親を持たない
const boardElementData: BoardElement[] = [
  {
    id: 0,
    name: "Toma",
    message: "とてもいい掲示板です。",
    parentId: -1,
  },
  {
    id: 1,
    name: "Chono",
    message: "そうは思わない",
    parentId: -1,
  },
  {
    id: 2,
    name: "Toma",
    message: "なんで？",
    parentId: -1,
  }
]

export const postBoard = createAsyncThunk<BoardElement[], string>('postBoard',async (message) => {
    // await fetch(`${API_ENDPOINT_PATH}/board`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ message }),
    // });
    const boardElementsSize = boardElementData.length;
    const nextId =  boardElementsSize;
    boardElementData.push({
      id: nextId,
      name: "Toma",
      message: message,
      parentId: -1,
    });
    return boardElementData;
  }
);

export const postReply = createAsyncThunk<BoardElement[], {message: string; parentId: number}>('postReply', async ({message, parentId}) => {
  // 本当はAPIを叩いて、replyを追加する
  // await fetch(`${API_ENDPOINT_PATH}/board`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ message }),
  // });
  const boardElementsSize = boardElementData.length;
  const nextId =  boardElementsSize;
  boardElementData.push({
    id: nextId,
    name: "Chono",
    message: message,
    parentId: parentId,
  });
  return boardElementData;
});
