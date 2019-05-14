//answer.js
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const ans = db.collection('share_answer')
const que = db.collection('share_question')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queList: {},
    ansList:{},
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    ans.where({
      _id: id
    }).get({
      success: res => {
        this.setData({
          ansList: res.data
        })
        let qid = this.data.ansList[0].q_id
        console.log(qid)
        que.where({
          _id: qid
        }).get({
          success: res => {
            this.setData({
              queList: res.data
            })
          }
        })
      }
    })
    
  },

  //添加到收藏夹
  addFavorites: function(options) {
    let article = this.data.article; //获取当前新闻
    wx.setStorageSync(article.question_id, article); //添加到本地缓存
    this.setData({
      isAdd: true
    }); //更新按钮显示
  },
  //取消收藏
  cancelFavorites: function() {
    let article = this.data.article; //获取当前新闻
    wx.removeStorageSync(article.question_id); //从本地缓存删除
    this.setData({
      isAdd: false
    }); //更新按钮显示
  },

  /**
   * 自定义函数-跳转到问题详情
   */
  goToQuestion: function(e) {
    common.goToQuestion(e.currentTarget.dataset.id)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})