//answer.js
var app = getApp()
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
    ansList: {},
    num: 0,
    isVote: false,
    isCollect: false,
    hasUserInfo: false,
    userInfo: {},
    userOpenID: ''
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
    // 读取所有的文章列表点赞缓存状态
    var cache = wx.getStorageSync('voted');
    // 如果缓存状态存在
    if (cache) {
      // 拿到所有缓存状态中的1个
      var currentCache = cache[id];
      // 把拿到的缓存状态中的1个赋值给data中的collection，如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true
      if (currentCache) {
        this.setData({
          isVote: true
        })
      }
    } else {
      // 如果所有的缓存状态都不存在 就让不存在的缓存存在
      var voted_cache = {};
      // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，我们可以把当前这个文章点赞的缓存值设置为 false
      wx.setStorageSync('voted', voted_cache);

    }


    // 读取所有的文章列表收藏缓存状态
    var collected_cache = wx.getStorageSync('collected');
    // 如果缓存状态存在
    if (collected_cache) {
      // 拿到所有缓存状态中的1个
      var col_currentCache = collected_cache[id];
      // 把拿到的缓存状态中的1个赋值给data中的collection，如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true
      if (col_currentCache) {
        this.setData({
          isCollect: true
        })
      }

    } else {
      // 如果所有的缓存状态都不存在 就让不存在的缓存存在
      var collected_cache = {};
      // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，我们可以把当前这个文章点赞的缓存值设置为 false
      wx.setStorageSync('collected', collected_cache);
    }

  },


  /**
   * 自定义函数-跳转到问题详情
   */
  goToQuestion: function(e) {
    common.goToQuestion(e.currentTarget.dataset.id)
  },

  vote: function(e) {
    wx.cloud.callFunction({
      name: 'vote',
      data: {
        _id: this.data.ansList[0]._id
      },
      success: res => {
        this.setData({
          isVote: true
        })
        var cache = wx.getStorageSync('voted');
        cache[this.data.ansList[0]._id] = true;
        wx.setStorageSync('voted', cache);

        console.log('更新数据成功')
      }
    })
  },

  minusVote: function(e) {
    wx.cloud.callFunction({
      name: 'minusVote',
      data: {
        _id: this.data.ansList[0]._id
      },
      success: res => {
        this.setData({
          isVote: false
        })
        var cache = wx.getStorageSync('voted');
        cache[this.data.ansList[0]._id] = false;
        wx.setStorageSync('voted', cache);
        console.log('更新数据成功')
      }
    })
  },

  collect: function(e) {
    var cache = wx.getStorageSync('collected');
    cache[this.data.ansList[0]._id] = true;
    wx.setStorageSync('collected', cache);
    this.setData({
      isCollect: true
    })
    console.log('收藏成功')
  },

  cancleCollect: function(e) {
    var cache = wx.getStorageSync('collected');
    cache[this.data.ansList[0]._id] = false;
    wx.setStorageSync('collected', cache);
    this.setData({
      isCollect: false
    })
    console.log('取消收藏成功')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userOpenID: app.globalData.openid,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          userOpenID: app.globalData.openid,
          hasUserInfo: true
        })
      }
    }
  },

  // 获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
          userOpenID: res.result.openid
        })

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)

      }
    })
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