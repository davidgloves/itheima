import { showModal, showToast } from "../../request/index.js";

/**
 * 1.　只有企业账号才能实现微信支付
 * 2.　企业账号后台小程序必须给开发者加白名单
 *      一个appid可以同时绑定多个开发者
 * 　   这些开发者就可以公用这个appid和支付的开发权限
 * 3.　支付按钮
 *  先判断缓存中有没有token
 *  没有就跳转到授权页面，
 *  如果有token就继续创建订单
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        allChecked:false,
        totalPrice:0,
        totalNum:0
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
        const cart = wx.getStorageSync("cart")||[];
        this.setData({
            cart
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
        // 因为页面需要在被频繁的显示时获取缓存中的地址信息，比如用户切换地址时的场景，所以在onShow里实现而不是onLoad
        let address = wx.getStorageSync("address");
        if (address.cityName) {
            address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
            this.setData({
                address
            });
        }
        const cart = wx.getStorageSync("cart")||[];
        /**
         * every数组方法会遍历会接收一个回调函数，如果每一个回调函数都返回true
         * 那么every方法返回true，只要有一个回调函数返回false，循环不再执行，直接返回false
         * 空数组调用every也是true
         */
        // const allChecked = cart.length>0 ? cart.every(v=>v.checked):false;
        this.setCart(cart);
    },
    
    /**购物车编辑某一商品的个数 */
    async goodsNumChange(e) {
        let {changevalue, index} = e.currentTarget.dataset;
        let {cart} = this.data;
        const num = cart[index].num;
        /**当数量为1时不允许再减，应该问用户是否要删除 */
        if (num+changevalue > 0) {
            cart[index].num += changevalue;
            this.setCart(cart);
        } else {
            /**微信支持用如下方式直接使用async和await，但考虑到可能
             * 改变modal的默认样式，也可以封装起来
             */
            // const result = await wx.showModal({
            //     title: '提示',
            //     content: '要删除当前商品吗？'
            // });
            // 使用封装的方法
            const result = await showModal({content:'要删除当前商品吗？'})
            if (result.confirm) {
                cart.splice(index,1);
                this.setCart(cart);
            }
        }
    },
    setCart(cart) {
        //因为循环了两次浪费性能所以用如下方式
        let allChecked=true;
        let totalPrice=0;
        let totalNum=0;
        cart.forEach(v=>{
            if(v.checked) {
                totalPrice+=v.num*v.goods_price;
                totalNum+=v.num
            } else {
                allChecked=false;
            }
        });
        allChecked=cart.length>0 ? allChecked : false;
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        });
        wx.setStorageSync("cart", cart);
    },
    async handleOrderPay() {
        // 1判断缓存有没有token
        const token = wx.getStorageSync("token");
        if(!token) {
            wx.navigateTo({
                url: '/pages/auth/auth',
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
            return;
        }
        console.log('已经存在token了')
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