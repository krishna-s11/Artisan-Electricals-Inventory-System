import React from 'react'
import './profile.css'
import BasicInfo from '../BasicInfo/BasicInfo'
import IdentityCard from '../IdentityCard/IdentityCard'
const Profile = () => {
    return (
        <div className='profile-pg'>
             <div className='vp-top'>
                <h2>My Profile</h2>
            </div>
            <div className='profile-container'>
                <BasicInfo />
                <IdentityCard/>
            </div>
        </div>
    )
}

export default Profile
