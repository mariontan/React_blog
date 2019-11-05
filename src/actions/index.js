import _ from 'lodash';
import jsonPlaceholder from '../apis/JSONPlaceholder';

export const fetchPostsAndUsers=()=> async (dispatch, getState)=>{
	await dispatch(fetchPosts());
	const userIds=_.uniq(_.map(getState().posts,"userId"));
	userIds.forEach( id => dispatch(fetchUser(id)));
};

export const fetchPosts= ()=> async (dispatch)=>{
	const response = await jsonPlaceholder.get('/posts');
 
	dispatch({type: 'FETCH_POSTS', payload:response.data})
};

export const fetchUser = id => async dispatch=>{
	const response = await jsonPlaceholder.get(`/users/${id}`);
 
	dispatch({type: 'FETCH_USER', payload:response.data});

};


// export const fetchUser = id => dispatch=>{
// 	_fetchUser(id, dispatch);
// };
// // memoize is created only one time
// const _fetchUser=_.memoize(async(id, dispatch) =>{
// 	const response = await jsonPlaceholder.get(`/users/${id}`);
 
// 	dispatch({type: 'FETCH_USER', payload:response.data});

// });


// //does not solve the multiple request issue because it is created every time we call the function
// export const fetchUser = function(id){
// 	return _.memoize(async function(dispatch){
// 		const response = await jsonPlaceholder.get(`/users/${id}`);

// 		dispatch({type:'FETCH_USER', payload: response.data});
// 	});
// };