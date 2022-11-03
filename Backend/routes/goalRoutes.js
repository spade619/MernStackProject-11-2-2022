


//import and use express.js framework
const express = require('express')
const router = express.Router()
//import and use request from goalController.js
const {getGoals,
       setGoals,
       updateGoal,
       deleteGoal} = require('../controllers/goalController')

       const {protect} = require('../middleware/authMiddleware')
//use request

//router.get('/', getGoals)
//router.post('/', setGoals)
//router.put('/:id', updateGoal)
//router.delete('/:id', deleteGoal)

//much cleaner style

//protect method added to protect the routes
router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router