<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const inputValue = ref('');
const props = defineProps({
    loading:{
        type:Boolean,
        default:false
    }
})
const emit = defineEmits(['send'])
const handleSend=()=>{
    if(!inputValue.value.trim()){
        ElMessage.warning('请输入内容')
        return
    }
    emit('send',inputValue.value.trim())
    inputValue.value = ''
}
const handleNewline = (e)=>{
    e.preventDefault()
    inputValue.value += '\n'
}

</script>

<template>
    <div class="chat-input">
        <el-input
            v-model="inputValue"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 6 }"
            placeholder="输入消息，Enter 发送，Shift + Enter 换行"
            resize="none"
            @keydown.enter.exact.prevent="handleSend"
            @keydown.enter.shift="handleNewline"
        />
        <div class="send-btn-wrapper">
            <button class="send-btn" :disabled="loading" @click="handleSend">
                发送
            </button>
        </div>
    </div>
</template>

<style scoped>

.chat-input{
    padding: 0.8px;
    border: 1px;
    border-radius: 16px;
    display: flex;

}
.send-btn{
    background-color: #27ba9b;
    width: 50px;
    height: 30px;
    font-size: 16px;
    color: white;
    border: 0;
    margin-left: 10px;
}
</style>