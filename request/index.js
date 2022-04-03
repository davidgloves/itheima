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