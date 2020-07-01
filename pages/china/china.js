// pages/china/china.js
import * as echarts from '../../ec-canvas/echarts';
// import geoJson from './mapData.js';
import geoJson from './chinaMap.js';
var chinaData;
var chinaList;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    ec: {
      lazyLoad: true // 延迟加载
    },
    date: '',
    allConfirm: '',
    addAllConfirm: '',
    suspect: '',
    addsuspect: '',
    death: '',
    adddeath: '',
    cured: '',
    addcured: '',

    province: '',
    city: '',

    dw_confirmedCount: '',
    dw_deadCount: '',
    dw_curedCount: '',
    dw1_confirmedCount: '',
    dw1_deadCount: '',
    dw1_curedCount: '',

    // 地图
    list: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //加载动画
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;


    //获取位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            'key': '4KOBZ-P52KX-IIK4C-7JLF2-OPEKF-KVBJF',
            'location': locationString
          },
          method: 'GET',
          success: (res) => {
            wx.setStorageSync('provinceName', res.data.result.address_component.province)
            wx.setStorageSync('city', res.data.result.address_component.city)
            that.setData({
              city: res.data.result.address_component.city,
              province: res.data.result.address_component.province,
            })

          },
          fail: function () {
            console.log('请求失败');
          },
          complete: function () {

            for (let i = 0; i < chinaList.length; i++) {
              var provinceNew = chinaList[i].name + '省';
              if (provinceNew == wx.getStorageSync('provinceName')) {
                that.setData({
                  dw_confirmedCount: chinaList[i].total.confirm,
                  dw_deadCount: chinaList[i].total.dead,
                  dw_curedCount: chinaList[i].total.heal
                })
                for (var j = 0; j < chinaList[i].children.length; j++) {
                  var cityNew = chinaList[i].children[j].name + '市';

                  if (cityNew == wx.getStorageSync('city')) {
                    that.setData({
                      dw1_confirmedCount: chinaList[i].children[j].total.confirm,
                      dw1_deadCount: chinaList[i].children[j].total.dead,
                      dw1_curedCount: chinaList[i].children[j].total.heal
                    })
                  }

                }
              }
            }
            console.log('请求完成');
            // console.log(chinaList);

          }
        })
      }
    })

    wx.request({
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
      success(res) {
        chinaData = JSON.parse(res.data.data);
        chinaList = chinaData.areaTree[0].children;
        chinaList.forEach(item => {
          item.value = item.total.confirm
        })
        console.log(chinaData);

        that.setData({
          date: chinaData.lastUpdateTime,
          allConfirm: chinaData.chinaTotal.confirm,
          addAllConfirm: chinaData.chinaAdd.confirm,
          suspect: chinaData.chinaTotal.suspect,
          addsuspect: chinaData.chinaAdd.suspect,
          death: chinaData.chinaTotal.dead,
          adddeath: chinaData.chinaAdd.dead,
          cured: chinaData.chinaTotal.heal,
          addcured: chinaData.chinaAdd.heal,

          list: chinaList,

          videoSrc: 'https://vdept.bdstatic.com/37376a6d707650693644775542355442/55464a36724c5468/d39ec22098c7ca187f1d97062fdc51c4edb300559e74548e92e49c350e4e16e417c15457d6f76a890a43af453dd3b943.mp4?auth_key=1593587732-0-0-5d730f33551ae880f42e1afa8edfbe7a'
        })

        // console.log(chinaList.length);
        that.barComponent = that.selectComponent('#mychart-dom-area');
        that.init_map();
        wx.hideLoading();

      }
    })
  },
  // 全国疫情分布
  init_map: function () {
    this.barComponent.init((canvas, width, height, dpr) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(barChart);
      echarts.registerMap('china', geoJson);
      barChart.setOption(this.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });

  },
  // 全国疫情分布
  getBarOption() {
    return {
      tooltip: {
        show: true,
        formatter: function (params) {
          return params.name + '确诊：' + params.data['value'] + '人'
        },
      },

      visualMap: {
        type: 'piecewise',
        left: 'left',
        top: 'bottom',
        pieces: [{
          min: 1000
        },
        {
          min: 500,
          max: 1000
        },
        {
          min: 100,
          max: 499
        },
        {
          min: 10,
          max: 99
        },
        {
          min: 1,
          max: 9
        },
        ],
        color: ['#7A2F11', '#C94D22', '#EE8859', '#F3B494', '#F5DED3']
      },

      series: [{
        type: 'map',
        mapType: 'china',
        label: {
          normal: {
            show: true,
            fontSize: 8,

          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },

        itemStyle: {

          normal: {
            borderColor: '#389BB7',
            areaColor: '#fff',
          },
          emphasis: {
            areaColor: '#F9CE4C',
            borderWidth: 0
          }
        },
        animation: true,
        data: this.data.list

      }]
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})