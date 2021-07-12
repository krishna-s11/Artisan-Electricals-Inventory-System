import React, { useState, useEffect } from 'react'
import './orderList.css'
import {FaSearch} from 'react-icons/fa'
import NewOrder from '../NewOrder/NewOrder'
import firebase from '../../firebase'

const db = firebase.firestore();

const OrderList = () => {
    const [display,setDisplay] = useState(false);
    const [orders,setOrders] = useState([]);
    const [id,setId] = useState('')

    useEffect(() => {
        db.collection('orders')
        .onSnapshot(querySnap => {
            setOrders(querySnap.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })
    },[])

    const deleteOrder = async (id) => {
        await firebase.firestore().collection('orders').doc(id).delete()
    }

    return (
        <div className='order-list'>
            {
                display?<NewOrder close={() => setDisplay(false)} id={id} />:null
            }
            <div className='ol-top'>
                <h2>Order list</h2>
                <div className='vp-action-bar'>
                    <div class="search-box">
                        <button class="btn-search"><FaSearch/></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div>
                    <button className='btn btn-add_items' onClick={() => {setId('');setDisplay(true)}}>New +</button>
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
                        <th colspan='2'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders && orders.map((order,i) => {
                            const data = order.data;
                            return(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>Trial Name 1</td>
                                    <td>{data.add1} {data.add2} {data.add3}</td>
                                    <td>{data.requiredBy}</td>
                                    <td>{data.material}</td>
                                    <td>{data.note}</td>
                                    <td style={{color: '#529DA6', fontWeight: '600'}}>{data.status}</td>
                                    <td className='btn-del' onClick={(id) => {deleteOrder(order.id)}} >Delete</td>
                                    <td className='btn-edit' onClick={(id) => {setId(order.id); setDisplay(true)}}>Edit</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
        </div>
    )
}

export default OrderList
