import React,{useContext, useEffect, useState} from 'react'
import './orderInfo.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'
import { AuthContext } from '../../Auth'

const OrderInfo = ({close,id}) => {

    const [order,setOrder] = useState([]);
    const {currentUser} = useContext(AuthContext);

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
            pending: firebase.firestore.FieldValue.decrement(1)
        })
    }
    const declineBtn = async () => {
        firebase.firestore().collection('orders').doc(id).update({
            status: 'declined'
        })
        await firebase.firestore().collection('stats').doc('orders').update({
            rejected: firebase.firestore.FieldValue.increment(1),
            pending: firebase.firestore.FieldValue.decrement(1)
        })
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
                    <p>Quantity: <span>{order.quantity} </span></p>
                    <p>Extra note: <span>{order.note} </span></p>
                    <p>Material: <span>{order.material} </span></p>
                    <p>Meterial SKU: <span>{order.sku} </span></p>
                    <p>Meterial ID: <span>{order.productId} </span></p>
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
