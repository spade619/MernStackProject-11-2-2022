import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'


function Dashboard() {

const navigate = useNavigate()
//initialize dispatch
const dispatch = useDispatch()
//state for user
const {user} = useSelector((state) => state.auth)
//state for goals
const {goals, isLoading, isError, message} = useSelector((state) => 
state.goals)


//check for the user
useEffect(() => {
  if(isError) {
    console.log(message)
  }


  if(!user){
    //redirect to login page
    navigate('/login')
  }
//this will fetch the goals from the backend
dispatch(getGoals())

//resets the state on unmount, when we leave the dashboard goals will be cleared
  return () => {
    dispatch (reset ())
  }
}, [user, navigate, isError, message, dispatch])

//bring in the spinner loading screen
if (isLoading) {
  return <Spinner />
}


  return (
    <>
    <section className="heading">
      <h1>Welcome <br/>{user && user.name}</h1>
      <p>this is the Dashboard</p>

    </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
        <div className='goals'>
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal}/>
          ))}
        </div>
        ) : (<h3>you havent set any goals</h3>)}
      </section>
    </>
  )
}

export default Dashboard