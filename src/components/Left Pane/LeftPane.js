import React, {useState} from 'react'
import './leftPane.css'
import {Link} from 'react-router-dom'
import inventory from '../../assets/inventory-ico.png';
import order from '../../assets/order-ico.png';
import reports from '../../assets/reports-ico.png';
import projects from '../../assets/project-ico.png';

const LeftPane = ({mobileNav}) => {

    const mobileSide = {
        width: '61px',
        transition: 'all 0.5s',
    }
    const desktopSide = {
        transition: 'all 0.5s',
    }

    const [filter,setFilter] = useState(0);

    return (
        <div className = 'left-pane' style={mobileNav?mobileSide:desktopSide}>
            {
                mobileNav?
                <div className='company-logo-lp'>
                    <h3>AE</h3>
                </div>
                :
                <div className='company-logo-lp'>
                    <h3>Artisan Electrical</h3>
                </div>
            }
            <ul className='side-nav' style={mobileNav?{transform: 'translateX(-5px)', width: '109%'}:null}>
                    <Link to='/dashboard/products'><li onClick={() => setFilter(0)} style={{backgroundColor: filter === 0 ? '#2e538a' : null}} >
                        <span>
                            <img src={inventory}></img>
                        </span>
                        {
                            !mobileNav?<p>Inventory Management</p>:null
                        }
                    </li></Link>
                    <Link to='/dashboard/orders'><li onClick={() => setFilter(1)} style={{backgroundColor: filter === 1 ? '#2e538a' : null}}>
                        <span>
                            <img src={order}></img>
                        </span>
                        {
                            !mobileNav?<p>Orders</p>:null
                        }
                    </li></Link>
                    <Link to='/dashboard/reports'><li onClick={() => setFilter(2)} style={{backgroundColor: filter === 2 ? '#2e538a' : null}}>
                        <span>
                            <img src={reports}></img>
                        </span>
                        {
                            !mobileNav?<p>Reports</p>:null
                        }
                    </li></Link>
                    <Link to='/dashboard/Projects'><li onClick={() => setFilter(3)} style={{backgroundColor: filter === 3 ? '#2e538a' : null}}>
                        <span>
                            <img src={projects}></img>
                        </span>
                        {
                            !mobileNav?<p>Projects</p>:null
                        }
                    </li></Link>
                    {/* <Link to='/dashboard/services'><li onClick={() => setFilter(4)} style={{backgroundColor: filter === 4 ? '#2e538a' : null}}>
                        <span>
                            <img src={inventory}></img>
                        </span>
                        {
                            !mobileNav?<p>Services</p>:null
                        }
                    </li>
                    </Link> */}
                </ul>
        </div>
    )
}

export default LeftPane
