<template>
    <ElContainer class="layout-container-demo">
        <ElAside>
            <ElScrollbar>
                <UiMenu v-model:isCollapse="isCollapse"/>
            </ElScrollbar>
            <div class="collapseContainer" @click="isCollapse = !isCollapse">

            <ElIcon >
                <ArrowLeft v-if="!isCollapse" />
                <ArrowRight v-else />
            </ElIcon>
            </div>
        </ElAside>
        <ElContainer>
            <!-- <ElHeader>
                header
            </ElHeader> -->
            <ElMain>
                <ElScrollbar>
                    <slot />
                </ElScrollbar>
            </ElMain>
        </ElContainer>
        
    </ElContainer>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElScrollbar, ElHeader, ElMain, ElIcon } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const isCollapse = useState('isCollapse', ()=> false);
</script>

<style scoped>
.layout-container-demo{
    height: 100vh;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary);
  color: var(--el-text-color-primary);
  
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-9);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.el-aside{
    display: grid;
    grid-template-rows: 1fr min-content;
}
.collapseContainer{
    padding: var(--el-menu-base-level-padding);
    cursor: pointer;
}
</style>