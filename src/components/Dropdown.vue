<template>
    <div class = "menu-item">
        <a href="#">
            {{title}}
        </a>
        </div>    
</template>

<script>

export default ({
    name : 'dropdown',
    props : ['title', 'items']
})
</script>

<style scoped>

</style>