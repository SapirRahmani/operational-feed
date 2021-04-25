import axios from "axios";

const signInUser = async (userPersonalNumber) => {
    const response = await axios.get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/api/users/${userPersonalNumber}/signIn`);

    return response.status === 200;
};

const registerUser = async (userPersonalNumber, userFullName) => {
    const response = await axios.post(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/api/users`, {
        personalNumber: userPersonalNumber,
        name: userFullName
    });

    return response.status === 200;
};

export default {
    signInUser,
    registerUser
}