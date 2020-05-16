// pages/user/user.js
const app = getApp()
let userInfo = app.globalData.userInfo;

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  onLoad: function (options) {
    var that = this;
    //获得设备信息
    wx.getSystemInfo({
      success(res) {
        console.log(res.windowHeight);
        that.setData({
          phoneHeight: res.windowHeight,
        })
      }
    })
    // 查看是否授权
    if (app.globalData.userInfo === null) {
      that.setData({
        login: true
      })
    } else {
      that.setData({
        login: false,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    }
  },
  // 获取用户的头像和昵称信息
  bindGetUserInfo(e) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(e.detail.userInfo);
        app.globalData.userInfo = e.detail.userInfo;
        that.setData({
          login: false,
          avatarUrl: e.detail.userInfo.avatarUrl,
          nickName: e.detail.userInfo.nickName
        })
      }
    })
  },
  openSwitch: function () {
    var that = this;
    that.setData({
      show: true
    })
  },
  close: function () {
    var that = this;
    that.setData({
      show: false
    })
  },
  switchQuestionaire: function () {
    wx.navigateTo({
      url: '/pages/questionaire/questionaire',
    })
  },
  switchAbout: function () {
    wx.navigateTo({
      url: '/pages/user/about',
    })
  },
  switchTalk: function () {
    // 判断是否已经有谈心人
    // 如果没有就先匹配
    // 如果有直接跳转，并携带谈心人的数据，建立连接
    // 这里默认没有
    if (app.globalData.talkPerson == null) {
      //匹配
      wx.showLoading({
        title: '匹配谈心人',
        mask: true,
      })

      // if 匹配到了 这里用定时替换
      setTimeout(function () {
        wx.hideLoading();
        wx.showToast({
          title: '匹配成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            // 匹配成功后
            app.globalData.talkPerson = {
              id: 123,
              name: '卫浴姐'
            };
            wx.navigateTo({
              url: '/pages/talk/talk'
            })
          }
        })

      }, 2000)
      // else 显示匹配失败
      // setTimeout(function () {
      //   wx.hideLoading();
      //   wx.showToast({
      //     title: '匹配失败',
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return null;
      // }, 5000)

    }else{
      wx.navigateTo({
        url: '/pages/talk/talk'
      })
    }


  }

})