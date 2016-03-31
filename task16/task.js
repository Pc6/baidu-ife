/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim(),
		value = document.getElementById('aqi-value-input').value.trim();
	if (city.match(/^[\u4e00-\u9fa5_a-zA-Z]+$/g) && value.match(/^[0-9]+$/g)){
		aqiData[city] = value;
	}
	else{
		alert('你的输入不合法！');
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	var content = '<tr><td>城市</td><td>空气质量</td><td>操作</td><tr>';
	for (var index in aqiData){
		content += '<tr><td>' + index + '</td><td>' + aqiData[index] + '</td><td>'
							+ '<button data-city=' + index + '>删除</button></tr>';
	};
  table.innerHTML = index ? content : '';  //若index都被删除了，删除标题栏
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  var e = e || window.event,
      target = e.target || e.srcElement;
  if (target.tagName.toLowerCase() === 'button'){
  	var city = target.dataset.city;
  	delete aqiData[city];
  	renderAqiList();
  }
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById('add-btn');
  addBtn.onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var delBtn = document.getElementById('aqi-table');
  delBtn.onclick = delBtnHandle;
}
window.onload = function(){
	init();
}