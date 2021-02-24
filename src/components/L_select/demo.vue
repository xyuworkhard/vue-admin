<template>
  <csceSelect :showcontent="frameData.showcontent" :action="frameData.action" :actionUrl="frameData.actionUrl"
    :multiple="frameData.multiple" :filterable="frameData.filterable" :defoption="frameData.defoption"
    :isTags="frameData.isTags" @input="getVal"></csceSelect>
</template>
<script>
  import csceSelect from '@/components/L_select';
  export default {
    name: 'selectDemo',
    components: {
      csceSelect
    },
    data() {
      return {
        frameData: {
          showcontent: {
            data: 'LogisticFileType'
          }, //请求数据字典接口参数
          action: '0', //数据接口类型（数据字典：0，数据源：1，以及其他的请求接口）
          actionUrl: '', //其他接口url
          multiple: true, //是否多选
          filterable: false, //是否可搜索
          defoption: '10,19', //默认选中值（多选：'10,19'/单选：'1'）
          isTags: false, //多选时是否将选中值按文字的形式展示
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
