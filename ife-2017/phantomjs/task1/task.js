var page = require('webpage').create(),
    system = require('system'),
    t, keyword, result;

if (system.args.length === 1) {
    console.log('Keyword is needed...');
    phantom.exit();
}

t = Date.now();
keyword = system.args[1];
page.open('https://www.baidu.com/s?wd=' + keyword, function(status) {
    t = Date.now() - t;
    if (status !== 'success') {
        result = {
            code: 0,
            msg: '抓取失败',
            time: t,
            dataList: []
        };
        console.log(JSON.stringify(result));
        phantom.exit();
    } else {
        page.includeJs('http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js',
        function() {
            result = page.evaluate(function(keyword, t) {
                var containers = $('.c-container'),
                    dataList = [];
                for (var i = 0; i < containers.length; i++) {
                    var obj = {},
                        container = $(containers[i]),
                        title = container.find('.t>a').text(),
                        link = container.find('.t>a').attr('href'),
                        info = container.find('.c-abstract').text(),
                        pic = container.find('.c-img').attr('src');

                    obj.title = title;
                    obj.info = info;
                    obj.link = link;
                    obj.pic = pic;
                    dataList.push(obj);
                }
                // console.log('debug: ' + JSON.stringify(dataList));

                return JSON.stringify({
                    'code': 1,
                    'msg': '抓取成功',
                    'word': keyword,
                    'time': t,
                    'dataList': dataList
                });
            }, keyword, t);
            
            console.log(result); 
            phantom.exit();   
        });
    }
});
