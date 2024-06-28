import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardElement, Hello } from '../models';
import { LoginState } from '../models';

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
  stamps: {
    name: string;
    users: number[];
    count: number;
  }[],
  num_reply: number;
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
  stamps: {
    name: string;
    users: number[];
    count: number;
  }[],
  num_reply: number;
}

type StampActionPayload = {
  type: string,
  userId: number,
  postId: number,
  stamp: {
    name: string,
    count: number,
  },
}

// console.log(import.meta.env.VITE_NODE_ENV);
// const API_ENDPOINT_PATH = import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_API_ENDPOINT_DEV_PATH : import.meta.env.VITE_API_ENDPOINT_PROD_PATH;

const API_ENDPOINT_PATH =
  import.meta.env.VITE_API_ENDPOINT_PATH ?? '';
export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`, {
    mode: "cors",
    credentials: "include",
  });
  return await response.json();
});

export const getBoard = createAsyncThunk<BoardElement[]>('getBoard', async () => {
    const getResponse = await fetch(`${API_ENDPOINT_PATH}/posts`, {
      method: 'GET',
      mode: "cors",
      credentials: "include",
    });

    if(!getResponse.ok) {
      console.log("get error");
      return [];
    }

    const getResponseObj: DbPost[] = await getResponse.json();

    const boardElementData = getResponseObj.map(dbPost => {
      const newElement = {
        id: dbPost.id,
        user: {
          id: dbPost.user.id,
          name: dbPost.user.name,
          icon: dbPost.user.icon,
        },
        message: dbPost.content,
        parentId: -1,
        stamps: dbPost.stamps,
        num_reply: dbPost.num_reply,
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
    const getResponse = await fetch(`${API_ENDPOINT_PATH}/replies?` + queryParams, {
      mode: "cors",
      credentials: "include",
    });
    if(!getResponse.ok) {
      console.log("get error");
      return [];
    }
    const getResponseObj: DbReply[] = await getResponse.json();
    const boardElementData = getResponseObj.map(dbReply => {
      const newReply = {
        id: dbReply.id,
        user: {
          id: dbReply.user.id,
          name: dbReply.user.name,
          icon: dbReply.user.icon,
        },
        message: dbReply.content,
        parentId: parentId,
        stamps: dbReply.stamps,
        num_reply: dbReply.num_reply,
      };
      return newReply;
    })
    return boardElementData;
  }
);

export const postBoard = createAsyncThunk<BoardElement[], {message: string; userId: number}>('postBoard',async ({message, userId}) => {
    const postResponse = await fetch(`${API_ENDPOINT_PATH}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user_id: userId,
        content: message,
       }),
      mode: "cors",
      credentials: "include",
    });

    if(!postResponse.ok) {
      console.log("post error");
      return [];
    }

    const getResponse = await fetch(`${API_ENDPOINT_PATH}/posts`, {
      method: 'GET',
      mode: "cors",
      credentials: "include",
    });

    if(!getResponse.ok) {
      console.log("get error");
      return [];
    }

    const getResponseObj: DbPost[] = await getResponse.json();

    const boardElementData = getResponseObj.map(dbPost => {
      const newElement = {
        id: dbPost.id,
        user: {
          id: dbPost.user.id,
          name: dbPost.user.name,
          icon: dbPost.user.icon,
        },
        message: dbPost.content,
        parentId: -1,
        stamps: dbPost.stamps,
        num_reply: dbPost.num_reply,
      }
      return newElement;
    })
    return boardElementData;
  }
);

export const postReply = createAsyncThunk<BoardElement[], {message: string; parentId: number, userId: number}>('postReply', async ({message, parentId, userId}) => {
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      post_id: parentId,
      user_id: userId,
      content: message,
    }),
    mode: "cors",
    credentials: "include",
  });
  if(!postResponse.ok) {
    console.log("post error");
    return [];
  }

  const params = {
    post_id: parentId.toString()
  };
  const queryParams = new URLSearchParams(params);
  const getResponse = await fetch(`${API_ENDPOINT_PATH}/replies?` + queryParams, {
    mode: "cors",
    credentials: "include",
  });
  if(!getResponse.ok) {
    console.log("get error");
    return [];
  }
  const getResponseObj: DbReply[] = await getResponse.json();
  const boardElementData = getResponseObj.map(dbReply => {
    const newReply = {
      id: dbReply.id,
        user: {
          id: dbReply.user.id,
          name: dbReply.user.name,
          icon: dbReply.user.icon,
        },
        message: dbReply.content,
        parentId: parentId,
        stamps: dbReply.stamps,
        num_reply: dbReply.num_reply,
    };
    return newReply;
  })
  return boardElementData;
});

export const loginBoard = createAsyncThunk<LoginState, {userId: string; password: string}>('loginBoard', async ({userId, password})=> {
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      user_id: userId,
      password: password,
    }),
    mode: "cors",
    credentials: "include",
  });
  if(!postResponse.ok) {
    console.log("post error");
    return {
      isLogin: false,
      user: {
        id: -1,
        name: "",
        icon: "",
      }
    };
  }

  const loginResponse = await postResponse.json();
  console.log(loginResponse);

  return {
    isLogin: true,
    user: {
      id: loginResponse.id,
      name: loginResponse.name,
      icon: loginResponse.icon,
    }
  };
});

export const addStampPost = createAsyncThunk<StampActionPayload, {postId: number; userId: number, stampName: string}>('addStampPost', async ({postId, userId, stampName})=> {
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/stamp/add/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_id: postId,
      user_id: userId,
      stamp_name: stampName,
    }),
    mode: "cors",
    credentials: "include",
  });
  if(!postResponse.ok) {
    console.log("post error");
  }

  // const getResponseObj = await postResponse.json();
  const payload = {
    type: "post",
    userId: userId,
    postId: postId,
    stamp: {
      name: stampName,
      count: 1,
    },
  }
  return payload;
});

export const removeStampPost = createAsyncThunk<StampActionPayload, {postId: number; userId: number, stampName: string}>('removeStampPost', async ({postId, userId, stampName})=> {
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/stamp/remove/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_id: postId,
      user_id: userId,
      stamp_name: stampName,
    }),
    mode: "cors",
    credentials: "include",
  });
  if(!postResponse.ok) {
    console.log("post error");
  }

  const getResponseObj = await postResponse.json();
  const payload = {
    type: "post",
    userId: userId,
    postId: postId,
    stamp: {
      name: stampName,
      count: 1,
    },
  }
  return payload;
});

export const addStampReply = createAsyncThunk<StampActionPayload, {postId: number; userId: number, stampName: string}>('addStampPost', async ({postId, userId, stampName})=> {
  console.log("stampname " + stampName);
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/stamp/add/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reply_id: postId,
      user_id: userId,
      stamp_name: stampName,
    }),
    mode: "cors",
    credentials: "include",
  });
  if(!postResponse.ok) {
    console.log("post error");
  }

  // const getResponseObj = await postResponse.json();
  const payload = {
    type: "reply",
    userId: userId,
    postId: postId,
    stamp: {
      name: stampName,
      count: 1,
    },
  }
  return payload;
});

export const removeStampReply = createAsyncThunk<StampActionPayload, {postId: number; userId: number, stampName: string}>('removeStampPost', async ({postId, userId, stampName})=> {
  const postResponse = await fetch(`${API_ENDPOINT_PATH}/stamp/remove/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reply_id: postId,
      user_id: userId,
      stamp_name: stampName,
    }),
    mode: "cors",
    credentials: "include",
  });
  if(!postResponse.ok) {
    console.log("post error");
  }

  // const getResponseObj = await postResponse.json();
  const payload = {
    type: "reply",
    userId: userId,
    postId: postId,
    stamp: {
      name: stampName,
      count: 1,
    },
  }
  return payload;
});