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
                goods_id:goodsDetail.goods_id,
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
     *  加入购物车功能
     * 1.　将商品详情数据保存在缓存中方便进行操作
     * 2.　获取缓存中的数据
     * 3.　如果缓存中没有购物车数据就直接把数据加入缓存
     * 4.　如果缓存中有购物车数据了，就将num++
     */
    handleCartAdd(){
        // 为了保证取到的数据一定是数组，如果没有值的时候默认为空数组，如下写法
        // 购物车中可能会放多个商品，所以要是数组
        let cart = wx.getStorageSync("cart")||[];
        // var cart;
        // wx.getStorageSync(key);
        
        // if(wx.getStorageSync("cart").keys.length>0) {
        //     cart = wx.getStorageSync("cart");
        // } else {
        //     cart = [];
        // }
        
        // 判断当前商品对象是否存在于缓存中,这里不能直接用goodsDetail因为对象有可能会变
        // let index = cart.findIndex(this.data.goodsDetail)
        //　但是商品对象的goods_id不会变，所以需要用goods_id来获取index
        let index = cart.findIndex(v=>v.goods_id===this.data.goodsDetail.goods_id);
        if(index===-1) {
            // -1表示不存在,先添加一个num属性并赋值1，
            this.data.goodsDetail.num = 1;
            cart.push(this.data.goodsDetail);
        } else {
            // 如果已经存在，num+1
            cart[index].num++;
        }
        //　将cart数据重新写回缓存中
        wx.setStorageSync("cart", cart)
        //　弹框提示
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1500,
            // 为了防止用户手抖，这里设置为true
            mask: true,
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