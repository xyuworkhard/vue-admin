<template>
  <div class="app-container">
    <searchTable ref="searchTable" :api="queryapi" v-model="tableData" :form="form">
      <template slot="searchInput">
        <el-form ref="form" size="small" :rules="rules" label-width="120px" :model="form">
          <el-row>
            <el-col :span="6">
              <el-form-item label="合同编号:" prop="ContNo">
                <el-input v-model="form.ContNo" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签订日期:" prop="startDate">
                <el-date-picker v-model="form.startDate" type="daterange" placeholder="选择日期" value-format="yyyy-MM-dd"
                  class="inpwidth" @change="
                    $refs.searchTable.handleInput(
                      'startDate',
                      'ContF',
                      'ContT'
                    )
                  " />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="卖方公司" prop="SCompName">
                <el-input v-model="form.SCompName" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <Folder>
            <template v-slot:searchs>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="买方公司" prop="BCompName">
                    <el-input v-model="form.BCompName" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </Folder>
        </el-form>
      </template>
      <template slot="tableBtn">
        <div class="btns">
          <router-link :to="{ path: '/cont/create' }">
            <el-button type="primary" size="mini" icon="el-icon-plus">新增</el-button>
          </router-link>
        </div>
      </template>
      <template slot="tableDisabeld">
        <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%"
          max-height="610" class="tableBtn">
          <el-table-column align="center" label="合同编号" width="240">
            <template slot-scope="scope">
              <span>{{ scope.row.ContNo}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同买卖方" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-show="scope.row.BCompId">买受方：{{ scope.row.BCompName }}</span>
              <br />
              <span v-show="scope.row.SCompId">出卖方：{{ scope.row.SCompName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同总量(吨)" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.Qty }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="煤种" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.CoalType }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="签订日期" width="180">
            <template slot-scope="scope">
              <span>{{
                scope.row.F_CreateDate | dateFormat("yyyy-MM-dd HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="280" fixed="right">
            <template slot-scope="scope">
              <router-link :to="{path:'/cont/view', query:{ contId:scope.row.Contid}}">
                <el-button type="primary" size="small" icon="el-icon-view">查看合同</el-button>
              </router-link>
              <router-link :to="{path:'/cont/edit', query:{ contId:scope.row.Contid}}">
                <el-button type="primary" size="small" icon="el-icon-edit">编辑合同</el-button>
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
    name: "contlist",
    components: {
      searchTable,
      csceSelects
    },
    data() {
      return {
        form: {
          ContNo: "",
          CreateF: "",
          CreateT: "",
          SCompName: "",
          BCompName: "",
        },
        rules: {},
        queryapi: "/ams/Cont/PageQuery",
        tableData: [],
        listLoading: true,

      };
    },
    created() {

    }
  };

</script>
<style lang="scss"></style>
