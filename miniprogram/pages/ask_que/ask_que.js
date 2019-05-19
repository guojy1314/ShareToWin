// miniprogram/pages/ask_que.js
var app = getApp()
var common = require('../../utils/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: [],
    bigImg: '../../images/photo.png',
    title: '',
    good_nums: '',
    answer_nums:'',
    type: '',
    detail: '',
    date:'',
    image: '',
    array: ['请选择问题类别……', '信息', '统计', '会计', '金融', '管理', '法学', '马克思', '外国语', '其它'],
    index: 0
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeBigImg() {
    let that = this;
    var app = getApp();
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            let fileID = res.fileID;
            picpath = fileID;
            //把图片存到users集合表
            // const db = wx.cloud.database();
            // db.collection("users").add({
            //   data: {
            //     bigImg: fileID
            //   },
            //   success: function () {
            //     wx.showToast({
            //       title: '图片存储成功',
            //       'icon': 'none',
            //       duration: 3000
            //     })
            //   },
            //   fail: function () {
            //     wx.showToast({
            //       title: '图片存储失败',
            //       'icon': 'none',
            //       duration: 3000
            //     })
            //   }
            // });
          },
          fail: e => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },

  //添加

  publish: function (e) {
    let that = this;
    var time = common.formatTime(new Date());
    that.setData({
      date: time
    })
    console.log(e)
    const db = wx.cloud.database()
    db.collection('share_question').add({
      data: {
        title: e.detail.value.title,
        date: this.data.date,
        type: this.data.array[e.detail.value.type],
        detail: e.detail.value.detail,
        image: this.data.bigImg,
        good_nums:0,
        answer_nums:0
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          title: e.detail.value.title,
          //date: e.detail.value.date,
          type: this.data.array[e.detail.value.type],
          detail: e.detail.value.detail,
          image: this.data.bigImg
        })
        wx.showToast({
          title: '提问发布成功',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: '../index/index',
              })
            }, 2000);
          }
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})