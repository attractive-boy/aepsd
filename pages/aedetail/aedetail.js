// pages/aedetail/aedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.video)
    if (options.video) {
      const video = JSON.parse(decodeURIComponent(options.video)); // 解码并解析对象
      this.setData({
        video
      });
    }
  },

  /**
   * 保存视频到相册
   */
  save() {
    const that = this;

    // 检查用户是否授权了保存到相册的权限
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户同意授权
              that.saveVideoToAlbum();
            },
            fail() {
              // 用户拒绝授权，提示用户手动打开权限
              wx.showModal({
                title: '提示',
                content: '需要您授权保存视频到相册',
                showCancel: false,
                success() {
                  wx.openSetting({
                    success(settingData) {
                      if (settingData.authSetting['scope.writePhotosAlbum']) {
                        that.saveVideoToAlbum();
                      } else {
                        wx.showToast({
                          title: '授权失败，无法保存视频',
                          icon: 'none'
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        } else {
          // 已经授权，直接保存
          that.saveVideoToAlbum();
        }
      }
    });
  },

  /**
   * 调用保存视频接口
   */
  saveVideoToAlbum() {
    const { video } = this.data;
    wx.showLoading({
      title: '保存中',
    });

    wx.downloadFile({
      url: video, // 视频的URL地址
      success(res) {
        if (res.statusCode === 200) {
          wx.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              wx.hideLoading();
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail() {
              wx.hideLoading();
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
              });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '下载失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail() {
        wx.hideLoading();
        wx.showToast({
          title: '下载失败',
          icon: 'none',
          duration: 2000
        });
      }
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
});
