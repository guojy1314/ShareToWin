// miniprogram/pages/source_detail/source_detail.js
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const sou = db.collection('share_source')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    souList: {},
    isVote: 0,
    isCollect: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log(id)
    sou.where({
      _id: id
    }).get({
      success: res => {
        this.setData({
          souList: res.data
        })
      }
    })

  },

  //添加到收藏夹
  addFavorites: function (options) {
    let article = this.data.article; //获取当前新闻
    wx.setStorageSync(article.question_id, article); //添加到本地缓存
    this.setData({
      isAdd: true
    }); //更新按钮显示
  },
  //取消收藏
  cancelFavorites: function () {
    let article = this.data.article; //获取当前新闻
    wx.removeStorageSync(article.question_id); //从本地缓存删除
    this.setData({
      isAdd: false
    }); //更新按钮显示
  },

  source_vote: function (e) {
    wx.cloud.callFunction({
      name: 'source_vote',
      data: {
        _id: this.data.ansList[0]._id
      },
      success: res => {
        this.setData({
          isVote: 1
        })
        console.log('更新数据成功')
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})