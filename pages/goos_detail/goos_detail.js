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
            goodsDetail:{
                goods_name:goodsDetail.goods_name,
                goods_price:goodsDetail.goods_price,
                goods_introduce:goodsDetail.goods_introduce,
                pics:goodsDetail.pics
            }
        })
    },
    /**轮播图预览功能,放大图片预览 */
    handleImageTap(e){
        /**获取点击的图片的索引 */
        const {index} = e.currentTarget.dataset;
        /**构造要预览的图片集的数组 */
        let previewPics = this.data.goodsDetail["pics"].map(v=>v.pics_big);
        wx.previewImage({
            current: previewPics[index],
            urls: previewPics
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