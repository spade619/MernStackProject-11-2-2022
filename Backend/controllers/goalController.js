
//use express async handler
const asyncHandler = require('express-async-handler')

//description = to get Goals
//route = GET /api/goals
//access = private

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals test'})
})

//description = to post Goals
//route = POST /api/goals
//access = private

const setGoals = asyncHandler(async (req, res) => {
    //check for errors
    if (!req.body.text) {
        //  res.status(400).json({message: 'please add a text field'})
        //middleware method error handling
        res.status(400)
        throw new Error('please add a text field')
    }
    res.status(200).json({ message: 'post goals test'})
})
//description = to set Goals
//route = PUT /api/goals/:id
//access = private

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update goals ${req.params.id}`})
})

//description = to Delete Goals
//route = DELETE /api/goals
//access = private

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goals ${req.params.id}`})
})



module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}