import React,{useContext, useEffect, useState} from 'react'
import './newOrder.css'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {AiOutlineMinusCircle} from 'react-icons/ai'
import firebase from '../../firebase'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Auth'
import Loading from '../Loading/Loading'
import SimpleLoading from '../SimpleLoading/SimpleLoading'
import emailjs from 'emailjs-com'

const db = firebase.firestore();

const NewOrder = ({close, id}) => {

    const [order,setOrder] = useState({
        emp_name: '',
        emp_id: '',
        name: '',
        add1: '',
        add2: '',
        add3: '',
        timestamp: Date.now(),
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
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
        img6: '',
        img7: '',
        img8: '',
        img9: '',
        img10: '',
        img11: '',
        img12: '',
        img13: '',
        img14: '',
        img15: '',
        img16: '',
        img17: '',
        img18: '',
        img19: '',
        img20: '',
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
    const [loading,setLoading] = useState(false);
    const [loader,setLoader] = useState(false);
    const [filter,setFilter] = useState('');

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.id]: e.target.value
        })
    }

    const searchFunc = (e) => {
        setFilter(e.target.value);
    }

    const filterData = products.filter(products => {
        return(
            products.data.details.name.toLowerCase().includes(filter.toLowerCase())
        )
    })

    const handleQuantity = (e,productId,stockWarn,quant) => {
            setOrder({...order,[e.target.id]: e.target.value})
            const ids = products.map(item => {return item.id})
            console.log(ids);
            const productID = ids.find(element => element === productId);
            console.log(productId);
            let product = [];
            for (let i = 0; i < products.length; i++){
                if(products[i].id === productID){
                    product.push(products[i]);
                }
            }
            console.log(product);
            let stock = parseInt(product[0].data.details.quantity);
            console.log(stock);
            if(e.target.value > stock){document.getElementById(stockWarn).style.display = 'block'; setOrder({...order,outOfStock:true})}
            else document.getElementById(stockWarn).style.display = 'none';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var templateParams = {
            message: `There is a new order from ${currentUser.user.name}`
        }
        if(order.name === '' || order.material1 === '' || order.quantity1 === '' || order.add1 === '' ){
            return toast.error('Fill all the required fields.');
        }
        setLoading(true);
        if(!id){
            await db.collection('orders').add(order);
            await db.collection('stats').doc('orders').update({requests: firebase.firestore.FieldValue.increment(1), pending: firebase.firestore.FieldValue.increment(1)})
            sendEmail(e,templateParams);
            setLoading(false);
            toast.success('Order created successfully.');
            close();
        }else{
            const dt = Date.now()
            await db.collection('orders').doc(id).update(order);
            await db.collection('orders').doc(id).update({'timestamp': dt});
            sendEmail(e,templateParams);
            setLoading(false);
            toast.success('Order updated successfully.');
            close();
        }
        if(order.outOfStock){
        await db.collection('notification').add({
            emp_id: currentUser.id,
            emp_name: currentUser.user.name,
            mssg: 'requested a new order. (Out of Stock)',
            outofStock: true,
            time: Date.now()
        })
        }
        else{
        await db.collection('notification').add({
            emp_id: currentUser.id,
            emp_name: currentUser.user.name,
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
            requested: new Date().getFullYear()+'-0'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
            timestamp: Date.now()
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
            db.collection('products').get().then((querySnap) => {
                setProducts(querySnap.docs.map(doc => ({id: doc.id, data: doc.data()})));
                querySnap.docs.map((doc,i) => {
                    setOrder({
                        ...order,
                        [`productId${i}`]: doc.id
                    })
                })
            })
        }
        else{
        db.collection('products').get()
        .then((querySnap) => {
            setProducts(querySnap.docs.map(doc => ({id: doc.id, data: doc.data()})));
        });
        }

    },[id])

    function sendEmail(e,templateParams) {
        e.preventDefault(); 
        emailjs.send('service_aul62y7', 'template_g12ea4f',templateParams, 'user_9tuZAmDdmzn1rAs5z4gPD')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }
      console.log(order);
    return (
        <div className='new-order'>
            {
                loading?(
                    <Loading />
                )
                :null
            }
            {
                loader?<SimpleLoading />:null
            }
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
                                    <input type="text" autoComplete='off' class="form__input add-input material" id="material1" onChange={searchFunc} onClick={() => {setDisplay1(!display1)}} placeholder="Choose material" defaultValue={order.material1} required></input>
                                        { display1?(
                                        <div className='selection-box' >
                                            {
                                                filterData && filterData.map((product,i) => {
                                                    const data = product.data.details;
                                                    const img = product.data.imgLink[0];
                                                    return(
                                                        <div className='product-selection-container' key={i} onClick={() => {
                                                            setLoader(true)
                                                            setOrder({
                                                                ...order,
                                                                sku1: data.sku,
                                                                material1: data.name,
                                                                productId1: product.id,
                                                                img1: img
                                                            })
                                                            
                                                            document.getElementById('material1').value = data.name;
                                                            setFilter('');
                                                            setTimeout(() => {
                                                                setDisplay1(false);
                                                                setLoader(false);
                                                            },500)
                                                        }}>
                                                        <div>
                                                            <p className='sl-title'>{data.name}</p>
                                                            <div className='lower-sl-box'>
                                                                <p className='sl-info'>SKU: {data.sku}</p>
                                                                <p className='sl-info'>Available: {data.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <img src={img} alt=''></img>
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
                                            <input type="text" class="form__input add-input quantity" id="quantity1" onChange={(e,productId,stockWarn,outOS,quant) => handleQuantity(e,order.productId1,'stock-warn1','outOfStock1','quantity1')} placeholder="Quantity" defaultValue={order.quantity1} required disabled={order.material1 === ''?true:false} ></input>
                                        </div>
                                    </div>  
                                </div>
                                <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn1'>Requested number of item is not available in stock.</p>
                            </div>
                        <div className='bt-row-content second' id='second'>
                            <div className='bt-row-container'>
                                <div className='form-row bt'>
                                    <p>Material 2:</p>
                                    <div style={{display: 'flex', alignItems:'center'}}>
                                    <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku2:'',material2:'',productId2:'',img2:''}); document.getElementById('second').style.display = 'none'; setShow(1)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                    <input type="text" autoComplete='off' class="form__input add-input material" id="material2" onChange={searchFunc} onClick={() => {setDisplay2(!display2)}} placeholder="Choose material" defaultValue={order.material2} required></input></div>
                                        { display2?(
                                        <div className='selection-box ot' >
                                            {
                                                filterData && filterData.map((product,i) => {
                                                    const data = product.data.details;
                                                    const img = product.data.imgLink[0];
                                                    return(
                                                        <div className='product-selection-container' key={i} onClick={() => {
                                                            setLoader(true);
                                                            setOrder({
                                                                ...order,
                                                                sku2: data.sku,
                                                                material2: data.name,
                                                                productId2: product.id,
                                                                img2: img
                                                            })
                                                            
                                                            document.getElementById('material2').value = data.name;
                                                            setFilter('');

                                                            setTimeout(() => {
                                                                setDisplay2(false)
                                                                setLoader(false);
                                                            },500)
                                                        }}>
                                                        <div>
                                                            <p className='sl-title'>{data.name}</p>
                                                            <div className='lower-sl-box'>
                                                                <p className='sl-info'>SKU: {data.sku}</p>
                                                                <p className='sl-info'>Available: {data.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <img src={img} alt=''></img>
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
                                            <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity2" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId2,'stock-warn2','outOfStock2')} placeholder="Quantity" defaultValue={order.quantity2} required disabled={order.material2 === ''?true:false} ></input>
                                        </div>
                                    </div>  
                                </div>
                                <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn2'>Requested number of item is not available in stock.</p>
                            </div>
                        <div className='bt-row-content third' id='third'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 3:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku3:'',material3:'',productId3:'',img3:''}); document.getElementById('third').style.display = 'none'; setShow(2)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material3" onChange={searchFunc} onClick={() => {setDisplay3(!display3)}} placeholder="Choose material" defaultValue={order.material3} required></input></div>
                                    { display3?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku3: data.sku,
                                                            material3: data.name,
                                                            productId3: product.id,
                                                            img3: img
                                                        })
                                                            
                                                        document.getElementById('material3').value = data.name;
                                                        setFilter('');

                                                        setTimeout(() => {
                                                            setDisplay3(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity3" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId3,'stock-warn2','outOfStock3')} placeholder="Quantity" defaultValue={order.quantity3} required disabled={order.material3 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn3'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content fourth' id='fourth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 4:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku4:'',material4:'',productId4:'',img4:''}); document.getElementById('fourth').style.display = 'none'; setShow(3)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material4" onChange={searchFunc} onClick={() => {setDisplay4(!display4)}} placeholder="Choose material" defaultValue={order.material4} required></input></div>
                                    { display4?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku4: data.sku,
                                                            material4: data.name,
                                                            productId4: product.id,
                                                            img4: img
                                                        })
                                                            
                                                        document.getElementById('material4').value = data.name;
                                                        setFilter('');

                                                        setTimeout(() => {
                                                            setDisplay4(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity4" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId4,'stock-warn2','outOfStock4')} placeholder="Quantity" defaultValue={order.quantity4} required disabled={order.material4 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn4'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content fifth' id='fifth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 5:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku5:'',material5:'',productId5:'',img5:''}); document.getElementById('fifth').style.display = 'none'; setShow(4)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material5" onChange={searchFunc} onClick={() => {setDisplay5(!display5)}} placeholder="Choose material" defaultValue={order.material5} required></input></div>
                                    { display5?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku5: data.sku,
                                                            material5: data.name,
                                                            productId5: product.id,
                                                            img5: img
                                                        })
                                                            
                                                        document.getElementById('material5').value = data.name;
                                                        setFilter('');

                                                        setTimeout(() => {
                                                            setDisplay5(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity5" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId5,'stock-warn5','outOfStock5')} placeholder="Quantity" defaultValue={order.quantity5} required disabled={order.material5 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn5'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content sixth' id='sixth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 6:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku6:'',material6:'',productId6:'',img6:''}); document.getElementById('sixth').style.display = 'none'; setShow(5)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material6" onChange={searchFunc} onClick={() => {setDisplay6(!display6)}} placeholder="Choose material" defaultValue={order.material6} required></input></div>
                                    { display6?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku6: data.sku,
                                                            material6: data.name,
                                                            productId6: product.id,
                                                            img6: img
                                                        })
                                                            
                                                        document.getElementById('material6').value = data.name;
                                                        setFilter('');
                                                        
                                                        setTimeout(() => {
                                                            setDisplay6(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity6" onChange={(e,productId,stockWarn,outOS) => handleQuantity(e,order.productId6,'stock-warn6','outOfStock6')} placeholder="Quantity" defaultValue={order.quantity6} required disabled={order.material6 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn6'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content seventh' id='seventh'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 7:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku7:'',material7:'',productId7:'',img7:''}); document.getElementById('seventh').style.display = 'none'; setShow(6)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material7" onChange={searchFunc} onClick={() => {setDisplay7(!display7)}} placeholder="Choose material" defaultValue={order.material7} required></input></div>
                                    { display7?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku7: data.sku,
                                                            material7: data.name,
                                                            productId7: product.id,
                                                            img7: img
                                                        })
                                                            
                                                        document.getElementById('material7').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay7(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity7" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId7,'stock-warn7')} placeholder="Quantity" defaultValue={order.quantity7} required disabled={order.material7 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn7'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content eigth' id='eigth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 8:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku8:'',material8:'',productId8:'',img8:''}); document.getElementById('eigth').style.display = 'none'; setShow(7)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material8" onChange={searchFunc} onClick={() => {setDisplay8(!display8)}} placeholder="Choose material" defaultValue={order.material8} required></input></div>
                                    { display8?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku8: data.sku,
                                                            material8: data.name,
                                                            productId8: product.id,
                                                            img8: img
                                                        })
                                                            
                                                        document.getElementById('material8').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay8(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity8" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId8,'stock-warn8')} placeholder="Quantity" defaultValue={order.quantity8} required disabled={order.material8 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn8'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content ninth' id='ninth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 9:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku9:'',material9:'',productId9:'',img9:''}); document.getElementById('ninth').style.display = 'none'; setShow(8)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material9" onChange={searchFunc} onClick={() => {setDisplay9(!display9)}} placeholder="Choose material" defaultValue={order.material9} required></input></div>
                                    { display9?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku9: data.sku,
                                                            material9: data.name,
                                                            productId9: product.id,
                                                            img9: img
                                                        })
                                                            
                                                        document.getElementById('material9').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay9(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity9" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId9,'stock-warn9')} placeholder="Quantity" defaultValue={order.quantity9} required disabled={order.material9 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn9'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content tenth' id='tenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 10:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku10:'',material10:'',productId10:'',img10:''}); document.getElementById('tenth').style.display = 'none'; setShow(9)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material10" onChange={searchFunc} onClick={() => {setDisplay10(!display10)}} placeholder="Choose material" defaultValue={order.material10} required></input></div>
                                    { display10?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku10: data.sku,
                                                            material10: data.name,
                                                            productId10: product.id,
                                                            img10: img
                                                        })
                                                            
                                                        document.getElementById('material10').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay10(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity10" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId10,'stock-warn10')} placeholder="Quantity" defaultValue={order.quantity10} required disabled={order.material10 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn10'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content eleventh' id='eleventh'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 11:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku11:'',material11:'',productId11:'',img11:''}); document.getElementById('eleventh').style.display = 'none'; setShow(10)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material11" onChange={searchFunc} onClick={() => {setDisplay11(!display11)}} placeholder="Choose material" defaultValue={order.material11} required></input></div>
                                    { display11?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku11: data.sku,
                                                            material11: data.name,
                                                            productId11: product.id,
                                                            img11: img
                                                        })
                                                            
                                                        document.getElementById('material11').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay11(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity11" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId11,'stock-warn11')} placeholder="Quantity" defaultValue={order.quantity11} required disabled={order.material11 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn11'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content twelth' id='twelth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 12:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku12:'',material12:'',productId12:'',img12:''}); document.getElementById('twelth').style.display = 'none'; setShow(11)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material12" onChange={searchFunc} onClick={() => {setDisplay12(!display12)}} placeholder="Choose material" defaultValue={order.material12} required></input></div>
                                    { display12?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku12: data.sku,
                                                            material12: data.name,
                                                            productId12: product.id,
                                                            img12: img
                                                        })
                                                            
                                                        document.getElementById('material12').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay12(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity12" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId12,'stock-warn12')} placeholder="Quantity" defaultValue={order.quantity12} required disabled={order.material12 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn12'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content thirteenth' id='thirteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 13:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku13:'',material13:'',productId13:'',img13:''}); document.getElementById('thirteenth').style.display = 'none'; setShow(12)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material13" onChange={searchFunc} onClick={() => {setDisplay13(!display13)}} placeholder="Choose material" defaultValue={order.material13} required></input></div>
                                    { display13?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku13: data.sku,
                                                            material13: data.name,
                                                            productId13: product.id,
                                                            img13: img
                                                        })
                                                            
                                                        document.getElementById('material13').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay13(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity13" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId13,'stock-warn13')} placeholder="Quantity" defaultValue={order.quantity13} required disabled={order.material13 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn13'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content forteenth' id='forteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 14:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku14:'',material14:'',productId14:'',img14:''}); document.getElementById('forteenth').style.display = 'none'; setShow(13)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material14" onChange={searchFunc} onClick={() => {setDisplay14(!display14)}} placeholder="Choose material" defaultValue={order.material14} required></input></div>
                                    { display14?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku14: data.sku,
                                                            material14: data.name,
                                                            productId14: product.id,
                                                            img14: img
                                                        })
                                                            
                                                        document.getElementById('material14').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay14(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity14" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId14,'stock-warn14')} placeholder="Quantity" defaultValue={order.quantity14} required disabled={order.material14 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn14'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content fifteenth' id='fifteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 15:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku15:'',material15:'',productId15:'',img15:''}); document.getElementById('fifteenth').style.display = 'none'; setShow(14)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material15" onChange={searchFunc} onClick={() => {setDisplay15(!display15)}} placeholder="Choose material" defaultValue={order.material15} required></input></div>
                                    { display15?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku15: data.sku,
                                                            material15: data.name,
                                                            productId15: product.id,
                                                            img15: img
                                                        })
                                                            
                                                        document.getElementById('material15').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay15(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity15" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId15,'stock-warn15')} placeholder="Quantity" defaultValue={order.quantity15} required disabled={order.material15 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn15'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content sixteenth' id='sixteenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 16:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku16:'',material16:'',productId16:'',img16:''}); document.getElementById('sixteenth').style.display = 'none'; setShow(15)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material16" onChange={searchFunc} onClick={() => {setDisplay16(!display16)}} placeholder="Choose material" defaultValue={order.material16} required></input></div>
                                    { display16?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku16: data.sku,
                                                            material16: data.name,
                                                            productId16: product.id,
                                                            img16: img
                                                        })
                                                            
                                                        document.getElementById('material16').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay16(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity16" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId16,'stock-warn16')} placeholder="Quantity" defaultValue={order.quantity16} required disabled={order.material16 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn16'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content seventeenth' id='seventeenth'>
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 17:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku17:'',material17:'',productId17:'',img17:''}); document.getElementById('seventeenth').style.display = 'none'; setShow(16)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material17" onChange={searchFunc} onClick={() => {setDisplay17(!display17)}} placeholder="Choose material" defaultValue={order.material17} required></input></div>
                                    { display17?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku17: data.sku,
                                                            material17: data.name,
                                                            productId17: product.id,
                                                            img17: img
                                                        })
                                                            
                                                        document.getElementById('material17').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay17(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity17" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId17,'stock-warn17')} placeholder="Quantity" defaultValue={order.quantity17} required disabled={order.material17 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn17'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content eighteenth' id='eighteenth' >
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 18:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku18:'',material18:'',productId18:'',img18:''}); document.getElementById('eighteenth').style.display = 'none'; setShow(17)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material18" onChange={searchFunc} onClick={() => {setDisplay18(!display18)}} placeholder="Choose material" defaultValue={order.material18} required></input></div>
                                    { display18?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku18: data.sku,
                                                            material18: data.name,
                                                            productId18: product.id,
                                                            img18: img
                                                        })
                                                            
                                                        document.getElementById('material18').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay18(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity18" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId18,'stock-warn18')} placeholder="Quantity" defaultValue={order.quantity18} required disabled={order.material18 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn18'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content ninteenth' id='ninteenth' >
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 19:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku19:'',material19:'',productId19:'',img19:''}); document.getElementById('ninteenth').style.display = 'none'; setShow(18)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material19" onChange={searchFunc} onClick={() => {setDisplay19(!display19)}} placeholder="Choose material" defaultValue={order.material19} required></input></div>
                                    { display19?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku19: data.sku,
                                                            material19: data.name,
                                                            productId19: product.id,
                                                            img19: img
                                                        })
                                                            
                                                        document.getElementById('material19').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay19(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity19" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId19,'stock-warn19')} placeholder="Quantity" defaultValue={order.quantity19} required disabled={order.material19 === ''?true:false} ></input>
                                    </div>
                                </div>  
                            </div>
                            <p style={{fontSize: '13px', color: 'red',marginLeft:'20px', display:'none'}} id='stock-warn19'>Requested number of item is not available in stock.</p>
                        </div>
                        <div className='bt-row-content' id='twentieth' >
                        <div className='bt-row-container'>
                            <div className='form-row bt'>
                                <p>Material 20:</p>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                <AiOutlineMinusCircle onClick={() => {setOrder({...order,sku20:'',material20:'',productId20:'',img20:''}); document.getElementById('twentieth').style.display = 'none'; setShow(19)}} style={{marginRight: '10px', cursor:'pointer', transform:'translateY(4px)',fontWeight:'700', fontSize:'18px'}}/>
                                <input type="text" autoComplete='off' class="form__input add-input material" id="material20" onChange={searchFunc} onClick={() => {setDisplay20(!display20)}} placeholder="Choose material" defaultValue={order.material20} required></input></div>
                                    { display20?(
                                    <div className='selection-box' >
                                        {
                                            filterData && filterData.map((product,i) => {
                                                const data = product.data.details;
                                                const img = product.data.imgLink[0];
                                                return(
                                                    <div className='product-selection-container' key={i} onClick={() => {
                                                        setLoader(true);
                                                        setOrder({
                                                            ...order,
                                                            sku20: data.sku,
                                                            material20: data.name,
                                                            productId20: product.id,
                                                            img20: img
                                                        })
                                                            
                                                        document.getElementById('material20').value = data.name;
                                                        setTimeout(() => {
                                                            setDisplay20(false)
                                                            setLoader(false);
                                                        },500)
                                                    }}>
                                                    <div>
                                                        <p className='sl-title'>{data.name}</p>
                                                        <div className='lower-sl-box'>
                                                            <p className='sl-info'>SKU: {data.sku}</p>
                                                            <p className='sl-info'>Available: {data.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <img src={img} alt=''></img>
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
                                        <input type="text" autoComplete='off' class="form__input add-input quantity" id="quantity20" onChange={(e,productId,stockWarn) => handleQuantity(e,order.productId20,'stock-warn20')} placeholder="Quantity" defaultValue={order.quantity20} required disabled={order.material20 === ''?true:false} ></input>
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
                            <button className='btn btn-place-order' onClick={handleSubmit}>{id?'Update Order':'Place Order'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrder
    