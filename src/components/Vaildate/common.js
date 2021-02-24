import request from '@/utils/request'
//var checkQty = (rule, value, callback) => {
//  debugger
//  var val1 = parseFloat(rule.param[Object.keys(rule.param)[0]]).toString() == "NaN" ? 0 : parseFloat(rule.param[Object.keys(rule.param)[0]])
//  var val2 = parseFloat(rule.param[Object.keys(rule.param)[1]]).toString() == "NaN" ? 0 : parseFloat(rule.param[Object.keys(rule.param)[1]])
//  if (val1 > val2) {
//    callback(new Error(rule.message))
//  }
//  else {
//    callback()
//  }
//};
export default {
  name: 'PublicVaildate',
  methods: {
    require() {
      return (rule, value, callback) => {
        if (value == "" || value == null) {
          callback(new Error(rule.message))
        }
        else {
          callback()
        }
      }
    },
    compareNumber() {
      debugger
      return (rule, value, callback, source) => {
        debugger
        //var num1 = parseFloat(eval(rule.param["V1"])).toString() == "" ? 0 : parseFloat(eval(rule.param["V1"]))
        //var num2 = parseFloat(eval(rule.param["V1"])).toString() == "" ? 0 : parseFloat(eval(rule.param["V1"]))
        if (rule.param["type"] == "le") {
          var num1 = parseFloat(value).toString() == "" ? 0 : parseFloat(value)
          var num2 = parseFloat(eval(rule.param["V1"])).toString() == "" ? 0 : parseFloat(eval(rule.param["V1"]))
        } else {
          var num1 = parseFloat(eval(rule.param["V1"])).toString() == "" ? 0 : parseFloat(eval(rule.param["V1"]))
          var num2 = parseFloat(value).toString() == "" ? 0 : parseFloat(value)
        }
        if (num1 > num2) {
          callback(new Error(rule.message))
        }
        else {
          callback()
        }
      }
    }
    ,
    compareDate() {
      return (rule, value, callback, source) => {
        debugger
        //typeof (rule.param["V1"]) == "object"
        //var date1 = new Date(eval(rule.param["V1"])).toString() == "" ? 0 : new Date(eval(rule.param["V1"]))
        //var date2 = new Date(eval(rule.param["V2"])).toString() == "" ? 0 : new Date(eval(rule.param["V2"]))
        if (rule.param["type"] == "d1") {
          var date1 = new Date(value)
          var date2 = new Date(eval(rule.param["V2"])).toString() == "" ? 0 : new Date(eval(rule.param["V2"]))
        } else {
          var date1 = new Date(eval(rule.param["V1"])).toString() == "" ? 0 : new Date(eval(rule.param["V1"]))
          var date2 = new Date(value)
        }

         /* if (typeof(date1) == "object" || typeof(date1)=="object"){
          rule.message='日期不能为空'
            callback(new Error(rule.message))
          }
          else  */ if (date1.valueOf() > date2.valueOf()) {
          callback(new Error(rule.message))
        }
        else {
          callback()
        }
      }
    },
    isvalidateNumber() {
      debugger
      return (rule, value, callback) => {
        const rgx = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        //const rgx = /^[0-9]+.?[0-9]*/

        // const rgx = /^\d+(\.\d{1,3})?$/
        if (value != null && value != "") {
          if (!rgx.test(value)) {
            callback(new Error(rule.message))
          }
          //else if(value.slice(-1) == '.'){
          // callback(new Error(rule.message))
          //} 
          //else if(Number(value)<0) {
          //    callback(new Error(rule.message))
          //} 
          else {
            callback()
          }
        }
        else {
          callback()
        }
      }
    },
    test() {
      debugger
      return (rule, value, callback, source) => {
        debugger
        var date1 = new Date(rule.param[aaa])
        if (aaa) {
          if (new Date(value) < new Date(date1)) {
            callback(new Error(rule.message))
          }
        } else {
          callback()
        }
      }
    },
    isbiggerDate() {
      return (rule, value, callback) => {
        debugger
        if (value != null && value != "") {
          if (eval(rule.param["V2"]) == "") {
            rule.message = rule.message[0].toString()
            callback(new Error(rule.message))
          } else {
            debugger
            var date2 = new Date(eval(rule.param["V2"]))
            if (value.valueOf() < date2.valueOf()) {
              rule.message = rule.message[1].toString()
              callback(new Error(rule.message))
            }
            else {
              callback()
            }
          }
        }
      }
    }
  }
}
