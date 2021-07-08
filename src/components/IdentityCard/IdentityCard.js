import React from 'react'
import './identityCard.css'
import dp from '../../assets/user-dp.jpg'
const IdentityCard = () => {
    return (
        <div className='id-card'>
            <div id='id-heading'>
                <p>Identity Card</p>
            </div>
            <div className='id-dp-holder'>
                <img alt='' src={dp}></img>
            </div>
            <div className='id-details'>
                <h4>Sherlock Holmes</h4>
                <p>123456789</p>
                <p>+91 8789733434</p>
            </div>

        </div>
    )
}

export default IdentityCard
