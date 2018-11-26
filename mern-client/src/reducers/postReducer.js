import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADING} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false,

}//end initial state

export default function(state= initialState, action){
    switch(action.type){
        case POST_LOADING:
            return{
                ...state,
                loading: true
            }//end case POST_LOADING            
        case GET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            }//end case GET_POSTS
        case GET_POST:
            return{
                ...state,
                post: action.payload,
                loading: false
            }//end case GET_POST
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }//end case DELETE_POST
        case ADD_POST:
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }//end case ADD_POST
        
            
            
        default:
            return state;
    }//end switch
}//end anon function