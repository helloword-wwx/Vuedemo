<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
        catelist
        {{this.$store.state.global.menuid}}
    </div>

</template>

<script>
    export default {

        data() {
            return {

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