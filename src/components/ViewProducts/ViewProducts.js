import React,{useEffect, useState} from 'react'
import './viewProducts.css'
import {FaSearch} from 'react-icons/fa'
import tool1 from '../../assets/tool-1.jpg'
import AddProducts from '../AddProducts/AddProducts'
import ProductInfo from '../ProductInfo/ProductInfo'
import firebase from '../../firebase'

const ViewProducts = () => {

    const [display,setDisplay] = useState(false);
    const [details,setDetails] = useState(false);
    const [products,setProducts] = useState([]);
    const [id,setId] = useState('');
    const [edit,setEdit] = useState(false);

    useEffect(() => {
        firebase.firestore().collection('products')
        .onSnapshot((querySnap) => {
            setProducts(querySnap.docs.map(doc => ({data: doc.data(), id: doc.id})))
        })
    },[])

    const deleteProducts = async (id) => {
        await firebase.firestore().collection('products').doc(id).delete()
    }
    

    return (
        <div className='view-products'>
            {
                display?<AddProducts close={() => {setDisplay(false)}} id={id} />:null
            }
            {
                details?<ProductInfo close={() => {setDetails(false)}} id={id} />:null
            }
            <div className='vp-top'>
                <h2>Inventory list</h2>
                <div className='vp-action-bar'>
                    <div class="search-box">
                        <button class="btn-search"><FaSearch/></button>
                        <input type="text" class="input-search" placeholder="Type to Search..."></input>
                    </div>
                    <button className='btn btn-add_items' onClick={() => {setId('');setDisplay(true)}}>New +</button>
                </div>
            </div>
                <table class="fl-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Preview</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Serial No.</th>
                        <th colspan='2'>Action</th>
                    </tr>   
                    </thead>
                    <tbody>
                    {
                        products && products.map((product,i) => {
                            const data = product.data;
                            return(
                                <tr>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}} >{i+1}</td>
                                    <td>
                                        <img alt='' src={tool1} className='product-preview'></img>
                                    </td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}} >{data.name}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.sku}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.quantity}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.category}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.serial}</td>
                                    <td onClick={(id) => {setDetails(false); deleteProducts(product.id)}}><p className='btn-del'>Delete</p></td>
                                    <td onClick={(id) => {setDetails(false); setId(product.id); setDisplay(true)}}><p className='btn-edit'>Edit</p></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
        </div>
    )
}

export default ViewProducts
