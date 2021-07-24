import React,{useContext, useEffect, useState} from 'react'
import './viewProducts.css'
import {FaSearch} from 'react-icons/fa'
import AddProducts from '../AddProducts/AddProducts'
import ProductInfo from '../ProductInfo/ProductInfo'
import firebase from '../../firebase'
import {AuthContext} from '../../Auth';
import DeleteBox from '../DeleteBox/DeleteBox'

const ViewProducts = () => {

    const [display,setDisplay] = useState(false);
    const [details,setDetails] = useState(false);
    const [products,setProducts] = useState([]);
    const [deleteDisplay,setDeleteDisplay] = useState(false)
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        firebase.firestore().collection('products')
        .onSnapshot((querySnap) => {
            setProducts(querySnap.docs.map(doc => ({data: doc.data(), id: doc.id})))
        })
    },[])

    const deleteProducts = async (id) => {
        await firebase.firestore().collection('products').doc(id).delete();
        await firebase.firestore().collection('notification').add({
            emp_id: currentUser.id,
            emp_name: currentUser.user.name,
            mssg: 'deleted an inventory',
            time: Date.now()
        })
    }
    

    return (
        <div className='view-products'>
            {
                deleteDisplay?<DeleteBox deleteFun={() => {deleteProducts(id)}} close={() => setDeleteDisplay(false)} />:null
            }
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
                    {
                        currentUser && currentUser.user.inventory?
                        (<button className='btn btn-add_items' onClick={() => {setId('');setDisplay(true)}}>New +</button>)
                        :null
                    }
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
                        {
                            currentUser && currentUser.user.inventory?(
                                <th colSpan='2'>Action</th>
                            )
                            :null
                        }
                    </tr>   
                    </thead>
                    <tbody>
                    {
                        products && products.map((product,i) => {
                            const data = product.data.details;
                            const img = product.data.imgLink[0];
                            return(
                                <tr key={i}>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}} >{i+1}</td>
                                    <td>
                                        <img alt='' src={img} className='product-preview'></img>
                                    </td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.name}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.sku}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.quantity}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.category}</td>
                                    <td onClick={() => {setId(product.id) ;setDetails(true)}}>{data.serial}</td>
                                    {
                                        currentUser && currentUser.user.inventory?(
                                        <td onClick={() => {setId(product.id); setName(data.name); setDeleteDisplay(true) }}><p className='btn-del'>Delete</p></td>       
                                        ):null
                                    }
                                    {
                                        currentUser && currentUser.user.inventory?(
                                        <td onClick={(id) => {setDetails(false); setId(product.id); setDisplay(true)}}><p className='btn-edit'>Edit</p></td>
                                        ):null
                                    }
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
