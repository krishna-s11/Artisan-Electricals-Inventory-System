import React, { useEffect, useState } from 'react'
import './assignProject.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'

const db = firebase.firestore();

const AssignProject = ({ close, id}) => {

    const [data,setData] = useState({
        name: '',
        add1: '',
        add2: '',
        visit: '',
        assigned: '',
        description: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        if(!id){
            await db.collection('projects').add(data);
        }
        else{
            await db.collection('projects').doc(id).update(data);
        }
        await firebase.firestore().collection('notification').add({
            emp_id: '12345',
            emp_name: 'Krishna Saxena',
            emp_photoUrl: '',
            mssg: 'assigned an project to Shelock',
            time: Date.now()
        })
    }

    useEffect(() => {
        if(id){
            db.collection('projects').doc(id).get()
            .then((doc) => {
                if(doc.exists){
                    setData(doc.data());
                }else{
                    console.log('no data found');
                }
            })
        }
    })

    return (
        <div className='assign-project'>    
            <div className='ass-pj-card'>
                <div className='add-card-top'>
                        <h2>New Order</h2>
                        <AiOutlineClose id='btn-close' onClick={close}/>
                </div>
                <div className='add-card-content' id='order-content'>
                    <div className='add-col-1'>
                        <div className='form-row'>
                            <p>Project Name:</p>
                            <input type="text" class="form__input order add-input" id="name" onChange={handleChange} placeholder="Project Name" defaultValue={data.name} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 1:</p>
                            <input type="text" class="form__input order add-input" id="add1" onChange={handleChange} placeholder="Address Line" defaultValue={data.add1} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 2:</p>
                            <input type="text" class="form__input order add-input" id="add2" onChange={handleChange} placeholder="Address Line" defaultValue={data.add2} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Schedule visit:</p>
                            <input type="date" class="form__input order add-input" id="visit" onChange={handleChange} defaultValue={data.visit} required></input>
                        </div>
                    </div>
                    <div className='add-col-2'>
                        <div className='form-row'>
                            <p>Assign to:</p>
                            <input type="text" class="form__input order add-input" id="assigned" onChange={handleChange} placeholder="Select employee" defaultValue={data.assigned} required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Description :</p>
                            <textarea type="text" class="form__input order add-input textarea" id="description" onChange={handleChange} placeholder="Write your note here" defaultValue={data.description} required></textarea>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                    <button className='btn btn-place-order' onClick={handleSubmit}>Assign Project</button>
                </div>
            </div>
        </div>
    )
}

export default AssignProject
