import React from 'react'
import './assignProject.css'
import {AiOutlineClose} from 'react-icons/ai'

const AssignProject = ({ close }) => {
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
                            <input type="text" class="form__input order" id="add-input" placeholder="Project Name" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 1:</p>
                            <input type="text" class="form__input order" id="add-input" placeholder="Address Line" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 2:</p>
                            <input type="text" class="form__input order" id="add-input" placeholder="Address Line" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Schedule visit:</p>
                            <input type="date" class="form__input order" id="add-input" required></input>
                        </div>
                    </div>
                    <div className='add-col-2'>
                        <div className='form-row'>
                            <p>Assign to:</p>
                            <input type="text" class="form__input order" id="add-input" placeholder="Select employee" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Description :</p>
                            <textarea type="text" class="form__input order textarea" id="add-input" placeholder="Write your note here" required></textarea>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                    <button className='btn btn-place-order'>Assign Project</button>
                </div>
            </div>
        </div>
    )
}

export default AssignProject
