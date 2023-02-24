<template>
    <div>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 6, 7, 8, 9, 10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :url="url">
        </el-pagination>
    </div>
</template>

<script>
import {getTableData} from '@/utils/table.js'
export default {
    props: {
        "total": Number,
        "url":String
    },
    data () {
        return {
            page: 1, //当前页数
            size: 7, //每页显示条数
        }
    },
    created() {
        getTableData(this.$parent,'/works',{page:this.page,size:this.size},['completed'])
    },
    methods: {
        // 每页条数
        handleSizeChange(val) {
            this.$parent.size = val
            this.$parent.page = 1
           getTableData(this.$parent,'/works',{page:this.page,size:val},['completed'])
        },
        // 当前页数
        handleCurrentChange(val) {
            this.$parent.page = val
            getTableData(this.$parent,'/works',{page:val,size:this.size},['completed'])
        },
    }
}
</script>