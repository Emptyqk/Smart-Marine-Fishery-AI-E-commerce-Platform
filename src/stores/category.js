import { ref} from 'vue'
import { defineStore } from 'pinia'
import { getCategoryListAPI } from '@/apis/layout'
export const useCategoryStore = defineStore('category', () => {
  const list = ref([])
  const getList = async()=>{
    const res = await getCategoryListAPI()
    list.value = res.data.result
  }
  return {list,getList}
})
