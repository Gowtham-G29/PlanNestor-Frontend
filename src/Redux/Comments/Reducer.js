import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS } from "./ActionType"


const initialState={
    comments:[],
    loading:false,
    error:null
}

export const commentReducer=(state=initialState,action)=>{
    switch(action.type){
        case CREATE_COMMENT_REQUEST:
        case DELETE_COMMENT_REQUEST:
        case FETCH_COMMENT_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }

        case CREATE_COMMENT_SUCCESS:
            return{
                ...state,
                loading:false,
                comments:[...state.comments,action.payload]
            }
        
        case DELETE_COMMENT_SUCCESS:
            return{
                ...state,
                loading:false,
                comments:state.comments.filter(comment=>comment.id!==action.payload)
            }
        case FETCH_COMMENT_SUCCESS:
            return{
                ...state,
                loading:false,
                comments:action.payload

            }

        case CREATE_COMMENT_FAILURE:
        case DELETE_COMMENT_FAILURE:
        case FETCH_COMMENT_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        default:
           return state;
    }
}