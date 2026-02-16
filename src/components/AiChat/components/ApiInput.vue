<script setup>
    import { ref,watch,computed } from 'vue';
    import { useSettingStore,modelOptions } from '@/stores/setting';
    const settingStore = useSettingStore();
    const loading = ref(false);

    const currentMaxTokens = computed(()=>{
        const selectedModel = modelOptions.find(item=>item.value===settingStore.settings.model)
        return selectedModel ? selectedModel.maxTokens : 4096;
    })
    
    watch(
        ()=>settingStore.settings.model,
        (newModel)=>{
            const selectedModel = modelOptions.find(item=>item.value===newModel)
            if(selectedModel){
                settingStore.settings.maxTokens = Math.min(
                    settingStore.settings.maxTokens,
                    selectedModel.maxTokens
                )
            }
        }
    )

    console.log(settingStore.settings.model)

</script>

<template>
   <div class="setting-container">
    <div class="setting-label-row">模型选择</div>
    <el-select v-model="settingStore.settings.model" placeholder="Select" style="width: 240px">
        <el-option
        v-for="item in modelOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
         @input="(val) => console.log('input:', val)"
        />
        
    </el-select>
   </div>
   <div class="setting-item">
        <div class="setting-label-row">
            <div class="label-with-tooltip">
                <span>流式响应</span>
                
            </div>
            <el-switch v-model="settingStore.settings.stream" />
        </div>
   </div>
    <div class="setting-item">
        <div class="setting-label-row">
            <div class="label-with-tooltip">
                <span>API key</span>
                
            </div>
            <el-input
            v-model="settingStore.settings.apiKey"
            type="password"
            placeholder="请输入API key"
            show-password
            />
        </div>
   </div>
   <div class="setting-item">
        <div class="setting-label-row">
          Max Tokens
        </div>
        <div class="setting-control">
          <el-slider
            v-model="settingStore.settings.maxTokens"
            :min="1"
            :max="currentMaxTokens"
            :step="1"
            :show-tooltip="false"
            class="setting-slider"
          />
          <el-input-number
            v-model="settingStore.settings.maxTokens"
            :min="1"
            :max="currentMaxTokens"
            :step="1"
            controls-position="right"
          />
        </div>
      </div>

</template>

<style scoped>

    .setting-container{
        padding: 0.8px;
        border: 1px;
        border-radius: 16px;
        display: flex;
    }
    .setting-label-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        color: #27272a;
    }

</style>