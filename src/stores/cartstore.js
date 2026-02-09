import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI } from "../apis/cart";
import { getCartListAPI } from "../apis/cart";
import { deleteCartAPI } from "../apis/cart";

export const useCartStore =  defineStore("cart", () => { 
    const cartList = ref([]);
    const userStore = useUserStore()
     const isLogin = computed(() => userStore.userInfo.token)
    const updateCartList = async() =>{
        const res = await getCartListAPI()
        cartList.value = res.data.result
    }
    const addCart = async(goods) =>{
        if(isLogin.value){
            const {skuId,count} = goods
            await insertCartAPI({skuId,count})
            await updateCartList()
            
        }else{
            const item = cartList.value.find((item)=>goods.skuId === item.skuId)
            if(item){
                item.count+=goods.count
            }else{
                cartList.value.push(goods)
            }
        }
        
    }
    const deleteCart = async(skuId)=>{
        if(isLogin.value){
            await deleteCartAPI([skuId])
            await updateCartList()
        }else{
            const idx = cartList.value.findIndex((item)=>skuId === item.skuId)
            cartList.value.splice(idx,1)
        }
        
        
    }
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    const singleChange = (skuId,selected) =>{
        const item = cartList.value.find((item)=> skuId === item.skuId)
        if(item)
        {
            item.selected = selected
        }
    }
    const allCheck = (selected)=>{
        cartList.value.forEach(item=> item.selected = selected)
    }

    const isAll=computed(()=> cartList.value.every((item)=> item.selected))

    const allSelected = computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count,0))
    const selectedPrice = computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count*c.price,0))

    const clearCart=()=>{
        cartList.value=[]
    }

    return { clearCart,
        cartList,
        addCart,
        deleteCart,
        allCount,
        allPrice,
        singleChange,
        allSelected,
        selectedPrice,isAll,
        allCheck,
        isLogin,
        updateCartList    
    };
},{
     persist: true,
});
