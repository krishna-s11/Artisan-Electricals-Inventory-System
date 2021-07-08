import React from 'react'
import './newOrder.css'
import {AiOutlineClose} from 'react-icons/ai'

const NewOrder = ({close}) => {
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
                            <input type="text" class="form__input order" id="add-input" placeholder="Address Line 1" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 2:</p>
                            <input type="text" class="form__input order" id="add-input" placeholder="Address Line 2" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Project Address Line 3:</p>
                            <input type="text" class="form__input order" id="add-input" placeholder="Address Line 3" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Required by:</p>
                            <input type="date" class="form__input order" id="add-input" placeholder="Category" required></input>
                        </div>
                    </div>
                    <div className='add-col-2'>
                        <div className='form-row'>
                            <p>Material Item:</p>
                            <input type="text" class="form__input order" id="add-input" placeholder="Select Item" required></input>
                        </div>
                        <div className='form-row'>
                            <p>Extra Note :</p>
                            <textarea type="text" class="form__input order textarea" id="add-input" placeholder="Write your note here" required></textarea>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                    <button className='btn btn-place-order'>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default NewOrder
