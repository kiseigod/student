<template>
    <div>
        <el-tree
        :data="menus"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        ref="tree">
        </el-tree>
        <el-button @click="getCheckedNodes">通过node获取</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menus: [],
            defaultProps: {
                label: 'name',
                children:'children'
            }
        }
    },
    created() {
        this.menus = [...this.$router.options.routes]
            // 权限管理和动态路由的思路： 根据不同的用户登录，返回对应的路由权限菜单
            // 一般通过树形控件达到权限精准控制,根据不同的角色，勾选不同的菜单权限，将菜单数据提交给后端进行保存
            // 后端保存之后，在用户进行登录的时候就会查询该用户所拥有的菜单数据，最后进行动态的渲染展示
            // 动态添加路由使用 router.addRoutes方法,后续使用router.addRoute方法进行
    },
    methods: {
        getCheckedNodes() {
            let arr = this.$refs.tree.getCheckedNodes()
            console.log(arr);
        }
    }
}
</script>