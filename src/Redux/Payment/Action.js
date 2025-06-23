
import api from "../../service/Api"



export const createPayment = async ({ planType, jwt }) => {
    try {
        const { data } = await api.post(`/api/payments/${planType}`)
        if (data.paymentLinkUrl) {
            window.location.href = data.paymentLinkUrl
        }
    } catch (error) {
        console.log(error)

    }
}