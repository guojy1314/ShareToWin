// pages/me/me.js
var app = getApp()
var common = require('../../utils/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userOpenID: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onShow: function(options) {
    if (app.globalData.openid) {
      this.setData({
        userOpenID: app.globalData.openid
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userOpenID: app.globalData.openid,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          userOpenID: app.globalData.openid,
          hasUserInfo: true
        })
      }
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
          userOpenID: res.result.openid
        })

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)

      }
    })
  },

  goToMyQue: function(e) {
    wx.navigateTo({
      url: '../my_que/my_que?id=' + this.data.userOpenID,
    })
  },

  goToMyAns: function(e) {
    wx.navigateTo({
      url: '../my_ans/my_ans?id=' + this.data.userOpenID,
    })
  },

  goToMySou: function(e) {
    wx.navigateTo({
      url: '../my_sou/my_sou?id=' + this.data.userOpenID,
    })
  },

  goToMyColAns: function(e) {
    wx.navigateTo({
      url: '../my_col_ans/my_col_ans',
    })
  },

  goToMyColSou: function(e) {
    wx.navigateTo({
      url: '../my_col_sou/my_col_sou',
    })
  }

})