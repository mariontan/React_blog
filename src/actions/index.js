import _ from 'lodash';
import jsonPlaceholder from '../apis/JSONPlaceholder';

export const fetchPosts= ()=> async (dispatch)=>{
	const response = await jsonPlaceholder.get('/posts');

	dispatch({type: 'FETCH_POSTS', payload:response.data})
};

// export const fetchUser = id => async dispatch=>{
// 	const response = await jsonPlaceholder.get(`/users/${id}`);
 
// 	dispatch({type: 'FETCH_USER', payload:response.data});
// };
//does not solve the multiple request issue because it is created every time we call the function
export const fetchUser = function(id){
	return _.memoize(async function(dispatch){
		const response = await jsonPlaceholder.get(`/users/${id}`);

		dispatch({type:'FETCH_USER', payload: response.data});
	});
};