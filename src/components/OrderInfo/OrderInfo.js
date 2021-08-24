import React,{useContext, useEffect, useState} from 'react'
import './orderInfo.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'
import { AuthContext } from '../../Auth'
import { toast } from 'react-toastify'

const OrderInfo = ({close,id}) => {

    const [order,setOrder] = useState([]);

    console.log(id);
    useEffect(() => {
        firebase.firestore().collection('orders').doc(id).get()
        .then(doc => {
            if(doc.exists){
                setOrder(doc.data());
            }
        })
    },[id])

    const acceptBtn = async () => {
        await firebase.firestore().collection('orders').doc(id).update({
            status: 'accepted'
        });
        await firebase.firestore().collection('stats').doc('orders').update({
            approved: firebase.firestore.FieldValue.increment(1),
            pending: firebase.firestore.FieldValue.increment(-1)
        })
        toast.success('Order accepted !');
        close();
    }
    const declineBtn = async () => {
        await firebase.firestore().collection('orders').doc(id).update({
            status: 'declined'
        })
        await firebase.firestore().collection('stats').doc('orders').update({
            rejected: firebase.firestore().FieldValue.increment(1),
            pending: firebase.firestore().FieldValue.decrement(1)
        })
        toast.error('Order rejected !');
        close();
    }

    return (
        <div className='product-info-pg'>
            <div className='product-info'>
                <div className='pd-title-box'>
                    <AiOutlineClose className='btn-cross' onClick={close}/>
                    <h3>{order.name}</h3>
                </div>
                <div className='pd-info-box' style={{marginTop: '50px'}}>
                    <p>Employee Name: <span>{order.emp_name}</span></p>
                    <p>Project Name: <span>{order.name}</span></p>
                    <p>Project Address: <span>{order.add1} {order.add2} {order.add3} </span></p>
                    <p>Required By: <span>{order.requiredBy} </span></p>
                    <p>Extra note: <span>{order.note} </span></p>
                    <p>Material:
                        <ul>
                            {/* <li style={{fontWeight: '600'}}>Products<span style={{fontWeight: '600'}}>Quantity</span></li> */}
                            <li>{order.material1} <span style={{fontWeight:'600', color:'red'}}>Quant: {order.quantity1}</span></li>
                            {
                                order.material2?<li>{order.material2} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity2}</span></li>:null
                            }
                            {
                                order.material3?<li>{order.material3} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity3}</span></li>:null
                            }
                            {
                                order.material4?<li>{order.material4} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity4}</span></li>:null
                            }
                            {
                                order.material5?<li>{order.material5} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity5}</span></li>:null
                            }
                            {
                                order.material6?<li>{order.material6} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity6}</span></li>:null
                            }
                            {
                                order.material7?<li>{order.material7} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity7}</span></li>:null
                            }
                            {
                                order.material8?<li>{order.material8} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity8}</span></li>:null
                            }
                            {
                                order.material9?<li>{order.material9} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity9}</span></li>:null
                            }
                            {
                                order.material10?<li>{order.material10} <span style={{fontWeight:'600', color:'red'}}>Qty: {order.quantity10}</span></li>:null
                            }
                            {
                                order.material11?<li>{order.material11} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity11}</span></li>:null
                            }
                            {
                                order.material12?<li>{order.material12} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity12}</span></li>:null
                            }
                            {
                                order.material13?<li>{order.material13} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity13}</span></li>:null
                            }
                            {
                                order.material14?<li>{order.material14} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity14}</span></li>:null
                            }
                            {
                                order.material15?<li>{order.material15} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity15}</span></li>:null
                            }
                            {
                                order.material16?<li>{order.material16} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity16}</span></li>:null
                            }
                            {
                                order.material17?<li>{order.material17} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity17}</span></li>:null
                            }
                            {
                                order.material18?<li>{order.material18} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity18}</span></li>:null
                            }
                            {
                                order.material19?<li>{order.material19} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity19}</span></li>:null
                            }
                            {
                                order.material20?<li>{order.material20} <span style={{fontWeight:'600', color: 'red'}}>Qty: {order.quantity20}</span></li>:null
                            }
                        </ul>
                    </p>
                    {/* <p>Meterial SKU: <span>{order.sku1} </span></p>
                    <p>Meterial ID: <span>{order.productId1} </span></p> */}
                </div>
                {/* { */}
                    {/* currentUser && currentUser.orders?( */}
                        <div className='pd-info-action-container'>
                            <button className='btn btn-accept' onClick={acceptBtn}>Accept</button>
                            <button className='btn btn-decline' onClick={declineBtn}>Decline</button>
                        </div>
                    {/* )
                    :null    */}
                {/* } */}
            </div>
        </div>
    )
}

export default OrderInfo
