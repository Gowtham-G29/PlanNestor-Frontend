import { API_BASE_URL } from "../../service/Api";

import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

import axios from "axios";

export const register = (userData) => async (dispatch) => {

    dispatch({ type: REGISTER_REQUEST })

    try {
        const { data } = await axios.post(`${API_BASE_URL}/register`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: REGISTER_SUCCESS, payload: data })
        }

    } catch (error) {
        (error);
    }
}

export const login = userData => async (dispatch) => {

    dispatch({ type: LOGIN_REQUEST })

    try {
        const { data } = await axios.post(`${API_BASE_URL}/login`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: LOGIN_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, error: error.message })
    }
}

export const getUser = () => async (dispatch) => {

    dispatch({ type: GET_USER_REQUEST })

    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });




        dispatch({ type: GET_USER_SUCCESS, payload: data })


    } catch (error) {
        (error);
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
}