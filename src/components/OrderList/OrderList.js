import React, { useState } from 'react'
import './orderList.css'
import {FaSearch} from 'react-icons/fa'
import NewOrder from '../NewOrder/NewOrder'

const OrderList = () => {
    const [display,setDisplay] = useState(false);

    return (
        <div className='order-list'>
            {
                display?<NewOrder close={() => setDisplay(false)} />:null
            }
            <div className='ol-top'>
                <h2>Order list</h2>
                <div className='vp-action-bar'>
                    <div class="search-box">
                        <button class="btn-search"><FaSearch/></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div>
                    <button className='btn btn-add_items' onClick={() => setDisplay(true)}>New +</button>
                </div>
            </div>
            <table class="fl-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Employee Name</th>
                        <th>Project Address</th>
                        <th>Required by</th>
                        <th>Material Item</th>
                        <th>Notes</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Harry Potter</td>
                        <td>10 Downing Street</td>
                        <td>10/07/2021</td>
                        <td>Hammer</td>
                        <td>Extra note here</td>
                        <td style={{color: '#529DA6', fontWeight: '600'}}>Processing</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sherlock Holmes</td>
                        <td>221 B Baker Street</td>
                        <td>12/07/2021</td>
                        <td>Measurement Items</td>
                        <td>Extra note here</td>
                        <td style={{color: '#529DA6', fontWeight: '600'}}>Accepted</td>
                    </tr>
                    </tbody>
                </table>
        </div>
    )
}

export default OrderList
