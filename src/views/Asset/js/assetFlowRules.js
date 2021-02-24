import PageVaildate from "@/components/Vaildate/common";
export default {
  MoneyF: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#MoneyT").val()', type: "le" },
      message: "不能大于终止数字",
      trigger: ["blur", "change"]
    }
  ],
  MoneyT: [
    {
      validator: PageVaildate.methods.isvalidateNumber(),
      param: {},
      message: "请输入正确数字",
      trigger: ["blur", "change"]
    },
    {
      validator: PageVaildate.methods.compareNumber(),
      param: { V1: '$("#MoneyF").val()', type: "ge" },
      message: "不能小于起始数字",
      trigger: ["blur", "change"]
    }
  ]
};
