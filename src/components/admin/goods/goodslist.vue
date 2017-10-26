<template>
	<!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
	<div class="arttmpl">
		<el-row>
			<el-col :span='24'>
				<div class="abread bt-line">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path:'/admin' }">购物商城</el-breadcrumb-item>
						<el-breadcrumb-item>内容管理</el-breadcrumb-item>
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</el-col>
		</el-row>
		<div class="operation">
			<el-row>
				<el-col :span='6'>
					<el-button @click="selectAll"> 
						</i> 全选
					</el-button>
					<router-link to="/admin/goodsadd">
						<el-button>新增</el-button>
					</router-link>
					<el-button @click='deldata'>
						 删除
					</el-button>
				</el-col>
				<el-col :span='4' :offset='14'>
					<el-input placeholder="请输入搜索条件" icon="search" v-model="searchValue" :on-icon-click="getlist">

					</el-input>
				</el-col>
			</el-row>
		</div>
		<el-row>
			<el-col :span='24'>
				<el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" @selection-change="getrows">
					<el-table-column width="80" type='selection'>	
						<!-- <span class="el-checkbox__inner"></span> -->
					</el-table-column>
					<el-table-column prop="title" label="标题">
					<template scope='scope'>
						<router-link v-bind='{to:"/admin/goodsedit/"+scope.row.id}'>
								{{scope.row.title}}
						</router-link>
					</template>
</el-table-column>
<el-table-column prop="categoryname" label="类别" width="100">
</el-table-column>
<el-table-column label="发布人/发布时间" width="180">
    <template scope="scope">
							{{scope.row.user_name}} / {{scope.row.add_time | dateftm('YYYY-MM-DD')}}
						</template>
</el-table-column>
<el-table-column prop="name" label="属性" width='130'>
    <template scope='scope'>
				<el-tooltip class="item" effect="dark"   v-bind="{content:(scope.row.is_slide==1?'进入轮播图':'不进入轮播图')}" placement="bottom">
						<i v-bind="{ class:'el-icon-picture ls' +(scope.row.is_slide ==1 ?'imgative':'')}" ></i>
				</el-tooltip>
				<i v-bind="{class:'el-icon-upload ls '+ (scope.row.is_top==1?'imgactive':'')}"></i>
				<i v-bind="{class:'el-icon-star-on ls '+ (scope.row.is_hot==1?'imgactive':'')}"></i>
		</template>
</el-table-column>
<el-table-column label="操作" width='80'>
    <template scope="scope">
							<router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
								<el-button type="success" size='mini'>操作</el-button>
							</router-link>
						</template>
</el-table-column>
</el-table>
</el-col>
</el-row>
<el-row>
    <el-col :span='24'>
        <el-pagination @size-change="sizeChange" @current-change="changePage" :current-page="currentPage" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-col>
</el-row>
</div>
</template>

<script>
    export default {

        data() {
            return {
                ids: '',
                searchValue: '',
                list: [],
                //每页数据
                pageSize: 5,
                //当前页数
                currentPage: 1,
                //总条数
                total: 0
            }
        },

        methods: {
            selectAll() {
                var rows = this.list;
                if (rows) {
                    //遍历数组的每个对象(代表一行)
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);

                    });
                } else {
                    //将当前行的checkbox反选
                    this.$refs.multipleTable.clearSelection();
                }
            },
            deldata() {
                if (this.ids.length <= 0) {
                    this.$message.error('请勾选你要删除的数据');
                    return;
                }
                this.$confirm('确认删除数据吗?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get('/admin/goods/del' + this.ids)
                        .then(res => {
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            }
                            this.getlist()
                        });

                }).cath(() => {

                });
            },
            //修改菜单id
            upatemenuid() {
                // alert(123)
                this.$store.dispatch('changeMenuID', '1-2')
            },
            //当用户改变分页组件中的也容量的时候出发的函数
            sizeChange(currentSize) {
                this.pageSize = currentSize;
                this.getlist()
            },
            changePage(pageindex) {
                this.currentPage = pageindex;
                this.getlist()
            },
            getlist() {
                var url = 'http://157.122.54.189:9095/admin/goods/getlist?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message)
                        return;
                    }
                    this.list = res.data.message;
                    //将总条数赋值给total
                    this.total = res.data.totalcount
                });
            },
            tableRowClassName(row, index) {
                if (index % 2 == 0) {
                    return 'info-row';
                } else {
                    return 'positive-row'
                }
            },
            getrows(rows) {
                this.ids = '';
                var splitchar = ',';
                for (var i = 0; i < rows.length; i++) {
                    if (i == rows.length - 1) {
                        splitchar = ''
                    }
                    this.ids += rows[i].id + splitchar;
                }
                console.log(this.ids)
            }
        },
        created() {
            this.getlist();
            this.deldata();
        },
    }
</script>

<style>

</style>