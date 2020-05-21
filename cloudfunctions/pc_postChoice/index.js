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
  let user = event.user
  let student = studentCollection.doc(user._id)
  delete user._id
  for(let i=0;i<user.target.length;i++){
    user['target'+(i+1)]=user.target[user.choosen[i]]
  }
  let result = await student.update({
    data:{
      ...user
    }
  })
  return {
    result
  }
}