// 接口分类封装1： orderList
import { Get } from '../../server';

function getShoporderDetail(productName) {
    return Get('/product/detail', {productName})
}

function getShopOrderList(customerName) {
    return Get('/product/orderList', {customerName})
}

export const shoporderApi = {
    getShopOrderList,
    getShoporderDetail
}