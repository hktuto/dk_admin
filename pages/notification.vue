<template>
    <div class="pageContent">
        <div class="pageHeader">New Notification</div>
        <div class="form">
             <ElForm >
                <ElFormItem label="Name">
                    <ElInput v-model="form.title" />
                </ElFormItem >
                <ElFormItem label="Message">
                    <ElInput v-model="form.message" type="textarea"/>
                </ElFormItem>
                <ElFormItem label="Group">
                    <ElSelect v-model="form.group" multiple >
                        <ElOption v-for="item in group" :key="item.user_group_id" :value="item.user_group_id" :label="item.name" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="Emotion">
                    <ElSelect v-model="form.emotion" multiple>
                        <ElOption v-for="item in emotion" :key="item" :value="item" :label="item" />
                    </ElSelect>
                </ElFormItem>
                
                <ElFormItem>
                    <ElButton type="primary" @click="submit">Submit</ElButton>
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElForm , ElFormItem, ElInput, ElButton, ElNotification, ElSelect, ElOption } from 'element-plus';

const { data:group, refresh } = await  useAsyncData('userGroupList', () => apiFetch('/userGroup/all', {method:'get'}))
const emotion = ref(['Appreciation','Happiness','Trust','Frustration','Doubt','Anger','Guilt','Grief']);

const form = ref({
    title:"",
    message: "",
    group:[],
    emotion:[],
})
</script>