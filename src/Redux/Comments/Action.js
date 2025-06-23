import api from "../../service/Api";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS } from "./ActionType"


export const createComment = (commentData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_COMMENT_REQUEST });

        try {
            const { data } = await api.post("/api/comments/create", commentData);
            dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });

        } catch (error) {
            (error);
            dispatch({ type: CREATE_COMMENT_FAILURE, error: error.message })
        }
    }
}

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_COMMENT_REQUEST });
        try {
            const { data } = api.delete(`/api/comments/${commentId}`);
            ("deleted comment:", data);
            dispatch({ type: DELETE_COMMENT_SUCCESS, payload: commentId });

        } catch (error) {
            ("error", error);
            dispatch({ type: DELETE_COMMENT_FAILURE, error: error.message })
        }
    }
}

export const fetchComments = (issueId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_COMMENT_REQUEST });

        try {
            const { data } = await api.get(`/api/comments/${issueId}`);
            ("Comments ", data);
            dispatch({ type: FETCH_COMMENT_SUCCESS, payload: data });

        } catch (error) {

            ("error ", error);
            dispatch({ type: FETCH_COMMENT_FAILURE, error: error.message })

        }
    }
}
