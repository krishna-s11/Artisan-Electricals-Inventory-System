import React,{useContext, useEffect, useState} from 'react'
import './newOrder.css'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import firebase from '../../firebase'
import tool1 from '../../assets/tool-1.jpg'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Auth'

const db = firebase.firestore();

const NewOrder = ({close, id}) => {

    const [order,setOrder] = useState({
        emp_name: '',
        emp_id: '',
        name: '',
        add1: '',
        add2: '',
        add3: '',
        requested: '',
        requiredBy: '',
        material1: '',
        quantity1: '',
        sku1: '',
        productId1: '',
        outOfStock1: false,
        material2: '',
        quantity2: '',
        sku2: '',
        productId2: '',
        outOfStock2: false,
        material3: '',
        quantity3: '',
        sku3: '',
        productId3: '',
        outOfStock3: false,
        material4: '',
        quantity4: '',
        sku4: '',
        productId4: '',
        outOfStock4: false,
        material5: '',
        quantity5: '',
        sku5: '',
        productId5: '',
        outOfStock5: false,
        material6: '',
        quantity6: '',
        sku6: '',
        productId6: '',
        outOfStock6: false,
        material7: '',
        quantity7: '',
        sku7: '',
        productId7: '',
        outOfStock7: false,
        material8: '',
        quantity8: '',
        sku8: '',
        productId8: '',
        outOfStock8: false,
        material9: '',
        quantity9: '',
        sku9: '',
        productId9: '',
        outOfStock9: false,
        material10: '',
        quantity10: '',
        sku10: '',
        productId10: '',
        outOfStock10: false,
        material11: '',
        quantity11: '',
        sku11: '',
        productId11: '',
        outOfStock11: false,
        material12: '',
        quantity12: '',
        sku12: '',
        productId12: '',
        outOfStock12: false,
        material13: '',
        quantity13: '',
        sku13: '',
        productId13: '',
        outOfStock13: false,
        material14: '',
        quantity14: '',
        sku14: '',
        productId14: '',
        outOfStock14: false,
        material15: '',
        quantity15: '',
        sku15: '',
        productId15: '',
        outOfStock15: false,
        material16: '',
        quantity16: '',
        sku16: '',
        productId16: '',
        outOfStock16: false,
        material17: '',
        quantity17: '',
        sku17: '',
        productId17: '',
        outOfStock17: false,
        material18: '',
        quantity18: '',
        sku18: '',
        productId18: '',
        outOfStock18: false,
        material19: '',
        quantity19: '',
        sku19: '',
        productId19: '',
        outOfStock19: false,
        material20: '',
        quantity20: '',
        sku20: '',
        productId20: '',
        outOfStock20: false,
        note: '',
        status: 'processing'
    });

    const [products,setProducts] = useState([]);
    const[display1,setDisplay1] = useState(false);
    const[display2,setDisplay2] = useState(false);
    const[display3,setDisplay3] = useState(false);
    const[display4,setDisplay4] = useState(false);
    const[display5,setDisplay5] = useState(false);
    const[display6,setDisplay6] = useState(false);
    const[display7,setDisplay7] = useState(false);
    const[display8,setDisplay8] = useState(false);
    const[display9,setDisplay9] = useState(false);
    const[display10,setDisplay10] = useState(false);
    const[display11,setDisplay11] = useState(false);
    const[display12,setDisplay12] = useState(false);
    const[display13,setDisplay13] = useState(false);
    const[display14,setDisplay14] = useState(false);
    const[display15,setDisplay15] = useState(false);
    const[display16,setDisplay16] = useState(false);
    const[display17,setDisplay17] = useState(false);
    const[display18,setDisplay18] = useState(false);
    const[display19,setDisplay19] = useState(false);
    const[display20,setDisplay20] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const [show,setShow] = useState(1);

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.id]: e.target.value
        })
    }

    const handleQuantity = (e,productId,stockWarn) => {
        if(order.material === ''){
            toast.warning('Select an item first.');
        }
        else{
            setOrder({...order,[e.target.id]: e.target.value})
            const ids = products.map(item => {return item.id})
            const productID = ids.find(element => element === productId);
            let product = [];
            for (let i = 0; i < products.length; i++){
                if(products[i].id === productID){
                    product.push(products[i]);
                }
            }
            let stock = parseInt(product[0].data.quantity);
            console.log(stock);
            if(e.target.value > stock){document.getElementById(stockWarn).style.display = 'block'; setOrder({...order,outOfStock:true})}
            else document.getElementById(stockWarn).style.display = 'none';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(order.name === '' || order.material1 === '' || order.quantity1 === '' || order.add1 === '' ){
            return toast.error('Fill all the required fields.');
        }
        if(!id){
            await db.collection('orders').add(order);
            await db.collection('stats').doc('orders').update({requests: firebase.firestore.FieldValue.increment(1), pending: firebase.firestore.FieldValue.increment(1)})
            toast.success('Order created successfully.');
            close();
        }else{
            await db.collection('orders').doc(id).update(order);
            toast.success('Order updated successfully.');
            close();
        }
        if(order.outOfStock){
        await db.collection('notification').add({
            emp_id: '12345',
            emp_name: 'Harry Potter',
            emp_photoUrl: '',
            mssg: 'requested a new order. (Out of Stock)',
            outofStock: true,
            time: Date.now()
        })
        }
        else{
        await db.collection('notification').add({
            emp_id: '12345',
            emp_name: 'Harry Potter',
            emp_photoUrl: '',
            mssg: 'requested a new order',
            outofStock: false,
            time: Date.now()
        })
        }
    }
    useEffect(() => {
        setOrder({
            ...order,
            emp_id: currentUser.id,
            emp_name: currentUser.user.name,
            requested: new Date().getFullYear()+'-0'+(new Date().getMonth()+1)+'-'+new Date().getDate()
        })
        if(id){
            db.collection('orders').doc(id).get()
            .then((doc) => {
                if(doc.exists){
                    setOrder(doc.data());
                }else{
                    console.log('no data found');
                }
            })
        }
        db.collection('products').get()
        .then((querySnap) => {
            setProducts(querySnap.docs.map(doc => ({id: doc.id, data: doc.data()})));
        });
    },[id])
    console.log(order);
    return (
        <div className='new-order'>
            <div className='new-order-card'>
                <div className='add-card-top'>
                    <h2>New Order</h2>
                    <AiOutlineClose id='btn-close' onClick={() => {close()}} />
                </div>
                <div className='add-cd-main-container'>
                    <div className='add-card-content' id='order-content'>
                        <div className='add-col-1'>
                            <div className='form-row'>
                                <p>Project Name:</p>
                                <input type="text" class="form__input order add-input" id="name" onChange={handleChange} placeholder="Project Name" defaultValue={order.name} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Project Address Line 1:</p>
                                <input type="text" class="form__input order add-input" id="add1" onChange={handleChange} placeholder="Address Line 1" defaultValue={order.add1} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Project Address Line 2:</p>
                                <input type="text" class="form__input order add-input" id="add2" onChange={handleChange} placeholder="Address Line 2" defaultValue={order.add2} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Project Address Line 3:</p>
                                <input type="text" class="form__input order add-input" id="add3" onChange={handleChange} placeholder="Address Line 3" defaultValue={order.add3} required></input>
                            </div>
                        </div>
                        <div className='add-col-2'>
                            <div className='form-row'>
                                <p>Required by:</p>
                                <input type="date" class="form__input order add-input" id="requiredBy" onChange={handleChange} defaultValue={order.requiredBy} required></input>
                            </div>
                            <div className='form-row'>
                                <p>Extra Note :</p>
                                <textarea type="text" class="form__input order textarea add-input orderText" id="note" onChange={handleChange} placeholder="Write your note here" defaultValue={order.note} required></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-cd-container'>
                        <div className='bt-row-content first' id='first'>
                            <div className='bt-row-container'>
                                <div className='form-row bt'>
                                    <p>Material 1:</p>
                                    <input type="text" class="form__input add-input material" id="material1" onChange={handleChange} onClick={() => {setDisplay1(!display1)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                        { display1?(
                                        <div className='selection-box' >
                                            {
                                                products && products.map((product,i) => {
                                                    const data = product.data;
                                                    return(
                                                        <div className='product-selection-container' key={i} onClick={() => {
                                                            setOrder({
                                                                ...order,
                                                                sku1: data.sku,
                                                                material1: data.name,
                                                                productId1: product.id
                                                            })
                                                            
                                                            document.getElementById('material1').value = data.name;
                                                            setTimeout(() => {
                                                                setDisplay1(false)
                                                            },500)
                                                        }}>
                                                        <div>
                                                            <p className='sl-title'>{data.name}</p>
                                                            <div className='lower-sl-box'>
                                                                <p className='sl-info'>SKU: {data.sku}</p>
                                                                <p className='sl-info'>Available: {data.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <img src={tool1} alt=''></img>
                                                    </div>
                                                    )
                                                })   
                                            }
                                        </div>):null
                                        }
                                    </div>
                                    <div className='form-row qt'>
                                        <p>Quantity:</p>
                                        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                            <input type="text" class="form__input add-input quantity" id="quantity1" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId1,'stock-warn1','outOfStock1')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                        </div>
                                    </div>  
                                </div>
                                <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn1'>Requested number of item is not available in stock.</p>
                            </div>
                        <div className='bt-row-content second' id='second'>
                            <div className='bt-row-container'>
                                <div className='form-row bt'>
                                    <p>Material 2:</p>
                                    <input type="text" class="form__input add-input material" id="material2" onChange={handleChange} onClick={() => {setDisplay2(!display2)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                        { display2?(
                                        <div className='selection-box' >
                                            {
                                                products && products.map((product,i) => {
                                                    const data = product.data;
                                                    return(
                                                        <div className='product-selection-container' key={i} onClick={() => {
                                                            setOrder({
                                                                ...order,
                                                                sku2: data.sku,
                                                                material2: data.name,
                                                                productId2: product.id
                                                            })
                                                            
                                                            document.getElementById('material2').value = data.name;
                                                            setTimeout(() => {
                                                                setDisplay2(false)
                                                            },500)
                                                        }}>
                                                        <div>
                                                            <p className='sl-title'>{data.name}</p>
                                                            <div className='lower-sl-box'>
                                                                <p className='sl-info'>SKU: {data.sku}</p>
                                                                <p className='sl-info'>Available: {data.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <img src={tool1} alt=''></img>
                                                    </div>
                                                    )
                                                })   
                                            }
                                        </div>):null
                                        }
                                    </div>
                                    <div className='form-row qt'>
                                        <p>Quantity:</p>
                                        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                            <input type="text" class="form__input add-input quantity" id="quantity2" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId2,'stock-warn2','outOfStock2')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                        </div>
                                    </div>  
                                </div>
                                <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn2'>Requested number of item is not available in stock.</p>
                            </div>
                        <div className='bt-row-content third' id='third'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 3:</p>
                                <input type="text" class="form__input add-input material" id="material3" onChange={handleChange} onClick={() => {setDisplay3(!display3)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display3?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku3: data.sku,
                                                            material3: data.name,
                                                            productId3: product.id
                                                        })
                                                            
                                                        document.getElementById('material3').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay3(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity3" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId3,'stock-warn2','outOfStock3')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn3'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content fourth' id='fourth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 4:</p>
                                <input type="text" class="form__input add-input material" id="material4" onChange={handleChange} onClick={() => {setDisplay4(!display4)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display4?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku4: data.sku,
                                                            material4: data.name,
                                                            productId4: product.id
                                                        })
                                                            
                                                        document.getElementById('material4').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay4(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity4" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId4,'stock-warn2','outOfStock4')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn4'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content fifth' id='fifth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 5:</p>
                                <input type="text" class="form__input add-input material" id="material5" onChange={handleChange} onClick={() => {setDisplay5(!display5)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display5?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku5: data.sku,
                                                            material5: data.name,
                                                            productId5: product.id
                                                        })
                                                            
                                                        document.getElementById('material5').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay5(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity5" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId5,'stock-warn5','outOfStock5')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn5'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content sixth' id='sixth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 6:</p>
                                <input type="text" class="form__input add-input material" id="material6" onChange={handleChange} onClick={() => {setDisplay6(!display6)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display6?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku6: data.sku,
                                                            material6: data.name,
                                                            productId6: product.id
                                                        })
                                                            
                                                        document.getElementById('material6').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay6(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity6" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId6,'stock-warn6','outOfStock6')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn6'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content seventh' id='seventh'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 7:</p>
                                <input type="text" class="form__input add-input material" id="material7" onChange={handleChange} onClick={() => {setDisplay7(!display7)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display7?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku7: data.sku,
                                                            material7: data.name,
                                                            productId7: product.id
                                                        })
                                                            
                                                        document.getElementById('material7').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay7(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity7" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId7,'stock-warn7')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn7'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content eigth' id='eigth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 8:</p>
                                <input type="text" class="form__input add-input material" id="material8" onChange={handleChange} onClick={() => {setDisplay8(!display8)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display8?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku8: data.sku,
                                                            material8: data.name,
                                                            productId8: product.id
                                                        })
                                                            
                                                        document.getElementById('material8').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay8(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity8" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId8,'stock-warn8')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn8'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content ninth' id='ninth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 9:</p>
                                <input type="text" class="form__input add-input material" id="material9" onChange={handleChange} onClick={() => {setDisplay9(!display9)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display9?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku9: data.sku,
                                                            material9: data.name,
                                                            productId9: product.id
                                                        })
                                                            
                                                        document.getElementById('material9').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay9(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity9" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId9,'stock-warn9')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn9'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content tenth' id='tenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 10:</p>
                                <input type="text" class="form__input add-input material" id="material10" onChange={handleChange} onClick={() => {setDisplay10(!display10)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display10?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku10: data.sku,
                                                            material10: data.name,
                                                            productId10: product.id
                                                        })
                                                            
                                                        document.getElementById('material10').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay10(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity10" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId10,'stock-warn10')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn10'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content eleventh' id='eleventh'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 11:</p>
                                <input type="text" class="form__input add-input material" id="material11" onChange={handleChange} onClick={() => {setDisplay11(!display11)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display11?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku11: data.sku,
                                                            material11: data.name,
                                                            productId11: product.id
                                                        })
                                                            
                                                        document.getElementById('material11').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay11(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity11" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId11,'stock-warn11')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn11'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content twelth' id='twelth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 12:</p>
                                <input type="text" class="form__input add-input material" id="material12" onChange={handleChange} onClick={() => {setDisplay12(!display12)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display12?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku12: data.sku,
                                                            material12: data.name,
                                                            productId12: product.id
                                                        })
                                                            
                                                        document.getElementById('material12').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay12(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity12" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId12,'stock-warn12')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn12'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content thirteenth' id='thirteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 13:</p>
                                <input type="text" class="form__input add-input material" id="material13" onChange={handleChange} onClick={() => {setDisplay13(!display13)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display13?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku13: data.sku,
                                                            material13: data.name,
                                                            productId13: product.id
                                                        })
                                                            
                                                        document.getElementById('material13').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay13(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity13" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId13,'stock-warn13')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn13'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content forteenth' id='forteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 14:</p>
                                <input type="text" class="form__input add-input material" id="material14" onChange={handleChange} onClick={() => {setDisplay14(!display14)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display14?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku14: data.sku,
                                                            material14: data.name,
                                                            productId14: product.id
                                                        })
                                                            
                                                        document.getElementById('material14').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay14(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity14" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId14,'stock-warn14')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn14'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content fifteenth' id='fifteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 15:</p>
                                <input type="text" class="form__input add-input material" id="material15" onChange={handleChange} onClick={() => {setDisplay15(!display15)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display15?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku15: data.sku,
                                                            material15: data.name,
                                                            productId15: product.id
                                                        })
                                                            
                                                        document.getElementById('material15').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay15(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity15" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId15,'stock-warn15')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn15'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content sixteenth' id='sixteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 16:</p>
                                <input type="text" class="form__input add-input material" id="material16" onChange={handleChange} onClick={() => {setDisplay16(!display16)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display16?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku16: data.sku,
                                                            material16: data.name,
                                                            productId16: product.id
                                                        })
                                                            
                                                        document.getElementById('material16').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay16(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity16" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId16,'stock-warn16')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn16'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content seventeenth' id='seventeenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 17:</p>
                                <input type="text" class="form__input add-input material" id="material17" onChange={handleChange} onClick={() => {setDisplay17(!display17)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display17?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku17: data.sku,
                                                            material17: data.name,
                                                            productId17: product.id
                                                        })
                                                            
                                                        document.getElementById('material17').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay17(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity17" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId17,'stock-warn17')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn17'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content eighteenth' id='eighteenth' >
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 18:</p>
                                <input type="text" class="form__input add-input material" id="material18" onChange={handleChange} onClick={() => {setDisplay18(!display18)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display18?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku18: data.sku,
                                                            material18: data.name,
                                                            productId18: product.id
                                                        })
                                                            
                                                        document.getElementById('material18').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay18(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity18" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId18,'stock-warn18')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn18'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content ninteenth' id='ninteenth' >
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 19:</p>
                                <input type="text" class="form__input add-input material" id="material19" onChange={handleChange} onClick={() => {setDisplay19(!display19)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display19?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku19: data.sku,
                                                            material19: data.name,
                                                            productId19: product.id
                                                        })
                                                            
                                                        document.getElementById('material19').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay19(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity19" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId19,'stock-warn19')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn19'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content' id='twentieth' >
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 20:</p>
                                <input type="text" class="form__input add-input material" id="material20" onChange={handleChange} onClick={() => {setDisplay20(!display20)}} placeholder="Choose material" defaultValue={order.material} required></input>
                                    { display20?(
                                    <div className='selection-box' >
                                        {
                                            products && products.map((product,i) => {
                                                const data = product.data;
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setOrder({
                                                            ...order,
                                                            sku20: data.sku,
                                                            material20: data.name,
                                                            productId20: product.id
                                                        })
                                                            
                                                        document.getElementById('material20').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay20(false)
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={tool1} alt=''></img>
                                                </div>
                                                )
                                            })   
                                        }
                                    </div>):null
                                    }
                                </div>
                                <div className='form-row qt'>
                                    <p>Quantity:</p>
                                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <input type="text" class="form__input add-input quantity" id="quantity20" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId20,'stock-warn20')} placeholder="Quantity" defaultValue={order.quantity} required disabled={order.material === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn20'>Requested number of item is not available in stock.</p>
                        </div>
                        <div style={{display: 'flex',width:'100%',justifyContent:'center'}}>
                            <AiOutlinePlusCircle style={{fontSize:'20px', cursor:'pointer'}} id='add-reveal' onClick={() => {
                                setShow(show+1);
                                console.log(show);
                                switch(show){
                                    case 1:
                                    document.getElementById('second').style.display='block';
                                    break;
                                    case 2:
                                    document.getElementById('third').style.display='block';
                                    break;
                                    case 3:
                                    document.getElementById('fourth').style.display='block';
                                    break;
                                    case 4:
                                    document.getElementById('fifth').style.display='block';
                                    break;
                                    case 5:
                                    document.getElementById('sixth').style.display='block';
                                    break;
                                    case 6:
                                    document.getElementById('seventh').style.display='block';
                                    break;
                                    case 7:
                                    document.getElementById('eigth').style.display='block';
                                    break;
                                    case 8:
                                    document.getElementById('ninth').style.display='block';
                                    break;
                                    case 9:
                                    document.getElementById('tenth').style.display='block';
                                    break;
                                    case 10:
                                    document.getElementById('eleventh').style.display='block';
                                    break;
                                    case 11:
                                    document.getElementById('twelth').style.display='block';
                                    break;
                                    case 12:
                                    document.getElementById('thirteenth').style.display='block';
                                    break;
                                    case 13:
                                    document.getElementById('forteenth').style.display='block';
                                    break;
                                    case 14:
                                    document.getElementById('fifteenth').style.display='block';
                                    break;
                                    case 15:
                                    document.getElementById('sixteenth').style.display='block';
                                    break;
                                    case 16:
                                    document.getElementById('seventeenth').style.display='block';
                                    break;
                                    case 17:
                                    document.getElementById('eighteenth').style.display='block';
                                    break;
                                    case 18:
                                    document.getElementById('ninteenth').style.display='block';
                                    break;
                                    case 19:
                                    document.getElementById('twentieth').style.display='block';
                                    document.getElementById('add-reveal').style.display='none';
                                    break;
                                    default:
                                    console.log('defaul');
                                    break;
                                }
                            }} />
                        </div>
                        <div style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                            <button className='btn btn-place-order' onClick={handleSubmit} >Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrder
