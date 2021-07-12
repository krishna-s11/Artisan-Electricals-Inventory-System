import React,{useEffect, useState} from 'react'
import './addProducts.css'
import {AiOutlineClose} from 'react-icons/ai'
import {RiImageAddFill} from 'react-icons/ri'
import firebase from '../../firebase';

const db = firebase.firestore();

const AddProducts = ({close,id}) => {

    const [details,setDetails] = useState({
        name: '',
        sku: '',
        quantity: '',
        category: '',
        subCategory: '',
        uom: '',
        ln: '',
        wd: '',
        serial: ''
    })

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!id){
            await db.collection('products').add(details);
        }
        else{
            await db.collection('products').doc(id).update(details)
        }
    }

    useEffect(() => {
        if(id){
            db.collection('products').doc(id).get()
            .then((doc) => {
                if(doc.exists){
                    setDetails(doc.data());
                }else{
                    console.log('no data found');
                }
            })
        }
    },[id])

    console.log(details);

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
                            <input type="text" class="form__input add-input" id="name" onChange={handleChange} placeholder="Product's Name" defaultValue={details.name} required></input>
                        </div>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>SKU:</p>
                            <input type="text" class="form__input add-input" id="sku" onChange={handleChange} placeholder="SKU" defaultValue={details.sku} required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{fontWeight: '600'}}>Category:</p>
                                <input type="text" class="form__input add-input" id="category" onChange={handleChange} placeholder="Category" defaultValue={details.category} required></input>
                            </div>
                            <div>
                                <p style={{fontWeight: '600'}}>Sub-category:</p>
                                <input type="text" class="form__input add-input" id="subCategory" onChange={handleChange} placeholder="Sub-category" defaultValue={details.subCategory} required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>Quantity:</p>
                            <input type="text" class="form__input add-input" id="quantity" onChange={handleChange} placeholder="Quantity" defaultValue={details.quantity} required></input>
                        </div>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>Units of measurement:</p>
                            <input type="text" class="form__input add-input" id="uom" onChange={handleChange} placeholder="Unit" defaultValue={details.uom} required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{fontWeight: '600'}}>Length:</p>
                                <input type="text" class="form__input add-input" id="ln" onChange={handleChange} placeholder="Length" defaultValue={details.ln} required></input>
                            </div>
                            <div>
                                <p style={{fontWeight: '600'}}>Width:</p>
                                <input type="text" class="form__input add-input" id="wd" onChange={handleChange} placeholder="Width" defaultValue={details.wd} required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{fontWeight: '600'}}>Serial Number:</p>
                            <input type="text" class="form__input add-input" id="serial" onChange={handleChange} placeholder="Serial Number" defaultValue={details.serial} required></input>
                        </div>
                        <div style={{width: '350px', display: 'flex', justifyContent: 'center'}}>
                            <button className='btn btn-add-product' onClick={() => {handleSubmit(); close()}}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProducts
