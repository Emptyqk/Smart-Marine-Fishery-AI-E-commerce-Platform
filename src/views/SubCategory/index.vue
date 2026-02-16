<script setup>
import { ref, onMounted,computed } from 'vue'
import { getCategoryFilterAPI } from '@/apis/category';
import { useRoute } from 'vue-router'; 
import { getSubCategoryAPI } from '@/apis/category';  
import GoodsItem from '../Home/components/GoodsItem.vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
const list = ref([])
const route = useRoute()
const getList = async()=>{
  const res = await getCategoryFilterAPI(route.params.id)
  list.value = res.data.result
}
  getList()

const goods = ref([])
const reqData = ref({
  categoryId:route.params.id,
  page:1,
  pageSize:20,
  sortField:'publishTime'
})
const getGoods = async()=>{
  console.log('tab切换了', reqData.value.sortField)
  const res = await getSubCategoryAPI(reqData.value)
  goods.value = res.data.result.items

}
onMounted(()=>{
  getGoods()
})

const tabChange=()=>{
  reqData.value.page = 1
  getGoods()
}
const disabled = ref(false)
const load = async()=>{
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goods.value = [...goods.value,res.data.result.items]
  if(res.data.result.items.length ===0){
    disabled.value = true
  }
}

const columnPerRow = 5
const rows = computed(()=>{
  const res = []
  for(let i =0;i<goods.value.length;i+=columnPerRow){
    res.push({
      id:`row-${i}`,
      goods:goods.value.slice(i,i+columnPerRow)
    })
  }
  return res
})
const rowHeight = 320
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to=" `/category/${list.parentId}` ">{{ list.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item >{{ list.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container" >
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange()">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <recycle-scroller class="scroller" :items="rows" :item-size="rowHeight" key-field="id" v-slot="{item:row}">
          <div class="row">
            <goods-item v-for="good in row.goods" :good="good" :key="good.id" />
          </div>
        </recycle-scroller>
      </div>
      <!--<div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">-->
         <!-- 商品列表-->
          <!--<goods-item v-for="good in goods" :good="good" :key="good.id" />-->
      <!--</div>-->
    </div>
  </div>

</template>



<style lang="scss" scoped>
.scroller{
  height: 100%;
  width: 100%;
}
.row{
  display: flex;
  flex-wrap: wrap;
}
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    overflow: auto;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>