import React from 'react'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import {addItem, removeItem,inputValAdd} from '../Reducers'






function EcommerceItem(){

    setTimeout(()=>{

        let activeButton=document.querySelectorAll('.category_button')
        activeButton.forEach((b)=>{
            b.addEventListener('click',(e)=>{
                // b.setAttribute('id','active')
                // let a= document.querySelector('#active')
                // a.removeAttribute('id')
                document.getElementById('active').removeAttribute('id')
    
                e.target.setAttribute('id','active')
    
            })
        })

    })
    


    let ecommerceProducts=useSelector(state =>state.ecoProduct)

    let inputValue=useSelector(state =>state.inputVal)

    let total=useSelector(state =>state.total)

    let dispatch=useDispatch()

    let [toggle,settoggle]=useState(true)

    let [mainEcoProduct,setmainEcoProduct]=useState([])
    
    let [categoryButton,setcategoryButton]=useState([])

    let [showCategory,setShowCategory]=useState('')

    // let [input,setInput]=useState(1)



    function toggler(){
        if(toggle==true){
            settoggle(false)
        }

        else if(toggle==false){
            settoggle(true)
        }

    }

    useEffect(()=>{
        
        axios.get('https://fakestoreapi.com/products')
        .then((product)=>{

            // console.log(product.data)
            setmainEcoProduct(product.data)
            
        })



    },[])



    // console.log(ecommerceProducts) 




    return(
        <>
        <div className='wrapper'> 

             <div className='header'>

                 <img width='10%' src="https://png.pngtree.com/template/20190927/ourmid/pngtree-e-commerce-logo-template-image_311731.jpg" alt="" />
            
                 <h1 className='heading'>Ecommerce Product</h1>

                 <i onClick={toggler} className="fa-solid fa-cart-shopping" id="cart_Button"></i>
                 
                 

             </div>

            <div className='Sidebar_and_ecommerce_container'>

            
            <div className='cartBar' style={{opacity:!toggle ? '1' : '0'}} >

<div style={{backgroundColor:'white',width:'100%', padding:'40px', color:'black', display:inputValue.length==0 ? 'block': 'none'}}> Cart is Empty</div>

    <h4 className='total' style={{display:inputValue.length==0 ? 'none' : 'block'}}>Total Price: {total}</h4>
   
    <div className='all_cart_items' style={{marginBottom:inputValue.length==0 ? '0' : '65px'}}>
    {
        
       ecommerceProducts.map((newProduct)=>{
        
        return(
            <>
            <div className='cart_iteams_wrapper'>
                <img src={newProduct.image} alt="" width='10%' height='auto' />
                <h4>{newProduct.title}</h4>
                <h5>$ {newProduct.price}</h5>
                <input className='input_box' type="number" defaultValue='1' min='1' max='5'  onChange={(e)=>{dispatch(inputValAdd({id:newProduct.id, inputval:e.target.value, price:e.target.value*newProduct.price}))}}/>
                <button className='delete_button' onClick={()=>{dispatch(removeItem(newProduct.id))}}><i className="fa-solid fa-trash"></i></button>
            </div>
            
            </>
        )
       })
    }
    </div>


                    
    

             </div>    


                <div className='sidebar_wrapper'>

                <div className='sideBar'> 

                <button className='category_button' id='active' onClick={(e)=>{setShowCategory('')}}> All Product</button>

                    {
                    
                    categoryButton.map((buttons)=>{
                        
                        return(
                            
                            <>
                            
                            <button className='category_button' onClick={(e)=>{setShowCategory(e.target.innerText)}}> {buttons}</button>
                            
                             </>
                        
                        )
                    
                    })
                        

                    }

                </div>

                </div>

                <div className='ecommerce_container'>


                    {
                        mainEcoProduct.map((mainProduct)=>{

                            if(!categoryButton.includes(mainProduct.category)){
                                // console.log(mainProduct.category)
                                setcategoryButton([...categoryButton,mainProduct.category])
                            }

                            // console.log(mainProduct.category.name)

                            if(showCategory==mainProduct.category){

                                return(
                                    <>
                                    <div className='card'>
    
                                        <img src={mainProduct.image} alt="" width='100%' />
                                        
                                        <div className='card_text'>
                                            <h3>{mainProduct.title}</h3>
                                            <p> {mainProduct.description}</p>
                                            <div className='cart_text'> <p> $ {mainProduct.price}</p> <button className='add_to_cart' onClick={()=>{dispatch(addItem({id:mainProduct.id,title:mainProduct.title,image:mainProduct.image, price:mainProduct.price}) )}} id={mainProduct.id}>Add To Cart</button></div>
                                        </div>
                        
                        
                                    </div>  
    
                                    </>
                                )

                            }
                            else if(!showCategory){

                                return(
                                    <>
                                    <div className='card'>
    
                                        <img src={mainProduct.image} alt="" width='100%' />
                                        
                                        <div className='card_text'>
                                            <h3>{mainProduct.title}</h3>
                                            <p> {mainProduct.description}</p>
                                            <div className='cart_text'> <p> $ {mainProduct.price}</p> <button className='add_to_cart' onClick={()=>{dispatch(addItem({id:mainProduct.id,title:mainProduct.title,image:mainProduct.image, price:mainProduct.price}) )}} id={mainProduct.id}>Add To Cart</button></div>
                                        </div>
                        
                        
                                    </div>  
    
                                    </>
                                )
                            }


                        })
                    }
                  


                </div>
            
            </div>



        </div>
        
        </>
    )
}


export default EcommerceItem