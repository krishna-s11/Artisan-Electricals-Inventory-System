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
        // await firebase.firestore().collection('stats').doc('orders').update({
        //     approved: firebase.firestore.FieldValue.increment(1),
        //     pending: firebase.firestore.FieldValue.decrement(1)
        // })
    }
    const declineBtn = async () => {
        firebase.firestore().collection('orders').doc(id).update({
            status: 'declined'
        })
        // await firebase.firestore().collection('stats').doc('orders').update({
        //     rejected: firebase.firestore.FieldValue.increment(1),
        //     pending: firebase.firestore.FieldValue.decrement(1)
        // })
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
                            <li style={{fontWeight: '600'}}>Products<span style={{fontWeight: '600'}}>Quantity</span></li>
                            <li>{order.material1} <span>{order.quantity1}</span></li>
                            <li>{order.material2} <span>{order.quantity2}</span></li>
                            <li>{order.material3} <span>{order.quantity3}</span></li>
                            <li>{order.material4} <span>{order.quantity4}</span></li>
                            <li>{order.material5} <span>{order.quantity5}</span></li>
                            <li>{order.material6} <span>{order.quantity6}</span></li>
                            <li>{order.material7} <span>{order.quantity7}</span></li>
                            <li>{order.material8} <span>{order.quantity8}</span></li>
                            <li>{order.material9} <span>{order.quantity9}</span></li>
                            <li>{order.material10} <span>{order.quantity10}</span></li>
                            <li>{order.material11} <span>{order.quantity11}</span></li>
                            <li>{order.material12} <span>{order.quantity12}</span></li>
                            <li>{order.material13} <span>{order.quantity13}</span></li>
                            <li>{order.material14} <span>{order.quantity14}</span></li>
                            {/* <li>{order.material15} <span>{order.quantity15}</span></li>
                            <li>{order.material16} <span>{order.quantity16}</span></li>
                            <li>{order.material17} <span>{order.quantity17}</span></li>
                            <li>{order.material18} <span>{order.quantity18}</span></li>
                            <li>{order.material19} <span>{order.quantity19}</span></li>
                            <li>{order.material20} <span>{order.quantity20}</span></li> */}
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
