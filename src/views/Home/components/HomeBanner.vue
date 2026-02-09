<script setup>
import { getBannerListAPI } from '@/apis/home';
import { onMounted, ref } from 'vue';
const banner = ref([]);
const getBanner = async() =>{
  const res = await getBannerListAPI();
  banner.value = res.data.result
}
onMounted(()=>{
  getBanner();
})

</script>


<template>
    <div class="home-banner">
        <el-carousel height="500px" motion-blur>
        <el-carousel-item v-for="item in banner" :key="item.id">
            <img :src="item.imgUrl" :alt="item.hrefUrl">
        </el-carousel-item>
        </el-carousel>
    </div>

</template>

<style scoped>
.home-banner{
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>