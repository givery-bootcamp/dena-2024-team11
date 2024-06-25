import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardElement, Hello } from '../models';

type DbPost = {
  id: number;
  user: {
    id: number;
    name: string;
    icon: string;
  },
  content: string;
  created_at: string;
  updated_at: string;
  num_replies: number;
};

type DbReply = {
  id: number;
  user: {
    id: number;
    name: string;
    icon: string;
  },
  content: string;
  created_at: string;
  updated_at: string;
}

const API_ENDPOINT_PATH =
  import.meta.env.API_ENDPOINT_PATH ?? '';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});

export const getBoard = createAsyncThunk<BoardElement[]>('getBoard', async () => {
    const getResponse = await fetch(`${API_ENDPOINT_PATH}/posts`, {
      method: 'GET',
    });

    if(!getResponse.ok) {
      console.log("get error");
      return [];
    }

    const getResponseObj: DbPost[] = await getResponse.json();

    const boardElementData = getResponseObj.map(dbPost => {
      const newElement = {
        id: dbPost.id,
        name: dbPost.user.name,
        message: dbPost.content,
        parentId: -1,
      }
      return newElement;
    });
    return boardElementData;
  }
);

export const getReplies = createAsyncThunk<BoardElement[], number>('getReplies', async (parentId) => {
    const params = {
      post_id: parentId.toString()
    };
    const queryParams = new URLSearchParams(params);
    const getResponse = await fetch(`${API_ENDPOINT_PATH}/replies?` + queryParams);
    if(!getResponse.ok) {
      console.log("get error");
      return [];
    }
    const getResponseObj: DbReply[] = await getResponse.json();
    const boardElementData = getResponseObj.map(dbReply => {
      const newReply = {
        id: dbReply.id,
        name: dbReply.user.name,
        message: dbReply.content,
        parentId: parentId,
      };
      return newReply;
    })
    return boardElementData;
  }
);

export const postBoard = createAsyncThunk<BoardElement[], string>('postBoard',async (message) => {
    const postResponse = await fetch(`${API_ENDPOINT_PATH}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user_id: 1,
        content: message,
       }),
    });

    if(!postResponse.ok) {
      console.log("post error");
      return [];
    }

    const getResponse = await fetch(`${API_ENDPOINT_PATH}/posts`, {
      method: 'GET',
    });

    if(!getResponse.ok) {
      console.log("get error");
      return [];
    }

    const getResponseObj: DbPost[] = await getResponse.json();

    const boardElementData = getResponseObj.map(dbPost => {
      const newElement = {
        id: dbPost.id,
        name: dbPost.user.name,
        message: dbPost.content,
        parentId: -1,
      }
      return newElement;
    })
    return boardElementData;
  }
);

export const postReply = createAsyncThunk<BoardElement[], {message: string; parentId: number}>('postReply', async ({message, parentId}) => {
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      post_id: parentId,
      user_id: 1,
      content: message,
     }),
  });
  if(!postResponse.ok) {
    console.log("post error");
    return [];
  }

  const params = {
    post_id: parentId.toString()
  };
  const queryParams = new URLSearchParams(params);
  const getResponse = await fetch(`${API_ENDPOINT_PATH}/replies?` + queryParams);
  if(!getResponse.ok) {
    console.log("get error");
    return [];
  }
  const getResponseObj: DbReply[] = await getResponse.json();
  const boardElementData = getResponseObj.map(dbReply => {
    const newReply = {
      id: dbReply.id,
      name: dbReply.user.name,
      message: dbReply.content,
      parentId: parentId,
    };
    return newReply;
  })
  return boardElementData;
});

export const loginBoard = createAsyncThunk<boolean, {userId: number; password: string}>('loginBoard', async ({userId, password})=> {
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      user_id: userId,
      password: password,
     }),
  });
  if(!postResponse.ok) {
    console.log("post error");
    return false;
  }
  return true;
});