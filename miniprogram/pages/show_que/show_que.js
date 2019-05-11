// miniprogram/pages/show_que/show_que.js
const app = getApp()
Page({
  data: {
    title: ""
  },

  onLoad: function (options) {
    this.setData({
      title: options.name
    })


    wx.setNavigationBarTitle({
      title: options.name + ' ' + '提问',
    })
  }
})  