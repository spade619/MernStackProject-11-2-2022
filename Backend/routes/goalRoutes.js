


//import and use express.js framework
const express = require('express')
const router = express.Router()
//import and use request from goalController.js
const {getGoals,
       setGoal,
       updateGoal,
       deleteGoal,} = require('../controllers/goalController')

       const {protect} = require('../middleware/authMiddleware')
//use request

//router.get('/', getGoals)
//router.post('/', setGoals)
//router.put('/:id', updateGoal)
//router.delete('/:id', deleteGoal)

//much cleaner style

//protect method added to protect the routes
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router