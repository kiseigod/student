<!-- 学生信息列表封装之前的写法 -->
<template>
    <div class="infoList">
         <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item>
                <el-button type="primary" @click="addStudent">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column prop="father" label="父亲" align="center"></el-table-column>
            <el-table-column prop="mather" label="母亲" align="center"></el-table-column>
            <el-table-column prop="address" label="家庭住址" align="center"></el-table-column>
            <el-table-column prop="time" label="入校时间" align="center"></el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="state ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model.trim="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                    <el-input v-model.trim="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
                    <el-input v-model="form.father" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mather">
                    <el-input v-model="form.mather" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model.trim="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
                    <el-date-picker 
                        v-model="form.time" 
                        format="yyyy 年 MM 月 dd 日" 
                        value-format="yyyy-MM-dd"
                        type="date" 
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeInfo('form')">取 消</el-button>
                <el-button type="primary" @click="sure('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {info,getInfo,infoDel} from '@/api/api.js'
export default {
    data () {
        return {
            tableData: [],
            dialogFormVisible: false,
            form: {
                name: '',
                sex: '1',
                age: '',
                father: '',
                mather: '',
                address: '',
                time: '',
                phone: '',
            },
            formLabelWidth:'80px',
            rules: {
                name: [{ required: true, message: '请输入姓名' }],
                sex: [{required: true}],
                age: [{required: true,message: '请输入年龄' }],
                address: [{required: true,message: '请输入地址' }],
                time: [{required: true,message: '请输入入学时间' }],
                phone: [{required: true,message: '请输入联系方式' }],
            },
            state: true,
            total:0
        }
    },
    created(){
        this.getData()
    },
    methods: {
        // 点击新增的弹窗
        addStudent() {
            this.form = {
                name: '',
                sex: '1',
                age: '',
                father: '',
                mather: '',
                address: '',
                time: '',
                phone: '',
            },
            this.state = true
            this.dialogFormVisible = true
        },
        // 点击修改的弹窗
        edit(row) {
            this.form = {...row}
            this.state = false
            this.dialogFormVisible = true
        },
        //删除
        del(row) {
            this.$alert('你确定删除吗？', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                    infoDel(row.id).then(res => {
                        if (res.data.status === 200) {
                            this.getData()
                            this.$message({message:res.data.message,type:'success'})
                        }
                    })
                }
            })
        }, 
        //获取
        getData() {
            getInfo().then(res => {
                if (res.data.status === 200) {
                    this.tableData = res.data.data
                    this.total = res.data.total
                    this.tableData.forEach(item => {
                        item.sex === "1" ? item.sex_text = '男' : item.sex_text = "女"
                    })
                }
            })
        },
        // 点击弹窗取消按钮
        closeInfo(form) {
            this.$refs[form].resetFields()
            this.dialogFormVisible = false
        },
        // 点击弹窗确定按钮
        sure(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    if (this.state) {
                        //新增
                        info('post',this.form).then(res => {
                            if (res.data.status === 200) {
                                this.getData()
                                this.dialogFormVisible = false
                                this.$refs[form].resetFields()
                                this.$message({type:'success',message: res.data.message})
                            }
                        })
                    } else {
                        // 修改
                        info('put',this.form).then(res => {
                            if (res.data.status === 200) {
                                this.getData()
                                this.dialogFormVisible = false
                                this.$refs[form].resetFields()
                                this.$message({type:'success',message: res.data.message})
                            }
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
.infoList{
    .demo-form-inline,.el-form-item{
        text-align: left;
    }
    .el-pagination{
        text-align: left;
        margin-top: 20px;
    }
}
</style>