<template>
  <div>
    <el-select v-model="chooseItem" @change="change" size="mini" :multiple="multiple" :placeholder="'请选择'"
      :filterable="filterable" :disabled="readonly" collapse-tags>
      <el-option label="请选择" value=""></el-option>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
  // import combobox from '@/components/Combo/Combo'
  import axios from "axios";
  export default {
    name: "typeSelect",
    props: {
      action: {
        type: [String, Number],
        default: "0"
      },
      actionUrl: {
        type: [String, Number]
      },
      filterable: {
        type: Boolean,
        default: false
      },
      showcontent: {
        type: Object
      },
      multiple: {
        type: Boolean,
        default: false
      },
      defoption: {
        type: [String, Array]
      },
      chooseItem: {
        type: [String, Number],
        default: ""
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: "chooseItem",
      event: "input"
    },
    data() {
      return {
        options: [],
        //唐丹霞 06/08 下拉菜单控件引用数据基础api
        url: this.apiroute,
        dataitemUrl: "/learun/adms/dataitem/details", //数据字典接口
        datasourceUrl: "/learun/adms/datasource/map" //数据源接口
      };
    },
    methods: {
      change() {
        //给父组件传递选中的值
        if (this.multiple) {
          let chooseArray = this.chooseItem.filter(res => {
            return res != -1
          })
          this.$emit("input", chooseArray);
        } else {
          if (this.chooseItem == '-1') {
            this.$emit("input", '');
          } else {
            this.$emit("input", this.chooseItem);
          }
        }


      },
      selectReset() {
        //清除数据
        this.chooseItem = "";
      }
    },
    //本地接收方法
    created() {
      // this.options = combobox.methods.Find_Combo(this.showcontent.data)[this.showcontent.data]
      if (this.showcontent.data == 'csce_companyca_bank') {
        this.options = this.getCompanyFincList()
        this.options.map((item, index) => {
          item.value = item.compid;
          item.label = item.compname;
        });
      } else {
        this.options = this.getDictionaryVal(this.showcontent.data)
        this.options.map((item, index) => {
          item.value = item.value;
          item.label = item.text;
        });
      }
      //this.postForm[HeadTag][datalist[i]] = combobox.methods.Find_Value(code, datalist[i]);
    }


    // created() {
    //  let axioslink;
    //  if (this.action == 0) {//数据查询接口拼接，dataitemUrl为数据字典的接口，datasourceUrl为数据源的接口
    //    axioslink =
    //      this.url + this.dataitemUrl + "?data=" + this.showcontent.data;
    //  } else if (this.action == 1) {
    //    axioslink =
    //      this.url + this.datasourceUrl + "?data=" + this.showcontent.data;
    //  } else {
    //    axioslink = this.url + this.actionUrl + "?data=" + this.showcontent.data;
    //  }
    //   axios.get(axioslink).then(res => { //获取数据
    //    debugger
    //    this.options = res.data.data;
    //    var value; //这是一个字符串
    //    var list;
    //    var iconLink;
    //    //判断有没有传返回的值，当没传时，数据字典默认返回字段值是F_ItemValue，数据源默认返回字段值是compid，有传返回的值时，返回的字段值就是传的字段值
    //    if (this.showcontent.value == undefined && this.action == 0) {
    //      value = "F_ItemValue";
    //    } else if (this.showcontent.value == undefined && this.action == 1) {
    //      value = "compid";
    //    } else {
    //      value = this.showcontent.value;
    //    }
    //    //判断有没有传显示的字段值，当没传时，数据字典默认显示字段值是F_ItemName，数据源默认显示字段值是compname，有传显示的值时，显示的字段值就是传的字段值，可传多个
    //    if (this.showcontent.name == undefined && this.action == 0) {
    //      list = ["F_ItemName"];
    //    } else if (this.showcontent.name == undefined && this.action == 1) {
    //      list = ["compname"];
    //    } else {
    //      list = this.showcontent.name.split(",");
    //    }
    //    //判断有没有传连接符号，有传则剥离出数组，没传则默认使用-符号
    //    if (this.showcontent.linkIcon) {
    //      iconLink = this.showcontent.linkIcon.split(",");
    //    } else {
    //      iconLink = ["-"];
    //    }
    //    //遍历数据
    //    this.options.map((item, index) => {
    //      item.value = item[value];//下拉框的值与下拉框数据返回字段的值绑定
    //      item.label = "";//下拉框显示数据
    //      if (list.length > 1) {//当传了多个显示字段时
    //      // label显示字段拼接与连接符拼接逻辑
    //        list.map((res, index) => {//遍历传的显示的字段
    //          if (item.label != undefined) {
    //            if (index + 1 == list.length) {//当最后一个显示字段时，下拉框显示的内容与下拉框数据显示的内容绑定
    //              item.label += item[res];
    //            } else {//当有多个显示字段且不是最后一个显示字段时
    //              if (iconLink[index] == undefined) {//当只有一个连接符号时，拼接到显示label上
    //                item.label += item[res] + iconLink[0];
    //              } else {//当传了多个连接符号时，拼接到显示label上
    //                item.label += item[res] + iconLink[index];
    //              }
    //            }
    //          } else {
    //            if (iconLink[index] == undefined) {
    //              item.label = item.label + iconLink[0] + item[res];
    //            } else {
    //              item.label = item.label + iconLink[index] + item[res];
    //            }
    //          }
    //        });
    //      } else {//当没传或者传了一个显示字段时
    //        item.label = item[list[0]];
    //      }
    //      if (this.defoption) {//当传默认选项时，给下拉框赋值
    //        this.chooseItem = this.defoption;
    //      }
    //    });
    //  });
    //}
  };

</script>

<style>
  .el-select {
    width: 100%;
  }

</style>
