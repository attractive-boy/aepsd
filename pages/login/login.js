// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      avatarBase64: '',
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    var avatarUrl_base64 = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(avatarUrl, 'base64')

    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      "userInfo.avatarBase64": avatarUrl_base64,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  login(){
    const that = this
    // TODO: 登录
    // 将头像和名称存入本地存储
    wx.setStorageSync('userInfo', this.data.userInfo)
    wx.login({
      success: (res) => {
        app.globalData.request.post('user' , {code: res.code,avatarUrl:that.data.userInfo.avatarBase64,nickName:that.data.userInfo.nickName})
        .then(data => {
          console.log('请求成功', data)
          // 处理成功响应
          // 设置jwt
          wx.setStorageSync('jwt', data.access_token)
          wx.switchTab({
            url: '/pages/index/index',
          })
        })
        .catch(err => {
          console.error('请求失败', err)
          // 处理错误响应
        })
      },
      fail: (err) => {
        console.log(err)
        // TODO: 登录失败
      }
    })
  }
})
