// pages/source/source.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [
      {
        name: '资源1',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '1'
      },
      {
        name: '资源2',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '2'
      },
      {
        name: '资源3',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '3'
      },
      {
        name: '资源4',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '4'
      },
      {
        name: '资源5',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '5'
      },
      {
        name: '资源6',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '6'
      },
      {
        name: '资源7',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '7'
      },
      {
        name: '资源8',
        url: '../show_sou/show_sou',
        icon: '../../images/classify.png',
        code: '8'
      },
      {
        name: '资源9',
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
  onShow: function () {

  },
  //跳转到提问页面
  goToUpload: function (e) {
    wx.navigateTo({
      url: '../upload_source/upload_source',
    })
  }
})