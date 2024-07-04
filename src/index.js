import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';

// state：维护的数据，一般维护成树的结构。
// action：一个普通对象，存储reducer的传入参数，一般描述对state的更新类型。
const f1 = (state = 100, action = 1) => { 
  switch (action.type) {
    case 'add':
      return state + action.value;
    case 'sub':
      return state - action.value;
    default:
      return state;
  }
};

const store = configureStore({
  reducer: f1, // reducer：对state进行更新的函数，每个state绑定一个reducer。传入两个参数：当前state和action，返回新state。
});

console.log("Start: ", store.getState());

store.subscribe(() => {console.log("After dispatch: ", store.getState())}); // subscribe: 每次dispatch后执行

store.dispatch({type: 'add', value: 1}); // dispatch：传入一个参数action，对整棵state树操作一遍。
store.dispatch({type: 'add', value: 2});
store.dispatch({type: 'add', value: 3});
store.dispatch({type: 'sub', value: 4});
store.dispatch({type: 'sub', value: 5});

console.log("final: ", store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  </React.StrictMode>
);
