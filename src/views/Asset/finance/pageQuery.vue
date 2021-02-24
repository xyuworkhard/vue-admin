<template>
  <div class="app-container">
    <searchTable ref="searchTable" :api="queryapi" @gettabledata="gettabledata" :form="form">
      <template slot="searchInput">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同编号:" prop="FinanceNo">
                <el-input v-model="form.FinanceNo" placeholder="请输入合同编号" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-position="left" label="融资时间:" prop="FinTime" size="small">
                <el-date-picker v-model="form.FinTime" type="daterange" placeholder="请选择开始日期" value-format="yyyy-MM-dd"
                  class="inpwidth" id="CreateF" @change="
                                    $refs.searchTable.handleInput(
                                      'FinTime',
                                      'FinDateF',
                                      'FinDateT'
                                    )
                                  " />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="状态" prop="FinanceStatus">
                <el-select v-model="form.FinanceStatus" placeholder="请选择状态"></el-select>
              </el-form-item>
            </el-col>-->
            <!-- <el-col :span="12">
              <el-form-item label="融资标题:" prop="FinanceTitle">
                <el-input v-model="form.FinanceTitle" placeholder="请输入融资标题" />
              </el-form-item>
            </el-col> -->
          </el-row>
          <Folder>
            <template v-slot:searchs>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="数量(吨):">
                    <el-col :span="11">
                      <el-form-item label-position="left" label-width="0px" prop="QtyF">
                        <el-input v-model="form.QtyF" placeholder="请输入" class="inpwidth" type="text" prop="QtyF"
                          id="QtyF" />
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="12">
                      <el-form-item label-position="left" label-width="0px" prop="QtyT">
                        <el-input v-model="form.QtyT" placeholder="请输入" type="text" class="inpwidth" prop="QtyT"
                          id="QtyT" />
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="结算金额:">
                    <el-col :span="11">
                      <el-form-item label-position="left" label-width="0px" prop="FMoneyF">
                        <el-input v-model="form.FMoneyF" placeholder="请输入" class="inpwidth" type="text" prop="FMoneyF"
                          id="FMoneyF" />
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="12">
                      <el-form-item label-position="left" label-width="0px" prop="FMoneyT">
                        <el-input v-model="form.FMoneyT" placeholder="请输入" type="text" class="inpwidth" prop="FMoneyT"
                          id="FMoneyT" />
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="支付周期:" prop="PayDayF">
                    <el-col :span="11">
                      <el-form-item label-position="left" label-width="0px" prop="PayDayF">
                        <el-input v-model="form.PayDayF" placeholder="请输入" class="inpwidth" type="text" prop="PayDayF"
                          id="PayDayF" />
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="12">
                      <el-form-item label-position="left" label-width="0px" prop="PayDayT">
                        <el-input v-model="form.PayDayT" placeholder="请输入" type="text" class="inpwidth" prop="PayDayT"
                          id="PayDayT" />
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label-position="left" label="融资时间:" prop="FinTime" size="small">
                    <el-date-picker v-model="form.FinTime" type="daterange" placeholder="请选择开始日期"
                      value-format="yyyy-MM-dd" class="inpwidth" id="CreateF" @change="
                        $refs.searchTable.handleInput(
                          'FinTime',
                          'FinDateF',
                          'FinDateT'
                        )
                      " />
                  </el-form-item>
                </el-col> -->
              </el-row>
            </template>
          </Folder>
        </el-form>
      </template>
      <template slot="tableBtn">
        <div class="btns">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="goEdit('', 2)">新增</el-button>
          <el-button type="primary" size="mini" icon="el-icon-search" plain @click="openFlowDialog">资金流向查询</el-button>
        </div>
      </template>
      <template slot="tableDisabeld">
        <el-table v-loading="listLoading" :data="tableData" border style="width: 100%" @expand-change="toggleFinform"
          :row-key="getRowKeys" :expand-row-keys="expands">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table v-loading="scope.row.loading" :data="childTableData" border highlight-current-row
                max-height="300" :header-cell-style="{ 'background':'#f6f6f7' }" :row-class-name="FinFlowDirStyle">
                <el-table-column prop="FinFlowDir" align="center" label="流向方向">
                  <template slot-scope="scope">
                    <span>{{ getNameById("FinFlowDir_TYPE", scope.row.FinFlowDir) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="FinFlowMoney" align="center" label="金额"></el-table-column>
                <el-table-column align="center" label="日期">
                  <template slot-scope="scope"
                    v-if="scope.row.FinFlowDate != undefined">{{ scope.row.FinFlowDate.split(" ")[0] }}</template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="financeno" align="center" label="合同编号" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="financetitle" align="center" label="融资标题" :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column prop="qty" align="center" label="数量"></el-table-column>
          <el-table-column prop="cmoney" align="center" label="结算金额" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="fmoney" align="center" label="融资金额" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="payday" align="center" label="支付周期"></el-table-column>
          <el-table-column align="center" label="开始日期">
            <template slot-scope="scope"
              v-if="scope.row.startdate != undefined">{{ scope.row.startdate.split(" ")[0] }}</template>
          </el-table-column>
          <!-- <el-table-column prop="financestatus" align="center" label="状态" width="160"></el-table-column> -->
          <el-table-column fixed="right" align="center" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="goEdit(scope.row.financeid, 1)">查看</el-button>
              <el-button type="success" size="mini" @click="goEdit(scope.row.financeid, 2)">编辑</el-button>
              <el-button type="warning" size="mini" @click="openAccounts(scope.row.financeid)">资金管理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </searchTable>
    <!---start 资金流付/回弹窗--->
    <el-dialog center title="资金管理" :visible.sync="dialogAccountsData.status" label-position="center"
      custom-class="a-dialog-wrap">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="120px">
        <el-card shadow="never">
          <el-row>
            <el-col :span="12">
              <el-form-item label="流向方向:" prop="FinFlowDir">
                <csceSelect v-model="dialogForm.FinFlowDir" :showcontent="{ data: 'FinFlowDir_TYPE' }"></csceSelect>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额:" prop="FinFlowMoney">
                <el-input v-model="dialogForm.FinFlowMoney" placeholder="请输入金额" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item style="margin-bottom: 12px;" label-width="120px" label="日期:" prop="FinFlowDate">
                <el-date-picker v-model="dialogForm.FinFlowDate" type="date" placeholder="选择日期"
                  value-format="yyyy-MM-dd" />
                <span class="word-counter" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- <el-form-item label="状态" prop="FinFlowStatus">
                <el-select v-model="dialogForm.FinFlowStatus" placeholder="请选状态">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </el-form-item>-->
            </el-col>
          </el-row>
        </el-card>
        <div class="btns btnsCenter pt30">
          <el-button type="primary" @click="saveForm('ruleForm', 0)" class="btn-size">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!---end--->
    <el-dialog title="资金流向信息" center :visible.sync="dialogFlowData.status" label-position="center"
      @open="openFlowDialog" custom-class="f-dialog-wrap">
      <assetFlow ref="flow"></assetFlow>
    </el-dialog>
  </div>
</template>
<script>
  import searchTable from '@/components/SearchTable';
  import request from '@/utils/request';
  import assetFlow from '../components/assetFlow';
  import {
    Page_Save
  } from '@/utils/requestFunc';
  import Rules from '@/views/Asset/js/financeListRules';
  export default {
    name: 'Finance',
    components: {
      searchTable,
      assetFlow
    },
    data() {
      return {
        form: {
          FinanceNo: '', //融资合同编号
          FinanceStatus: '', //融资状态
          FinanceTitle: '', //融资标题
          QtyF: '', //融资吨位数量（起）
          QtyT: '', //融资吨位数量（止）
          FMoneyF: '', //结算金额（起）
          FMoneyT: '', //结算金额（止）
          PayDayF: '', //支付周期（起）
          PayDayT: '', //支付周期（止）
          FinDateF: '', //融资开始日期
          FinDateT: '' //融资结束日期
        },
        queryapi: '/Asset/Finance/PageQuery', //接口地址
        tableData: [],
        listLoading: true,
        rules: Rules, //列表form验证
        //弹窗form验证
        dialogRules: {
          FinFlowDir: [{
            required: true,
            message: '请选择流向方向',
            trigger: 'change'
          }],
          FinFlowMoney: [{
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          }],
          FinFlowDate: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }]
        },
        //付款/回款弹窗数据
        dialogAccountsData: {
          status: false //弹窗状态
        },
        //付款/回款弹窗表单
        dialogForm: {
          FinFlowNo: '', //资金流向编号
          FinFlowDir: '', //资金流向方向
          FinFlowMoney: '', //资金流向金额
          FinFlowDate: '', //资金流向日期
          FinFlowStatus: '', //资金流向状态
          FinanceId: '' //融资合同ID
        },
        //资金流向弹窗数据
        dialogFlowData: {
          status: false //弹窗状态
          //api: '' //资金流向接口
        },
        getRowKeys(row) {
          return row.financeid;
        },
        expands: [], //当前展开行
        childTableData: [] //展开的表格数据
      };
    },
    created() {},
    mounted() {},
    methods: {
      //跳转详情页面
      goEdit(id, value) {
        this.$router.push({
          path: '/Asset/finance/edit',
          query: {
            isEdit: value == 1 ? '' : true,
            id: id
          }
        });
      },
      //打开放款弹窗
      openAccounts(id, value) {
        this.resetForm('dialogForm');
        this.dialogAccountsData.status = true;
        this.dialogForm.FinanceId = id;
      },
      //打开资金流向弹窗
      openFlowDialog() {
        this.dialogFlowData.status = true;
      },

      //保存付款/回款信息
      saveForm(id) {
        this.$refs['dialogForm'].validate(valid => {
          if (valid) {
            Page_Save({
                FinFlow: this.dialogForm
              },
              '/Asset/Finance/FinSave'
            ).then(res => {
              if (res.info == '响应成功') {
                this.$message.success('已保存');
                this.dialogAccountsData.status = false;
              } else {
                this.$message.error(res.info);
              }
            });
          }
        });
      },
      //展开放款信息
      toggleFinform(row, arr) {
        this.childTableData = [];
        this.expands = [];
        let toggleData = this.tableData;
        if (arr.length > 0) {
          toggleData.forEach(v => {
            if (v.financeid == row.financeid) {
              v.loading = true;
            }
          });
          row ? this.expands.push(row.financeid) : [];
          request({
            url: '/Asset/Finance/Form',
            method: 'get',
            params: {
              FinanceId: row.financeid
            }
          }).then(res => {
            res.data.FINFLOW ?
              (this.childTableData = res.data.FINFLOW) :
              (this.childTableData = []);
            toggleData.forEach(item => {
              item.loading = false;
            });
          });
        }
      },
      //修改table数据源
      gettabledata(val) {
        this.tableData = val.map(item => {
          return {
            ...item,
            loading: false
          };
        });
      },
      //修改样式
      FinFlowDirStyle(row) {
        if (row.row.FinFlowDir == 1) {
          return 'font_red';
        } else if (row.row.FinFlowDir == 2) {
          return 'font_grenn';
        } else {
          return '';
        }
      },
      //重置form表单
      resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      }
    }
  };

</script>
<style lang="scss">
  @mixin dialog-wrap {
    .el-dialog__header {
      border-bottom: rgb(231, 230, 230) solid 1px;
      background-color: #1890ff;

      .el-dialog__title,
      .el-dialog__close {
        color: #ffffff;
      }
    }
  }

  .app-container {
    padding: 20px;
  }

  .app-container .line {
    text-align: center;
  }

  .app-container .el-range-editor--medium.el-input__inner,
  .app-container .el-date-editor.el-input,
  .app-container .el-date-editor.el-input__inner,
  .app-container .el-select {
    width: 100%;
  }

  .pt30 {
    padding-top: 30px !important;
  }

  .f-dialog-wrap {
    min-width: 1000px;
    @include dialog-wrap;
  }

  .a-dialog-wrap {
    width: 700px;
    @include dialog-wrap;
  }

  .font_red {
    color: red;
  }

  .font_grenn {
    color: green;
  }

</style>
