import Toast from 'tdesign-miniprogram/toast/index';
const app = getApp()
Page({
  data: {
    title: '',
    file: null,
    fileName: '',
    mainLayer:''
  },

  handleTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },
  handleMainLayerInput(e){
    this.setData({
      mainLayer: e.detail.value
    });
  },

  handleFileChange(e) {
    const { fileList } = e.detail;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.setData({
        fileList: fileList,
        fileName: file.name
      });
    } else {
      this.setData({
        fileName: ''
      });
    }
  },
  chooseFile() {
    wx.chooseMessageFile({
      count: 1, // 只允许选择一个文件
      type: 'file', // 选择文件
      success: (res) => {
        const file = res.tempFiles[0];
        if (file) {
          this.setData({
            file: file,
            fileName: file.name
          });
        }
      }
    });
  },
  handleSubmit(e) {
    const { title,mainLayer } = this.data;
    console.log(title);
    if (!title) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入标题',
        theme: 'warning',
        direction: 'column'
      });
      return;
    }

    if (this.data.file === null) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请上传 AEP 文件',
        theme: 'warning',
        direction: 'column'
      });
      return;
    }

    const file = this.data.file;
    console.log(file);
    app.globalData.request.uploadFile('ae/upload', file.path, 'file', { title: title,main_layer:mainLayer })
      .then(res => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '文件上传成功',
          theme: 'success',
          direction: 'column'
        });
      })
      .catch(err => {
        console.log(err);
        Toast({
          context: this,
          selector: '#t-toast',
          message: '文件上传成功',
          theme: 'success',
          direction: 'column'
        });
    });
  }
});
