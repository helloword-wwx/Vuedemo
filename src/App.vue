<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
        <router-view></router-view>
        
    </div>

</template>

<script>
    export default {

        data() {
            return {
                name: 'heima'
            }
        },
        methods: {

        }
    }
</script>

<style>
    .tmpl {
        color: red;
    }
</style>