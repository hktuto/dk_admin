<template>
<div class="pageContent">
    <div class="pageHeader">User Group</div>
    <div class="functionList">
        <nuxt-link to="/User-Group/list" class="fn">
            List User group
        </nuxt-link>
        <nuxt-link to="/User-Group/add" class="fn">
            Create User group
        </nuxt-link>
    </div>
</div>
</template>

<style lang="scss" scoped>
.functionList{
    margin-block: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    .fn{
        padding: 12px;
        background: var(--el-color-info-light-8);
        border-radius: 6px;
        transform: scale(1);
        transition: transform .2s ease-in-out;
        cursor: pointer;
        &:hover, &:focus-visible {
            transform: scale(1.03);
        }
    }
}
</style>