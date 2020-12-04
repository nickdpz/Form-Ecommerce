/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const URL_BASE = 'https://blackisp.herokuapp.com'

const getProvinces = async() => {
    try {
        const { data } = await axios.get(`${URL_BASE}/postalCodes/11000`)
        return data
    } catch (error) {
        throw error;
    }
}
export default { getProvinces }