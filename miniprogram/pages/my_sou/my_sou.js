// miniprogram/pages/my_sou/my_sou.js
var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const sou = db.collection('share_source')
const row = 5
var page = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    souList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userID = options.id
    sou.where({
      _openid: userID
    }).limit(5).get({
      success: res => {
        console.log(res.data)
        this.setData({ souList: res.data })
      }
    })
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

  }
})