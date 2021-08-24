import React, { useEffect,useState } from 'react'
import './productInfo.css'
import {AiOutlineClose} from 'react-icons/ai'
import firebase from '../../firebase';
import ImageViewer from '../ImageViewer/ImageViewer'

const ProductInfo = ({close, id}) => {

    const [product,setProduct] = useState([]);
    const [imgSrc,setImgSrc] = useState('');
    const [imagePreview, setImagePreview] = useState(false);
    
    useEffect(() => {
        firebase.firestore().collection('products').doc(id).get()
        .then(doc => {
            if(doc.exists){
                setProduct(doc.data())
            }
        })
    },[id])
    if(product.imgLink){
    return (
        <div className='product-info-pg'>
         {
            imagePreview? <ImageViewer image={imgSrc} close={() => {setImagePreview(false)}}/>:null
        }
        <div className='product-info'>
            <div className='pd-title-box'>
                <AiOutlineClose className='btn-cross' onClick={close} />
                <h3>{product.name}</h3>
            </div>
            <div className='pd-img-container'>
                <p>Product Images:</p>
                <div className='pd-img-box'>
                    {
                        product.imgLink.map && product.imgLink.map((image,i) => {
                            return(
                            <img alt='' onClick={() => {setImgSrc(image); setImagePreview(true); }} style={{cursor: 'pointer'}} src={image} key={i}></img>
                            )
                        })
                    }
                </div>
            </div>
            <div className='pd-info-box'>
                <p>Name: <span>{product.details.name}</span></p>
                <p>SKU: <span>{product.details.sku}</span></p>
                <p>Category: <span>{product.details.category}</span></p>
                <p>Sub-category: <span>{product.details.subCategory} </span></p>
                <p>Quantity: <span>{product.details.quantity} </span></p>
                <p>Units of measurement: <span>{product.details.uom}</span></p>
                <p>Dimensions: <span>{product.details.ln} x {product.details.wd}</span> </p>
                <p>Serial number: <span>{product.details.serial}</span> </p>
            </div>
        </div>
        </div>
    )
    }
    else{
        return(
            <center>Loading...</center>
        )
    }
}

export default ProductInfo
