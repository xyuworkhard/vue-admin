<template>
  <div class="assetManger">
    <searchTable ref="searchTable" :api="queryapi" @gettabledata="gettabledata" :form="form">
      <template slot="searchInput">
        <el-form ref="form" :model="form" size="small" label-width="120px" :hide-required-asterisk="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资编号" prop="FinanceNo">
                <el-input v-model="form.FinanceNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资标题" prop="FinanceTitle">
                <el-input v-model="form.FinanceTitle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <Folder>
            <template v-slot:searchs>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资买方" prop="BCompName">
                    <el-input v-model="form.BCompName"></el-input>
                  </el-form-item>
                </el-col>
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
              </el-row>
            </template>
          </Folder>
        </el-form>
      </template>
      <template slot="tableBtn">
        <div class="btns">
          <el-button type="primary" size="mini" icon="el-icon-download" @click="allDownLoad" :loading="allLoad">下载
          </el-button>
        </div>
      </template>
      <!-- @expand-change="expandChange"
      :row-key="getRowKeys" :expand-row-keys="expandsArray" @selection-change="handleSelectionChange"-->
      <!-- @select="handleSelection"
      @select-all="handleSelectionAll" @selection-change="handleSelectionChange" -->
      <!-- @expand-change="expandChange"
      :row-key="getRowKeys" :expand-row-keys="expandsArray" -->
      <template slot="tableDisabeld">
        <el-table :data="tableData" border style="width: 100%" max-height="610" fit highlight-current-row
          :default-sort="{prop: 'financeno', order: 'descending'}" v-loading="listLoading"
          @selection-change="handleSelectionChangeAll" ref="f_multipleTable">
          <el-table-column type="expand" width="45">
            <template slot-scope="props">
              <el-table :data="props.row.finance_dlist" border>

                <el-table-column type="index" width="45" align="center">
                </el-table-column>
                <!-- <el-table-column type="selection" width="45" align="center">
                </el-table-column> -->
                <el-table-column prop="ContNo" label="合同编号" min-width="160" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="OrdNo" label="订单编号" min-width="160" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="Qty" label="数量(吨)" width="160" align="center">
                </el-table-column>
                <el-table-column prop="Price" label="价格(元)" width="160" align="center">
                </el-table-column>
                <el-table-column label="煤种" width="160" align="center">

                  <template slot-scope="scope">
                    {{getNameById("COAL_TYPE", scope.row.CoalType)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="80">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="singleDownLoad(scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="financeno" label="融资编号" width="180" :sortable="true" align="center"></el-table-column>
          <el-table-column prop="financetitle" label="融资标题" min-width="160" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="scompname" label="融资卖方" min-width="180" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="bcompname" label="融资买方" min-width="180" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="cmoney" label="结算金额(元)" min-width="120" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="fmoney" label="融资金额(元)" min-width="120" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="payday" label="支付周期(天)" width="120" align="center">
          </el-table-column>
        </el-table>
      </template>
    </searchTable>
  </div>
</template>

<script>
  import searchTable from '@/components/SearchTable';
  import request from "@/utils/request";
  import {
    getUserInfo
  } from "@/utils/auth";
  export default {
    name: "assetManger",
    data() {
      return {
        listLoading: true,
        allLoad: false,
        form: {
          FinanceNo: "",
          FinanceTitle: "",
          BCompName: "",
          PayDayF: "",
          PayDayT: "",
          CompId: ""
        },
        queryapi: "/Asset/Finance/FinCompPageQuery",
        tableData: [],
        userInfo: {},
        expandsArray: [],
        totalSelectData: [],
        singleSelectData: []
      }
    },
    components: {
      searchTable
    },
    created() {
      this.userInfo = JSON.parse(getUserInfo())
    },
    methods: {
      initData() {
        this.userInfo = JSON.parse(getUserInfo())
        this.form.CompId = this.userInfo.CompId
      },
      gettabledata(val) {
        this.tableData = val;
        this.tableData.forEach(item => {
          const clist = JSON.parse(item.finance_dlist)
          item.finance_dlist = clist
        })
      },
      expandChange(row, expandedRows) {
        if (expandedRows.length) {
          this.expandsArray = []
          if (row) {
            this.expandsArray.push(row.financeid)
          }
        } else {
          this.expandsArray = []
        }

      },
      getRowKeys(row) {
        return row.financeid
      },
      dealCheckData(arr) {
        if (arr.length === 0) return []
        return arr.map(item => {
          let obj = {};
          obj.FinanceNo = item.financeno;
          obj.OrdIdList = getOrdList(item.finance_dlist).join(',')
          return obj
        })


        function getOrdList(listArr) {
          if (listArr.length === 0) return '';
          return listArr.map(item => item.OrdId)
        }
      },
      handleSelectionChangeAll(rows) {
        this.totalSelectData = this.dealCheckData(rows)
      },
      allDownLoad() {
        this.allLoad = true;
        if (this.totalSelectData.length === 0) {
          this.$message("请选择下载内容")
          this.allLoad = false;
          return
        }
        this.dealDownLoad(this.totalSelectData)
      },
      singleDownLoad(value) {
        this.singleSelectData = []
        let clickData = this.tableData.find(item => item.financeid === value.FinanceId);
        let obj = {};
        obj.FinanceNo = clickData.financeno;
        obj.OrdIdList = value.OrdId
        this.singleSelectData.push(obj)
        this.dealDownLoad(this.singleSelectData)
      },
      dealDownLoad(data) {
        const {
          RegCompName
        } = this.userInfo;
        const sendData = JSON.stringify(data);
        request({
          url: "/Asset/Finance/DownloadExcel",
          method: "get",
          params: {
            data: sendData,
            companyName: RegCompName,

          },
          responseType: 'blob'
        }).then(res => {
          let blob = new Blob([res], {
            type: "application/zip"
          }) //new一个二进制对象
          let url = window.URL.createObjectURL(blob); //转化为url
          const link = document.createElement("a"); //创建个a标签
          link.href = url;
          link.download = RegCompName + '-' + this.getCurTimes(); //重命名
          link.click();
          URL.revokeObjectURL(url); //释放内存
          this.allLoad = false;
        })
      },
      getCurTimes() {
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = (today.getMonth() + 1).toString().padStart(2, "0");
        let hour = today.getHours().toString().padStart(2, "0");
        let minute = today.getMinutes().toString().padStart(2, "0");
        let second = today.getSeconds().toString().padStart(2, "0");
        let dd = today.getDate().toString().padStart(2, "0");
        return yyyy + mm + dd + hour + minute + second;
      }
    }

  }

</script>

<style lang="scss">
  .assetManger {
    padding: 20px;

    .pagination-container {
      margin-top: 0;
    }

  }

</style>
