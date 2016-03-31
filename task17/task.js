/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

//配色组合
var colorGroup = ['#823835','#8ABEB2','#C9BA83','#DDD38C','#DE9C52'];

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: 'day'
}

function returnTarget(e){
  var e = e || window.event;
  return e.target || e.srcElement;
}

/**
 * 渲染图表
 */
function renderChart() {
  var cities = Object.keys(aqiSourceData),
      targetCity = cities[pageState.nowSelectCity],
      displayData = chartData[targetCity][pageState.nowGraTime],
      chart = document.getElementsByClassName('aqi-chart-wrap')[0];
  clearBlock(chart);  //清空柱状图
  if (pageState.nowGraTime === 'day'){
    var time = displayData.time,
        dayData = displayData.data;
    for (var i = 0, len = dayData.length; i < len; i++){
      var displayBlock = document.createElement('span');
      displayBlock.title = time[i] + '\nData: ' + dayData[i];
      displayBlock.style.height = dayData[i] + 'px';
      displayBlock.style.backgroundColor = colorGroup[Math.floor(Math.random() * 5)];
      displayBlock.classList.add('day-block');
      chart.appendChild(displayBlock);
    }
  }
  else{
    for (var i = 0, len = displayData.length; i < len; i++){
      var displayBlock = document.createElement('span');
      if (pageState.nowGraTime === 'week'){
        displayBlock.title = '2016年第' + (i + 1) + '周\nData: ' + Math.ceil(displayData[i]);
        displayBlock.classList.add('week-block');
      }else{
        displayBlock.title = '2016年' + (i + 1) + '月\nData: ' + Math.ceil(displayData[i]);
        displayBlock.classList.add('month-block');
      }      
      displayBlock.style.height = displayData[i] + 'px';
      displayBlock.style.backgroundColor = colorGroup[Math.floor(Math.random() * 5)];
      chart.appendChild(displayBlock);
    }
  }
}

function clearBlock(ele){
  while (ele.hasChildNodes()){
    ele.removeChild(ele.firstChild);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 
  var target = returnTarget(e);
  if (pageState.nowGraTime === target.value){
    return;
  }
  // 设置对应数据
  pageState.nowGraTime = target.value;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化   
  var target  = returnTarget(e);
  if (pageState.nowSelectCity === target.selectedIndex){
    return;
  }
  // 设置对应数据
  pageState.nowSelectCity = target.selectedIndex;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTimeForm = document.getElementById('form-gra-time');
  graTimeForm.onclick = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.getElementById('city-select');
  var cities = Object.keys(aqiSourceData);
  //console.log(cities)
  for (var i = 0, len = cities.length; i < len; i++){
    var option = document.createElement('option');
    option.textContent = cities[i];
    select.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  for (var x in aqiSourceData){
    var currentMonth = 0,
        monthSum = 0,
        weekSum = 0,
        monthCount = 0,
        weekCount = 0,
        monthAvg = [],
        weekAvg = [],
        day = [],
        dayData = [];
    for (var y in aqiSourceData[x]){
      var date = new Date(y),
          tomorrow = new Date(y);
      tomorrow.setDate(date.getDate() + 1);   
      monthSum += aqiSourceData[x][y];
      monthCount++; 
      weekSum += aqiSourceData[x][y];
      weekCount++;
      day.push(y);
      dayData.push(aqiSourceData[x][y]);
      if (tomorrow.getDay() === 0){
        weekAvg.push(weekSum / weekCount);
        weekSum = 0;
        weekCount = 0;
      }      
      if (tomorrow.getMonth() !== currentMonth){
        monthAvg.push(monthSum / monthCount);
        monthSum = 0;
        monthCount = 0;
        currentMonth++;
      }        
      continue;
    }
    // 处理好的数据存到 chartData 中
    chartData[x] = {'month': monthAvg, 'week': weekAvg, 'day': {time: day, data: dayData}};
    monthAvg = 0;  //通过赋值清理内存
    weekAvg = 0;
    day = 0;
    dayData = 0;
  }
  //console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

window.onload = function(){
  init();
  //initAqiChartData()
}