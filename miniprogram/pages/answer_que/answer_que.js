// miniprogram/pages/answer_que/answer_que.js
var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const ans = db.collection('share_answer')
const que = db.collection('share_question')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: [],
    title: '',
    good_nums: '',
    answer_nums: '',
    detail: '',
    q_id: '',
    image: '',
    date:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let qtitle = options.title
    let qid = options.id
    this.setData({
      title: qtitle,
      q_id: qid
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  changeBigImg() {
    let that = this;
    var app = getApp();
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath, //云存储图片名字
          filePath, //临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              image: res.fileID, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
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

  publish: function(e) {
    let that = this;
    var time = common.formatTime(new Date());
    that.setData({
      date: time
    })
    ans.add({
      data: {
        title: this.data.title,
        //date: e.detail.value.date,
        detail: e.detail.value.detail,
        image: this.data.image,
        q_id:this.data.q_id,
        date:this.data.date,
        good_nums: 0,
        bad_nums: 0
      },
      success: res => {
        wx.showToast({
          title: '回答提交成功',
          duration: 1000,
          success: function() {
            setTimeout(function() {
              wx.reLaunch({
                url: '../index/index',
              })
            }, 2000);
          }
        })
        wx.cloud.callFunction({
          name: 'ans_nums_update',
          data: {
            q_id: this.data.q_id
          },
          success: res => {
            console.log('更新数据成功')
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