// miniprogram/pages/my_col_sou/my_col_sou.js

var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const sou = db.collection('share_source')

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
    var collect = wx.getStorageSync('sou_collected');
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
        sou.where({
          _id: i
        }).get({
          success: res => {
            this.setData({
              [`souList[${id}]`]: res.data[0]
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  goToSource: function (e) {
    common.goToSource(e.currentTarget.dataset.id)
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