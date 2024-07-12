// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    nickName:'微信用户'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    //读取本地存储 设置头像
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          image: res.data.avatarUrl,
          nickName: res.data.nickName
        })
      },
      fail: function (res) {
        console.log(res.data)
      }
    })
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

  },
  onTap(e){
    console.log(e.currentTarget.dataset.cell)
    switch(e.currentTarget.dataset.cell){
      case 'aeupload':
        wx.navigateTo({
          url: '../aeupload/aeupload',
        })
        break;
    }
  }
})