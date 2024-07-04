import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/app';

// state：维护的数据，一般维护成树的结构。
// action：一个普通对象，存储reducer的传入参数，一般描述对state的更新类型。
//reducer f1实现state加减action传入的值
const f1 = (state = 100, action) => { 
  switch (action.type) {
    case 'add':
      return state + action.value;
    case 'sub':
      return state - action.value;
    default:
      return state;
  }
};

// reducer f2实现state中的字符串接上action传入的字符串
const f2 = (state = "!", action) => {
  switch (action.type) {
    case 'concat':
      return state + action.character;
    default:
      return state;
  }
};

// f3用来组合f1和f2
// const f3 = (state = {}, action) => {
//   return {
//     f1: f1(state.f1, action),
//     f2: f2(state.f2, action),
//   }
// };
const f3 = combineReducers({
  number: f1,
  string: f2,
});

const store = configureStore({
  reducer: f3, // reducer：对state进行更新的函数，每个state绑定一个reducer。传入两个参数：当前state和action，返回新state。
});

console.log("Start: ", store.getState());

store.subscribe(() => {console.log("After dispatch: ", store.getState())}); // subscribe: 每次dispatch后执行

store.dispatch({type: 'add', value: 1}); // dispatch：传入一个参数action，对整棵state树操作一遍(递归调用)。
store.dispatch({type: 'add', value: 2});
store.dispatch({type: 'add', value: 3});
store.dispatch({type: 'sub', value: 4});
store.dispatch({type: 'sub', value: 5});
store.dispatch({type: 'concat', character: 'wzy'});
store.dispatch({type: 'concat', character: 'wzy'});

console.log("final: ", store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);
