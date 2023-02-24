<template>
    <div class="notfound">
        <div class="wrapper">
            <div class="big">网页不见了！</div>
            <div>首页瞧瞧,点击<router-link to="/">这里</router-link>进入首页</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss">
.notfound{
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    .big{
        color: #fff;
        font-size: 50px;
        margin: 100px auto;
        text-align: center;
    }
    div{
        color: #fff;
        font-size: 30px;
        text-align: center;
    }
} 


</style>