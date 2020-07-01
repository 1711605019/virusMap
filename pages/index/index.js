// import utils from '../../../utils/util.js'
import * as echarts from '../../ec-canvas/echarts';
import '../../ec-canvas/world.js';

const app = getApp();
const nameMap = {
  "Canada": "加拿大",
  "Turkmenistan": "土库曼斯坦",
  "Saint Helena": "圣赫勒拿",
  "Lao PDR": "老挝",
  "Lithuania": "立陶宛",
  "Cambodia": "柬埔寨",
  "Ethiopia": "埃塞俄比亚",
  "Faeroe Is.": "法罗群岛",
  "Swaziland": "斯威士兰",
  "Palestine": "巴勒斯坦",
  "Belize": "伯利兹",
  "Argentina": "阿根廷",
  "Bolivia": "玻利维亚",
  "Cameroon": "喀麦隆",
  "Burkina Faso": "布基纳法索",
  "Aland": "奥兰群岛",
  "Bahrain": "巴林",
  "Saudi Arabia": "沙特阿拉伯",
  "Fr. Polynesia": "法属波利尼西亚",
  "Cape Verde": "佛得角",
  "W. Sahara": "西撒哈拉",
  "Slovenia": "斯洛文尼亚",
  "Guatemala": "危地马拉",
  "Guinea": "几内亚",
  "Dem. Rep. Congo": "刚果（金）",
  "Germany": "德国",
  "Spain": "西班牙",
  "Liberia": "利比里亚",
  "Netherlands": "荷兰",
  "Jamaica": "牙买加",
  "Solomon Is.": "所罗门群岛",
  "Oman": "阿曼",
  "Tanzania": "坦桑尼亚",
  "Costa Rica": "哥斯达黎加",
  "Isle of Man": "曼岛",
  "Gabon": "加蓬",
  "Niue": "纽埃",
  "Bahamas": "巴哈马",
  "New Zealand": "新西兰",
  "Yemen": "也门",
  "Jersey": "泽西岛",
  "Pakistan": "巴基斯坦",
  "Albania": "阿尔巴尼亚",
  "Samoa": "萨摩亚",
  "Czech Rep.": "捷克",
  "United Arab Emirates": "阿拉伯联合酋长国",
  "Guam": "关岛",
  "India": "印度",
  "Azerbaijan": "阿塞拜疆",
  "N. Mariana Is.": "北马里亚纳群岛",
  "Lesotho": "莱索托",
  "Kenya": "肯尼亚",
  "Belarus": "白俄罗斯",
  "Tajikistan": "塔吉克斯坦",
  "Turkey": "土耳其",
  "Afghanistan": "阿富汗",
  "Bangladesh": "孟加拉国",
  "Mauritania": "毛里塔尼亚",
  "Dem. Rep. Korea": "朝鲜",
  "Saint Lucia": "圣卢西亚",
  "Br. Indian Ocean Ter.": "英属印度洋领地",
  "Mongolia": "蒙古",
  "France": "法国",
  "Cura?ao": "库拉索岛",
  "S. Sudan": "南苏丹",
  "Rwanda": "卢旺达",
  "Slovakia": "斯洛伐克",
  "Somalia": "索马里",
  "Peru": "秘鲁",
  "Vanuatu": "瓦努阿图",
  "Norway": "挪威",
  "Malawi": "马拉维",
  "Benin": "贝宁",
  "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
  "Korea": "韩国",
  "Singapore": "新加坡",
  "Montenegro": "黑山共和国",
  "Cayman Is.": "开曼群岛",
  "Togo": "多哥",
  "China": "中国",
  "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
  "Armenia": "亚美尼亚",
  "Falkland Is.": "马尔维纳斯群岛（福克兰）",
  "Ukraine": "乌克兰",
  "Ghana": "加纳",
  "Tonga": "汤加",
  "Finland": "芬兰",
  "Libya": "利比亚",
  "Dominican Rep.": "多米尼加",
  "Indonesia": "印度尼西亚",
  "Mauritius": "毛里求斯",
  "Eq. Guinea": "赤道几内亚",
  "Sweden": "瑞典",
  "Vietnam": "越南",
  "Mali": "马里",
  "Russia": "俄罗斯",
  "Bulgaria": "保加利亚",
  "United States": "美国",
  "Romania": "罗马尼亚",
  "Angola": "安哥拉",
  "Chad": "乍得",
  "South Africa": "南非",
  "Fiji": "斐济",
  "Liechtenstein": "列支敦士登",
  "Malaysia": "马来西亚",
  "Austria": "奥地利",
  "Mozambique": "莫桑比克",
  "Uganda": "乌干达",
  "Japan": "日本",
  "Niger": "尼日尔",
  "Brazil": "巴西",
  "Kuwait": "科威特",
  "Panama": "巴拿马",
  "Guyana": "圭亚那",
  "Madagascar": "马达加斯加",
  "Luxembourg": "卢森堡",
  "American Samoa": "美属萨摩亚",
  "Andorra": "安道尔",
  "Ireland": "爱尔兰",
  "Italy": "意大利",
  "Nigeria": "尼日利亚",
  "Turks and Caicos Is.": "特克斯和凯科斯群岛",
  "Ecuador": "厄瓜多尔",
  "U.S. Virgin Is.": "美属维尔京群岛",
  "Brunei": "文莱",
  "Australia": "澳大利亚",
  "Iran": "伊朗",
  "Algeria": "阿尔及利亚",
  "El Salvador": "萨尔瓦多",
  "C?te d'Ivoire": "科特迪瓦",
  "Chile": "智利",
  "Puerto Rico": "波多黎各",
  "Belgium": "比利时",
  "Thailand": "泰国",
  "Haiti": "海地",
  "Iraq": "伊拉克",
  "S?o Tomé and Principe": "圣多美和普林西比",
  "Sierra Leone": "塞拉利昂",
  "Georgia": "格鲁吉亚",
  "Denmark": "丹麦",
  "Philippines": "菲律宾",
  "S. Geo. and S. Sandw. Is.": "南乔治亚岛和南桑威奇群岛",
  "Moldova": "摩尔多瓦",
  "Morocco": "摩洛哥",
  "Namibia": "纳米比亚",
  "Malta": "马耳他",
  "Guinea-Bissau": "几内亚比绍",
  "Kiribati": "基里巴斯",
  "Switzerland": "瑞士",
  "Grenada": "格林纳达",
  "Seychelles": "塞舌尔",
  "Portugal": "葡萄牙",
  "Estonia": "爱沙尼亚",
  "Uruguay": "乌拉圭",
  "Antigua and Barb.": "安提瓜和巴布达",
  "Lebanon": "黎巴嫩",
  "Uzbekistan": "乌兹别克斯坦",
  "Tunisia": "突尼斯",
  "Djibouti": "吉布提",
  "Greenland": "格陵兰",
  "Timor-Leste": "东帝汶",
  "Dominica": "多米尼克",
  "Colombia": "哥伦比亚",
  "Burundi": "布隆迪",
  "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
  "Cyprus": "塞浦路斯",
  "Barbados": "巴巴多斯",
  "Qatar": "卡塔尔",
  "Palau": "帕劳",
  "Bhutan": "不丹",
  "Sudan": "苏丹",
  "Nepal": "尼泊尔",
  "Micronesia": "密克罗尼西亚",
  "Bermuda": "百慕大",
  "Suriname": "苏里南",
  "Venezuela": "委内瑞拉",
  "Israel": "以色列",
  "St. Pierre and Miquelon": "圣皮埃尔和密克隆群岛",
  "Central African Rep.": "中非",
  "Iceland": "冰岛",
  "Zambia": "赞比亚",
  "Senegal": "塞内加尔",
  "Papua New Guinea": "巴布亚新几内亚",
  "Trinidad and Tobago": "特立尼达和多巴哥",
  "Zimbabwe": "津巴布韦",
  "Jordan": "约旦",
  "Gambia": "冈比亚",
  "Kazakhstan": "哈萨克斯坦",
  "Poland": "波兰",
  "Eritrea": "厄立特里亚",
  "Kyrgyzstan": "吉尔吉斯斯坦",
  "Montserrat": "蒙特塞拉特",
  "New Caledonia": "新喀里多尼亚",
  "Macedonia": "马其顿",
  "Paraguay": "巴拉圭",
  "Latvia": "拉脱维亚",
  "Hungary": "匈牙利",
  "Syria": "叙利亚",
  "Honduras": "洪都拉斯",
  "Myanmar": "缅甸",
  "Mexico": "墨西哥",
  "Egypt": "埃及",
  "Nicaragua": "尼加拉瓜",
  "Cuba": "古巴",
  "Serbia": "塞尔维亚",
  "Comoros": "科摩罗",
  "United Kingdom": "英国",
  "Fr. S. Antarctic Lands": "南极洲",
  "Congo": "刚果（布）",
  "Greece": "希腊",
  "Sri Lanka": "斯里兰卡",
  "Croatia": "克罗地亚",
  "Botswana": "博茨瓦纳",
  "Siachen Glacier": "锡亚琴冰川地区"
}
var dList = [];
var ChinaData = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // onInit: initChart,
      lazyLoad: true
    },
    // 地图数据
    list: [],
    updateTime: '',
    allConfirm: '',
    nowConfirm: '',
    deadNum: '',
    cureNum: '',
    allConfirmAdd: '',
    nowConfirmAdd: '',
    deadNumAdd: '',
    cureNumAdd: '',
    _static1: 1,
    _static2: 0,
    // 折线图数据
    date: [],
    newAddConfirm: '',
    // 柱状图
    nation: '',
    addNum: ''
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

    //世界数据
    wx.request({
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign',
      success(res) {
        dList = JSON.parse(res.data.data);
        // console.log(dList);

        dList.foreignList.forEach(item => {
          item.value = item.confirm
        })
        // 折线图
        var date = [];
        var newNum = [];
        var history = dList.globalDailyHistory.reverse();
        for (let i = 0; i < 27; i++) {
          date.push(history[i].date),
            newNum.push(history[i].all.newAddConfirm)
        }
        // 柱状图
        var nation = [];
        var addNum = [];
        var addList = dList.countryAddConfirmRankList;
        for (let i = 0; i < 10; i++) {
          nation.push(addList[i].nation);
          addNum.push(addList[i].addConfirm)
        }
        that.setData({
          list: dList.foreignList,
          updateTime: dList.globalStatis.lastUpdateTime,
          allConfirm: dList.globalStatis.confirm,
          nowConfirm: dList.globalStatis.nowConfirm,
          deadNum: dList.globalStatis.dead,
          cureNum: dList.globalStatis.heal,
          allConfirmAdd: dList.globalStatis.confirmAdd,
          nowConfirmAdd: dList.globalStatis.nowConfirmAdd,
          deadNumAdd: dList.globalStatis.deadAdd,
          cureNumAdd: dList.globalStatis.healAdd,
          // 折线图
          date: date,
          newAddConfirm: newNum,
          // 柱状图
          nation: nation,
          addNum: addNum
        })
        // console.log(addNum);

        ChinaData = {
          name: '中国',
          value: 85227
        }
        that.data.list.push(ChinaData);
        that.mapComponent = that.selectComponent('#mychart-dom-area');
        that.init_map();

        that.lineComponent = that.selectComponent('#mychart-dom-line');
        that.init_line();

        that.barComponent = that.selectComponent('#mychart-dom-bar');
        that.init_bar();

        wx.hideLoading();

      }
    })

  },

  // 疫情分布地图
  init_map() {
    this.mapComponent.init((canvas, width, height, dpr) => {
      // 初始化图表
      const mapChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(mapChart);
      // echarts.registerMap('world', nameMap);
      mapChart.setOption(this.getMapOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return mapChart;
    });

  },
  getMapOption() {
    return {
      tooltip: {
        show: true,
        formatter: function (params) {
          return params.name + '确诊：' + params.data['value'] + '人'
        },
      },

      // 视觉映射组件
      visualMap: {
        // 设置映射类型：piecewise分段型、continuous连续性
        type: 'piecewise',
        pieces: [
          { max: 0, label: '0', color: '#eee' },
          { min: 1, max: 499, label: '1-499', color: '#fff7ba' },
          { min: 500, max: 4999, label: '500-4999', color: '#ffc24b' },
          { min: 5000, max: 9999, label: '5000-9999', color: '#ff7c20' },
          { min: 10000, max: 100000, label: '1万-10万', color: '#fe5e3b' },
          { min: 100000, max: 500000, label: '10万-50万', color: '#e2482b' },
          { min: 500000, label: '50万以上', color: '#b93e26' },
        ],
        itemHeight: 10,
        itemWidth: 10,
        inverse: true,
      },

      //配置属性
      series: [
        {
          type: "map",
          mapType: "world",
          nameMap: nameMap,
          data: this.data.list
        }
      ]
    }
  },

  //点击切换地图按钮
  changeConfirm(e) {
    dList.foreignList.forEach(item => {
      item.value = item.confirm
    })
    this.setData({
      _static1: 1,
      _static2: 0,
      list: dList.foreignList
    });
    ChinaData.value = 85227;
    this.init_map();
  },
  changeNowConfirm(e) {
    dList.foreignList.forEach(item => {
      item.value = item.nowConfirm
    })
    this.setData({
      _static1: 0,
      _static2: 1,
      list: dList.foreignList
    })
    ChinaData.value = 525;
    this.init_map();
  },

  // -------------------------------------------------
  // 折线图
  init_line() {
    this.lineComponent.init((canvas, width, height, dpr) => {
      // 初始化图表
      const lineChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(lineChart);

      lineChart.setOption(this.getLineOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return lineChart;
    });
  },
  getLineOption() {
    return {
      // 设置标题
      title: {
        text: "海外新增确诊趋势"
      },
      // 图例组件
      legend: {
        // 图例组件前图标类型
        icon: "rect",
        // 设置图例大小
        itemWidth: 12,
        itemHeight: 12,
        right: 20,
        top: 20,
        // 设置图例展示方式：horizontal水平
        orient: 'horizontal',
        // 设置图例文字样式
        textStyle: {
          padding: [3, 0, 0, 0]
        }
      },
      // 设置X轴配置
      xAxis: {
        // 设置X轴类型：category类目轴
        type: 'category',
        data: this.data.date.reverse(),
        // 坐标轴刻度标签的相关设置
        axisLabel: {
          rotate: 45,
          interval: 0,
          color: "#ccc",
          fontSize: 10
        },
        // 坐标轴刻度相关设置
        axisTick: {
          length: 0
        }
      },
      // 设置X轴配置
      yAxis: {
        type: 'value',
        min: 60000,
        max: 200000,
        axisLabel: {
          margin: 0,
          formatter: function (param) {
            return param.toString();
          }
        },
        // 坐标轴刻度相关设置
        axisTick: {
          length: 0
        },
        // 坐标轴轴线相关设置
        axisLine: {
          show: false
        }
      },
      series: [{
        name: "新增确诊",
        type: 'line',
        data: this.data.newAddConfirm,
        // 是否平滑曲线显示
        smooth: true,
        // 线条样式
        lineStyle: {
          color: "#ff3d18"
        }
      }],
      tooltip: {
        trigger: "item",
        formatter: function (param) {

          return param.name + " " + param.seriesName + param.value;
        }
      }
    }
  },

  // -------------------------------------------------
  // 柱状图
  init_bar() {
    this.barComponent.init((canvas, width, height, dpr) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(barChart);

      barChart.setOption(this.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  getBarOption() {
    return {
      // 设置标题
      title: {
        text: "昨日新增确诊国家Top10"
      },
      xAxis: {
        type: 'category',
        data: this.data.nation,
        axisLabel: {
          interval: 0,
          rotate: 45,
          color: "#333",
          fontSize: 10
        },
        axisTick: {
          length: 0
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return value.toString();
          }
        }
      },
      series: [{
        // 柱状图
        type: 'bar',
        data: this.data.addNum,
        barWidth: 18,
        itemStyle: {
          // 鼠标经过时样式
          emphasis: {
            color: "#ffe04d"
          }
        }
      }],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true
      },
    }
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage(res) {
    return {
      title: '一起来关注疫情状况吧！',
      path: '/pages/index/index',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
})

