//question.js
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const ans = db.collection('share')
const row = 5
var page = 0

Page({
  data: {
    question: []
  },

  onLoad: function(options) {
    //把qid从string转换成number，用于where条件检索
    let qid = parseInt(options.id)
    console.log(options.id)
    console.log(qid)
    console.log(typeof(qid))
    ans.where({
        question_id: qid
      })
      .limit(5).get({
        success: res => {
          console.log(res)
          this.setData({
            question: res.data
          })
        }
      })
  },

  /**
   * 自定义函数-跳转到回答详情
   */
  goToAnswer: function(e) {
    common.goToAnswer(e.currentTarget.dataset.id)
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
    page++
    let qid=this.qid
    ans.where({
        question_id: qid
      })
      .skip(page * row).limit(row).get({
        success: res => {
          let new_data = res.data
          let old_data = this.data.question
          this.setData({
            question: old_data.concat(new_data)
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