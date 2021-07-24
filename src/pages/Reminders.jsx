import React from 'react'
import './PageLayout.css';

function Reminders(props) {
    const {isLoggedIn, reminders} = props
    console.log('reminders props', reminders)
    return (
        <div className='body-container'>
            My Reminders
            <p> Login status: {isLoggedIn.toString()}</p>
            {
                reminders.map((reminder, i) => {
                    return (
                        <div key={i}>
                            {reminder.nextWatering}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Reminders;