import { getTopCategoryAPI } from '@/apis/category';
import { ref,onMounted } from 'vue';
import { useRoute,onBeforeRouteUpdate } from 'vue-router';
export function useCategory(){
    const list = ref([])
    const route = useRoute()
    const getList = async(id = route.params.id)=>{

        const res = await getTopCategoryAPI(id)
        list.value = res.data.result
    }
        onMounted (()=>getList())
        onBeforeRouteUpdate((to)=>{
            getList(to.params.id)
        })
    return {list}
}