<template>
    <div class="pageContent">
        <div class="pageHeader">
            Achievement List
        </div> 
        <ElTable :data="data" @row-click="rowClick">
            <ElTableColumn prop="name" label="Name"/>
            <ElTableColumn prop="field" label="Field"/>
            <ElTableColumn prop="value" label="Value"/>
            <ElTableColumn>
                <template #default="scope">
                    <ElButton :icon="Delete" circle @click.stop="() => deleteItem(scope.row)">
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
    </div>
</template>


<script lang="ts" setup>
import { ElTable, ElTableColumn, ElNotification, ElButton } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
const { data, refresh } = await  useAsyncData('achievementList', () => apiFetch('/achievement_list', {method:'post'}))
const router = useRouter()
function rowClick(row, column, cell, event) {
    router.push({
        path:'/Achievements/edit/' + row.achievement_id
    })
}

async function deleteItem(row) {
    
    const body = {
        id: row._id.$oid
    }
    console.log(row, body)
    await apiFetch('achievement_delete', { method:'post', body },  )
    ElNotification({
        title:"Success",
        message:"Item Deleted",
        type: 'success'
    });
    refresh()
}
onMounted(() => refresh())
</script>