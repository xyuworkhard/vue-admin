<template>
  <div class="app-container">
    <searchTable ref="searchTable" :api="queryapi" v-model="tableData" :form="form">
      <template slot="searchInput">
        <el-form ref="form" size="small" :rules="rules" label-width="120px" :model="form">
          <el-row>
            <el-col :span="6">
              <el-form-item label="订单编号:" prop="ordno">
                <el-input v-model="form.ordno" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="签订日期:" prop="startDate">
                <el-date-picker v-model="form.startDate" type="daterange" placeholder="选择日期" value-format="yyyy-MM-dd"
                  class="inpwidth" @change="
                    $refs.searchTable.handleInput(
                      'startDate',
                      'CreateF',
                      'CreateT'
                    )
                  " />
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="卖方公司:" prop="scompname">
                <el-input v-model="form.scompname" placeholder="请输入" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="买方公司:" prop="bcompname">
                <el-input v-model="form.bcompname" placeholder="请输入" />
              </el-form-item>
            </el-col>

          </el-row>
          <!-- <Folder>
            <template v-slot:searchs>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="买方公司:" prop="BCompName">
                    <el-input v-model="form.BCompName" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </Folder> -->
        </el-form>
      </template>
      <template slot="tableBtn">
        <div class="btns">
          <router-link :to="{ path: '/ord/create' }">
            <el-button type="primary" size="mini" icon="el-icon-plus">新增</el-button>
          </router-link>
        </div>
      </template>
      <template slot="tableDisabeld">
        <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%"
          max-height="650" class="tableBtn">
          <el-table-column align="center" label="订单编号" width="240">
            <template slot-scope="scope">
              <span>{{ scope.row.ordno}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="公司名称" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-show="scope.row.bcompid">买受方：{{ scope.row.bcompname }}</span>
              <br />
              <span v-show="scope.row.scompid">出卖方：{{ scope.row.scompname }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单总量(吨)" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.qty }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="煤种" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.coaltype }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="签订日期" width="180">
            <template slot-scope="scope">
              <span>{{
                scope.row.f_createdate | dateFormat("yyyy-MM-dd HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="280" fixed="right">
            <template slot-scope="scope">
              <router-link :to="{path:'/ord/view', query:{ ordId:scope.row.ordid}}">
                <el-button type="primary" size="small" icon="el-icon-view">查看订单</el-button>
              </router-link>
              <router-link :to="{path:'/ord/edit', query:{ ordId:scope.row.ordid}}">
                <el-button type="primary" size="small" icon="el-icon-edit">编辑订单</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </searchTable>
  </div>
</template>

<script>
  import searchTable from "@/components/SearchTable";
  import csceSelects from "@/components/L_select";
  export default {
    name: "ordlist",
    components: {
      searchTable,
      csceSelects
    },
    data() {
      return {
        form: {
          ordno: "",
          // CreateF: "",
          // CreateT: "",
          scompname: "",
          bcompname: "",
        },
        rules: {},
        queryapi: "/ams/Ord/AssetList",
        tableData: [],
        listLoading: true,

      };
    },
    created() {

    }
  };

</script>
<style lang="scss"></style>
