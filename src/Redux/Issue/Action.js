import api from "../../service/Api"
import { ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUES_FAILURE, CREATE_ISSUES_REQUEST, CREATE_ISSUES_SUCCESS, DELETE_ISSUES_FAILURE, DELETE_ISSUES_REQUEST, DELETE_ISSUES_SUCCESS, FETCH_ISSUES_BY_ID_FAILURE, FETCH_ISSUES_BY_ID_REQUEST, FETCH_ISSUES_BY_ID_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS } from "./ActionType"


export const createIssue = (issueData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ISSUES_REQUEST });
        try {

            const { data } = await api.post("/api/issues/create", issueData);
            dispatch({ type: CREATE_ISSUES_SUCCESS ,payload:data});

        } catch (error) {
            (error)
            dispatch({ type: CREATE_ISSUES_FAILURE, error: error.message });

        }
    }
}

export const fetchIssue = (id) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ISSUES_REQUEST })
        try {
            const { data } = await api.get(`/api/issues/project/${id}`);
            dispatch({ type: FETCH_ISSUES_SUCCESS, payload: data });
        } catch (error) {
            (error);
            dispatch({ type: FETCH_ISSUES_FAILURE, error: error.message });
        }
    }
}

export const fetchIssueById = (id) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ISSUES_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/issues/${id}`);

            dispatch({ type: FETCH_ISSUES_BY_ID_SUCCESS, payload: response.data });

        } catch (error) {
            dispatch({ type: FETCH_ISSUES_BY_ID_FAILURE, error: error.message })
        }
    }
}

export const updateIssueStatus = ({ id, status }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST });
        try {
            const { data } = await api.put(`/api/issues/${id}/status/${status}`);
            ("Update issue status", data);
        
            dispatch({ type: UPDATE_ISSUE_STATUS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_ISSUE_STATUS_FAILURE, error: error.message })

        }
    }
}

export const assignIssueToUser = ({ issueId, userId }) => {
    return async (dispatch) => {
        dispatch({ type: ASSIGNED_ISSUE_TO_USER_REQUEST });
        try {
            const { data } = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            dispatch({ type: ASSIGNED_ISSUE_TO_USER_SUCCESS, payload: data });

        } catch (error) {
            dispatch({ type: ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.message })
        }
    }
}

export const deleteIssueById = (id) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_ISSUES_REQUEST })
        try {
            const { data } = await api.delete(`/api/issues/delete/${id}`);
            ("data ", data)
            dispatch({ type: DELETE_ISSUES_SUCCESS, payload: id })

        } catch (error) {
            dispatch({ type: DELETE_ISSUES_FAILURE, error: error.message })

        }
    }
}

