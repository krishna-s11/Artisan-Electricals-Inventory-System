import React, { useContext, useEffect, useState } from 'react'
import './addProducts.css'
import { AiOutlineClose } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../Auth';
import emailjs from 'emailjs-com'

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
    const [imgL,setImgL] = useState('');
    const [pictureLinks, setPictureLinks] = useState([]);
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

    function sendEmail(e,templateParams) {
        e.preventDefault(); 
        emailjs.send('artisan_gmail', 'template_8uiccl8',templateParams, 'user_FtV3um8ZNdBMv9ZOPVXZP')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var templateParams = {
            message: `A new inventory is added by ${currentUser.user.name}`
        }
        if (details.name === '') {
            return toast.error('Fill all the required fields');
        }
        setLoading(true);
        let imgLink = [];
        imgLink =  (await Promise.all(
            images.map(async (image, i) => {
                const storageRef = firebase.storage().ref(`inventory/${details.name}/${i}`);
                await storageRef.put(image)
                const downloadLink = storageRef.getDownloadURL();
                return downloadLink;
            })
        ) && pictureLinks) || imgL ;
        
        if (!id) {
            await db.collection('products').add({details,imgLink});

            await db.collection('notification').add({
                emp_id: currentUser.id,
                emp_name: currentUser.user.name,
                emp_photoUrl: '',
                mssg: 'added a new inventory',
                time: Date.now()
            })
            sendEmail(e,templateParams);
            setLoading(false);
            toast.success('Product successfully added. ')
            close();
        }
        else {
            await db.collection('products').doc(id).update({details,imgLink})
            await db.collection('notification').add({
                emp_id: '12345',
                emp_name: 'Krishna Saxena',
                emp_photoUrl: '',
                mssg: 'updated an inventory',
                time: Date.now()
            })
            sendEmail(e,templateParams);
            toast.success('Product successfully updated');
            close();
        }
    }
    console.log(pictureLinks);
    useEffect(() => {
        if (id) {
            db.collection('products').doc(id).get()
                .then((doc) => {
                    if (doc.exists) {
                        setDetails(doc.data().details);
                        setImgL(doc.data().imgLink);
                    } else {
                        console.log('no data found');
                    }
                })
        }
    }, [id])

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
                        <input type='text' className='form__input' id='img_url' placeholder='Picture URL'></input>
                        <button className='btn btn-upload' onClick={() => {
                            let value = document.getElementById('img_url').value;
                            setPictureLinks(prevState => [...prevState, value]);
                            document.getElementById('img_url').value = '';
                            document.getElementById('cnf-text').style.display = 'block'
                        }}>Upload</button>
                        <p style={{fontSize:'14px', marginTop:'20px', color:'#4fc3a1',display:'none'}} id='cnf-text'>Uploaded successfully</p>
                    </div>
                    <div className='add-content'>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Name:</p>
                            <input type="text" class="form__input add-input" id="name" onChange={handleChange} placeholder="Product's Name" defaultValue={details?details.name:null} required></input>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>SKU:</p>
                            <input type="text" class="form__input add-input" id="sku" onChange={handleChange} placeholder="SKU" defaultValue={details?details.sku:null} required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{ fontWeight: '600' }}>Category:</p>
                                <input type="text" class="form__input add-input" id="category" onChange={handleChange} placeholder="Category" defaultValue={details?details.category:null} required></input>
                            </div>
                            <div>
                                <p style={{ fontWeight: '600' }}>Sub-category:</p>
                                <input type="text" class="form__input add-input" id="subCategory" onChange={handleChange} placeholder="Sub-category" defaultValue={details?details.subCategory:null} required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Quantity:</p>
                            <input type="text" class="form__input add-input" id="quantity" onChange={handleChange} placeholder="Quantity" defaultValue={details?details.quantity:null} required></input>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Units of measurement:</p>
                            <input type="text" class="form__input add-input" id="uom" onChange={handleChange} placeholder="Unit" defaultValue={details?details.uom:null} required></input>
                        </div>
                        <div className='add-group sub-category'>
                            <div>
                                <p style={{ fontWeight: '600' }}>Length:</p>
                                <input type="text" class="form__input add-input" id="ln" onChange={handleChange} placeholder="Length" defaultValue={details?details.ln:null} required></input>
                            </div>
                            <div>
                                <p style={{ fontWeight: '600' }}>Width:</p>
                                <input type="text" class="form__input add-input" id="wd" onChange={handleChange} placeholder="Width" defaultValue={details?details.wd:null} required></input>
                            </div>
                        </div>
                        <div className='add-group'>
                            <p style={{ fontWeight: '600' }}>Serial Number:</p>
                            <input type="text" class="form__input add-input" id="serial" onChange={handleChange} placeholder="Serial Number" defaultValue={details?details.serial:null} required></input>
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
