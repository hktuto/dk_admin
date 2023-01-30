<template>
    <div class="pageContent">
        <div class="pageHeader">
            Create User Group
        </div>
        <div class="form">
            <ElForm>
                <ElFormItem label="Name">
                    <ElInput v-model="data.name" />
                </ElFormItem > 
                <ElFormItem label="user">
                    <ElSelect v-model="data.user" multiple >
                        <ElOption v-for="item in displayUserList" :key="item" :value="item.user_id" :label="item.username" />
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
const router = useRouter();

const { data:userList, refresh } = await  useAsyncData('userList', () => apiFetch('/user_list', {method:'post'}))

const displayUserList = computed(() => userList.value.filter(i => i.user_id && i.username))
const data = useState('newAchievement', () => ({
    name:'',
    user_group_id:'',
    user:[],
    limit:10
}))

async function submit() {
    if(!data.value.name || !data.value.limit ) {
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

    await apiFetch('/userGroup/create', { method:'post', body:{
        name: data.value.name,
        user_group_id: data.value.name,
        user: data.value.user,
        limit:Number(data.value.limit)
    }})
    ElNotification({
            title: 'Success',
            message:'Record Created',
            type: 'success'
        })
    router.push({
        path:'/User-Group/list'
    })
}
</script>