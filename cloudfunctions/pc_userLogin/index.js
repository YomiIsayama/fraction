// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'yyw07180945-26662'
})
const db = cloud.database()
const studentCollection = db.collection('test')


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = cloud.getWXContext().OPENID
  let student = await studentCollection.where({
    openid:openid
  }).get()
  let result = {}
  if(student.data.length>0){
    result=student.data[0]
  }else{
    result={name:'nobody'}
  }
  return {
    openid:wxContext.OPENID,
    user:result
  }
}