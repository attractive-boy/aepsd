// pages/myae/myae.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ae:[],
    staticUrl:app.globalData.request.staticUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    app.globalData.request.get('ae/me')
    .then(data => {
      console.log('请求成功', data)
      // 处理成功响应
      that.setData({
        ae: data.data
      })
    })
    .catch(err => {
      console.error('请求失败', err)
      // 处理错误响应
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  todetail(e){
    console.log(e)
    const video = e.currentTarget.dataset.video; // 获取点击的项
    wx.navigateTo({
      url: `../aedetail/aedetail?video=${encodeURIComponent(JSON.stringify(video))}`, // 将对象转换为字符串并编码
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})