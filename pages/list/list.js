// pages/list/list.js
const fecth = require('../../utils/fecth')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {},//当前加载的分类
    shops: [],//此分类下的店铺
    pageIndex: 0,
    pageLimit: 20,
    hasMore: true
  },
  loadMore(){
    if(!this.data.hasMore) return
    let {pageIndex,pageLimit} = this.data
    const param = { _page:++pageIndex, _limit:pageLimit}
    return fecth(`categories/${this.data.category.id}/shops`,param)
    .then( res => {
      // console.log(res.data)
      const totalCount = parseInt(res.header['x-total-count'])
      const hasMore = pageIndex * pageLimit < totalCount
      const shops = this.data.shops.concat(res.data)
      this.setData({
        shops,pageIndex,hasMore
      })
      
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    fecth(`categories/${options.cat}`).then(res => {
      // console.log(res.data)
      // wx.setNavigationBarTitle({
      //   title: res.data.name
      // })
      this.setData({
        category: res.data
      })
      wx.setNavigationBarTitle({
        title: res.data.name
      })

      //加载完分类信息后再去加载商品信息
      this.loadMore()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log('下拉刷新')
    this.setData({
      shops: [],
      pageIndex: 0,
      hasMore: true
    })
    this.loadMore().then(()=>{
      wx.stopPullDownRefresh()
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('别拉了，到底了')
    //加载下一页数据
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})