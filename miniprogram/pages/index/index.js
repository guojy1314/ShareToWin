var common = require('../../utils/common.js')
const db = wx.cloud.database()
const que = db.collection('share_question')
const ans = db.collection('share_answer')
const row = 7
var page = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // queList: {},
    answerList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    ans.orderBy('good_nums', 'desc').limit(row).get({
      success: res => {
        // console.log(res.data)
        this.setData({
          answerList: res.data
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 自定义函数-跳转到回答详情
   */
  goToAnswer: function(e) {
    common.goToAnswer(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.id)
  },

  /**
   * 自定义函数-跳转到问题详情
   */
  goToQuestion: function(e) {
    common.goToQuestion(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.id)
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page++
    que.skip(page * row).limit(row).get({
      success: res => {
        let new_data = res.data
        let old_data = this.data.queList
        this.setData({
          queList: old_data.concat(new_data)
        })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})