// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    ae:[],
    staticUrl:app.globalData.request.staticUrl
  },
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    //查看有没有jwt
    wx.getStorage({
      key: 'jwt',
      success: function (res) {
        console.log(res.data)
        that.getAes()
      },
      fail: function (res) {
        console.log(res.data)
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },
  // 获取所有的ae
  getAes(){
    const that = this
    app.globalData.request.get('ae')
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
  toEdit(e) {
    
    const item = e.currentTarget.dataset.item; // 获取点击的项
    wx.navigateTo({
      url: `../aeedit/aeedit?item=${encodeURIComponent(JSON.stringify(item))}`, // 将对象转换为字符串并编码
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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