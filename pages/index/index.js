//index.js

const fecth = require("../../utils/fecth")

//获取应用实例
const app = getApp()

const fetch = require('../../utils/fecth.js')

Page({
  data: {
    slides:[],
    categories:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // wx.request({
    //   url: 'https://locally.uieee.com/slides',
    //   // header: {
    //   //   'Content-Type': 'json' // 默认值
    //   // },
    //   success: res => {
    //     this.setData({
    //       slides: res.data
    //     })
    //   }
    // })
    //发送异步请求 没有跨域 请求的地址必须在管理后台添加白名单 域名必须备案
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   success: res => {
    //     this.setData({
    //       categories: res.data
    //     })
    //   }
    // })
    fetch('slides').then(
      res => {
        this.setData({
          slides: res.data
        })
      }
    )
    fecth('categories').then(
      res => {
        this.setData({
          categories: res.data
        })
      }
    )
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
