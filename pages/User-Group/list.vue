<template>
    <div class="pageContent">
        <div class="pageHeader">
            User group list
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElNotification, ElButton } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
const { data, refresh } = await  useAsyncData('achievementList', () => apiFetch('/achievement_list', {method:'post'}))
</script>