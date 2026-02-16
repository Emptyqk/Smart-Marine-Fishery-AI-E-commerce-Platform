<script setup>
import { ref } from 'vue';
import ChatPanel from './components/chatPanel.vue';
const isOpen = ref(false); 
const toggle = ()=>{
    isOpen.value = !isOpen.value;

}
</script>

<template>
    <div class="ai-chat-float">
        <div class="chat-toggle-btn" v-if="!isOpen" @click="toggle">
        🤖
        </div>
        <chat-panel v-show="isOpen" @close="toggle" />
    </div>
</template>
<style scoped>
    .ai-chat-float{
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 9999;
    
    }
    .chat-toggle-btn{
        width: 50px;
        height: 50px;
        color: white;
        background-color: #27ba9b;
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: 24px;
        transition: background-color 0.2s;
    }
    .chat-toggle-btn:hover{
        transform: scale(1.1);
    }
</style>