import { ref,onMounted } from 'vue'
import { getBannerListAPI } from '@/apis/home'
export function useBanner(){
    const banner = ref([]);
    const getBanner = async() =>{
    const res = await getBannerListAPI({
        distributionSite:'2'
    });
    banner.value = res.data.result
    }
    onMounted(()=>{
        getBanner();
    })
    return {banner}
}