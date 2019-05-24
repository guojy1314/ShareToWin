// miniprogram/pages/search_detail/search_detail.js
var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const que = db.collection('share_question')
const ans = db.collection('share_answer')
const sou = db.collection('share_source')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    type: '',
    array: ['问题', '回答', '资源'],
    index: 0,
    dataList: {},
    queResult: '没有查到相关内容',
    hasKeyWords: true,
    hasResult: true,
    typeIdx: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type
    let keywords = options.keywords
    this.setData({
      type: type,
      keywords: keywords
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
    if (this.data.keywords) {
      this.setData({
        hasKeyWords: true
      })
      switch (this.data.type) {
        case '问题':
          console.log('111');
          this.setData({
            typeIdx: 1
          })
          que.where({
            detail: db.RegExp({
              regexp: this.data.keywords,
              options: 'i',
            })
          }).get({
            success: res => {
              console.log(res.data.length)
              if (res.data.length > 0) {
                this.setData({
                  dataList: res.data,
                  hasResult: true
                })
              } else {
                this.setData({
                  dataList: res.data,
                  hasResult: false
                })
              }
            }
          })
          break;
        case '回答':
          console.log('222');
          this.setData({
            typeIdx: 2
          })
          ans.where({
            detail: db.RegExp({
              regexp: this.data.keywords,
              options: 'i',
            })
          }).get({
            success: res => {
              console.log(res.data.length)
              if (res.data.length > 0) {
                this.setData({
                  dataList: res.data,
                  hasResult: true
                })
              } else {
                this.setData({
                  dataList: res.data,
                  hasResult: false
                })
              }
            }
          })
          break;
        case '资源':
          console.log('333');
          this.setData({
            typeIdx: 3
          })
          sou.where({
            detail: db.RegExp({
              regexp: this.data.keywords,
              options: 'i',
            })
          }).get({
            success: res => {
              console.log(res.data.length)
              if (res.data.length > 0) {
                this.setData({
                  dataList: res.data,
                  hasResult: true
                })
              } else {
                this.setData({
                  dataList: res.data,
                  hasResult: false
                })
              }
            }
          })
          break;
      }
      console.log('switch完了')
    } else {
      var new_keywords = '请输入搜索关键字'
      this.setData({
        keywords: new_keywords,
        hasKeyWords: false
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})