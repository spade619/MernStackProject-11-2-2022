import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'
//initialize the state
const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//create new goal
export const createGoal = createAsyncThunk('goals/create', async(goalData, thunkAPI)=>{
    try{
        //get token from local storage
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)

    } catch (error) {
        //send error message if error occures
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//_____________________________________________________________________________________________________

//get user goals from backend
export const getGoals = createAsyncThunk('goals/getAll', async(_, thunkAPI) => {
    try {
          //get token from local storage
          const token = thunkAPI.getState().auth.user.token
          return await goalService.getGoals(token)
    } catch (error) {
          //send error message if error occures
          const message = (error.response && error.response.data && error.response.data.message) 
          || error.message || error.toString()
  
          return thunkAPI.rejectWithValue(message)
    }
}) 

//__________________________________________________________________________________________________________

//delete user goal
export const deleteGoal = createAsyncThunk('goals/delete', async(id, thunkAPI)=>{
    try{
        //get token from local storage
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)

    } catch (error) {
        //send error message if error occures
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
        //reducers for creating goal
    extraReducers: (builder) => {
        builder
        //activate spinning loading screen when pending
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true
        })
        //deactivate spinning loading screen and outputs the data recieved
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        //when rejected action will be the message spinning loading screen is deactivated error will pop up
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

//reducers for getting goal_____________________________________________________________________________________________________
             
            //activate spinning loading screen when pending
              .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            //deactivate spinning loading screen and outputs the data recieved
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            //when rejected action will be the message spinning loading screen is deactivated error will pop up
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
//reducers for deleting goal_____________________________________________________________________________________________________________                   
            //activate spinning loading screen when pending
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            //deactivate spinning loading screen and outputs the data recieved
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //filter out goal id to only the goal id will output
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            //when rejected action will be the message spinning loading screen is deactivated error will pop up
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },

})

export const {reset} = goalSlice.actions
export default goalSlice.reducer
