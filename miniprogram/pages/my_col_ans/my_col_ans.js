// miniprogram/pages/my_col_ans/my_col_ans.js
var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const ans = db.collection('share_answer')

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
  onLoad: function(options) {
    var collect = wx.getStorageSync('collected');
    if (collect) {
      var colList = [];
      for (var idx in collect) {
        if (collect[idx]) {
          colList.push(idx)
        }
      }
      console.log(colList)
      var colresult = [];
      for (let i of colList) {
        var id = 0
        ans.where({
          _id: i
        }).get({
          success: res => {
            this.setData({
              [`ansList[${id}]`]: res.data[0]
            });
            id++;
          }
        })
      }
    }
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

  goToAnswer: function (e) {
    common.goToAnswer(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.id)
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