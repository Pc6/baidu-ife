var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    t, keyword, result, config;

if (system.args.length !== 3) {
    console.log('Usage: task.js keyword device');
    phantom.exit();
}

keyword = system.args[1];
device = system.args[2];
if (fs.exists(device + '.json')) {
    var content = fs.read(device + '.json');
    // console.log(content)
    config = JSON.parse(content);
} else {
    console.log('Device does not exist...');
    phantom.exit();
}

page.settings.userAgent = config.userAgent;
page.viewportSize = {
    width: config.width,
    height: config.height
};

t = Date.now();
page.open('https://www.baidu.com/s?wd=' + keyword, function(status) {
    t = Date.now() - t;
    if (status !== 'success') {
        result = {
            code: 0,
            msg: '抓取失败',
            time: t,
            dataList: []
        };
        console.log(JSON.stringify(result, undefined, 4));
        phantom.exit();
    } else {
        page.includeJs('http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js',
        function() {
            // console.log('Screen: ' + screen.width + ', ' + screen.height)
            result = page.evaluate(function(keyword, t, device) {
                var containers = $('.c-container')
                                    .not('.rs-toprq-wrapper, .c-recomm-wrap'),
                    dataList = [];
                for (var i = 0; i < containers.length; i++) {
                    var obj = {},
                        container = $(containers[i]);
                    if (device === 'ipad') {
                        var title = container.find('.t>a').text(),
                            link = container.find('.t>a').attr('href'),
                            info = container.find('.c-abstract').text()
                                            .trim().replace(/\n|\s+/g, ' '),
                            pic = container.find('.c-img').attr('src');
                    } else {
                        var title = container.find('.c-title').text(),
                            link = container.children('.c-blocka:first')
                                            .attr('href'),
                            info = container.find('.c-color').text(),
                            pic = container.find('.c-img>img').attr('src');
                    }

                    obj.title = title;
                    obj.info = info;
                    obj.link = link;
                    obj.pic = pic;
                    dataList.push(obj);
                }

                return JSON.stringify({
                    'code': 1,
                    'msg': '抓取成功',
                    'word': keyword,
                    'device': device,
                    'time': t,
                    'dataList': dataList
                }, undefined, 4);
            }, keyword, t, device);
            
            fs.write('result.json', result, 'w');
            console.log(result); 
            phantom.exit();   
        });
    }
});

page.onConsoleMessage = function(msg) {
    console.log('console: ' + msg);
};
