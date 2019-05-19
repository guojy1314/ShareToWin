/**
 * 自定义函数-跳转答案详情页面
 */
function goToAnswer(id) {
  wx.navigateTo({
    url: '../answer_detail/answer_detail?id='+id,
  })
}

/**
 * 自定义函数-跳转问题浏览页面
 */
function goToQuestion(id) {
  wx.navigateTo({
    url: '../question_detail/question_detail?id=' + id,
  })
}

function goToSource(id) {
  wx.navigateTo({
    url: '../source_detail/source_detail?id=' + id,
  })
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports={
  goToAnswer: goToAnswer,
  goToQuestion: goToQuestion,
  goToSource: goToSource,
  formatTime: formatTime
}
//module里面的第一个goToDetai是暴露在外的接口，叫什么名字都行，在别的js中调用的是暴露出来的接口