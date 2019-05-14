//question.js
var app = getApp()
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const que = db.collection('share_question')
const ans = db.collection('share_answer')
const row = 5
var page = 0

Page({
  data: {
    queList: [],
    answerList: [],
    userOpenID: ''
  },

  onLoad: function(options) {
    //把qid从string转换成number，用于where条件检索
    // let qid = parseInt(options.id)
    // console.log(options.id)
    // console.log(qid)
    // console.log(typeof(qid))
    let qid = options.id
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

    ans.where({
      q_id: qid
    }).orderBy('good_nums', 'desc').limit(5).get({
      success: res => {
        this.setData({
          answerList: res.data
        })
      }
    })
  },

  /**
   * 自定义函数-跳转到回答详情
   */
  goToAnswer: function(e) {
    common.goToAnswer(e.currentTarget.dataset.id)
  },

  goToAnsQue: function(e) {
    var that = this;
    wx.navigateTo({
      url: '../answer_que/answer_que?id=' + that.data.queList[0]._id + '&title=' + that.data.queList[0].title,
    })
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
    // let userOpenID = app.globalData.openid
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page++
    let qid = this.qid
    ans.where({
        q_id: qid
      }).orderBy('good_nums', 'desc')
      .skip(page * row).limit(row).get({
        success: res => {
          let new_data = res.data
          let old_data = this.data.answerList
          this.setData({
            answerList: old_data.concat(new_data)
          })
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})