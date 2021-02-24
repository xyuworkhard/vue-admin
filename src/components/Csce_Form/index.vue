<template>
  <div class="formBill">
    <div v-if="false">
      <el-row class="buttonGroup" :style="{width:width,top:top,position:position}">
        <!-- 单据提交操作 -->
        <el-card class="box-card" v-if="type=='doc'">
          <!-- 
                    0是增加单据状态
                    1是编辑状态
                    2是查看状态 
                -->
          <el-button type="warning" v-if="isdraft&&status==0" @click="$parent.draftBut()" size="small">草稿</el-button>
          <el-button type="primary" v-if="status==0||status==1" @click="$parent.submitBut()" size="small">提交</el-button>
          <el-button type="primary" v-if="ismould&&status>=1" @click="$parent.copyBut()" size="small">复制并新建</el-button>
          <el-button type="success" v-if="ismould&&status>=0" @click="$parent.addmouldBut()" size="small">另存为模板
          </el-button>
          <slot name="docButton"></slot>
        </el-card>
        <!-- 确认，退回操作 -->
        <el-card class="box-card" v-if="type=='mut'">
          <!-- 
                    0是确认操作
                    1是退回操作
                 -->
          <el-button type="warning" v-if="status==0" @click="$parent.sureBut()" size="small">确认</el-button>
          <el-button type="primary" v-if="status==0" @click="$parent.backBut()" size="small">退回</el-button>
          <slot name="mutButton"></slot>
        </el-card>
        <!-- 审核操作 -->
        <el-card class="box-card" v-else-if="type=='chk'">
          <!-- 
                    0是未进行过审核操作
                    1是进行过审核操作
                 -->
          <el-button type="primary" v-if="status>=0" @click="$parent.checkBut()" size="small">审核操作</el-button>
          <el-button type="success" v-if="status>=1" @click="$parent.recordBut()" size="small">审核记录</el-button>
          <slot name="chkButton"></slot>
        </el-card>
        <!-- 其他类型页面的按钮 -->
        <el-card class="box-card" v-else>
          <slot name="formButton"></slot>
        </el-card>
      </el-row>
      <el-row :style="{marginTop:marginTop}">
        <el-card shadow="never" :class="{noBorder:type==1}">
          <slot name="formBill" :isReadOnly="isReadOnly" :type="type"></slot>
        </el-card>
      </el-row>
    </div>
    <div v-else>
      <el-row class="buttonGroup" :style="{width:width,top:top,position:position}" v-if="butGroup.length>0">
        <el-card class="box-card">
          <el-button v-for="(item,index) in butGroup" :key="index" :type="item.type" @click="$parent[item.methodFun]()"
            size="small">{{item.label}}</el-button>
        </el-card>
      </el-row>
      <el-row :style="{marginTop:marginTop}">
        <el-card shadow="never" :class="{noBorder:type==1}">
          <slot name="formBill" :isReadOnly="isReadOnly" :type="type"></slot>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  // import request from "@/utils/request";
  // import { GetSessionStorage } from "@/utils/page-session";
  // import combobox from '@/components/Combo/Combo';
  // import InitFun from "@/api/csce/common"
  import {
    Message
  } from "element-ui";
  export default {
    name: 'formBill',
    props: {
      type: {
        type: String
      },
      status: {
        type: Number
      },
      isdraft: {
        type: Boolean,
        default: false
      },
      ismould: {
        type: Boolean,
        default: false
      },
      butGroup: {
        type: Array
      }
    },
    data() {
      return {
        loginMark: '',
        token: '',
        isReadOnly: false,
        btnloading: false,

        width: '',
        top: 0,
        marginTop: 0,
        position: "relative",

        //   InitFun:InitFun,//将引用的数据放入vue，方便父组件直接使用
        //   request:request,
        //   GetSessionStorage:GetSessionStorage,
        //   combobox:combobox,
      };
    },
    mounted() {
      this.$nextTick(() => {
        document.getElementsByClassName('app-main')[0].addEventListener('scroll', this.handleScroll)
      })

      var elementResizeDetectorMaker = require("element-resize-detector")
      var erd = elementResizeDetectorMaker({
        strategy: "scroll"
      });
      erd.listenTo(document.getElementsByClassName('formBill')[0], (element) => {
        this.handleResize()
      })
    },
    methods: {
      getParams() {
        this.type = this.$route.query.type
      },
      handleResize() {
        this.width = document.getElementsByClassName('formBill')[0].getBoundingClientRect().width + 'px'

      },
      handleScroll() {
        const offsetTop = document.getElementsByClassName('app-main')[0].scrollTop
        if (offsetTop >= 50) {
          this.top = "84px"
          this.position = "fixed"
          if (this.butGroup.length > 0) {
            this.marginTop = "45px"
          }

        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.width = document.getElementsByClassName('formBill')[0].getBoundingClientRect().width + 'px'
      })
    },
    destroyed() {
      document.getElementsByClassName('app-main')[0].removeEventListener('scroll', this.handleScroll)
    }
  };

</script>
<style>
  .formBill {
    position: relative;
  }

  .formBill .buttonGroup {
    /* position: fixed; */
    height: 45px;
    line-height: 45px;
    z-index: 8;
    text-align: right;
    transition: 600ms ease position;
    /* background-color: azure; */
    background: linear-gradient(90deg, #e2e4e5 100%, rgb(48, 69, 78) 60%, rgba(33, 120, 241, 1) 30%, rgb(239, 241, 224) 0%);
  }

  .buttonGroup .box-card .el-card__body {
    padding: 0;
    padding-right: 20px;
    border: 0;
    background: linear-gradient(90deg, #e2e4e5 100%, rgb(48, 69, 78) 60%, rgba(33, 120, 241, 1) 30%, rgb(239, 241, 224) 0%);
  }

  .buttonGroup h3 {
    float: left;
    line-height: 45px;
    padding-left: 20px;
  }

  .noBorder .el-form-item--medium .el-form-item__content {
    border: none;
  }

  .noBorder .el-input--medium .el-input__inner {
    border: none;
  }

</style>
