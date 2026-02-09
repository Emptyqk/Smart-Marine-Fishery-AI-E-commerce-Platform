import httpInstance from "@/utils/http";
export const getCheckoutAPI=()=>{
    return httpInstance({
        url:'/member/order/pre'
    })
}
export const createOrderAPI=(data)=>{
    return httpInstance({
        url:'/member/order',
        method:'POST',
        data
    })
}

export const addAddressAPI=(data)=>{
    return httpInstance({
        url:'/member/address',
        method:'POST',
        data
    })
}

export const getAddressListAPI = () => {
  return httpInstance({
    url: '/member/address',
  })
}

export const deleteAddressAPI = (id)=>{
    return httpInstance({
        url:`/member/address/${id}`,
        method:'DELETE'
    })
}

export const editAddressAPI=(id,data)=>{
    return httpInstance({
        url:`/member/address/${id}`,
        method:'PUT',
        data
    })
}