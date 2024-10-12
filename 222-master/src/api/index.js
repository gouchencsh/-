import requests from './request.js'


export function commodityType(data){
    return requests({
        url: '/admin/commodityType',
        method: 'get',
        data
    })
}

export function typeDelete(data){
    return requests({
        url:'/admin/commodityType',
        method:'delete',
        data
    })
}

export function addType(data){
    return requests({
        url:'/admin/commodityType',
        method:'post',
        data:data
    })
}

//添加商品信息
export function addCommodity(data) {
    return requests({
        url: '/admin/addCommodity',
        method: 'post',
        data:data
    })
}

//删除商品信息
export function deleteCommodity(data) {
    return requests({
        url: '/admin/deleteCommodity',
        method: 'delete',
        data:data
    })
}

//获取商品信息 分页 模糊查询
export function getCommodity(data) {
    return requests({
        url: '/admin/getCommodity',
        method: 'post',
        data: data
    })
}

//修改商品信息
export function updateCommodity(data) {
    return requests({
        url: '/admin/updateCommodity',
        method: 'post',
        data: data
    })
}

// 获取商品类型 名与路径不同
export function get_commodityType(data) {
    return requests({
        url: '/admin/commodityType',
        method: 'get',
        data: data
    })
}

//后台 查询所有的订单 和其所有的信息
export function getAllOrderList(data) {
    return requests({
        url: '/order/getAllOrderList',
        method: 'post',
        data: data
    })
}
//删除订单
export function deleteOrder(data) {
    return requests({
        url: '/order/deleteOrder',
        method: 'post',
        data:data
    })
}
export function editType(data){
    return requests({
        url:'/admin/commodityType1',
        method:'post',
        data:data
    })
}

// 修改订单
export function updateOrder(data) {
    return requests({
        url: '/order/updateOrder',
        method: 'post',
        data: data
    })
}
// 不用管
export function admin(data) {
    return requests({
        url: '/admin',
        method: 'get',
        data:data
    })
}

//添加商品信息
// export function addCommodity(data) {
//     return requests({
//         url: '/admin/addCommodity',
//         method: 'post',
//         data:data
//     })
// }

//添加商品封面图片
export function addCommodityCoverImg(data) {
    return requests({
        url: '/admin/addCommodityCoverImg',
        method: 'post',
        data:data
    })
}

//添加商品轮播图图片
export function addCommodityImg(data) {
    return requests({
        url: '/admin/addCommodityImg',
        method: 'post',
        data:data
    })
}

//删除商品信息
// export function deleteCommodity(data) {
//     return requests({
//         url: '/admin/deleteCommodity',
//         method: 'delete',
//         data:data
//     })
// }

//删除商品图片
export function deleteCommodityImg(data) {
    return requests({
        url: '/admin/deleteCommodityImg',
        method: 'post',
        data:data
    })
}

//获取商品信息 分页 模糊查询
// export function getCommodity(data) {
//     return requests({
//         url: '/admin/getCommodity',
//         method: 'post',
//         data: data
//     })
// }

//根据商品id查询商品全部图片
export function getCommodityImg(data) {
    return requests({
        url: '/admin/getCommodityImg',
        method: 'post',
        data: data
    })
}

//修改商品信息
// export function updateCommodity(data) {
//     return requests({
//         url: '/admin/updateCommodity',
//         method: 'post',
//         data: data
//     })
// }
