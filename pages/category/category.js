// pages/category/category.js
import {
    request
} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        /*左侧菜单数据*/
        leftMenuList: [],
        /*右侧内容数据*/
        rightContent: [],
        /*被点击左侧的菜单选中的索引*/
        currentIndex: 0,
        /**控制点击某一菜单时可以让右侧内容直接置顶 */
        scrollTop:0
    },
    /*接口返回的数据*/
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /**
         * 1 先判断有没有旧数据，如果没有就发起请求 
         * ｛time:Date.now(), data:｝
         * 2 如果有旧数据就用本地缓存中的旧数据
         */
        // 1 获取缓存中的旧数据
        const Cates = wx.getStorageSync('cates');
        // 2 判断
        if (!Cates) {
            this.getCateList();
        } else {
            //有旧数据则判断是否过期,假设过期时间是10秒,1000是毫秒,
            if (Date.now() - Cates.time > 1000 * 64*64) {
                this.getCateList();
            } else {
                //不过期，可以使用旧数据
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                });
            }
        }
    },
    getCateList() {
        request({
                url: "/categories"
            })
            .then(result => {
                this.Cates = result.data.message;
                // 存储获取到的数据
                wx.setStorageSync('cates', {
                    time: Date.now(),
                    data: result.data.message
                })
                /**构造左侧大菜单的数据 */
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                });
            })
    },
    /*左侧菜单的点击事件 */
    handleItemTap(e) {
        /**
         * 1 获取被点击的menu的index
         * 2 给currentIndex赋值
         * 3 给右侧的内容赋值
         */
        const {
            index
        } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            // scrollTop置为0，可以控制右侧内容在左边菜单点击时是置顶的
            scrollTop:0
        });
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