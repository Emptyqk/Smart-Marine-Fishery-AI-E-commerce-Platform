<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue';
import { useBanner } from './composables/useBanner';
import { useCategory } from './composables/useCategory';

const {banner} = useBanner()
const {list} = useCategory()

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{list.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <div class="home-banner">
            <el-carousel height="500px" motion-blur>
            <el-carousel-item v-for="item in banner" :key="item.id">
                <img :src="item.imgUrl" :alt="item.hrefUrl">
            </el-carousel-item>
            </el-carousel>
        </div>
        <div class="sub-list">
            <h3>全部分类</h3>
            <ul>
                <li v-for="i in list.children" :key="i.id">
                <RouterLink :to="`/category/sub/${i.id}`">
                    <img :src="i.picture" />
                    <p>{{ i.name }}</p>
                </RouterLink>
                </li>
            </ul>
        </div>
            <div class="ref-goods" v-for="item in list.children" :key="item.id">
            <div class="head">
                <h3>- {{ item.name }}-</h3>
            </div>
            <div class="body">
                <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
            </div>
        </div>
    </div>
  </div>

</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 500px;
  }
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