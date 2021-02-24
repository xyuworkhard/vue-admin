<template>
  <div class="app-container">
    <searchTable ref="searchTable" :api="queryapi" :must="'notSend'" v-on:gettabledata="gettabledata" :form="form"
      :pageQuery='false'>
      <template slot="searchInput">
        <el-form ref="form" size="small" label-width="135px" :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="资产编号:" prop="OrdNo">
                <el-input v-model="form.OrdNo" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资产时间:" prop="DeliDate">
                <el-date-picker v-model="form.DeliDate" type="daterange" placeholder="选择日期" value-format="yyyy-MM-dd"
                  class="inpwidth" id="DeliDateF"
                  @change="$refs.searchTable.handleInput('DeliDate','DeliDateF','DeliDateT')" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template slot="tableDisabeld">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="assetTitle">未选中的资产 </div>
            <el-table ref="multipleTable" v-loading="listLoading" :data="tableData" border fit style="width: 100%"
              max-height="320">
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <el-table-column align="center" label="资产编号" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.ordno }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="买方" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.bcompname }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="卖方" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.scompname }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="结算金额" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.totalprice }}元</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini">查看</el-button>
                  <!-- <router-link :to="'/ord/edit/'+scope.row.ordid">
                    <el-button type="primary" size="mini">查看</el-button>
                  </router-link> -->
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="1" style="margin-top:32px">
            <el-button class="assetButton" circle size="mini" type="primary" @click="addAsset()"
              icon="el-icon-d-arrow-right"></el-button>
            <el-button class="assetButton" circle type="warning" size="mini" @click="cutAsset()"
              icon="el-icon-d-arrow-left"></el-button>
          </el-col>
          <el-col :span="11">
            <div class="assetTitle">已选中的资产</div>
            <el-table ref="multipleTabled" :data="chooiceTable" border fit style="width: 100%" max-height="320">
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <el-table-column align="center" label="资产编号" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.ordno }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="买方" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.bcompname }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="卖方" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.scompname }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="结算金额" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                  <span>{{ scope.row.totalprice }}元</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini">查看</el-button>
                  <!-- <router-link :to="'/ord/edit/'+scope.row.ordid">
                    <el-button type="primary" size="mini">查看</el-button>
                  </router-link> -->
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </template>
    </searchTable>
    <div style="width:100%;text-align:center">
      <el-button type="primary" size="mini" @click="SubSelection()">确定</el-button>
    </div>

  </div>
</template>

<script>
  import request from "@/utils/request";
  import searchTable from "@/components/SearchTable";
  export default {
    components: {
      searchTable
    },
    props: {
      FinanceTable: {
        type: Array
      },
      OrdComp: {
        type: String
      }
    },
    data() {
      return {
        form: {
          OrdNo: "",
          ContNo: "",
          OrderStat: "5",
          OrdComp: "",
          OrdQtyF: "",
          OrdQtyT: "",
          OrdPart: "",
          CoalType: "",
          Origin: "",
          DeliDate: "",
          DeliDatF: "",
          DeliDateT: "",
          IsAsset: "0"
        },
        queryapi: "/ams/Ord/AssetList",
        tableData: [],
        listLoading: true,
        contForm: false,
        chooiceTable: [],

      };
    },
    created() {
      this.chooiceTable = JSON.parse(JSON.stringify(this.FinanceTable));
      this.form.OrdComp = this.OrdComp;
    },
    mounted() {},
    methods: {
      gettabledata(val) {
        this.tableData = val;
        this.chooiceTable.map(res => {
          for (var i = this.tableData.length - 1; i >= 0; i--) {
            if (this.tableData[i].ordid == res.ordid) {
              this.tableData.splice(i, 1)
            }
          }
        })
      },
      addAsset() {
        this.$refs.multipleTable.selection.map(res => {
          this.chooiceTable.push(res)
          for (var i = this.tableData.length - 1; i >= 0; i--) {
            if (this.tableData[i].ordid == res.ordid) {
              this.tableData.splice(i, 1)
            }
          }
        })
      },
      cutAsset() {
        this.$refs.multipleTabled.selection.map(res => {
          this.tableData.push(res)
          for (var i = this.chooiceTable.length - 1; i >= 0; i--) {
            if (this.chooiceTable[i].ordid == res.ordid) {
              this.chooiceTable.splice(i, 1)
            }
          }
        })
      },
      SubSelection() {
        this.$emit('handleSelectionChange', this.chooiceTable)

      }
    }
  };

</script>
<style lang="scss">
  .ord .el-dialog__body {
    padding: 0px;
  }

  .marBottom.addBtn {
    margin-bottom: 0;
  }

  .item {
    margin-bottom: 18px;
  }

  .assetTitle {
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .assetButton,
  .assetButton+.el-button {
    margin: 0 auto 10px auto;
    display: block;
  }

</style>
