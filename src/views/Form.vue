<template>
	<el-form ref="form" label-width="80px" v-loading="loading">
		<el-form-item>
			<brace style="height: 700px; border:1px solid #ccc"
      :fontsize="'12px'"
      :theme="'monokai'"
      :mode="'javascript'"
      :codefolding="'markbegin'"
      :softwrap="'free'"
      :selectionstyle="'text'"
      :highlightline="true"
			v-html="form.init"
			@code-change="dslUpdate">
    </brace>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit()">创建</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import Brace from 'vue-bulma-brace'
	import { saveApi } from '../api/api'

	export default {
		data() {
			return {
				loading: false,
				form: {
					init: `({
	name: '服务名称, 必须是英文，用于该服务对外暴露接口的path',
	version: 0.1,
	priority: 0,
	description: '服务描述',
	type: 'rest',
	method: 'get',
	tasks: []
})`,
					newDsl: ''
				}
			}
		},
		methods: {
			dslUpdate(dsl){
				this.form.newDsl = dsl;
			},
			onSubmit() {
				this.loading = true;
				if(this.form.newDsl === ''){
					this.loading = false;
					this.$message({
						message: '服务定义不能为空',
						type: 'error'
					});
				}else{
					saveApi(this.form.newDsl).then(res=>{
						this.loading = false;
						this.$message({
							message: '新增成功',
							type: 'success'
						});
						this.$router.push({ path: '/api-lists' });
					}).catch(err=>{
						this.loading = false;
						this.$message({
							message: err.response.data || err,
							type: 'error'
						});
					});
				}
			}
		},
		components: {
			Brace
		}
	}

</script>
