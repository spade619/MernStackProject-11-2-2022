import axios from "axios";

//create an api url for the backend
const API_URL = '/api/goals'

 //create new goal
const createGoal = async (goalData, token) => {
const config = {
    headers: {
        //token Bearer will be used for the authorization
        Authorization: `Bearer ${token}`,
    },
}
//send (post) request to the backend 
const response = await axios.post(API_URL, goalData, config)

//return the response recieved from the backend
return response.data
}




//________________________________________________________________


 //get user goals
const getGoals = async (token) => {
const config = {
    headers: {
        //token Bearer will be used for the authorization
        Authorization: `Bearer ${token}`,
    },
}
//send (get) request to the backend
const response = await axios.get(API_URL, config)

//return the response recieved from the backend
return response.data
}

//___________________________________________________________________


//delete user goal
 const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            //token Bearer will be used for the authorization
            Authorization: `Bearer ${token}`,
        },
    }
    //send (get) request to the backend
    const response = await axios.delete(API_URL + goalId, config)
    
    //return the response recieved from the backend
    return response.data
    }


const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
}

export default goalService

