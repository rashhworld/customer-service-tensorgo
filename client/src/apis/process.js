import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export const userAuthApi = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/auth/google`, userData);

        const { status, data, msg } = response.data;
        return status === "success" ? (alert(msg), data) : (alert(msg), null);
    } catch (error) {
        console.log(error);
    }
};

export const sendRequestApi = async (userId, category, comments) => {
    try {
        const response = await axios.post(`${baseURL}/send-requests`, {
            userId,
            category,
            comments
        });

        const { status, data, msg } = response.data;
        return status === "success" ? (alert(msg), data) : (alert(msg), null);
    } catch (error) {
        alert(error.response.data.msg);
    }
};

export const getRequestsApi = async (userId, category = null) => {
    try {
        const response = await axios.post(`${baseURL}/get-requests`, { userId, category });

        const { status, data } = response.data;
        return status === "success" ? data : null;
    } catch (error) {
        console.log(error);
    }
};
