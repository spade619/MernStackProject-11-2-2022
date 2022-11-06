import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'

//dashboard form
function GoalForm() {
    const [text, setText] = useState('')
    //fires when submit button is clicked
    const dispatch=useDispatch()
    const onSubmit = e =>{
        e.preventDefault()
        dispatch(createGoal({text}))
        //clears the form when clicked
        setText('')
    }
  return (
    <section className='form'>

      <form onSubmit = {onSubmit}>

        <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input type="text" name="text" id="text" value={text}
             onChange = {(e) => setText(e.target.value)}  />
        </div>

        <div className="form-group">
            <button className="btn btn-block" type='submit'>
                Add Goal
            </button>
        </div>

      </form>

    </section>
 
  )
}

export default GoalForm