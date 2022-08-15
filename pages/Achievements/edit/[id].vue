<template>
    <div class="pageContent">
        <div class="pageHeader">Edit Achievements</div>
        <div class="form">
            <ElForm >
                <ElFormItem label="Name">
                    <ElInput v-model="data.name" />
                </ElFormItem > 
                <ElFormItem label="Field">
                    <ElSelect v-model="data.field" >
                        <ElOption v-for="item in typeOption" :key="item" :value="item" :label="item" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="Value">
                    <ElInput v-model="data.value" />
                </ElFormItem>
                <ElFormItem>
                    <ElButton @click="() => refresh()">Refresh</ElButton>
                    <ElButton type="primary" @click="submit">Submit</ElButton>
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ElForm , ElFormItem, ElInput, ElButton, ElNotification, ElSelect, ElOption } from 'element-plus';
const route = useRoute();
const { typeOption } = useAchievement()
const { data, refresh } = await useAsyncData('achievementDetail', () => apiFetch('/achievement_read', {method:'post', body: {
    id: route.params.id
}}))

async function submit() {
    if(!data.value.name || !data.value.field || !data.value.value) {
        ElNotification({
            title: 'Warning',
            message:'Please fill in all required field',
            type: 'error'
        })
    }
    if(Number(data.value.value) === NaN) {
        ElNotification({
            title: 'Warning',
            message:'Value must be number',
            type: 'error'
        })
    }

    await apiFetch('/achievement_update', { method:'post', body:{
        id: data.value.achievement_id,
        name: data.value.name,
        field: data.value.field,
        value:Number(data.value.value)
    }})
    ElNotification({
            title: 'Success',
            message:'Record Updated',
            type: 'success'
        })
}

onMounted(() => refresh())
</script>
