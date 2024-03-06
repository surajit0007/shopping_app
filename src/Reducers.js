import { createSlice,current } from "@reduxjs/toolkit";


const ecommerce=createSlice({

    name: 'ecommerce Product',
    initialState: {

        ecoProduct:[],
        inputVal:[],
        total:0

    },
    reducers:{
        
        addItem: (state, action)=>{

            state.ecoProduct.push(action.payload)

            state.inputVal.push(action.payload)

            state.ecoProduct= state.ecoProduct.filter((item1,index)=>{

                return index ==  state.ecoProduct.findIndex((item2)=>{

                    return item1.id == item2.id
                })
            })   

            state.inputVal= state.inputVal.filter((inputvalue,inputvalueindex)=>{

                return inputvalueindex ==  state.ecoProduct.findIndex((inputvalue2)=>{

                    return inputvalue.id == inputvalue2.id
                })
            })

            state.total= state.inputVal.reduce((x,y)=>{
                return x+ y.price
            },0)

            // console.log(state.total)
            
            // console.log(state.ecoProduct)
            // console.log(current(state.inputVal))
            

        },

        removeItem: (state,action)=>{
            state.ecoProduct=state.ecoProduct.filter((mainProducts)=>{
                return mainProducts.id != action.payload
            })
            
            state.inputVal=state.inputVal.filter((deleteInputVal)=>{
                return deleteInputVal.id != action.payload
            })

            state.total= state.inputVal.reduce((x,y)=>{
                return x+ y.price
            },0)

            // console.log(state.inputVal)
        },
        inputValAdd:(state,action)=>{
             // state.inputVal=[{...inputvalue,inputval:action.payload.inputval}]

            state.inputVal.push(action.payload)


            state.inputVal.forEach((v,idx)=>{
                if(v.id==action.payload.id){
                    state.inputVal[idx]=action.payload
                }
            })

            state.inputVal= state.inputVal.filter((newitem1,index3)=>{
                return index3 ==state.inputVal.findIndex((newitem2)=>{
                    return newitem1.id==newitem2.id
                })
            })

                state.total= state.inputVal.reduce((x,y)=>{
                    return x+ y.price
                },0)
            
                // console.log(state.total)
            // console.log(state.inputVal)

        }
    }

})

export const {addItem, removeItem,inputValAdd} = ecommerce.actions

export default ecommerce.reducer
