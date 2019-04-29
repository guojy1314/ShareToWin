var common = require('../../utils/common.js')
const db = wx.cloud.database()
const news = db.collection('share')
const row = 5
var page = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        news.limit(5).get({
          success: res => {
          // console.log(res.data)
            this.setData({ newsList: res.data })
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
    news.skip(page * row).limit(row).get({
      success: res => {
        let new_data = res.data
        let old_data = this.data.newsList
        this.setData({ newsList: old_data.concat(new_data) })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})