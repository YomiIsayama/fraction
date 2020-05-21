//app.js
let r = ''
App({
  async onLaunch(){
    if(!wx.cloud){
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }else{
      wx.cloud.init({
        env:'yyw07180945-26662',
        traceUser:true,
      })
    }

    this.globalData = []
    r = await wx.cloud.callFunction({
      name: 'pc_userLogin'
    })
    console.log(r)
    let user = r.result.user
    if(r.result.user.name == 'nobody'){
      wx.redirectTo({
        url: '/pages/register/register',
      })
    }else{
      this.globalData.user = user
      if(!user.target){
        wx.redirectTo({
          url: '/pages/rank/rank',
        })
      }
    }
  }
})
