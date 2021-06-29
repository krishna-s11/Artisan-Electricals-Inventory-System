import React, {useState} from 'react'
import './leftPane.css'
import inventory from '../../assets/inventory-ico.png';
import order from '../../assets/order-ico.png';
import reports from '../../assets/reports-ico.png';

const LeftPane = ({mobileNav}) => {

    const mobileSide = {
        width: '61px',
        transition: 'all 0.5s',
    }
    const desktopSide = {
        transition: 'all 0.5s',
    }

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
                    <li>
                        <span>
                            <img src={inventory}></img>
                        </span>
                        {
                            !mobileNav?<p>Inventory Management</p>:null
                        }
                    </li>
                    <li>
                        <span>
                            <img src={order}></img>
                        </span>
                        {
                            !mobileNav?<p>Order Form</p>:null
                        }
                    </li>
                    <li>
                        <span>
                            <img src={reports}></img>
                        </span>
                        {
                            !mobileNav?<p>Reports</p>:null
                        }
                    </li>
                    <li>
                        <span>
                            <img src={inventory}></img>
                        </span>
                        {
                            !mobileNav?<p>Settings</p>:null
                        }
                    </li>
                    <li>
                        <span>
                            <img src={inventory}></img>
                        </span>
                        {
                            !mobileNav?<p>Services</p>:null
                        }
                    </li>
                </ul>
        </div>
    )
}

export default LeftPane
