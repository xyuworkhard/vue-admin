<template>
  <div class="app-container">
    <searchTable ref="searchTable" :api="queryapi" v-model="tableData" :form="form">
      <template slot="searchInput">
        <el-form ref="form" :rules="rules" label-width="110px" :model="form">
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
                    <el-date-picker v-model="form.BidDate" type="daterange" placeholder="选择日期" value-format="yyyy-MM-dd"
                      class="inpwidth" id="BidDateF"
                      @change="$refs.searchTable.handleInput('BidDate','FinDateF','FinDateT')" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col :span="10">
                  <el-form-item label="状态:" prop="FinFlowStatus">
                    <csceSelect
                      ref="typeSelect0"
                      v-model="form.FinFlowStatus"
                      :showcontent="{data:'BidinStat'}"
                    ></csceSelect>
                  </el-form-item>
                </el-col>-->
              </el-row>
            </template>
          </Folder>
        </el-form>
      </template>
      <template slot="tableDisabeld">
        <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%"
          max-height="350">
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
          <!-- <el-table-column align="center" label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.finflowstatus}}</span>
            </template>
          </el-table-column>-->
        </el-table>
      </template>
    </searchTable>
  </div>
</template>

<script>
  import searchTable from '@/components/SearchTable';
  import {
    getUserInfo
  } from '@/utils/auth';
  import Rules from '@/views/Asset/js/assetFlowRules';
  export default {
    name: 'assetFlow',
    components: {
      searchTable
    },
    props: {
      //childApi: String
    },
    data() {
      return {
        userInfo: JSON.parse(getUserInfo()),
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
        queryapi: '/Asset/Finance/Finlist',
        tableData: [],
        listLoading: true
      };
    },
    created() {
      this.userInfo = JSON.parse(getUserInfo());
    },
    mounted() {},
    methods: {
      // gettabledata(arr) {
      //   if (this.userInfo.UserType == 9) {//管理员
      //     this.tableData = arr;
      //   } else if (this.userInfo.UserType == 2) {//金融机构
      //     let compId = this.userInfo.CompId;
      //     this.tableData = arr.filter(item => {
      //       return item.compid == compId;
      //     });
      //   }
      // }
    }
  };

</script>
