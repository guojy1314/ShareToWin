// miniprogram/pages/show_sou/show_sou.js
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
      title: options.name + ' ' + '资源',
    })
  }
})  