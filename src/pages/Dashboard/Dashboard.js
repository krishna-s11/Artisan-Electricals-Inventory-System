import React,{useContext, useEffect, useState} from 'react'
import './dashboard.css'
import LeftPane from '../../components/Left Pane/LeftPane'
import RightPane from '../../components/Right Pane/RightPane'
import { AuthContext } from '../../Auth'
import {Redirect, useHistory} from 'react-router-dom'

const Dashboard = () => {
    const [mobileNav,setMobileNav] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        if(currentUser){
            console.log('user found');
        }
        else{
            history.push('/');
        }
    },[])

    if(currentUser){
    return (
        <div className='dashboard'>
            <LeftPane mobileNav={mobileNav} />
            <RightPane setView={() => setMobileNav(!mobileNav)} />
        </div>
    )
    }
    else{
        return (
               <Redirect to='/' />
        )
    }
}

export default Dashboard
