<script setup>
import { fetchHotGoodsAPI } from '@/apis/detail';
import { ref,  computed } from 'vue';
import { useRoute } from 'vue-router';


const props = defineProps({
    hottype:{
        type: Number,
        default: 1
    }
})

const titleMap = {
    1: '24小时榜单',
    2: '周热榜单'
}
const title = computed(()=>titleMap[props.hottype])
console.log(title)



const route = useRoute();
const hotlist = ref([])
const reqData = ref({
    id: route.params.id,
    type: props.hottype

})
const getHotlist = async()=>{
    const res = await fetchHotGoodsAPI(reqData.value)
    hotlist.value = res.data.result
}
    getHotlist()

</script>


<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <!-- 商品区块 -->
    <RouterLink  class="goods-item" v-for="item in hotlist" :to="`/detail/${item.id}`" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{item.name}}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>