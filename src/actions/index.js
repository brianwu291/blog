import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlacehoder.js';
// this is an actionCreator function

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    //console.log('about to fetch post');
    await dispatch(fetchPosts());
    //console.log(getState().posts);

    _.chain(getState().posts)   //_.chain method 會把前面的結果作為下個函數方法的參數，
        .map('userId')          //不斷串聯下去，最後加上.value()表示執行
            .uniq()
                .forEach(id => dispatch(fetchUser(id)))
                    .value()
};

export const fetchPosts = () => async (dispatch, getState) => {
    const res = await jsonPlaceholder.get('/posts');

    dispatch({ type: "FETCH_POSTS", payload: res.data });
};

export const fetchUser = (id) => async (dispatch, getState) => {
    const res = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: "FETCH_USER", payload: res.data });
};








//這裡是用原本Promise then catch方法
/*
export const fetchPosts = () => (dispatch, getState) => {
         jsonPlaceholder.get('/posts')
         .then(res => {
           dispatch({ type: "FETCH_POSTS", payload: res });
         })
         .catch(err => {
           console.log(err);
         })
};
*/



//這裡是利用async await寫法
/*
export const fetchPosts = () => async (dispatch, getState) => {
    const res = await jsonPlaceholder.get('/posts');

    dispatch({ type: "FETCH_POSTS", payload: res });
};
*/