/**
 * @author shh
 * @create date 2019-12-11
 * @desc
 */

require('shelljs/global')

var prettier = require("prettier")
var fs = require('fs')
var configArg = process.argv[2]

if (!configArg) {
    echo('> Error: must provide configfile path or weappid!')
    exit(1)
}

let weappid
if (fs.existsSync(configArg)) {
    echo('> configfile path: ' + configArg)
    var data = fs.readFileSync(configArg, 'utf8')
    var jsonData = JSON.parse(data)
    weappid = jsonData.appid
} else {
    echo('> weapp id: ' + configArg)
    weappid = configArg
}

if (weappid) {
    var weappPath = './project.config.json'
    var weappData = fs.readFileSync(weappPath, 'utf8')
    if (weappData) {
        var weappJsonData = JSON.parse(weappData)
        weappJsonData.appid = weappid

        var formatedData = prettier.format(JSON.stringify(weappJsonData), {parser: "json"})
        echo('> weapp configgile: \n' + formatedData)
        fs.writeFileSync(weappPath, formatedData, 'utf8')
    }
}