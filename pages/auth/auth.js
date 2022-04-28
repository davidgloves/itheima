import { login, request } from "../../request/index";

// pages/auth/auth.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async handleGetUserInfo(e){
        try {
            // 1 获取用户信息
            const {encryptedData, rawData,iv,signature} = e.detail;
            // 2 获取小程序登录成功后的code
            const {code} = await login();
            const loginParams = {encryptedData, rawData,iv,signature};
            //获取token，需要企业账号才可以，因为微信支付需要企业账号才可以
            const res = await request({url:"/users/wxlogin", data:loginParams,method:"post"})
            console.log(res);
            // 创建个临时的，只为学习开发用
            let {token} = {token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"}
            wx.setStorageSync("token", token);
            wx.navigateBack({
                delta: 1
            });
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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