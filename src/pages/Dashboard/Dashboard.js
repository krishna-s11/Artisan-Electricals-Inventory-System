import React,{useContext, useEffect, useState} from 'react'
import './dashboard.css'
import LeftPane from '../../components/Left Pane/LeftPane'
import RightPane from '../../components/Right Pane/RightPane'
import { AuthContext } from '../../Auth'
import {Redirect, useHistory} from 'react-router-dom'

const Dashboard = () => {
    const [mobileNav,setMobileNav] = useState(true);
    const {currentUser} = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        if(currentUser){
            console.log('user found');
        }
        else{
            history.push('/');
        }
        if(window.innerWidth < 600){
            console.log(window.innerWidth);
        }
    },[])

    if(currentUser){
    return (
        <div className='dashboard'>
            {
                window.innerWidth > 600?<LeftPane mobileNav={mobileNav} setMobile={() => setMobileNav(true)} />:
                <LeftPane mobileNav={mobileNav} mob={true} setMobile={() => setMobileNav(true)} />
            }
            <RightPane setView={() => setMobileNav(!mobileNav)} mob={true}/>
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
