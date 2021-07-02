import React from 'react'
import './reports.css'
import orderImg from '../../assets/order-ico.png'
import approvedImg from '../../assets/order-approved.png'
import pendingImg from '../../assets/order-pending.png'
import rejectedImg from '../../assets/order-rejected.png'

const Reports = () => {
    return (
        <div className='reports-pg'>
            <div className='vp-top'>
                <h2>Order Statistics</h2>
            </div>
            <div className='stat-top-sec'>
                <div className='top-stats' id='order-req-stat'>
                    <div className='req-stat-top'>
                        <img src={orderImg}></img>
                        <h1>129</h1>
                    </div>
                    <p>Total Order Request</p>
                </div>
                <div className='top-stats' id='approved-stat'>
                <div className='req-stat-top'>
                        <img src={approvedImg}></img>
                        <h1>75</h1>
                    </div>
                    <p>Total Approved Orders</p>
                </div>
                <div className='top-stats' id='pending-stat'>
                <div className='req-stat-top'>
                        <img src={pendingImg}></img>
                        <h1>27</h1>
                    </div>
                    <p>Total Pending Orders</p>
                </div>
                <div className='top-stats' id='rejected-stat'>
                    <div className='req-stat-top'>
                        <img src={rejectedImg}></img>
                        <h1>12</h1>
                    </div>
                    <p>Total Rejected Order</p>
                </div>
            </div>
        </div>
    )
}

export default Reports
