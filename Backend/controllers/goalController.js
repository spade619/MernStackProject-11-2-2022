//use express async handler
const asyncHandler = require('express-async-handler')
// to include the json schema
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//---------------------------------------------------------------------------------
//description = to get Goals
//route = GET /api/goals
//access = private

const getGoals = asyncHandler(async (req, res) => {
    //execute get request to db
    const goals = await Goal.find({user: req.user.id})
   
    res.status(200).json(goals)
    console.log(req.path, req.method)
})
//-------------------------------------------------------------------------------

//description = to  set Goals
//route = POST /api/goals
//access = private

const setGoal = asyncHandler(async (req, res) => {
   
    //check for errors
    if (!req.body.text) {
        //  res.status(400).json({message: 'please add a text field'})
        //middleware method error handling
        res.status(400)
        throw new Error('please add a text field')
    }
    //execute post request to db
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal)
    console.log(req.path, req.method)
})
//----------------------------------------------------------------------------------------------

//description = to update Goals
//route = PUT /api/goals/:id
//access = private

const updateGoal = asyncHandler(async (req, res) => {
    //execute update request to db
    const goal = await Goal.findById(req.params.id)
//middleware method error handling
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
 

    //check if user exists
    if (!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    // to make only the logged in user can update the goals
    if(goal.user.toString()!== req.user.id) {
        res.status(400)
        throw new Error('User not authorized')
    }
   

    //get the updated value  using findById
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
    console.log(req.path, req.method)
})

//----------------------------------------------------------------------------------------------------------------------------
//description = to Delete Goals
//route = DELETE /api/goals
//access = private

const deleteGoal = asyncHandler(async (req, res) => {
     //execute delete request to db
     const goal = await Goal.findById(req.params.id)
     //middleware method error handling
         if(!goal) {
             res.status(400)
             throw new Error('Goal not found')
         }



    //check if user exists
    if (!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    // to make only the logged in user can update the goals
    if(goal.user.toString() !== req.user.id) {
        res.status(400)
        throw new Error('User not authorized')
    }    
        
     //remove and return the ID of the deleted data
         await goal.remove()
    res.status(200).json({id: req.params.id})
    console.log(req.path, req.method)
})



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}