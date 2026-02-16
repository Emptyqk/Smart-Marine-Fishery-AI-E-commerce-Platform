import { useSettingStore } from "@/stores/setting";

const API_BASE_URL = 'https://api.siliconflow.cn/v1'
export const ChatAPI = async(messages) => { 
    const settingStore = useSettingStore()
    const payload = { 
        model: settingStore.settings.model,
        messages,
        stream: settingStore.settings.stream,
        max_tokens: settingStore.settings.maxTokens,
        temperature: settingStore.settings.temperature,
        top_p: settingStore.settings.topP,
        top_k: settingStore.settings.topK,
    }
    const options={
        method: 'POST',
        headers:{
            Authorization: `Bearer ${settingStore.settings.apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }
     try {
    const startTime = Date.now() // 用于非流式速度计算
    const response = await fetch(`${API_BASE_URL}/chat/completions`, options)

    if (!response.ok) {
      // 尝试获取错误详情（如后端返回的错误信息）
      let errorDetail = ''
      try {
        const errorData = await response.json()
        errorDetail = JSON.stringify(errorData)
      } catch (e) {
        errorDetail = response.statusText
      }
      throw new Error(`HTTP error ${response.status}: ${errorDetail}`)
    }

    // 如果开启流式，直接返回 Response 对象，由调用方处理流式读取
    if (settingStore.settings.stream) {
      return response
    }

    // 非流式：解析 JSON 并计算速度
    const data = await response.json()
    const duration = (Date.now() - startTime) / 1000 // 秒
    if (data.usage && data.usage.completion_tokens) {
      data.speed = (data.usage.completion_tokens / duration).toFixed(2) // tokens/秒
    }
    return data
  } catch (error) {
    console.error('Chat API Error:', error)
    throw error // 重新抛出，让调用方处理
  }
}
