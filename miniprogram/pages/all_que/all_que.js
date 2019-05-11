// pages/all_que/all_que.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [{
        name: '分类1',
      url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '1'
      },
      {
        name: '分类2',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '2'
      },
      {
        name: '分类3',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '3'
      },
      {
        name: '分类4',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '4'
      },
      {
        name: '分类',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '5'
      },
      {
        name: '分类6',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '6'
      },
      {
        name: '分类7',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '7'
      },
      {
        name: '分类8',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '8'
      },
      {
        name: '分类9',
        url: '../show_que/show_que',
        icon: '../../images/classify.png',
        code: '9'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  // 获取用户信息
  getMyInfo: function(e) {
    let info = e.detail.userInfo;
    this.setData({
      isLogin: true, //确认登陆状态
      src: info.avatarUrl, //更新图片来源
      nickName: info.nickName //更新昵称
    })
  },
  //跳转到提问页面
  goToAsk: function(e) {
    wx.navigateTo({
      url: '../ask_que/ask_que',
    })
  }
})