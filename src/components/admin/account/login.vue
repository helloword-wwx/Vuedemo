<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="accounttmpl">
        <el-row>
            <el-col :span="8" :offset="6">
                <el-form :model="form" :rules="rules" ref="form1"> 
                    <el-form-item label="帐号" prop="uname">
                        <el-input type="text" v-model="form.uname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="upwd">
                        <el-input type="password"  v-model="form.upwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                       <el-button type="success" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row> 
    </div>
</template>

<script>
    export default {

        data() {
            return {
                form: {
                    uname: '',
                    upwd: ''
                },
                rules: {
                    uname: [{
                        requied: true,
                        message: '请输入帐号',
                        trigger: "blur"
                    }],
                    upwd: [{
                        requied: true,
                        message: '请输入密码',
                        trigger: "blur"
                    }]
                }
            }
        },
        //页面生成完成后 钩子函数mounted
        mounted() {
            document.getElementsByTagName('body')[0].style.backgroundColor = '#0094ff';
        },
        //当login.vue组件销毁的时候会出发beforedestroy.destoryed这两个组件,通过这两个组件让页面颜色变回颜色
        beforeDestroy() {
            document.getElementsByTagName('body')[o].style.backgroundColor = 'white'
        },
        methods: {
            //登录请求
            login() {
                this.$refs.form1.validate(valid => {
                    if (valid) {
                        //将用户名和密码post请求到登录接口
                        this.$http.post('/admin/account/login', this.form)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.$message.error(res.data.message);
                                    return;
                                }
                                //正常跳转.使用vue-roter的编程导航
                                this.$router.push({
                                    name: 'layout'
                                });
                            })
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

<style>

</style>