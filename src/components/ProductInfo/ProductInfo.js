import React, { useEffect,useState } from 'react'
import './productInfo.css'
import img1 from '../../assets/tool-1.jpg'
import img2 from '../../assets/tool-2.jpg'
import img3 from '../../assets/login-cover3.jpg'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase';

const ProductInfo = ({close, id}) => {

    const [product,setProduct] = useState([])
    
    useEffect(() => {
        firebase.firestore().collection('products').doc(id).get()
        .then(doc => {
            if(doc.exists){
                setProduct(doc.data())
            }
        })
    },[id])

    return (
        <div className='product-info-pg'>
        <div className='product-info'>
            <div className='pd-title-box'>
                <AiOutlineClose className='btn-cross' onClick={close} />
                <h3>{product.name}</h3>
            </div>
            <div className='pd-img-container'>
                <p>Product Images:</p>
                <div className='pd-img-box'>
                    <img alt='' src={img1}></img>
                    <img alt='' src={img2}></img>
                    <img alt='' src={img3}></img>
                    <img alt='' src={img1}></img>
                    <img alt='' src={img2}></img>
                    <img alt='' src={img3}></img>
                    <img alt='' src={img1}></img>
                    <img alt='' src={img2}></img>
                    <img alt='' src={img3}></img>
                </div>
            </div>
            <div className='pd-info-box'>
                <p>Name: <span>{product.name}</span></p>
                <p>SKU: <span>{product.sku}</span></p>
                <p>Category: <span>{product.category}</span></p>
                <p>Sub-category: <span>{product.subCategory} </span></p>
                <p>Units of measurement: <span>{product.uom}</span></p>
                <p>Dimensions: <span>{product.ln} x {product.wd}</span> </p>
                <p>Serial number: <span>{product.serial}</span> </p>
            </div>
        </div>
        </div>
    )
}

export default ProductInfo
