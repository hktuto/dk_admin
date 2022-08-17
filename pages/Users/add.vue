<template>
    <div class="pageContent">
        <div class="pageHeader">
            Create User
        </div>
        <div class="action">
            <ElButton @click="$router.push('/Users')" >Back</ElButton>
        </div>
        <div class="orm">
            <ElForm label-position="top">
                <ElFormItem label="username">
                    <ElInput />
                </ElFormItem>
                <ElFormItem label="email">
                    <ElInput />
                </ElFormItem>
                 <ElFormItem label="Country code">
                    <ElInput />
                </ElFormItem>
                <ElFormItem label="mobile">
                    <ElInput />
                </ElFormItem>
                <ElFormItem label="Password">
                    <ElInput />
                </ElFormItem>
                <ElFormItem label="Confirm Password">
                    <ElInput />
                </ElFormItem>
                <ElFormItem>
                    <ElButton>Submit</ElButton>
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ElForm, ElInput, ElFormItem, ElButton, ElNotification } from 'element-plus'
    const router = useRouter()

    const form = ref({
        username:"",
        email:"",
        mobileCountryCode:"",
        mobile:"",
        password:"",
        confirmPassword: ""
    });

    async function submit() {
        if(!form.value.username || !form.value.email || !form.value.mobileCountryCode || !form.value.mobile || !form.value.password || !form.value.confirmPassword) {
            ElNotification({
                title:"Fail",
                message:"Required field missing",
                type:"error"
            });
            return;
        }
        if(form.value.password !== form.value.confirmPassword) {
             ElNotification({
                title:"Fail",
                message:"Password and confirm password not match",
                type:"error"
            });
            return;
        }
        try{
            await apiFetch('register', {
                method:'post',
                body: {
                    "provider":"email",
                    username: form.value.username,
                    email: form.value.email,
                    password: form.value.password,
                    mobileCountryCode: form.value.mobileCountryCode
                }
            })
            ElNotification({
                type:'success',
                title:"Success",
                message:"User has created"
            });
            router.push('/Users')
            } catch(error: Error) { 
                ElNotification({
                    type:'error',
                    title:"Fail",
                    message:"User has created"
                });
            }
                
        }
    }
</script>