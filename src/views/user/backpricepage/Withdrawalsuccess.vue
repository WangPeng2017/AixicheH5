<template>
    <div class="view">
        <x-header :left-options="{backText: ''}" class="vux-1px-b">提现成功</x-header>
        <div class="content">
            <div class="left">
                <i class="withdrawsuccess"></i>
            </div>
            <div></div>
            <div class="rightq">
                <h2>申请提现成功!</h2>
                <p>提现金额 ：￥{{$route.params.price}}</p>
                <p>手续费   ：￥{{$route.params.charge}}</p>
                <p>实到金额 ：￥{{$route.params.actual}}</p>
            </div>
            <button @click="$router.push('/myimmediately')">确定</button>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.content {
    height: 320px;
    background-color: #fff;
    .left {
        width: 30%;
        margin: 10% 0 10% 16%;
        float: left;
    }
    .rightq {
        h2{
            color: #ff0036;
        }
        p{
            margin-bottom: 3px;
        }
        width: 70%;
        margin-left:15%;
        margin-top: 8%;
    }
    button{
        width:467px;
        height:72px;
        background:rgba(255,0,54,1);
        border-radius:36px;
        border:0;
        position:fixed;
        top: 40%;
        left:20%;
        font-size: 32px;
        color: #fff;
    }
}
</style>

