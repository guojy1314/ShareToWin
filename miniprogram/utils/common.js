/**
 * 自定义函数-跳转答案详情页面
 */
function goToAnswer(id) {
  wx.navigateTo({
    url: '../answer/answer?id='+id,
  })
}

/**
 * 自定义函数-跳转问题浏览页面
 */
function goToQuestion(id) {
  wx.navigateTo({
    url: '../question/question?id=' + id,
  })
}
module.exports={
  goToAnswer: goToAnswer,
  goToQuestion: goToQuestion
}
//module里面的第一个goToDetai是暴露在外的接口，叫什么名字都行，在别的js中调用的是暴露出来的接口