import httpInstance from "@/utils/http";
export function getCategoryListAPI(){
    return httpInstance({
        url:'/home/category/head'
    })
}
    