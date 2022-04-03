// pages/goods_list/goods_list.js
/**
 * 上滑页面触底加载下一页
 * 1 找到触底事件
 * 2 判断是否还存在下一页数据
 *  怎么判断，
 *  1  获取总页数，目前只有总条数。则总页数=Match.ceil(total(总条数)/pagesize(页容量))
 *  2  获取当前页码
 *  3  用当前页码与总页数进行对比
 * 3 假如没有下一页则弹框提示
 * 4 如果还有下一页就加载下一页数据
 *  1 当前页码++
 *  2 发送请求获取下一页数据，回调里要把新获取回来的内容追加到原数组中
 * 5 下拉刷新
 *  1.　先在page.json中开启下拉刷新，找到下拉刷新的方法
 *  2.　下拉刷新需要页面内容数据清空。页码重置为1
 */


import {copyArr, request} from "../../request/index.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:false
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:2,
                value:"价格",
                isActive:true
            }
        ],
        goodsList:[],
        goodsPriceList:[]
    },
    /**获取接口需要的参数 */
    QueryParams:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },
    isPullDownRefresh:false,
    /**总页数 */
    totalPage:1,
    handleTabsItemChange(e){
        // 获取子向父组件传递的值
        const {index} = e.detail;
        let {tabs} = this.data;
        // if (index===2) {
        //     this.getGoodsPriceList();
        // }
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
        this.setData({
            tabs
        })
    },
    async getGoddsList() {
        const result = await request({
            url: "/goods/search",
            data:this.QueryParams
        });
        const total = result.total;
        this.totalPage = Math.ceil(total/this.QueryParams.pagesize);
        this.setData({
            /**数组拼接 */
            goodsList:[...this.data.goodsList,...result.goods]
        })
        // 由于下拉刷新自动关闭时间较长，所以这里手动调用一下，
        if (this.isPullDownRefresh) {
            wx.stopPullDownRefresh();
            this.isPullDownRefresh=false;
        }
        this.getGoodsPriceList();
    },
    getGoodsPriceList(){
        let priceList = copyArr(this.data.goodsList);
        priceList.sort(function(a,b) {
            return a.goods_price-b.goods_price
        });
        this.setData({
            goodsPriceList:priceList
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.QueryParams.cid=options.cid;
        this.getGoddsList();
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
        // 列表内容清空
        this.setData({
            goodsList:[]
        });
        // 页码置为1
        this.QueryParams.pagenum=1;
        //　设置触发了下拉刷新
        this.isPullDownRefresh=true;
        //　获取最新数据
        this.getGoddsList();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.QueryParams.pagenum>=this.totalPage) {
            wx.showToast({
              title: '没有下一页了',
            });
        } else {
            this.QueryParams.pagenum++;
            this.getGoddsList();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})