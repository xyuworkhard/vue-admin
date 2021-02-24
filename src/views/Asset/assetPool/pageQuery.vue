<template>
  <div class="app-container">
    <searchTable ref="searchTable" :api="queryapi" v-model="tableData" :form="form">
      <template slot="searchInput">
        <el-form ref="form" :model="form" label-width="120px" size="small">
          <el-row>
            <el-col :span="6">
              <el-form-item label="资产池编号:" prop="AssetPoolNo">
                <el-input v-model="form.AssetPoolNo" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="资产池名称:" prop="AssetPoolName">
                <el-input v-model="form.AssetPoolName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-position="left" label="创建时间:" prop="startDate">
                <el-date-picker v-model="form.startDate" type="daterange" placeholder="请选择开始日期"
                  value-format="yyyy-MM-dd" class="inpwidth" id="CreateF"
                  @change="$refs.searchTable.handleInput('startDate','CreateDateF','CreateDateT')" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <Folder>
            <template v-slot:searchs>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="资产池状态" prop="AssetPoolStatus">
                    <csceSelect v-model="form.AssetPoolStatus" :showcontent="{data: 'CHECK_ITEM'}"></csceSelect>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </Folder> -->
        </el-form>
      </template>
      <template slot="tableBtn">
        <div class="btns">
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="goEdit(undefined,2)">新增</el-button>
        </div>
      </template>
      <template slot="tableDisabeld">
        <el-table v-loading="listLoading" :data="tableData" border style="width: 100%" max-height="610">
          <el-table-column prop="assetpoolno" align="center" label="资产池编号"></el-table-column>
          <el-table-column prop="assetpoolname" align="center" label="资产池名称"></el-table-column>
          <!-- <el-table-column prop="assetpoolstat" align="center" label="资产池状态"></el-table-column> -->
          <el-table-column prop="compname" align="center" label="公司名称"></el-table-column>
          <el-table-column prop="f_createdate" align="center" label="创建时间"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-view" @click=" goEdit(scope.row.assetpoolid, 1)">查看
              </el-button>
              <el-button type="success" size="small" icon="el-icon-edit" @click=" goEdit(scope.row.assetpoolid, 2)">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </searchTable>
  </div>
</template>
<script>
  import searchTable from '@/components/SearchTable';
  import {
    getUserInfo
  } from "@/utils/auth";
  export default {
    name: 'AssetPool',
    components: {
      searchTable,
    },
    data() {
      return {
        form: {
          AssetPoolNo: '', //资产池编号
          AssetPoolName: '', //资产池名称
          // AssetPoolStatus: '', //资产池状态
          CreateDateF: '', //开始日期
          CreateDateT: '' //结束日期
        },
        queryapi: '/Asset/AssetPool/PageQuery',
        tableData: [],
        listLoading: true,
        userInfo: JSON.parse(getUserInfo()),
      };
    },
    methods: {
      //跳转详情页面
      goEdit(id, value) {
        this.$router.push({
          path: '/Asset/assetPool/edit',
          query: {
            isEdit: value == 1 ? '' : true,
            id: id
          }
        });
      },
      // gettabledata(val){
      //   if(this.userInfo.UserType == 2){
      //     this.tableData=[]
      //     val.map(res=>{
      //       if(res.compid == this.userInfo.CompId){
      //         this.tableData.push(res)
      //       }
      //     })
      //   }else{
      //     this.tableData = val
      //   }
      // }
    },
    created() {
      this.userInfo = JSON.parse(getUserInfo())
    }
  };

</script>
<style lang="scss">
  .app-container .line {
    text-align: center;
  }

  .app-container .el-range-editor--medium.el-input__inner,
  .app-container .el-date-editor.el-input,
  .app-container .el-date-editor.el-input__inner,
  .app-container .el-select {
    width: 100%;
  }

</style>
