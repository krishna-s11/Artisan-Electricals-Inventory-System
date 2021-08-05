import React from 'react'
import './simpleLoading.css'
import loader from '../../assets/roller.gif'
const SimpleLoading = () => {
    return (
        <div className='simple-loading'>
            <img src={loader} alt=''></img>
        </div>
    )
}
export default SimpleLoading
