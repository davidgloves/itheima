/* Promise技术 */
export const request=(params)=>{
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
            }
        });          
    })
}