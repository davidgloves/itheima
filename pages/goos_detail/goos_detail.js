// pages/goos_detail/goos_detail.js
import {request} from "../../request/index.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {goods_id} = options;
        this.getGoodsDetail(goods_id);
    },
    /**获取商品详情数据 */
    async getGoodsDetail(goods_id) {
        const result = await request({
            url:"/goods/detail",
            data:{goods_id}
        });
        const goodsDetail = result;
        this.setData ({
            goodsDetail
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})