<template>
    <div class="pageContent">
        <div class="pageHeader">New Achievements</div>
        <div class="form">
            <ElForm>
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
                    <ElButton type="primary" @click="submit">Submit</ElButton>
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ElForm , ElFormItem, ElInput, ElButton, ElNotification, ElSelect, ElOption } from 'element-plus';
const router = useRouter();
const { typeOption } = useAchievement()
const data = useState('newAchievement', () => ({
    name:'',
    field:"",
    value:0
}))


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

    await apiFetch('/achievement_create', { method:'post', body:{
        name: data.value.name,
        field: data.value.field,
        value:Number(data.value.value)
    }})
    ElNotification({
            title: 'Success',
            message:'Record Created',
            type: 'success'
        })
    router.push({
        path:'/Achievements/list'
    })
}

</script>
