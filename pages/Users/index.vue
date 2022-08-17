<template>
    <div class="pageContent">
        <div class="pageHeader">
            User List
        </div>
        <div class="actionList">
            <ElButton @click="$router.push('/Users/add')">Create User</ElButton>
        </div>
        <ElTable :data="data" @row-click="rowClick">
            <ElTableColumn prop="email" label="email"/>
            <ElTableColumn prop="username" label="username"/>
            <ElTableColumn prop="mobileCountryCode" label="countryCode">
               
            </ElTableColumn>
            <ElTableColumn prop="mobile" label="Phone">
            </ElTableColumn>

            <ElTableColumn>
                <template #default="scope">
                    <ElButton :icon="Delete" circle @click.stop="() => deleteItem(scope.row)" :disabled="scope.row.username ? scope.row.username.includes('system_') : true">
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
    </div>
</template>


<script lang="ts" setup>
import { ElTable, ElTableColumn, ElNotification, ElButton } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
const { data, refresh } = await  useAsyncData('achievementList', () => apiFetch('/user_list', {method:'post'}))
const router = useRouter()
function rowClick(row, column, cell, event) {
    router.push({
        path:'/Users/edit/' + row.achievement_id
    })
}

async function deleteItem(row) {
    
    const body = {
        id: row._id.$oid
    }
    await apiFetch('user_delete', { method:'post', body },  )
    ElNotification({
        title:"Success",
        message:"Item Deleted",
        type: 'success'
    });
    refresh()
}
onMounted(() => refresh())
</script>