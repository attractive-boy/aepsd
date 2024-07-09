// utils/request.js
const baseUrl = 'https://yimingshikong.13w.top/api/' // 替换为你的服务器地址

const request = (url, method, data, header = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        ...header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // JWT 过期或无效，跳转到登录页面
          wx.redirectTo({
            url: '/pages/login/login'
          })
        } else {
          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const get = (url, data, header) => request(url, 'GET', data, header)
const post = (url, data, header) => request(url, 'POST', data, header)

module.exports = {
  get,
  post
}
