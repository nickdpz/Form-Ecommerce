/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import env from "react-dotenv";
const URL_BASE = env.URL_BASE;

const getProvinces = async() => {
    try {
        const { data } = await axios.get(`${URL_BASE}/postalCodes/11000`)
        return data
    } catch (error) {
        throw error;
    }
}

const getProducts = async() => {
    try {
        const { data } = await axios.get(`${URL_BASE}/products`)
        return data
    } catch (error) {
        throw error;
    }
}
export default { getProvinces, getProducts }