import { loginAPI } from "@/apis/login";
import {ref}from 'vue'
import { defineStore } from "pinia";
import { useCartStore } from "./cartstore";
import { mergeCartAPI } from "../apis/cart";
export const useUserStore = defineStore('user',()=>{
    const cartStore = useCartStore()
    const userInfo = ref({})
    const getUserInfo = async({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.data.result
        mergeCartAPI(cartStore.cartList.map(item=>{
                return {
                    skuId:item.skuId,
                    count:item.count,
                    selected:item.selected
                }
            }))
            cartStore.updateCartList()
    }
    const clearUserInfo = ()=>{
        userInfo.value = {}
        cartStore.clearCart()
    }
    return {userInfo,getUserInfo,clearUserInfo}
},{
     persist: true,
}
)