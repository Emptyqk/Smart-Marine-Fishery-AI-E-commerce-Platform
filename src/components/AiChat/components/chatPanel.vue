<script setup>
import { ref, nextTick } from 'vue'
import ChatMessage from './chatMessage.vue'
import ChatInput from './chatInput.vue'
import { useChat } from '../composables/useChat.js'
import ApiInput from './ApiInput.vue'


const { messages, loading, sendMessage } = useChat()
const messageContainer = ref(null)

const handleSend = async (content) => {   
    if (!content.trim()) return
    await sendMessage(content)
    await nextTick()
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
}

const handleRegenerate = (messageId) => {
    const index = messages.value.findIndex(item => item.id === messageId)
    if (index > 0) {
        const userMessage = messages.value[index - 1]
        if (userMessage.role === 'user') {
            sendMessage(userMessage.content)
        }
    }
}
</script>

<template>
    <div class="chat-panel">
        <div class="chat-header">
            <div class="header-left">
                <div class="ai-avatar">🤖</div>
                <div class="ai-info">
                    <h3>语聊助手</h3>
                </div>
            </div>
            <button class="close-btn" @click="$emit('close')">×</button>
        </div>

        <div class="chat-messages" ref="messageContainer">
            <div v-if="!messages || messages.length === 0" class="empty-state">
                <div class="empty-avatar">🤖</div>
                <p class="empty-text">您好！我是语聊助手，有什么可以帮您的吗？</p>
            </div>
            <div v-else class="messages-list">
                <ChatMessage
                    v-for="message in messages"
                    :key="message.id"
                    :message="message"
                    :is-last-message="message === messages[messages.length - 1]"
                    @regenerate="handleRegenerate(message.id)"
                />
            </div>
        </div>

        <div class="chat-footer">
            <ChatInput
                :loading="loading"
                @send="handleSend"
            />
            <div class="footer-note">
                <span>AI助手可能会犯错，请核实重要信息。</span>
            </div>
            <ApiInput />
        </div>
    </div>
</template>

<style scoped>
.chat-panel {
    width: 400px;
    max-height: 600px;
    background: #fff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.chat-header {
    padding: 16px;
    background-color: #27ba9b;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.ai-avatar {
    width: 40px;
    height: 40px;
    background-color: white;
    color: #27ba9b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.ai-info h3 {
    margin: 0;
    font-size: 16px;
}

.close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s;
}
.close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background-color: #fafafa;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
}

.empty-avatar {
    width: 80px;
    height: 80px;
    background-color: #e8f5e9;
    color: #27ba9b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    margin-bottom: 16px;
}

.empty-text {
    color: #666;
    font-size: 14px;
    max-width: 80%;
}

.messages-list {
    display: flex;
    flex-direction: column;
}

.chat-footer {
    padding: 16px;
    background-color: white;
    border-top: 1px solid #eee;
}

.footer-note {
    margin-top: 8px;
    text-align: center;
}
.footer-note span {
    font-size: 12px;
    color: #999;
}
</style>