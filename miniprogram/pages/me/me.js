// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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


  // 获取用户信息
  getMyInfo: function(e) {
    let info = e.detail.userInfo;
    this.setData({
      isLogin: true, //确认登陆状态
      src: info.avatarUrl, //更新图片来源
      nickName: info.nickName //更新昵称
    })

  }

})