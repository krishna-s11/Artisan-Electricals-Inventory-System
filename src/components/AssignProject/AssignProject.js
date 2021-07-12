import React, { useState } from 'react'
import './assignProject.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase'

const db = firebase.firestore();

const AssignProject = ({ close }) => {

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
        await db.collection('projects').add(data);
    }

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
                            <input type="text" class="form__input order add-input" id="name" onChange={handleChange} placeholder="Project Name" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 1:</p>
                            <input type="text" class="form__input order add-input" id="add1" onChange={handleChange} placeholder="Address Line" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 2:</p>
                            <input type="text" class="form__input order add-input" id="add2" onChange={handleChange} placeholder="Address Line" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Schedule visit:</p>
                            <input type="date" class="form__input order add-input" id="visit" onChange={handleChange} required></input>
                        </div>
                    </div>
                    <div className='add-col-2'>
                        <div className='form-row'>
                            <p>Assign to:</p>
                            <input type="text" class="form__input order add-input" id="assigned" onChange={handleChange} placeholder="Select employee" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Description :</p>
                            <textarea type="text" class="form__input order add-input textarea" id="description" onChange={handleChange} placeholder="Write your note here" required></textarea>
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
