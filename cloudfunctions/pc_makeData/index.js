// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'yyw07180945-26662'
})
const db= cloud.database()
const studentCollection = db.collection('test')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  proposal = []
  proposal.push({
    target:['人工智能'],
    choosen:[0]
  })
  proposal.push({
    target:['web前端','人工智能','移动应用','手机游戏'],
    choosen:[0,1,2,3]
  })
  proposal.push({
    target:['web前端','人工智能','移动应用','手机游戏'],
    choosen:[3,1,2,0]
  })
  proposal.push({
    target:['web前端','人工智能','移动应用','手机游戏'],
    choosen:[1,3,2,0]
  })
  proposal.push({
    target:['web前端','移动应用','手机游戏'],
    choosen:[0,1,2]
  })
  proposal.push({
    target:['web前端','移动应用','手机游戏'],
    choosen:[2,1,0]
  })
  proposal.push({
    target:['web前端','移动应用','手机游戏'],
    choosen:[1,2,0]
  })
  proposal.push({
    target:['web前端','移动应用','手机游戏'],
    choosen:[0,1,2]
  })
  let res = await db.collection('pc_student').aggregate()
      .project({
        _id: "$_id",
        transcore: "$transcore",
        ai: "$ai"
      })
      .limit(1000)
      .end()
      console.log(res.list.length)
      for(let i=0;i<res.list.length;i++){
        if(res.list[i].ai){
          if(res.list[i].transcore<60){
            let r = await studentCollection.doc(res.list[i]._id).update({
              data:{
                ...proposal[0]
              }
            })
          }else{
            let rand = Math.round(Math.random() * 2 + 0.5)
            let r = await studentCollection.doc(res.list[i]._id).update({
              data:{
                ...proposal[rand]
              }
            })
          }
        }else{
          if(res.list[i].transcore>=60){
            let r = await studentCollection.doc(res.list[i]._id).update({
              data:{
                ...proposal[3]
              }
            })
          }else{
            let rand = Math.round(Math.random() * 4 + 0.5) + 3
            let r = await studentCollection.doc(res.list[i]._id).update({
              data:{
                ...proposal[rand]
              }
            })
          }
        }
      }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}