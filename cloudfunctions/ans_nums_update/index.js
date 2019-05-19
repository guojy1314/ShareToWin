// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  //取得传过来的参数
  var id = event.q_id;
  console.log('回答成功',id)

  // console.warn(data)

  try {
    return await db.collection('share_question').where({
      _id: id
    }).update({
      data: {
        answer_nums: db.command.inc(1)
      },
      success: res => {
        console.log('云函数成功', answer_nums, id)

      },
      fail: e => {
        console.error(e)
      }
    })
  } catch (e) {
    console.error(e)
  }

}