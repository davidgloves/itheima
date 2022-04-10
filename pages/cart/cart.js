/**
 * 获取用户的收货地址
 * 1. 绑定点击事件
 * 2. 调用小程序内置API获取用户的收货地址wx.chooseAddress
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    handleChooseAddress(){
        /**
         * cityName: "Guangzhou Shi"
countyName: "Haizhu Qu"
detailInfo: "397 Xingang Middle Rd, KeCun"
errMsg: "chooseAddress:ok"
nationalCode: "510000"
postalCode: "510000"
provinceName: "Guangdong Sheng"
telNumber: "020-81167888"
userName: "John Doe"
         */
        wx.chooseAddress({
            success: (address) => {
                wx.setStorageSync("address", address);
                  
            }
        });
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