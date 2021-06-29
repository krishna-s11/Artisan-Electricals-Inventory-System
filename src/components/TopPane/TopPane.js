import React from 'react'
import './topPane.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoNotificationsSharp} from 'react-icons/io5'
import {MdNotificationsNone} from 'react-icons/md'
import {IoMdArrowDropdown} from 'react-icons/io'
import userDp from '../../assets/user-dp.jpg'
const TopPane = ({setView}) => {
    return (
        <div className='top-pane'>
            <div className='ham-container' onClick={() => setView()}>
                    <GiHamburgerMenu/>
            </div>
            <div className='top-right-sec'>
                <div className='notification-container'>
                    <MdNotificationsNone/>
                </div>
                <div className='top-user'>
                    <div className='user-dp'>
                        <img src={userDp}></img>
                    </div>
                    <div className='user-info'>
                        <p>Krishna S.</p>
                        <p>Admin</p>
                    </div>
                    <IoMdArrowDropdown style={{fontSize:'20px'}}/>
                </div>
            </div>
        </div>
    )
}

export default TopPane
