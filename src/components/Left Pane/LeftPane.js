import React, {useContext, useState} from 'react'
import './leftPane.css'
import {Link} from 'react-router-dom'
import inventory from '../../assets/inventory-ico.png';
import order from '../../assets/order-ico.png';
import reports from '../../assets/reports-ico.png';
import manageUsers from '../../assets/manage-users.png';
import { AuthContext } from '../../Auth';

const LeftPane = ({mobileNav,setMobile,mob}) => {

    const mobileSide = {
        width: '61px',
        transition: 'all 0.5s',
    }
    
    const mobi = {
        width: '0',
        transition: 'all 0.5s',
    }

    const desktopSide = {
        transition: 'all 0.5s',
    }

    
    const [filter,setFilter] = useState(1);
    const {currentUser} = useContext(AuthContext);

    return (
        <div className = 'left-pane' style={!mob?(mobileNav?mobileSide:desktopSide):(mobileNav?mobi:mobileSide)}>
            {   !mob?(
                mobileNav?
                <div className='company-logo-lp'>
                    <h3>AE</h3>
                </div>
                :
                <div className='company-logo-lp'>
                    <h3>Artisan Electrical</h3>
                </div>
                ):
                (
                !mobileNav?
                <div className='company-logo-lp'>
                    <h3>AE</h3>
                </div>
                :
                <div className='company-logo-lp'>
                    <h3>Artisan Electrical</h3>
                </div>
                )   
            }
            <ul className='side-nav' style={!mob?(mobileNav?{transform: 'translateX(-5px)', width: '109%'}:null):(!mobileNav?{transform: 'translateX(-5px)', width: '109%'}:null)}>
                    <Link to='/dashboard/products'><li onClick={() => {setFilter(0); setMobile()}} style={{backgroundColor: filter === 0 ? '#2e538a' : null}} >
                        <span>
                            <img alt='' src={inventory}></img>
                        </span>
                        {
                            !mob?(!mobileNav?<p>Inventory Management</p>:null):null
                        }
                    </li></Link>
                    <Link to='/dashboard/orders'><li onClick={() => {setFilter(1); setMobile()}} style={{backgroundColor: filter === 1 ? '#2e538a' : null}}>
                        <span>
                            <img alt='' src={order}></img>
                        </span>
                        {
                            !mob?(!mobileNav?<p>Orders</p>:null):null
                        }
                    </li></Link>
                    <Link to='/dashboard/reports'><li onClick={() => {setFilter(2); setMobile()}} style={{backgroundColor: filter === 2 ? '#2e538a' : null}}>
                        <span>
                            <img alt='' src={reports}></img>
                        </span>
                        {
                            !mob?(!mobileNav?<p>Reports</p>:null):null
                        }
                    </li></Link>
                    {/* <Link to='/dashboard/manage-projects'><li onClick={() => {setFilter(3); setMobile()}} style={{backgroundColor: filter === 3 ? '#2e538a' : null}}>
                        <span>
                            <img alt='' src={projects}></img>
                        </span>
                        {
                            !mobileNav?<p>Projects</p>:null
                        }
                    </li></Link> */}
                    {
                        currentUser && currentUser.user.users?(
                            <Link to='/dashboard/manage-users'><li onClick={() => {setFilter(4); setMobile()}} style={{backgroundColor: filter === 4 ? '#2e538a' : null}}>
                                <span>
                                    <img alt='' src={manageUsers}></img>
                                </span>
                                {
                                    !mob?(!mobileNav?<p>Manage Users</p>:null):null
                                }
                            </li></Link>
                        ):
                        null
                    }
                </ul>
        </div>
    )
}

export default LeftPane
