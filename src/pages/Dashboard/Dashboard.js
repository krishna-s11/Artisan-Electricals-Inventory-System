import React,{useState} from 'react'
import './dashboard.css'
import LeftPane from '../../components/Left Pane/LeftPane'
import RightPane from '../../components/Right Pane/RightPane'

const Dashboard = () => {
    const [mobileNav,setMobileNav] = useState(false)

    return (
        <div className='dashboard'>
            <LeftPane mobileNav={mobileNav} />
            <RightPane setView ={() => {setMobileNav(!mobileNav)}}/>
        </div>
    )
}

export default Dashboard
