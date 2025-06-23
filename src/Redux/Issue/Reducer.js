import { ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUES_FAILURE, CREATE_ISSUES_REQUEST, CREATE_ISSUES_SUCCESS, DELETE_ISSUES_FAILURE, DELETE_ISSUES_REQUEST, DELETE_ISSUES_SUCCESS, FETCH_ISSUES_BY_ID_REQUEST, FETCH_ISSUES_BY_ID_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_SUCCESS } from "./ActionType"

const initialState={
   issues:[],
   loading:false,
   error:null,
   issueDetails:null
}

export const issueReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_ISSUES_REQUEST:
        case CREATE_ISSUES_REQUEST:
        case DELETE_ISSUES_REQUEST:
        case FETCH_ISSUES_BY_ID_REQUEST:
        case ASSIGNED_ISSUE_TO_USER_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            }
        case FETCH_ISSUES_SUCCESS:
            return{
                ...state,
                loading:false,
                issues:action.payload
            }
        case FETCH_ISSUES_BY_ID_SUCCESS:
        case UPDATE_ISSUE_STATUS_SUCCESS:
            return{
                ...state,
                loading:false,
                issueDetails:action.payload
            }
        
        case CREATE_ISSUES_SUCCESS:
            return{
                ...state,
                loading:false,
                issues:[...state.issues,action.payload]
            }
        
        case ASSIGNED_ISSUE_TO_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                issues:state.issues.map((issue)=>
                    issue.id===action.payload.id?action.payload:issue
                )
            }

        case DELETE_ISSUES_SUCCESS:
            return{
                ...state,
                loading:false,
                issues:state.issues.filter((issue)=>issue.id!==action.payload),
            };
        
        case FETCH_ISSUES_FAILURE:
        case CREATE_ISSUES_FAILURE:
        case UPDATE_ISSUE_STATUS_FAILURE:
        case DELETE_ISSUES_FAILURE:
        case ASSIGNED_ISSUE_TO_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
              
        
    }
}