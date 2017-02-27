var readline = require('readline'),
    fs = require('fs'),
    path = require('path'),
    fReadName = path.join(__dirname, 'sp500hst.txt'),
    fWriteName = path.join(__dirname, 'stock.json'),
    outputObj = {},
    fRead = fs.createReadStream(fReadName),
    rl = readline.createInterface({
        input: fRead
    });

rl.on('line', function(line) {
    var tempArr = line.split(','),
        removedArr = tempArr.splice(0, 2),
        key = removedArr[1];
    if (outputObj[key] === undefined) {
        outputObj[key] = {
            category: [],
            value: [],
            volumn: []
        };
    }
    outputObj[key]['category'].push(removedArr[0]
                              .replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3'));
    outputObj[key]['value'].push(tempArr);
    outputObj[key]['volumn'].push(tempArr[4]);
});

rl.on('close', function() {
    fs.writeFile(fWriteName, JSON.stringify(outputObj), function(err) {
        if (err) throw err;
        console.log('JSON file has been created...');
    });
});
