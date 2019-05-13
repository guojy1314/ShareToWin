// miniprogram/pages/show_sou/show_sou.js

const app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const source = db.collection('share_source')
const row = 5
var page = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceList: [],
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typed = options.type;
    wx.setNavigationBarTitle({
      title: options.type + '类资源',
    })

    source.where({
      type: typed
    }).limit(5).get({
      success: res => {
        // console.log(res.data)
        this.setData({ sourceList: res.data })
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
  * 自定义函数-跳转到回答详情
  */
  goToAnswer: function (e) {
    common.goToAnswer(e.currentTarget.dataset.id)
  },

  /**
  * 自定义函数-跳转到问题详情
  */
  goToQuestion: function (e) {
    common.goToQuestion(e.currentTarget.dataset.id)
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page++
    source.skip(page * row).limit(row).get({
      success: res => {
        let new_data = res.data
        let old_data = this.data.sourceList
        this.setData({ sourceList: old_data.concat(new_data) })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})