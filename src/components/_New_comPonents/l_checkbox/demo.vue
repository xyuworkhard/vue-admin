<template>
  <csceCheckbox
    :dictkey="frameData"
    :action="frameData.action"
    :chktype="frameData.chktype"
    :portrait="frameData.portrait"
    :iconType="frameData.iconType"
    :dicType="frameData.dictype"
    :defoption="frameData.defoption"
    @input="getVal"
  ></csceCheckbox>
</template>
<script>
import csceCheckbox from '@/components/_New_comPonents/l_checkbox';
export default {
  name: 'checkboxDemo',
  components: { csceCheckbox },
  data() {
    return {
      frameData: {
        action: '0', //数据接口类型（数据字典：0，数据源：1，以及其他的请求接口）
        chktype: 'multi', //单选框和复选框（单选框：不传此参数或者传空/复选框：参数值为multi）
        portrait: false, //元素样式（true：元素独占一行显示 false：元素同排显示）
        iconType: [], //单选框/复选框icon 列：['el-icon-star-off', 'el-icon-star-on']
        dictype: 'LogisticFileType', //请求数据字典接口参数
        defoption: ['10'], //默认选中值（复选框传数组：['1']/单选框传string：'1'）
        checkedValue: null, //已选中的值
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    //获取已选中的数据
    getVal(v) {
      this.frameData.checkedValue = v;
    },
  },
};
</script>