import PageVaildate from '@/components/Vaildate/common';
export default {
  QtyF: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#QtyT").val()', type: "le" },
      message: "不能大于终止数字",
      trigger: ["blur", "change"]
    }
  ],
  QtyT: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#QtyF").val()', type: "ge" },
      message: "不能小于起始数字",
      trigger: ["blur", "change"]
    }
  ],
  FMoneyF: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#FMoneyT").val()', type: "le" },
      message: "不能大于终止数字",
      trigger: ["blur", "change"]
    }
  ],
  FMoneyT: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#FMoneyF").val()', type: "ge" },
      message: "不能小于起始数字",
      trigger: ["blur", "change"]
    }
  ],
  PayDayF: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#PayDayT").val()', type: "le" },
      message: "不能大于终止数字",
      trigger: ["blur", "change"]
    }
  ],
  PayDayT: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#PayDayF").val()', type: "ge" },
      message: "不能小于起始数字",
      trigger: ["blur", "change"]
    }
  ]
};
