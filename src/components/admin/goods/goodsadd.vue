<template>
	<div class="tmpl">
		<el-row>
			<el-col :span='24'>
				<!-- 面包屑 -->
				<div class="abread bt-line">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path: '/admin/goodslist' }">返回上一层</el-breadcrumb-item>
						<el-breadcrumb-item :to="{path:'/admin/goodslist'}">购物商城</el-breadcrumb-item>
						<el-breadcrumb-item :to="{path:'/admin'}">首页</el-breadcrumb-item>
						<el-breadcrumb-item>新增内容</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</el-col>
		</el-row>
		<!-- 表单元素布局 -->
		<el-row>
			<el-col :span="19">
				<el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">					
		    			<el-form-item label="标题" prop="title">
								<el-input v-model="form.title"></el-input>
							</el-form-item>
							<el-form-item label="副标题" prop="sub_title">
								<el-input v-model="form.sub_title"></el-input>
							</el-form-item>				
							<el-form-item label="类别" prop="category_id">
								<el-select v-model="form.category_id" placeholder="请选择">
									<el-option v-for="(cate,index) in categorylist" :key="index" :label="cate.title" :value="cate.category_id">
										<span v-for="count in (cate.class_layer-1)">&nbsp;</span>
										<span v-if="cate.class_layer>1">|-</span>
										<span v-text="cate.title"></span>
									</el-option>
								</el-select>
							</el-form-item>
						
					<el-form-item label="是否发布">
							<el-switch v-model="form.status" on-text="是" off-text="否"></el-switch>
					</el-form-item>

					<el-form-item label="推荐类型">
							<el-switch v-model="form.is_slide" on-text="轮播图" off-text="不轮播"></el-switch>
							<el-switch v-model="form.is_top" on-text="置顶" off-text="不置顶"></el-switch>
							<el-switch v-model="form.is_hot" on-text="推荐" off-text="不推荐"></el-switch>
					</el-form-item>		

						<el-form-item label="上传封面图">
							<el-upload class="upload-demo" :on-success="imgUploaded" action="http://157.122.54.189:9095/admin/article/uploadimg" :file-list="form.imgList" list-type="picture">
								<el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>

						<el-form-item label="上传相册图">
							<el-upload class="upload-demo" :on-success="fileUploaded" action="http://157.122.54.189:9095/admin/article/uploadfile" :file-list="form.fileList" list-type="picture">
								<el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>
					<el-form-item label="商品货号" prop="goods_no">
						<el-input v-model="form.goods_no"></el-input>
					</el-form-item>
					<el-form-item label="库存数量" prop="stock_quantity">
						<el-input v-model="form.stock_quantity"></el-input>
					</el-form-item>
					<el-form-item label="市场价格" prop="market_price">
						<el-input v-model="form.market_price"></el-input>
					</el-form-item>
					<el-form-item label="销售价格" prop="sell_price">
						<el-input v-model="form.sell_price"></el-input>
					</el-form-item>
					<el-form-item label="摘要" prop="zhaiyao">
						<el-input v-model="form.zhaiyao"></el-input>
					</el-form-item>
					<el-form-item label="详细描述">
						<quill-editor v-model="form.content"></quill-editor>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    import {
        quillEditor
    } from 'vue-quill-editor'
    export default {
        components: {
            quillEditor
        },
        data() {
            var checkNumber = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                if (isNaN(value)) {
                    return callback(new Error('请输入数字'));
                } else {
                    callback();
                }
            };
            return {
                categorylist: [],
                form: {
                    title: '',
                    sub_title: '',
                    category_id: '',
                    status: true,
                    is_slide: true,
                    is_top: false,
                    is_hot: true,
                    goods_no: '',
                    stock_quantity: 1,
                    market_price: 1,
                    sell_price: 1,
                    zhaiyao: '1',
                    content: '',
                    imgList: [],
                    fileList: []
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    goods_no: [{
                        required: true,
                        message: '请输入商品编号',
                        trigger: 'blur'
                    }],
                    stock_quantity: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    market_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    sell_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            this.getCatelist()
        },

        methods: {
            //当相册图片上传完毕的回调函数-->多个商品有多个相册图片
            fileUploaded(response, file, fileList) {
                //实现多张.需用push
                this.form.fileList.push(response)
            },
            //当封面图片上传完毕的回调函数
            imgUploaded(response, file, fileList) {
                //fikeList的值就是当前上传的所有图片
                //file 的值就是当前上传图片的返回对象.
                //response 就是当次的相应对象
                // console.log(response)
                // console.log(file)
                // console.log(fileList)
                this.form.imgList = [response] //单张封面图片
            },
            //获取数据借口中的分类数据的数组
            getCatelist() {
                this.$http.get('/admin/category/getlist/goods')
                    .then(res => {
                        this.categorylist = res.data.message;
                    });
            },
            //点击创建发送ajax请求完成新增
            submitForm(formref) {
                this.$refs[formref].validate((valid) => {
                    //如果表单的所有元素都正常填写,那么返回true
                    if (valid) {
                        //aja提交数据进行新增操作
                        this.$http.post('/admin/goods/add/goods', this.form)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.$message.error(res.data.message);
                                    return;
                                }
                                //数据新增成功后跳转到商品列表页面
                                this.$router.push({
                                    name: 'goodslist'
                                })
                            })
                    } else {
                        console.log('no....')
                        return false;
                    }
                })
            },
            //重置表单.
            resetForm(formref) {
                this.$refs[formref].resetFields()
            }
        }
    }
</script>
<style scoped>

</style>