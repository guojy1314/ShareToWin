// miniprogram/pages/my_que/my_que.js
var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const que = db.collection('share_question')
const row = 5
var page = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userID=options.id
    que.where({
      _openid: userID
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({ queList: res.data })
      }
    })
  },

  /**
 * 自定义函数-跳转到问题详情
 */
  goToQuestion: function (e) {
    common.goToQuestion(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.id)
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

  }
})