// miniprogram/pages/my_ans/my_ans.js
var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const ans = db.collection('share_answer')
const row = 5
var page = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ansList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userID = options.id
    ans.where({
      _openid: userID
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({ ansList: res.data })
      }
    })
  },
  /**
 * 自定义函数-跳转到回答详情
 */
  goToAnswer: function (e) {
    common.goToAnswer(e.currentTarget.dataset.id)
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