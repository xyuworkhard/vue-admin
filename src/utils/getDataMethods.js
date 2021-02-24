export function getDictionaryVal(type, that) {
    return that.$store.getters.dataDicCode[type] ? Object.values(that.$store.getters.dataDicCode[type]) : undefined
}

export function getDataSource(that) {
    return that.$store.getters['dataSourceComp']
}
export function getDataSourceFinc(that) {
    return that.$store.getters['dataSourceFinc']
}
export function getNameById(arr, id) {
    if (!arr) {
        return undefined
    }
    let value = arr.find(val => val.value == id);
    return value && value['text']

}
export function getIdByName(arr, name) {
    if (!arr) {
        return undefined
    }
    let value = arr.find(val => val.text == name);
    return value && value['value']
}
export function dealCompany(that) {
    let newCompany = that.getCompanyList().map(ele => {
        return {
            label: ele.compname,
            value: ele.compid
        }
    })
    return newCompany
}
export function dealDictionary(that, type) {
    let newArr = that.getDictionaryVal(type).map(ele => {
        return {
            label: ele.text,
            value: ele.value
        }
    })
    return newArr
}
export function GUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function dateFormat(a, fmt) {
    let o = {
        "M+": a.getMonth() + 1, //月份         
        "d+": a.getDate(), //日         
        "h+": a.getHours() % 12 == 0 ? 12 : a.getHours() % 12, //小时         
        "H+": a.getHours(), //小时         
        "m+": a.getMinutes(), //分         
        "s+": a.getSeconds(), //秒         
        "q+": Math.floor((a.getMonth() + 3) / 3), //季度         
        "S": a.getMilliseconds() //毫秒         
    };
    let week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[a.getDay() + ""]);
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    if (a.toString() == new Date(null).toString()) {
        fmt = "";
    }
    return fmt;
}