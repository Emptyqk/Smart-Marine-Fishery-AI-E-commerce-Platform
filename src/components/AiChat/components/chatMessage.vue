<script setup> 
import copyIcon from '@/assets/photo/复制.png'
import successIcon from '@/assets/photo/成功.png'
import likeIcon from '@/assets/photo/赞.png'
import likeActiveIcon from '@/assets/photo/赞2.png'
import dislikeIcon from '@/assets/photo/踩.png'
import dislikeActiveIcon from '@/assets/photo/踩2.png'
import regenerateIcon from '@/assets/photo/重新生成.png'
import { onMounted,ref } from 'vue'
const props = defineProps({
    message:{
        type:Object,
        required:true
    },
    isLastMessage:{
        type:Boolean,
        default:false
    }
})
const isLiked = ref(false)
const isDisLiked = ref(false)
const isCopied = ref(false)
const emit = defineEmits(['regenerate'])
const handleCopy = async()=>{
    await navigator.clipboard.writeText(props.message.content)
    isCopied.value = true
    setTimeout(()=>{
        isCopied.value = false
    },2000)
}
const handleLike = ()=>{
    if(isDisLiked.value){
        isDisLiked.value = false
        isLiked.value = true
    }else{
        isLiked.value = !isLiked.value
    }
}
const handleDisLike = ()=>{
    if(isLiked.value){
        isLiked.value = false
        isDisLiked.value = true
    }else{
        isDisLiked.value = !isDisLiked.value
    }
}
const handleRegenerate = ()=>{ 
    emit('regenerate')
}



</script>

<template>
     <div class="chat-message" :class="[message.role === 'user' ? 'user-message' : 'ai-message']">
        <div v-if="message.loading" class="thinking-text">
            <img src="@/assets/photo/加载中.png" alt="loading" class="loading-icon" />
            <span>思考中</span>
        </div>
        <div v-else class="message-content">
            {{ message.content }}
        </div>
        <div v-if="message.role === 'assistant' && !message.loading" class="button-groups">
            <button class="action-btn" @click="handleRegenerate">
                <img :src="regenerateIcon" alt="regenerate" />
            </button>
            <button class="action-btn" @click="handleCopy">
                <img :src="isCopied?successIcon:copyIcon" data-tooltip="复制" alt="copy" />
            </button>
            <button class="action-btn" @click="handleLike" data-tooltip="喜欢">
                <img :src="isLiked ? likeActiveIcon : likeIcon" alt="like" />
            </button>
            <button class="action-btn" @click="handleDisLike" data-tooltip="不喜欢">
                <img :src="isDisLiked ? dislikeActiveIcon : dislikeIcon" alt="dislike" />
            </button>
        </div>
        
    </div>
    
    

</template>

<style scoped>
.chat-message {
    margin-bottom: 16px;
    padding: 12px;
    border-radius: 12px;
    max-width: 80%;
}

.user-message {
    background-color: #e3f2fd;
    align-self: flex-end;
    margin-left: auto;
}

.ai-message {
    background-color: #f5f5f5;
    align-self: flex-start;
}

.message-content {
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.5;
}

.thinking-text {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
}

.loading-icon {
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.button-groups {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    justify-content: flex-end;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.action-btn:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.action-btn img {
    width: 16px;
    height: 16px;
}
</style>