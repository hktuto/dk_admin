<template>
    <div class="pageContent">
        <div class="pageHeader">Edit User Group</div>
        <div class="form">
            <ElForm v-if="data">
                <ElFormItem label="Name">
                    <ElInput v-model="data.name" />
                </ElFormItem > 
                <ElFormItem label="Description">
                    <ElInput v-model="data.desc" />
                </ElFormItem > 
                <ElFormItem label="user">
                    <ElSelect v-model="data.user" multiple >
                        <ElOption v-for="item in displayUserList" :key="item" :value="item.user_id" :label="item.username" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="Parent Group">
                    <ElSelect v-model="data.parentId" >
                        <ElOption v-for="item in userGroup" :key="item" :value="item.name" :label="item.name" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="limit">
                    <ElInput v-model="data.limit" />
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
const route = useRoute();

const { data } = await useAsyncData('GroupDetail', () => apiFetch('/userGroup/getOne/' + route.params.id, {method:'post', body:{}}))
const { data:userList, refresh } = await useAsyncData('userList', () => apiFetch('/user_list', {method:'post'}))
const { data:userGroup } = await  useAsyncData('userGroupList', () => apiFetch('/userGroup/all', {method:'get'}))
const displayUserList = computed(() => userList.value.filter(i => i.user_id && i.username))


async function submit() {
    if(!data.value.name || !data.value.limit) {
        ElNotification({
            title: 'Warning',
            message:'Please fill in all required field',
            type: 'error'
        })
    }
    if(Number(data.value.limit) === NaN) {
        ElNotification({
            title: 'Warning',
            message:'Value must be number',
            type: 'error'
        })
    }

    await apiFetch('/userGroup/update', { method:'post', body:{
        user_group_id: data.value.user_group_id,
        name: data.value.name,
        parentId:data.value.parentId,
        user: data.value.user,
        limit:Number(data.value.limit)
    }})
    ElNotification({
            title: 'Success',
            message:'Record Updated',
            type: 'success'
        })
}

</script>
