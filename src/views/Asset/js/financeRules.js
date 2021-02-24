var validateNum = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入数字'));
  } else if (Number(value).toString() == 'NaN') {
    callback(new Error('请输入正确数字!'));
  } else {
    callback();
  }
};
export default {
  "FinanceTitle": [{
    required: true,
    message: '请输入融资合同标题',
    trigger: 'blur'
  }],
  "SCompId": [{
    required: true,
    message: '请选择融资机构',
    trigger: 'change'
  }],
    "AssetPoolId": [{
      required: true,
      message: '请选择相应资产池',
      trigger: 'change'
  }],
  "AssetId": [{
    required: true,
    message: '请选择相应资产',
    trigger: 'change'
  }],
  "BCompId": [{
    required: true,
    message: '请选择企业名称',
    trigger: 'change'
  }],
  "StartDate": [{
    required: true,
    message: '请选择融资时间',
    trigger: 'change'
  }],
    "Qty": [{
        validator: validateNum,
        trigger: ['blur', 'change'],
        required: 'true'
      }],
      "CMoney": [{
        validator: validateNum,
        trigger: ['blur', 'change'],
        required: 'true'
      }],
  "PayDay": [{
        required: 'true',
        validator: validateNum,
        trigger: ['change']
      }],
  "FMoney": [{
        validator: validateNum,
        trigger: ['blur', 'change'],
        required: 'true'
      }],
    //   "StartDate": [{
    //     required: true,
    //     message: '请选择日期',
    //     trigger: 'blur'
    //   }],
    //   "EndDate": [{
    //     required: true,
    //     message: '请选择日期',
    //     trigger: 'blur'
    //   }]
}