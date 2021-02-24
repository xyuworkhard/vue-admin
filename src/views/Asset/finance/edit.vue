<template>
  <div class="page-main">
    <csceForm ref="formBill" :butGroup="butGroup">
      <template slot="formBill">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="pt20" size="small">
          <el-row type="flex" justify="center" class="pb10">
            <el-col :span="8">
              <el-form-item label="融资标题：" prop="FinanceTitle">
                <el-input v-model="form.FinanceTitle" :readonly="isEdit ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="金融机构：" prop="SCompId" class="select_width">
                <csceSelect v-if="userInfo.UserType == 9" :readonly="isEdit ? false : 'readonly'" v-model="form.SCompId"
                  :showcontent="{data : 'csce_companyca_bank'}" :action="1" :filterable="true"
                  :defoption="form.SCompId"></csceSelect>
                <el-input v-if="userInfo.UserType == 2" v-model="form.SCompName" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产池" prop="AssetPoolId" class="select_width">
                <!-- <csceSelect
                  :readonly="isEdit ? false : 'readonly'"
                  v-model="form.AssetPoolId"
                  :showcontent="{data: 'CHECK_ITEM'}"
                ></csceSelect>-->
                <el-select v-model="form.AssetPoolId" :disabled="isEdit ? false : 'disabled'" placeholder="请选择">
                  <el-option v-for="item in assetPoolShow" :key="item.assetpoolid" :label="item.assetpoolname"
                    :value="item.assetpoolid"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" class="pb10">
            <el-col :span="8">
              <el-form-item label="货物数量：" prop="Qty">
                <el-input v-model="form.Qty" :readonly="isEdit ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算金额：" prop="CMoney">
                <el-input v-model="form.CMoney" :readonly="true">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资金额：" prop="FMoney">
                <el-input v-model="form.FMoney" :readonly="isEdit ? false : 'readonly'">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center" class="pb10">
            <el-col :span="8">
              <el-form-item label="帐期：" prop="PayDay">
                <el-input v-model="form.PayDay" :readonly="isEdit ? false : 'readonly'">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="融资时间:">
                <el-col :span="12">
                  <el-form-item label-position="left" label-width="0px" prop="StartDate">
                    <el-date-picker v-model="form.StartDate" type="date" placeholder="请选择开始日期" value-format="yyyy-MM-dd"
                      class="inpwidth" id="StartDate" :disabled="isEdit ? false : 'disabled'" @change="getEndTime()" />
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1" style="text-align:center">-</el-col>
                <el-col :span="11">
                  <el-form-item label-position="left" label-width="0px" prop="EndDate">
                    <el-date-picker v-model="form.EndDate" type="date" placeholder="请选择结束日期" value-format="yyyy-MM-dd"
                      class="inpwidth" id="EndDate" :disabled="true" />
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" class="pb10">
            <el-col :span="8">
              <el-form-item label="状态：" prop="FinanceStatus" class="select_width">
                <csceSelect :readonly="isEdit ? false : 'readonly'" v-model="form.FinanceStatus"
                  :showcontent="{data: 'FinanceType'}" :defoption="form.FinanceStatus"></csceSelect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业名称：" prop="BCompId" class="select_width">
                <csceSelect :readonly="isEdit ? false : 'readonly'" v-model="form.BCompId"
                  :showcontent="{data : 'csce_companyca'}" :action="1" :filterable="true" :defoption="form.BCompId">
                </csceSelect>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
        </el-form>
      </template>
    </csceForm>
    <el-card shadow="never">
      <el-button type="primary" plain icon="el-icon-plus" @click="addAsset()" v-if="isEdit">资产信息</el-button>
      <!-- <div style="padding-top:20px">
              <div style="border-bottom:1px solid #efefef;padding-bottom:5px" v-for="(item,index) in FinanceTable" :key="index" class="text item">
                {{(index+1)+'、资产 ' + item.ordno+'、金额：'+ item. totalprice}}
                <span v-if="isEdit" class='el-icon-circle-close' style="float:right" @click="deleteChooice(item,index)"></span>
              </div>
              
      </div>-->
      <el-table :data="FinanceTable" border fit style="width: 100%;margin-top:10px" max-height="610">
        <!-- <el-table-column align="center" type="selection" width="50"></el-table-column> -->
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column align="center" label="资产编号">
          <template slot-scope="scope">
            <span>{{ scope.row.ordno }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="融资方">
                <template slot-scope="scope">
                  <span>{{ scope.row.bcompname }}</span>
                </template>
        </el-table-column>-->
        <el-table-column align="center" label="结算数量">
          <template slot-scope="scope">
            <span>{{ scope.row.qty }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="结算金额">
          <template slot-scope="scope">
            <span>{{ scope.row.totalprice }}元</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="isEdit&&FinFlowTable.length==0" type="warning" size="mini"
              @click="deleteChooice(scope.row,scope.$index)">移除</el-button>
            <el-button v-else type="primary" size="mini">查看</el-button>
            <!-- <router-link v-else :to="'/ord/edit/'+scope.row.ordid">
              <el-button type="primary" size="mini">查看</el-button>
            </router-link> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div style="padding:20px" v-if="financeId!=''">
      <el-button>资金流向数据</el-button>
      <el-table :data="FinFlowTable" border fit style="width: 100%;margin-top:10px" max-height="610">
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column align="center" label="流向">
          <template slot-scope="scope">
            <span>{{ getNameById("FinFlowDir_TYPE", scope.row.FinFlowDir) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="日期">
          <template slot-scope="scope">
            <span>{{ scope.row.FinFlowDate.split(' ')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="金额">
          <template slot-scope="scope">
            <span>{{ scope.row.FinFlowMoney }}元</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="资产操作" :modal-append-to-body="false" :visible.sync="centerDialogVisible" v-if="centerDialogVisible"
      width="1300px" :destroy-on-close="true" center>
      <assetTable :OrdComp="form.BCompName" :FinanceTable="FinanceTable"
        v-on:handleSelectionChange="handleSelectionChange"></assetTable>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios';
  import request from '@/utils/request';
  import {
    Page_Save
  } from '@/utils/requestFunc';
  import csceForm from '@/components/Csce_Form';
  import Rules from '@/views/Asset/js/financeRules';
  import assetTable from '@/views/Asset/components/assetTable';
  import {
    getUserInfo
  } from '@/utils/auth';
  import csceSelect from '@/components/L_select';
  export default {
    name: 'FinanceDetail',
    components: {
      csceForm,
      assetTable,
      csceSelect
    },
    data() {
      return {
        isEdit: '', //是否编辑
        financeId: '', //融资服务ID
        form: {
          // FinanceNo: '', //融资合同编号
          FinanceTitle: '', //融资合同名称
          AssetPoolId: '', //资产池ID
          Qty: '', //融资数量
          CMoney: '', //结算金额
          FMoney: '', //融资金额
          PayDay: '', //账期
          StartDate: '', //开始日期
          EndDate: '', //结束日期
          SCompName: '', //销方公司名称
          SCompId: '', //金融机构
          BCompId: '', //融资方
          BCompName: '', //购方公司名称
          FinanceStatus: '0', //融资状态
        },
        userInfo: JSON.parse(getUserInfo()),
        assetPool: [],
        assetPoolShow: [],
        FinanceTable: [],
        FinFlowTable: [],
        butGroup: [], //页面按钮
        //表单验证
        notRules: {},
        rules: Rules,
        startTime: {
          disabledDate: (time) => {
            let beginDateVal = new Date(this.form.EndDate).getTime();
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          },
        },
        endTime: {
          disabledDate: (time) => {
            let beginDateVal = new Date(this.form.StartDate).getTime();
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          },
        },
        tableData: [],
        centerDialogVisible: false,
        Finance_D: [],
      };
    },
    created() {
      this.userInfo = JSON.parse(getUserInfo());
      let userId = null;
      let compId = null;
      if (JSON.parse(getUserInfo()).UserType != '9') {
        userId = JSON.parse(getUserInfo()).CompId;
        compId = JSON.parse(getUserInfo()).UserId;
      } else {
        userId = '';
        compId = '';
      }
      if (this.userInfo.UserType == 2) {
        this.form.SCompName = this.userInfo.RegCompName;
        this.form.SCompId = this.userInfo.CompId;
      }
      request({
        //获取资产池
        url: '/Asset/AssetPool/PageQuery',
        method: 'get',
        params: {
          loginMark: this.loginMark,
          token: this.token,
          pagination: {
            rows: 100, /// 每页行数
            page: 1, /// 当前页
            sidx: 'F_CreateDate', /// 排序列
            sord: 'desc', /// 排序类型
            records: 0, /// 总记录数
            total: 0, /// 总页数
          },
          queryJson: {
            CompId: userId,
            F_CreateUserId: compId,
          },
        },
      }).then((res) => {
        this.assetPool = res.data.rows;
        this.assetPool.map((res) => {
          if (res.compid == this.form.SCompId) {
            this.assetPoolShow.push(res);
          }
        });
      });
    },
    mounted() {
      this.isEdit = this.$route.query.isEdit;
      this.financeId = this.$route.query.id;
      if (this.isEdit) {
        this.butGroup = [{
          type: 'primary',
          label: '保存',
          methodFun: 'saveForm',
        }, ];
      }
      if (this.financeId) {
        this.getFinance();
      }
    },
    watch: {
      'form.BCompId'(val) {
        this.FinanceTable = [];
      },
      'form.SCompId'(val, oldVal) {
        let assetPoolList = JSON.parse(JSON.stringify(this.assetPool));
        if (oldVal != '') {
          this.form.AssetPoolId = '';
        }
        this.assetPoolShow = [];
        assetPoolList.map((res) => {
          if (res.compid == val) {
            this.assetPoolShow.push(res);
          }
        });
      },
    },
    methods: {
      //获取融资合同详情
      getFinance() {
        request({
            url: '/Asset/Finance/Form',
            method: 'get',
            params: {
              FinanceId: this.financeId,
            },
          })
          .then((res) => {
            this.form = JSON.parse(JSON.stringify(res.data.FINANCE));
            this.Finance_D = JSON.parse(JSON.stringify(res.data.FINANCE_D));
            this.FinFlowTable = JSON.parse(JSON.stringify(res.data.FINFLOW));
          })
          .then((item) => {
            request({
              //获取所有的资产列表
              url: '/ams/Ord/AssetList',
              method: 'get',
              params: {
                loginMark: '',
                token: '',
                pagination: {
                  rows: 100, /// 每页行数
                  page: 1, /// 当前页
                  sidx: 'F_CreateDate', /// 排序列
                  sord: 'desc', /// 排序类型
                  records: 0, /// 总记录数
                  total: 0, /// 总页数
                },
                queryJson: {
                  CompId: this.userInfo.CompId,
                },
              },
            }).then((ord) => {
              ord.data.rows.map((ordlist) => {
                this.Finance_D.map((assetlist) => {
                  //将曾经保存过的资产信息放置在页面上显示
                  if (ordlist.ordid == assetlist.AssetId) {
                    this.FinanceTable.push(ordlist);
                  }
                });
              });
            });
          });
      },
      //保存融资合同信息
      saveForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.FinanceTable.length == 0) {
              this.$message.info('请选择资产信息');
              return;
            }
            if (this.userInfo.UserType == 9) {
              this.form.SCompName = this.getCompanyFincList().find(
                vals => vals.compid === this.form.SCompId).compname
            }

            let arr = this.getCompanyList();
            arr.map(item => {
              if (item.value == this.form.BCompId) {
                this.form.BCompName = item.text
              }
            })
            this.Finance_D = [];
            this.FinanceTable.map((res, index) => {
              this.Finance_D.push({
                AssetId: res.ordid,
                OrdNo: res.ordno,
                SeqNo: index + 1,
              });
            });
            Page_Save({
                Finance: this.form,
                Finance_D: this.Finance_D
              },
              '/Asset/Finance/Save',
              this.financeId
            ).then((res) => {
              if (res.info == '响应成功') {
                this.$message.success(res.info);
                this.form.FinanceId = res.data.FinanceId;
                this.goList();
              } else {
                this.$message.error(res.info);
              }
            });
          }
        });
      },
      //跳转列表页
      goList() {
        this.$router.push({
          path: '/Asset/finance/pageQuery'
        });
      },
      //点击资产信息
      addAsset() {
        if (this.form.BCompId == '') {
          this.$message.info('请先选择企业名称');
        } else {
          let arr = this.getCompanyList();
          arr.map(item => {
            if (item.value == this.form.BCompId) {
              this.form.BCompName = item.text
            }
          })
          this.centerDialogVisible = true;
        }
      },
      //处理添加过来的资产信息
      handleSelectionChange(val) {
        this.FinanceTable = val;
        this.form.Qty = 0;
        this.form.CMoney = 0;
        this.form.FMoney = 0;
        val.map((res) => {
          this.form.Qty += Number(res.qty);
          this.form.CMoney += Number(res.totalprice);
          this.form.FMoney += Number(res.totalprice);
        });
        this.centerDialogVisible = false;
      },
      //移除资产信息的操作
      deleteChooice(item, index) {
        this.FinanceTable.splice(index, 1);
        this.form.Qty = 0;
        this.form.CMoney = 0;
        this.form.FMoney = 0;
        this.FinanceTable.map((res) => {
          this.form.Qty += Number(res.qty);
          this.form.CMoney += Number(res.totalprice);
          this.form.FMoney += Number(res.totalprice);
        });
      },
      //根绝账期和融资开始时间取得结束时间
      getEndTime() {
        if (this.form.PayDay == '') {
          this.$message.info('请先填写账期');
          this.form.StartDate = '';
        } else if (this.form.StartDate == null) {
          this.form.EndDate = null;
        } else {
          this.form.EndDate = this.getNextDate(
            this.form.StartDate,
            Number(this.form.PayDay)
          );
        }
      },
      getNextDate(date, day) {
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m =
          dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
        // var d = dd.getDate() < 9 ? "0" + (dd.getDate()+1) : dd.getDate()+1;
        return y + '-' + m + '-' + d;
      },
    },
  };

</script>
<style lang="scss">
  .el-form-item .el-form-item {
    margin-bottom: 0;
  }

  .page-main .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

</style>
