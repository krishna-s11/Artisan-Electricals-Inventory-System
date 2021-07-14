import React, { useState, useEffect } from 'react'
import './orderList.css'
import {FaSearch} from 'react-icons/fa'
import NewOrder from '../NewOrder/NewOrder'
import firebase from '../../firebase'
import OrderInfo from '../OrderInfo/OrderInfo'

const db = firebase.firestore();

const OrderList = () => {
    const [display,setDisplay] = useState(false);
    const [orders,setOrders] = useState([]);
    const [id,setId] = useState('')
    const [details,setDetails] = useState(false)

    useEffect(() => {
        db.collection('orders')
        .get().then(querySnap => {
            setOrders(querySnap.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })
    },[])

    const deleteOrder = async (id) => {
        await firebase.firestore().collection('orders').doc(id).delete();
    }

    return (
        <div className='order-list'>
            {
                display?<NewOrder close={() => setDisplay(false)} id={id} />:null
            }
            {
                details?<OrderInfo close={() => setDetails(false)} id={id}/>:null
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
                        <th>Project Name</th>
                        <th>Project Address</th>
                        <th>Required by</th>
                        <th>Material Item</th>
                        <th>Quantity</th>
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
                                <tr key={i} style={data.outOfStock?{backgroundColor:'#F88379'}:null}>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{i+1}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{data.emp_name}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{data.name}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{data.add1} {data.add2}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{data.requiredBy}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{data.material}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{data.quantity}</td>
                                    <td onClick={() => {setId(order.id) ;setDetails(true)}}>{data.note}</td>
                                    <td style={data.status==='declined'?(data.outOfStock?{color:'#fff'}:{color: '#f71f20', fontWeight: '600'}):(data.outOfStock?{color:'#fff'}:{color: '#22a6b3', fontWeight: '600'})}>{data.status}</td>
                                    <td className='btn-del' style={data.outOfStock?{color:'#FFFF00'}:null} onClick={(id) => {deleteOrder(order.id)}} >Delete</td>
                                    <td className='btn-edit' style={data.outOfStock?{color: '#fff',fontWeight: '600'}:null} onClick={(id) => {setId(order.id); setDisplay(true)}}>Edit</td>
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
