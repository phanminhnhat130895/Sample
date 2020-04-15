var fs = require('fs');
var path = require('path');

class LogService{
    static createLog(logMessage, logLevel){
        let rootpath = path.resolve(require.main.filename).substr(0, path.resolve(require.main.filename).lastIndexOf('\\'));
        let filePath = rootpath + '\\logs\\' + formatDate() + "_log.txt";
        let messageLog = "[" + logLevel + "] " + formatDateTime() + ": " + logMessage;
        fs.writeFileSync(filePath, messageLog);
    }
}

function formatDate() {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateTime() {
    var d = new Date(),
    hour = d.getHours();
    minute = d.getMinutes();
    second = d.getSeconds();

    if (hour.length < 2) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;
    if (second.length < 2) second = '0' + second;

    return formatDate() + " " + [hour, minute, second].join(':');
}

module.exports = LogService;