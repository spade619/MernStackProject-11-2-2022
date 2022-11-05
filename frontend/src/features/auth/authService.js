//making http request and sending data back in localstorage
import axios from 'axios'

const API_URL = '/api/users/'

//register user

const register = async (userData) => {
    //make request and put the response in this variable response
    const response = await axios.post(API_URL, userData)

    //check the response data
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login user

const login = async (userData) => {
    //make request and put the response in this variable response
    const response = await axios.post(API_URL + 'login', userData)

    //check the response data
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout user

const logout = () => {
    localStorage.removeItem('user')
}
const authService = {
    register,
    logout,
    login,
}

export default authService