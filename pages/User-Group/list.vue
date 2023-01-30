<template>
    <div class="pageContent">
        <div class="pageHeader">
            User group list
        </div>
        <div class="actionList">
            <ElButton @click="$router.push('/User-Group/add')">Create User Group</ElButton>
        </div>
        <ElTable :data="displayUserGroup" @row-click="rowClick">
            <ElTableColumn prop="name" label="name"/>
            <ElTableColumn prop="parentId" label="parentId"/>
            <ElTableColumn prop="user" label="user" >
                <template #default="scope">
                    <div class="userRow">
                        <ElTag v-for="user in displayUserInGroup(scope.row.user)" :key="user.user_id">{{user.username}}</ElTag>
                    </div>
                </template>
            </ElTableColumn>
            <ElTableColumn>
                <template #default="scope">
                    <ElButton :icon="Delete" circle @click.stop="() => deleteItem(scope.row)" >
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
    </div>

</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElNotification, ElButton, ElTag } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
const { data, refresh } = await  useAsyncData('userGroupList', () => apiFetch('/userGroup/all', {method:'get'}))

const displayUserGroup = computed(() => data.value.filter( group => group.user_group_id ))
const { data:userList } = await  useAsyncData('userList', () => apiFetch('/user_list', {method:'post'}))

const displayUserList = computed(() => userList.value.filter(i => i.user_id && i.username))

const displayUserInGroup = (ids:string[]) => {
    return displayUserList.value.filter( u => ids.includes(u.user_id))
}

const router = useRouter()
function rowClick(row, column, cell, event) {
    router.push({
        path:'/User-Group/edit/' + row.user_group_id
    })
}

async function deleteItem(row) {
    
    const body = {
        user_group_id: row.user_group_id
    }
    await apiFetch('/userGroup/delete', { method:'post', body },  )
    ElNotification({
        title:"Success",
        message:"Item Deleted",
        type: 'success'
    });
    refresh()
}
onMounted(() => refresh())
</script>

<style scoped>
.userRow{
    display: flex;
    flex-flow: row wrap;
    gap: 12px;
}
</style>