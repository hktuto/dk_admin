<template>
  <div class="pageContent">
        Home
    </div>  
</template>

<script lang="ts" setup>

const router = useRouter()


onMounted(() => {
  router.push({
    path:'/Users'
  })
})

</script>


