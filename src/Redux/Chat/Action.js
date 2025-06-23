import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType"

import api from "../../service/Api"


export const sendMessage = (messageData) => {
    return async (dispatch) => {
        dispatch({ type: SEND_MESSAGE_REQUEST });

        try {
            const { data } = await api.post("/api/messages/send", messageData);
            dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });

        } catch (error) {
            (error);

            dispatch({
                type: SEND_MESSAGE_FAILURE,
                error: error.message
            })

        }
    }
}

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });

        try {
            const { data } = await api.get(`/api/projects/chat/${projectId}`);
            dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, payload: data });
            dispatch(fetchChatMessages(data.id))
        } catch (error) {
            (error);
            dispatch({ type: FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message })

        }

    }
}

export const fetchChatMessages = (chatId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
        try {
            const { data } = await api.get(`/api/messages/chat/${chatId}`);
            dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, payload: data });

        } catch (error) {
            (error)
            dispatch({ type: FETCH_CHAT_MESSAGES_FAILURE, error: error.message });
        }
    }
}



