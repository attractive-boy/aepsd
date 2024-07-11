// const baseUrl = 'https://yimingshikong.13w.top/api/' 

const baseUrl = 'https://120.26.241.30/api/' 
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

const uploadFile = (url, filePath, name, formData = {}, header = {}) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseUrl + url,
      filePath: filePath,
      name: name,
      formData: formData,
      header: {
        'Content-Type': 'multipart/form-data',
        ...header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.data))
        } else if (res.statusCode === 401) {
          // JWT 过期或无效，跳转到登录页面
          wx.redirectTo({
            url: '/pages/login/login'
          })
        } else {
          reject(JSON.parse(res.data))
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

module.exports = {
  get,
  post,
  uploadFile
}
