const api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
    herosListHeight: 0,
    tabInfo: [
      {
        name: '英雄类型',
        color: true,
        id: 0
      },{
        name: '位置',
        color: true,
        id: 1
      },{
        name: '价格',
        color: true,
        id: 2
      },{
        name: '排序',
        color: true,
        id: 3
      }
    ],
    tabNow: -1,
    dataSource: [],
  },

  onLoad: function () {
    wx.getSystemInfo( {
      success: ( res ) => {
          let top = 146 * res.windowWidth / 750
          this.setData({
              herosListHeight: res.windowHeight - top
          })
      }
  })

  console.log(0.1 * 0.1)

  var heroInfo = wx.getStorageSync('heroInfo')

  if (heroInfo) {
    this.setData({
      dataSource: heroInfo
    })
  }else {
    let url = 'https://ossweb-img.qq.com/upload/qqtalk/lol_hero/hero_list.js'
    api.fetchGet(url).then(res => {
      wx.setStorageSync('heroInfo', res)
      this.setData({
        dataSource: res
      })
    })
  }

  },

  onTabCell: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var info = that.data.tabInfo
    if (that.data.tabNow == -1) {
      info[id].color = false
      that.setData({
        tabInfo: info,
        tabNow: id
      })
    }else {
      if (id == that.data.tabNow) {
        info[id].color = true
        that.setData({
          tabInfo: info,
          tabNow: -1
        })
      }else {
        info[that.data.tabNow].color = true
        info[id].color = false
        that.setData({
          tabInfo: info,
          tabNow: id
        })
      }
    }


  }
})
