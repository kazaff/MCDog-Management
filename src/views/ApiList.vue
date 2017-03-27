<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="warning" @click="getApi()">刷新</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="apis" highlight-current-row v-loading="loading" style="width: 100%;" height="700" stripe>
				<el-table-column prop="name" label="名称" width="180" sortable>
				</el-table-column>
				<el-table-column prop="version" label="版本号" width="100" sortable>
				</el-table-column>
				<el-table-column prop="type" label="类型" width="100" sortable>
				</el-table-column>
				<el-table-column prop="method" label="方法" width="100" sortable>
				</el-table-column>
				<el-table-column prop="description" label="描述" min-width="180">
				</el-table-column>
				<el-table-column prop="state" label="状态" width="100">
					<template scope="scope">
						<el-switch v-model="scope.row.state" @change="()=>{onSwitch(scope.row)}" >
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<el-button type="danger" size="small" :disabled="scope.row.state===true" @click="()=>{deleteApi(scope.row, scope.$index)}"><i class="el-icon-delete"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getApiList, changeState, deleteApi } from '../api/api'

	export default {
		data() {
			return {
				loading: false,
				apis: []
			}
		},
		methods: {
			//获取接口列表
			getApi: function () {
				this.loading = true;
				getApiList().then((res) => {
					let data = [];
					for(let i = 0, max = res.data.length; i < max; i++){
						let item = {};

						item.id = res.data[i].path;
						item.state = res.data[i].state == 1;

						let tmp = res.data[i].path.split('_');
						item.name = '/' + tmp[2];
						item.version = tmp[3];
						item.type = tmp[0];
						item.method = tmp[1];

						tmp = eval('(' + res.data[i].dsl + ')');
						item.description = tmp.description;

						data.push(item);
					}

					this.apis = data;
					this.loading = false;
				}).catch(err=>{
					this.loading = false;
					this.$message({
						message: err.message,
						type: 'error'
					});
					console.error(err.response.data);
				});
			},
			onSwitch: function(item){
				this.loading = true;
				changeState(item).then(res => {
					this.loading = false;
				}).catch(err=>{
					item.state = !item.state;
					this.loading = false;
					this.$message({
						message: err.message,
						type: 'error'
					});
					console.error(err.response.data);
				});
			},
			deleteApi: function(item, index){
				this.loading = true;
				deleteApi(item).then(res=>{
					this.loading = false;
					this.apis.splice(index, 1);
				}).catch(err=>{
					this.loading = false;
					this.$message({
						message: err.message,
						type: 'error'
					});
					console.error(err.response.data);
				});
			}
		},
		mounted() {
			this.getApi();
		}
	};

</script>

<style scoped>

</style>
