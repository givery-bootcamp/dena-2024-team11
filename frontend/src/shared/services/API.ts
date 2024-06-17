import { createAsyncThunk } from '@reduxjs/toolkit';

import { BoardElement, Hello } from '../models';

const API_ENDPOINT_PATH =
  import.meta.env.VITE_API_ENDPOINT_PATH ?? '';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});

const boardElementData = [
  {
    name: "Toma",
    message: "とてもいい掲示板です。",
  },
  {
    name: "Chono",
    message: "そうは思わない",
  },
  {
    name: "Toma",
    message: "なんで？",
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
    boardElementData.push({
      name: "Toma",
      message: message,
    });
    return boardElementData;
  }
);


