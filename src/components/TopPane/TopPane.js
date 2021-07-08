import React, { useState } from 'react'
import './topPane.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdNotificationsNone} from 'react-icons/md'
import {IoMdArrowDropdown} from 'react-icons/io'
import { Link } from 'react-router-dom'
import userDp from '../../assets/user-dp.jpg'
import userDrop from '../../assets/user-drop.png'
import orderDrop from '../../assets/myorders-drop.png'
import projectDrop from '../../assets/myprojects-drop.png'
import signout from '../../assets/sign-out.png'

const TopPane = ({setView}) => {

    const [display,setDisplay] = useState(false);

    return (
        <div className='top-pane'>
            <div className='ham-container' onClick={() => setView()}>
                    <GiHamburgerMenu/>
            </div>
            <div className='top-right-sec'>
                <div className='notification-container'>
                    <MdNotificationsNone/>
                </div>
                <div className='top-user' onClick={() => setDisplay(!display)} style={display?{borderBottom: '2px solid salmon'}:null}>
                    <div className='user-dp'>
                        <img alt='' src={userDp}></img>
                    </div>
                    <div className='user-info'>
                        <p>Krishna S.</p>
                        <p>Admin</p>
                    </div>
                    <IoMdArrowDropdown style={{fontSize:'20px'}}/>
                    <div className='drop-down' style={display?{display:'block'}:null}>
                        <ul>
                            <Link to='/dashboard/profile'><li><img alt='' src={userDrop}></img>Profile</li></Link>
                            <li><img alt='' src={orderDrop}></img>My orders</li>
                            <li><img alt='' src={projectDrop}></img>My projects</li>
                            <li><img alt='' src={signout}></img>Sign out</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopPane
