import React from 'react'
import './addProducts.css'
import {AiOutlineClose} from 'react-icons/ai'
import {RiImageAddFill} from 'react-icons/ri'

const AddProducts = ({close}) => {
    return (
        <div className='add-products'>
            <div className='add-products-card'>
                <div className='add-card-top'>
                    <h2>Add Product</h2>
                    <AiOutlineClose id='btn-close' onClick={() => {close()}} />
                </div>
                <div className='add-card-content'>
                    <div className='add-photo'>
                        <div className='choose-photo'>
                            <RiImageAddFill id='photo-img'/>
                            <p>+ Choose Product's Photo</p>
                        </div>
                        <div style={{
                            marginLeft: '20px',
                            marginTop: '20px'
                        }}>
                            <p style={{fontWeight: '600'}}>Upload Photo</p>
                            <p style={{fontSize: '14px', color: '#777'}}>You can choose upto 10 images.</p>
                        </div>
                    </div>
                    <div className='add-content'>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>Name:</p>
                            <input type="text" class="form__input" id="add-input" placeholder="Product's Name" required></input>
                        </div>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>SKU:</p>
                            <input type="text" class="form__input" id="add-input" placeholder="SKU" required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{fontWeight: '600'}}>Category:</p>
                                <input type="text" class="form__input" id="add-input" placeholder="Category" required></input>
                            </div>
                            <div>
                                <p style={{fontWeight: '600'}}>Sub-category:</p>
                                <input type="text" class="form__input" id="add-input" placeholder="Sub-category" required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>Units of management:</p>
                            <input type="text" class="form__input" id="add-input" placeholder="Unit" required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{fontWeight: '600'}}>Length:</p>
                                <input type="text" class="form__input" id="add-input" placeholder="Length" required></input>
                            </div>
                            <div>
                                <p style={{fontWeight: '600'}}>Width:</p>
                                <input type="text" class="form__input" id="add-input" placeholder="Width" required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>Serial Number:</p>
                            <input type="text" class="form__input" id="add-input" placeholder="Serial Number" required></input>
                        </div>
                        <div style={{width: '350px', display: 'flex', justifyContent: 'center'}}>
                            <button className='btn btn-add-product'>Add product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProducts
