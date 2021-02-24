<template>
  <div class="app-container">
    <el-card style="margin-bottom: 15px;">
      <el-form ref="form" :rules="rules" label-width="110px" :model="form">
        <el-row>
          <el-col :span="20">
            <el-row>
              <el-col :span="10">
                <el-form-item label="合同编号:" prop="FinanceNo">
                  <el-input v-model="form.FinanceNo" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="金额:">
                  <el-col :span="11">
                    <el-form-item label-position="left" label-width="0px" prop="MoneyF">
                      <el-input v-model="form.MoneyF" placeholder="请输入" class="inpwidth" type="text" prop="MoneyF"
                        id="MoneyF" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>
                  <el-col :span="12">
                    <el-form-item label-position="left" label-width="0px" prop="MoneyT">
                      <el-input v-model="form.MoneyT" placeholder="请输入" type="text" class="inpwidth" prop="MoneyT"
                        clearable id="MoneyT" />
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <Folder>
                <template v-slot:searchs>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="支付方向:" prop="FinFlowDir">
                        <csceSelect v-model="form.FinFlowDir" :showcontent="{data: 'FinFlowDir_TYPE'}"></csceSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="资金流向日期:" prop="BidDate" size="small">
                        <el-date-picker v-model="form.BidDate" type="daterange" placeholder="选择日期"
                          value-format="yyyy-MM-dd" class="inpwidth" id="BidDateF"
                          @change="$refs.searchTable.handleInput('BidDate','FinDateF','FinDateT')" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </template>
              </Folder>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-button id="btn_search" type="primary" size="mini" @click="search">查询</el-button>
            <el-button id="btn_reset" size="mini" @click="reset('form')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row
        style="width: 100%;margin-top:20px" max-height="350">
        <el-table-column align="center" label="合同编号" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.finflowno }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收付方向" width="120">
          <template slot-scope="scope">
            <span>{{ getNameById("FinFlowDir_TYPE", scope.row.finflowdir) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="金额" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.finflowmoney }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="流向日期" width="180">
          <template slot-scope="scope"
            v-if="scope.row.finflowdate != undefined">{{scope.row.finflowdate.split(' ')[0]}}</template>
        </el-table-column>
      </el-table>
      <pagination v-show="listQuery.records > 0" :total="listQuery.records" :page.sync="listQuery.page"
        :limit.sync="listQuery.rows" @pagination="getData" />
    </el-card>
  </div>
</template>

<script>
  import PageVaildate from '@/components/Vaildate/common';
  import {
    GetSessionStorage
  } from '@/utils/page-session';
  import Rules from '@/views/Asset/js/assetFlowRules';
  import request from '@/utils/request';
  import Pagination from '@/components/Pagination';
  export default {
    components: {
      Pagination
    },
    name: 'assetFlow',
    props: {
      //childApi: String
    },
    data() {
      return {
        userInfo: JSON.parse(GetSessionStorage('LoginUser')),
        form: {
          FinanceNo: '', //合同编号
          MoneyF: '', //资金金额（起）
          MoneyT: '', //资金金额（止）
          FinFlowDir: '', //支付方向
          FinDateF: '', //资金流向日期（起）
          FinDateT: '', //资金流向日期（止）
          FinFlowStatus: '' //资金流向状态
        },
        rules: Rules,
        tableData: [],
        listLoading: null,
        listQuery: {
          rows: 10000, /// 每页行数
          page: 1, /// 当前页
          sidx: '', /// 排序列
          sord: '', /// 排序类型
          records: 0, /// 总记录数
          total: 0 /// 总页数
        },
        loginMark: '',
        token: ''
      };
    },
    created() {
      this.userInfo = JSON.parse(GetSessionStorage('LoginUser')); //获取当前登录用户信息
      this.getData();
    },
    mounted() {},
    methods: {
      //查询
      search() {
        this.listLoading = true;
        this.listQuery = {
          rows: 10000,
          page: 1,
          sidx: '', /// 排序列
          sord: '', /// 排序类型
          records: 0, /// 总记录数
          total: 0 /// 总页数
        };
        this.getData();
      },
      //重置
      reset(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      },
      //获取资金流向列表
      getData() {
        request({
          url: '/Asset/Finance/Finlist',
          method: 'get',
          params: {
            loginMark: this.loginMark,
            token: this.token,
            pagination: this.listQuery,
            queryJson: this.form
          }
        }).then(response => {
          if (this.userInfo.UserType == 2) {
            //管理员
            let compId = this.userInfo.CompId;
            this.tableData = response.data.rows.filter(item => {
              return item.compid == compId;
            });
            this.listQuery.records = this.tableData.length;
          } else if (this.userInfo.UserType == 9) {
            //金融机构
            this.tableData = response.data.rows;
            this.listQuery.records = response.data.records;
          }
          this.listQuery.page = response.data.page;
          this.listQuery.total = response.data.total;
          this.listLoading = false;
        });
      }
    }
  };

</script>

<style lang="scss">
  @import '~@/styles/mixin.scss';
  @import '~@/styles/common.scss';

</style>
