import api, { API_BASE_URL } from "../../service/Api"
import { fetchChatByProject } from "../Chat/Action";
import { UPDATE_ISSUE_STATUS_FAILURE } from "../Issue/ActionType";
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS } from "./ActionType";

export const fetchProjects = ({ category, tag }) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });

    try {
        // Build params only if values exist
        const params = {};
        if (category) params.category = category;
        if (tag) params.tag = tag;

        const response = await api.get(`/api/projects/getProjects`, { params });

        ("Fetched Projects:", response.data);

        dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error fetching projects:", error.message);
    }
};

export const updateProjectStatus = (projectId, status) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_PROJECT_REQUEST });

        try {
            await api.put(`/api/projects/update/${projectId}?status=${status}`);
            dispatch(fetchProjects({}));

        } catch (error) {
            dispatch({ type: UPDATE_ISSUE_STATUS_FAILURE, error: error.message })
        }

    }
}




export const searchProjects = (keyword) => async (dispatch) => {

    dispatch({ type: SEARCH_PROJECT_REQUEST })

    try {
        const { data } = await api.get(`/api/projects/search?keyword=${keyword}`)
        dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: data })
    } catch (error) {
        (error);
    }
}

export const createProjects = (projectData) => async (dispatch) => {

    dispatch({ type: CREATE_PROJECT_REQUEST })

    try {
        const { data } = await api.post(`/api/projects/create`, projectData)
        dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data })
        dispatch(fetchProjects({}));
    } catch (error) {
        (error);
    }
}

export const searchProjectByID = (id) => async (dispatch) => {
    (id)

    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST })

    try {
        const response = await api.get(`/api/projects/${id}`)
        console.log(response.data)
        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, payload: response.data })
        dispatch(fetchChatByProject(id));
    } catch (error) {
        (error);
    }
}


export const deleteProjectByID = (id) => async (dispatch) => {

    dispatch({ type: DELETE_PROJECT_REQUEST })

    try {
        const { data } = await api.delete(`/api/projects/delete/${id}`)
        dispatch({ type: DELETE_PROJECT_SUCCESS, payload: data })
        dispatch(fetchProjects({}));

    } catch (error) {
        (error);
    }
}


export const inviteToProjectByID = ({ email, projectId }) => async (dispatch) => {

    dispatch({ type: INVITE_TO_PROJECT_REQUEST })

    try {
        const { data } = await api.post(`/api/projects/invite`, {
            email, projectId
        })
        dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data })
    } catch (error) {
        (error);
    }
}


export const acceptInvitation = ({ token, navigate }) => async (dispatch) => {

    dispatch({ type: ACCEPT_INVITATION_REQUEST })

    try {
        const { data } = await api.get(`/api/projects/acceptInvite`, {
            params: {
                token
            }
        })

        navigate("/project/" + data.projectId);

        dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
    }
}