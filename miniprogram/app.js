//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (result) {
          code=result.code
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx00bf65c5addd64ae&secret=2883261e3545e334510383bc68d2594f&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success: function (res2) {
              that.globalData.openid = res2.data.openid //返回openid
              typeof cb == "function" && cb(that.globalData.openid)
            }
          })
        }

      })
    }
  },
  globalData: {
    userInfo: null,
    openid:null,
    openID:'rua'
  }
})