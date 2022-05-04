/* Promise技术 */
//由于同一页面如果发送多个请求只显示一个加载中，所以如果有一个关闭就会都关闭
//就会出现数据没加载完就已经关闭了加载中提示的现象，所以通过一个计数来控制所有请求均已经返回时才关闭加载中的指示
let ajaxTimes=0;
export const request=(params)=>{
    ajaxTimes++;
    wx.showLoading({
      title: '加载中'
    });
    /**定义baseUrl可以在后续传递Url时只传递后面的非公共部分的资源 */
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete:() => {
                ajaxTimes--;
                if (ajaxTimes===0) {
                    // 当所有请求都返回时才关闭加载中的样式
                    wx.hideLoading({
                        success: (res) => {},
                      });
                }
            }
        });          
    })
}
export function copyArr(oldArr){
    let newArr = [];
    newArr = JSON.parse(JSON.stringify(oldArr));
    return newArr;
}

/**
 * 展示modal信息，取消或确定后进行回调处理
 * @param {content} modal 框要展示的信息 
 * @returns 
 */
export const showModal=({content})=>{
    return new Promise((resolve, reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
    })
}

/**
 * 弹框提示信息，无交互
 * @param {title} 提示信息的内容 
 * @returns 
 */
export const showToast=({title})=>{
    return new Promise((resolve, reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
    })
}

/**
 * Promise 形式的微信login
 * @returns 
 */
export const login=()=>{
    return new Promise((resolve, reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result);
            },
            fail: () => {
                reject(err)
            }
        });
    })
}

/**
 * Promise形式的微信支持
 * @param {object} pay 发起小程序内微信支持
 * @returns 
 */
export const requestPayment=(pay)=>{
    return new Promise((resolve, reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
        });
    });
}