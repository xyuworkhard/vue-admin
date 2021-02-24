<template>
  <div class="TableCard">
    <el-card style="margin-bottom: 15px;">
      <el-row>
        <el-col :span="20">
          <slot name="searchInput"></slot>
        </el-col>
        <el-col :span="4">
          <div class="btns searchBtn">
            <el-form>
              <el-form-item>
                <el-button id="btn_search" type="primary" size="mini" @click="search">查询</el-button>
                <el-button id="btn_reset" size="mini" @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div class="tableBut">
        <slot name="tableBtn"></slot>
      </div>

      <slot name="tableDisabeld"></slot>
      <pagination v-if="pageQuery" v-show="listQuery.records > 0" :total="listQuery.records" :page.sync="listQuery.page"
        :limit.sync="listQuery.rows" @pagination="getdata" />
    </el-card>
  </div>
</template>
<script>
  import axios from "axios";
  import request from "@/utils/request";
  import Pagination from "@/components/Pagination";
  import {
    getUserInfo
  } from "@/utils/auth";
  export default {
    //唐丹霞 6/9 查询控件修改名称
    name: 'searchTable',
    components: {
      Pagination
    },
    props: {
      form: {
        type: Object
      },
      api: {
        type: String
      },
      pageQuery: {
        type: Boolean,
        default: true
      },
      must: {
        type: String,
        default: 'CompId'
      },
      //增加排序字段 yx 2020年8月25日
      sortField: {
        type: String,
        default: "F_CreateDate"
      }
    },
    data() {
      return {
        currentPage: 1,
        formList: JSON.parse(JSON.stringify(this.form)),
        tabeldata: [],
        listQuery: {
          rows: 10, /// 每页行数
          page: 1, /// 当前页
          sidx: this.sortField, /// 排序列
          sord: "desc", /// 排序类型
          records: 0, /// 总记录数
          total: 0 /// 总页数
        },
        loginMark: '',
        token: '',
      };
    },
    methods: {
      search() {
        this.$parent.listLoading = true
        //兼容更多的必传参数
        if (!this.pageQuery) {
          this.listQuery = {
            rows: 1000,
            page: 1,
            sidx: this.sortField, /// 排序列
            sord: "desc", /// 排序类型
            records: 0, /// 总记录数
            total: 0 /// 总页数
          };
        } else {
          this.listQuery = {
            rows: 10,
            page: 1,
            sidx: this.sortField, /// 排序列
            sord: "desc", /// 排序类型
            records: 0, /// 总记录数
            total: 0 /// 总页数
          };
        }
        this.getdata()
      },
      reset() {
        //唐丹霞 6/9 初始重置化查询页表单
        Object.assign(this.$parent.$data.form, this.$parent.$options.data().form)
        this.$parent.$refs["form"].resetFields()
        let arr = this.$parent.$refs
        for (var i in arr) {
          if (i.search("typeSelect") != -1) {
            this.$parent.$refs[i].selectReset();
          }
          if (i.search('csceCheck') != -1) {
            this.$parent.$refs[i].selectReset();
          }
        }
      },
      getdata() {

        if (JSON.parse(getUserInfo()).UserType != "9") {
          if (this.must == "CompId") {
            this.$parent.form.CompId = JSON.parse(getUserInfo()).CompId
            this.$parent.form.F_CreateUserId = JSON.parse(getUserInfo()).UserId
          } else if (this.must == "notSend") {
            this.$parent.form.CCompId = ''
            this.$parent.form.CompId = ''
            this.$parent.form.F_CreateUserId = ''
          } else {
            this.$parent.form.CCompId = JSON.parse(getUserInfo()).CompId
            this.$parent.form.F_CreateUserId = JSON.parse(getUserInfo()).UserId
          }
          this.form.PartyId = JSON.parse(getUserInfo()).CompId;
        } else {
          this.$parent.form.F_CreateUserId = ''
          this.$parent.form.CompId = ''
        }

        this.$parent.listLoading = true
        request({
          url: this.api,
          method: "get",
          params: {
            loginMark: this.loginMark,
            token: this.token,
            pagination: this.listQuery,
            queryJson: this.form
          }
        }).then(response => {
          this.tabeldata = response.data.rows;
          this.listQuery.records = response.data.records;
          this.listQuery.page = response.data.page;
          this.listQuery.total = response.data.total;
          this.$emit("input", this.tabeldata);
          this.$emit('gettabledata', this.tabeldata)
          this.$parent.listLoading = false
        });
      },
      handleInput(all, first, end) {
        console.log(all, first, end);
        if (this.form[all] == null) {
          this.form[first] = ''
          this.form[end] = ''
        } else {
          this.form[first] = this.form[all][0]
          this.form[end] = this.form[all][1]
        }
        console.log(this.form)
      }
    },
    created() {
      if (!this.pageQuery) {
        this.listQuery = {
          rows: 1000,
          page: 1,
          sidx: this.sortField, /// 排序列
          sord: "desc", /// 排序类型
          records: 0, /// 总记录数
          total: 0 /// 总页数
        };
      }
      this.getdata()
    }
  };

</script>
<style>
  .TableCard .el-pagination .btn-next,
  .TableCard .el-pagination .btn-prev,
  .TableCard .el-pagination .el-pager li {
    background-color: #f4f4f5;
    min-width: 30px;
    border-radius: 2px;
    margin: 0 5px;
  }

  .TableCard .el-pager li.active {
    background-color: #409eff;
    cursor: default;
    color: #f4f4f5;
  }

  .TableCard .el-pagination {
    color: #606266;
    background: #fff;
    padding: 5px 0px;
  }

  /* .TableCard{
  overflow-y: auto;
} */
  .TableCard .btns {
    margin-bottom: 0;
    border: 0;
    text-align: center;
    padding: 0;
  }

  .TableCard .tableBut .btns {
    text-align: left;
    margin-bottom: 10px;
  }

  .TableCard .el-form-item--small .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }

  .TableCard .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .TableCard .el-form-item {
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
  }

  .TableCard .el-input__inner,
  .TableCard .el-form-item__content,
  .TableCard .el-form-item__label {
    height: 32px;
    line-height: 32px;
  }

</style>
