import axios from "axios";

const getDataByUrl = async (url) => {
    try {
        const response = await axios.get(`${url}`);

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const sendPostRequest = async (url, data) => {
    try {
        const response = await axios.post(`${url}`, data);

        return response.status;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {
    getDataByUrl,
    sendPostRequest
};

