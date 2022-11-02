
//use express async handler
const asyncHandler = require('express-async-handler')
// to include the json schema
const Goal = require('../models/goalModel')

//---------------------------------------------------------------------------------
//description = to get Goals
//route = GET /api/goals
//access = private

const getGoals = asyncHandler(async (req, res) => {
    //execute get request to db
    const goals = await Goal.find()
    console.log(req.path, req.method)
    res.status(200).json(goals)
})
//-------------------------------------------------------------------------------

//description = to post Goals
//route = POST /api/goals
//access = private

const setGoals = asyncHandler(async (req, res) => {
    console.log(req.path, req.method)
    //check for errors
    if (!req.body.text) {
        //  res.status(400).json({message: 'please add a text field'})
        //middleware method error handling
        res.status(400)
        throw new Error('please add a text field')
    }
    //execute post request to db
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})
//----------------------------------------------------------------------------------------------

//description = to set Goals
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
    console.log(req.path, req.method)

    //get the updated value 
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
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
         console.log(req.path, req.method)
     //remove and return the ID of the deleted data
         await goal.remove()
    res.status(200).json({id: req.params.id})
})



module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}