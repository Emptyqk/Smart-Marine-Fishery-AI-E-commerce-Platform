import { ref } from 'vue'
import { ChatAPI } from '@/apis/chat'

export function useChat() {
    const messages = ref([]) 
    const loading = ref(false)

    const sendMessage = async (content) => {
        if (!content || !content.trim()) return

        // 用户消息
        const userMsg = {
            id: crypto.randomUUID(),
            content: content.trim(),
            role: 'user',
            timestamp: Date.now()
        }
        messages.value.push(userMsg)

        // AI 占位消息（loading）
        const assistantMsg = {
            id: crypto.randomUUID(),
            content: '',
            role: 'assistant',
            loading: true,
            timestamp: Date.now()
        }
        messages.value.push(assistantMsg)

        loading.value = true
        try {
            // 构造发送给 API 的消息列表（过滤掉 loading 消息）
            const apiMessages = messages.value
                .filter(m => !m.loading)
                .map(m => ({
                    role: m.role,
                    content: m.content
                }))

            const res = await ChatAPI(apiMessages)
            const reply = res?.data?.result?.content || '抱歉，我暂时无法回答。'

            // 更新 AI 消息
            const index = messages.value.findIndex(m => m.id === assistantMsg.id)
            if (index !== -1) {
                messages.value[index] = {
                    ...assistantMsg,
                    content: reply,
                    loading: false
                }
            }
        } catch (error) {
            console.error('Chat error:', error)
            const index = messages.value.findIndex(m => m.id === assistantMsg.id)
            if (index !== -1) {
                messages.value[index] = {
                    ...assistantMsg,
                    content: '网络错误，请稍后重试。',
                    loading: false
                }
            }
        } finally {
            loading.value = false
        }
    }

    return {
        messages,
        loading,
        sendMessage
    }
}