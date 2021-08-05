import React, { useContext, useEffect, useState } from 'react'
import './addProducts.css'
import { AiOutlineClose } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../Auth';

const db = firebase.firestore();

const AddProducts = ({ close, id }) => {

    const [details, setDetails] = useState({
        name: '',
        sku: '',
        quantity: '',
        category: '',
        subCategory: '',
        uom: '',
        ln: '',
        wd: '',
        serial: '',
        images: []
    })
    const [images, setImages] = useState([]);
    const [loading,setLoading] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const defaultBtn = () => {
        const defaultBtn = document.querySelector('#choose-input');
        defaultBtn.click();
    };

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.id]: e.target.value
        });
    }

    const handleUpload = (e) => {
        for (var i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            setImages((prevState) => [...prevState, newImage]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.name === '' || details.sku === '' || details.category === '' || details.subCategory === '' || details.quantity === '' || details.uom === '' || details.ln === '' || details.wd === '') {
            return toast.error('Fill all the required fields');
        }
        setLoading(true);
        if (!id) {
            let imgLink = [];
            imgLink =  await Promise.all(
                images.map(async (image, i) => {
                    const storageRef = firebase.storage().ref(`inventory/${details.name}/${i}`);
                    await storageRef.put(image)
                    const downloadLink = storageRef.getDownloadURL();
                    return downloadLink;
                })   
            )
            
            await db.collection('products').add({details,imgLink});

            await db.collection('notification').add({
                emp_id: currentUser.id,
                emp_name: currentUser.user.name,
                emp_photoUrl: '',
                mssg: 'added a new inventory',
                time: Date.now()
            })
            setLoading(false);
            toast.success('Product successfully added. ')
            close();
        }

        // 7457000518
        else {
            await db.collection('products').doc(id).update(details)
            await db.collection('notification').add({
                emp_id: '12345',
                emp_name: 'Krishna Saxena',
                emp_photoUrl: '',
                mssg: 'updated an inventory',
                time: Date.now()
            })
            toast.success('Product successfully updated');
            close();
        }
    }

    useEffect(() => {
        if (id) {
            db.collection('products').doc(id).get()
                .then((doc) => {
                    if (doc.exists) {
                        setDetails(doc.data());
                    } else {
                        console.log('no data found');
                    }
                })
        }
    }, [id])
    console.log(details);

    return (
        <div className='add-products'>
            {
                loading?(
                    <Loading />
                )
                :null
            }
            <div className='add-products-card'>
                <div className='add-card-top'>
                    <h2>Add Product</h2>
                    <AiOutlineClose id='btn-close' onClick={() => { close() }} />
                </div>
                <div className='add-card-content'>
                    <div className='add-photo'>
                        <div className='choose-photo' onClick={defaultBtn}>
                            <RiImageAddFill id='photo-img' />
                            <p>+ Choose Product's Photo</p>
                        </div>
                        <input id="choose-input" onChange={handleUpload} type="file" multiple hidden></input>
                        <div style={{
                            marginLeft: '20px',
                            marginTop: '20px'
                        }}>
                            <p style={{ fontWeight: '600' }}>Upload Photo</p>
                            <p style={{ fontSize: '14px', color: '#777' }}>You can choose upto 10 images.</p>
                        </div>
                    </div>
                    <div className='add-content'>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Name:</p>
                            <input type="text" class="form__input add-input" id="name" onChange={handleChange} placeholder="Product's Name" defaultValue={details.details?details.details.name:null} required></input>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>SKU:</p>
                            <input type="text" class="form__input add-input" id="sku" onChange={handleChange} placeholder="SKU" defaultValue={details.details?details.details.sku:null} required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{ fontWeight: '600' }}>Category:</p>
                                <input type="text" class="form__input add-input" id="category" onChange={handleChange} placeholder="Category" defaultValue={details.details?details.details.category:null} required></input>
                            </div>
                            <div>
                                <p style={{ fontWeight: '600' }}>Sub-category:</p>
                                <input type="text" class="form__input add-input" id="subCategory" onChange={handleChange} placeholder="Sub-category" defaultValue={details.details?details.details.subCategory:null} required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Quantity:</p>
                            <input type="text" class="form__input add-input" id="quantity" onChange={handleChange} placeholder="Quantity" defaultValue={details.details?details.details.quantity:null} required></input>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Units of measurement:</p>
                            <input type="text" class="form__input add-input" id="uom" onChange={handleChange} placeholder="Unit" defaultValue={details.details?details.details.uom:null} required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{ fontWeight: '600' }}>Length:</p>
                                <input type="text" class="form__input add-input" id="ln" onChange={handleChange} placeholder="Length" defaultValue={details.details?details.details.ln:null} required></input>
                            </div>
                            <div>
                                <p style={{ fontWeight: '600' }}>Width:</p>
                                <input type="text" class="form__input add-input" id="wd" onChange={handleChange} placeholder="Width" defaultValue={details.details?details.details.wd:null} required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Serial Number:</p>
                            <input type="text" class="form__input add-input" id="serial" onChange={handleChange} placeholder="Serial Number" defaultValue={details.details?details.details.serial:null} required></input>
                        </div>
                        <div style={{ width: '350px', display: 'flex', justifyContent: 'center' }}>
                            <button className='btn btn-add-product' onClick={handleSubmit}>{id?'Update':'Add Product'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProducts
