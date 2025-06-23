import api from "../../service/Api";
import { GET_USER_SUBSCRIPTION_FAILURE, GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_SUBSCRIPTION_FAILURE, UPGRADE_SUBSCRIPTION_REQUEST, UPGRADE_SUBSCRIPTION_SUCCESS } from "./ActionType"

export const getSubscriptionUser = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST })
        try {

            const {data} = await api.get("/api/subscriptions/getSubscription", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                },
            });

            dispatch({ type: GET_USER_SUBSCRIPTION_SUCCESS, payload: data });

        } catch (error) {
            dispatch({ type: GET_USER_SUBSCRIPTION_FAILURE, error: error.message })
        }
    }
}

export const upgradeSubscription = ({ planType }) => {
    return async (dispatch) => {
        {
            dispatch({ type: UPGRADE_SUBSCRIPTION_REQUEST })
            try {
                const {data} = await api.patch('/api/subscriptions/upgradeSubscription', null, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    },
                    params: {
                        planType: planType
                    }
                });

                dispatch({ type: UPGRADE_SUBSCRIPTION_SUCCESS, payload: data });

            } catch (error) {

                dispatch({ type: UPGRADE_SUBSCRIPTION_FAILURE, error: error.message })

            }
        }
    }
}