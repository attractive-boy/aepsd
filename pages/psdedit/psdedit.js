// pages/aeedit/aeedit.js
const app = getApp()
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    staticUrl:app.globalData.request.staticUrl,
    textlayers:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.item) {
      const item = JSON.parse(decodeURIComponent(options.item)); // 解码并解析对象
      console.log(item)
      const textlayers = JSON.parse(item.text_layers_content)
      console.log(textlayers)
      this.setData({
        item,
        textlayers
      });
    }
  },
  handleInput(event) {
    const index = event.currentTarget.dataset.index;
    const value = event.detail.value;
    // 更新 textlayers 中对应的值
    this.setData({
      [`textlayers[${index}]`]: value
    });
  },
  creatVideo() {
    const { id } = this.data.item;
    // 显示加载提示
    wx.showLoading({
      title: '制作中',
    });
  
    app.globalData.request.post('psd/modify', { id:id, text_layers_content:this.data.textlayers })
      .then(res => {
        // 请求成功，隐藏加载提示
        wx.hideLoading();
  
        // 显示成功提示
        wx.showToast({
          title: '制作完成',
          icon: 'success',
          duration: 2000
        });
      })
      .catch(err => {
        console.log(err);
  
        // 请求失败，隐藏加载提示
        wx.hideLoading();
  
        // 显示失败提示
        wx.showToast({
          title: '后台处理中，请在我的作品中查看结果',
          icon: 'success',
          duration: 2000
        });
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