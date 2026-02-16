<script setup>
defineProps({
  good:{
    type:Object,
    default:()=>{}
  }
})
</script>

<template>
<RouterLink to="/" class="goods-item">
              <img v-img-lazy="good.picture" alt="" />
              <p class="name ellipsis">{{ good.name }}</p>
              <p class="desc ellipsis">{{ good.desc }}</p>
              <p class="price">&yen;{{ good.price }}</p>
            </RouterLink>
</template>
<!-- .goods-item 上下内边距：20px + 20px = 40px
图片高度：160px
三个 <p> 标签，每个都有 padding-top: 10px，共计 30px
  三个 <p> 的内容高度：

名称（.name）：字体 16px，假设行高 1.5 ≈ 24px

描述（.desc）：固定高度 29px

价格（.price）：字体 20px，假设行高 1.5 ≈ 30px
40 + 160 + 30 + 24 + 29 + 30 = 313px 
-->
<style lang="scss">
.goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

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
</style>