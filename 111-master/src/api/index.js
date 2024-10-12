import requests from './request.js'

//获取商品详情接口
export function getCommodityById(data){
    return requests({
        url: '/reception/getCommodityById',
        method: 'post',
        data
    })
}
// 登录接口
export function login(data) {
    return requests({
        url: '/user/login', // url: 接口地址
        method: 'post',       // method: 接口类型 | get | post 或者其他
        data: data            // data: 传递给接口请求的参数
    })
}
//添加商品到购物车
export function addDataList(data){
    return requests({
        url: '/cart/addCart',
        method: 'post',
        data: data
    })
}
//关键字模糊查询接口
export function commodityToName(data){
    return requests({
        url: '/reception/getCommodityByName',
        method: 'post',
        data: data
    })
}
// 获取购物车列表数据的接口
export function getDataList(data) {
    return requests({
        url: '/cart/getCart',
        method: 'post',
        data: data
    })
}

// 获取商品列表数据接口  此接口不需要传参，因此没有data
export function getShoppingData(data) {
    return requests({
        url: '/reception/getCommodity_user',
        method: 'post',
        data: data
    })
}


//商品类型
export function commodityType_user(data){
    return requests({
        url:'http://192.168.11.1:8081/api/reception/commodityType_user',
        method:'get',
        data:data
    })
}
//删除
export function deleteCart(data){
    return requests ({
        url:'cart/deleteCart',
        method:'delete',
        data:data
    })
}

//刷新
export function updateCart(data){
    return requests({
        url:'cart/updateCart',
        method:'post',
        data:data
    })
}

//获取用户个人信息
export   function myMessage(data){
    return requests({
        url:'/person/myMessage',
        method:'post',
        data:data
    })
}

//修改用户信息
export   function updateMyMessage(data){
    return requests({
        url:'/person/updateMyMessage',
        method:'put',
        data:data
    })
}

//修改密码
export   function updateMyPassword(data){
    return requests({
        url:'/person/updateMyPassword',
        method:'put',
        data:data
    })
}

//添加地址
export   function address(data){
    return requests({
        url:'/address/addAddress',
        method:'post',
        data:data
    })
}

export   function addAddress(data){ 
    return requests({
        url:'/address/addAddress',
        method:'post',
        data:data
    })
}
export   function deleteAddress(data){ 
    return requests({
        url:'/address/deleteAddress',
        method:'delete',
        data:data
    })
}
export   function getAddress1(data){ 
    return requests({
        url:'/address/getAddress1',
        method:'post',
        data:data
    })
}
export   function setDefaultAddress(data){ 
    return requests({
        url:'/address/setDefaultAddress',
        method:'post',
        data:data
    })
}
export   function updateAddress(data){ 
    return requests({
        url:'/address/updateAddress',
        method:'put',
        data:data
    })
}

//获取地址
export   function agetaddress(data){
    return requests({
        url:'/address/getAddress1',
        method:'post',
        data:data
    })
}

//获取订单
export   function getcart(data){
    return requests({
        url:'/cart/getCart',
        method:'post',
        data:data
    })
}

//根据购物车id在确认订单页面获取购物车商品
export function getCartMessage(data){
    return requests({
        url:'/cart/getCartMessage',
        method:'post',
        data:data
    })
}

//添加订单
export function addOrder(data){
    return requests({
        url:'/order/addOrder',
        method:'post',
        data:data
    })
}