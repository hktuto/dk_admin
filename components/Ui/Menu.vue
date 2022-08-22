<template>
    <ElMenu :collapse="isCollapse" :default-active="defaultActive" >
        <ElMenuItem index="/"  @click="$router.push('/')">
            <ElIcon> <HomeFilled /> </ElIcon>
             <template #title>Home</template>
        </ElMenuItem>
         <ElMenuItem index="/Achievements"  @click="$router.push('/Achievements')">
            <ElIcon> <Star /> </ElIcon>
             <template #title>Achievement</template>
        </ElMenuItem>
        

        <ElMenuItem index="/Users"  @click="$router.push('/Users')">
            <ElIcon> <User /> </ElIcon>
             <template #title>User</template>
        </ElMenuItem>

        <!-- <ElMenuItem index="/User-Group"  @click="$router.push('/User-Group')">
            <ElIcon> <User /> </ElIcon>
             <template #title>User Group</template>
        </ElMenuItem> -->
    </ElMenu>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon} from 'element-plus'
import { Star, HomeFilled, User } from '@element-plus/icons-vue'

defineProps<{
    isCollapse: boolean
}>();
const defaultActive = useState('menuActive',()=>"/");
const route = useRoute()


onMounted(() => {
    defaultActive.value = route.matched[0].path
})




</script>

<style lang="scss" scoped>
.el-menu{
    // padding: var(--app-padding, 12px);
}
</style>