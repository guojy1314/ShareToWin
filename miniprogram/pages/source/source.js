// pages/source/source.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    routers: [
      {
        name: '信息',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '1'
      },
      {
        name: '统计',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '2'
      },
      {
        name: '会计',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '3'
      },
      {
        name: '金融',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '4'
      },
      {
        name: '管理',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '5'
      },
      {
        name: '法学',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '6'
      },
      {
        name: '马克思',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '7'
      },
      {
        name: '外国语',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '8'
      },
      {
        name: '其它',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '9'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {    // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // 获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //跳转到提问页面
  goToUpload: function (e) {
    wx.navigateTo({
      url: '../upload_source/upload_source',
    })
  }
})