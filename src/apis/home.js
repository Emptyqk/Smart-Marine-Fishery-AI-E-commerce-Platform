import httpInstance from "@/utils/http";
export function getBannerListAPI(params={}){
    const {distributionSite = '1'} = params
    return httpInstance({
        
        url:'/home/banner',
        params:{
            distributionSite
        }
    })
}
export function getNewListAPI(){
    return httpInstance({
        url:'/home/new'
    })
}

export function getHotListAPI(){
    return httpInstance({
        url:'/home/hot'
    })
}

export function getGoodsAPI(){
  return httpInstance({
    url: '/home/goods'
  })
}