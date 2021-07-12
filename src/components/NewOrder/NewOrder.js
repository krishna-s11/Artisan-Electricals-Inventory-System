import React,{useEffect, useState} from 'react'
import './newOrder.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'

const db = firebase.firestore();

const NewOrder = ({close, id}) => {

    const [order,setOrder] = useState({
        add1: '',
        add2: '',
        add3: '',
        requiredBy: '',
        material: '',
        note: '',
        status: 'processing'
    });

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!id){
            await db.collection('orders').add(order);
        }else{
            await db.collection('orders').doc(id).update(order);
        }

    }

    useEffect(() => {
        if(id){
            db.collection('orders').doc(id).get()
            .then((doc) => {
                if(doc.exists){
                    setOrder(doc.data());
                }else{
                    console.log('no data found');
                }
            })
        }
    },[id])

    return (
        <div className='new-order'>
            <div className='new-order-card'>
                <div className='add-card-top'>
                    <h2>New Order</h2>
                    <AiOutlineClose id='btn-close' onClick={() => {close()}} />
                </div>
                <div className='add-card-content' id='order-content'>
                    <div className='add-col-1'>
                        <div className='form-row'>
                            <p>Project Address Line 1:</p>
                            <input type="text" class="form__input order add-input" id="add1" onChange={handleChange} placeholder="Address Line 1" defaultValue={order.add1} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 2:</p>
                            <input type="text" class="form__input order add-input" id="add2" onChange={handleChange} placeholder="Address Line 2" defaultValue={order.add2} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 3:</p>
                            <input type="text" class="form__input order add-input" id="add3" onChange={handleChange} placeholder="Address Line 3" defaultValue={order.add3} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Required by:</p>
                            <input type="date" class="form__input order add-input" id="requiredBy" onChange={handleChange} defaultValue={order.requiredBy} required></input>
                        </div>
                    </div>
                    <div className='add-col-2'>
                        <div className='form-row'>
                            <p>Material Item:</p>
                            <input type="text" class="form__input order add-input" id="material" onChange={handleChange} placeholder="Select Item" defaultValue={order.material} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Extra Note :</p>
                            <textarea type="text" class="form__input order textarea add-input" id="note" onChange={handleChange} placeholder="Write your note here" defaultValue={order.note} required></textarea>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                    <button className='btn btn-place-order' onClick={handleSubmit} >Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default NewOrder
