<script setup>
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutFixed from './components/LayoutFixed.vue';

import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';
const categoryStore = useCategoryStore();
onMounted(()=>{
    categoryStore.getList();
})
</script>

<template>
    <div>
        <LayoutFixed />
        <LayoutNav />

        <LayoutHeader />
        <router-view :key="$route.fullPath" />
        <LayoutFooter />

    </div>
</template>