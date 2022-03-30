/*引入用户发送请求的函数*/
import {request} from "../../request/index.js"
Page({
  data:{
    /*轮播图数组 */
    swiperList:[],
    /*分类数组 */
    catesList:[],
    floorList:[]
  },
  // 页面开始加载 就会触发
  onLoad:function(option) {
    // var reqTask = wx.request({
    //   url: '/home/swiperdata',
    //   success: (result) => {
    //     const list = result.;
    //     this.setData({
    //       swiperList:list
    //     })
    //   } 
    // });      
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result
      })
    })
  },
  getCatesList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result
      })
    })
  },
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result
      })
    })
  },
  onReady:function(option) {

  },
  onShow:function(option) {

  },
  onHide:function(option) {

  },
  onUnload:function(option) {

  },
  onPullDownRefresh:function(option) {

  },
  onReachBottom:function(option) {

  },
  onShareAppMessage:function(option) {

  },
  onPageScroll:function(option) {

  },
  // item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
})