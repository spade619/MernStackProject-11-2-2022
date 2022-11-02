


//import and use express.js framework
const express = require('express')
const router = express.Router()
//import and use request from goalController.js
const {getGoals,
       setGoals,
       updateGoal,
       deleteGoal} = require('../controllers/goalController')
//use request

//router.get('/', getGoals)
//router.post('/', setGoals)
//router.put('/:id', updateGoal)
//router.delete('/:id', deleteGoal)

//much cleaner style

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoal).put(updateGoal)


module.exports = router