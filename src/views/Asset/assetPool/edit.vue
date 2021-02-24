<template>
  <div class="page-main">
    <csceForm :butGroup='butGroup'>
      <template slot="formBill">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules" class="pt20" size="small">
          <el-row type="flex" justify="center" class="pb10">
            <el-col :span="16">
              <el-form-item label="资产池名称：" prop="AssetPoolName" required="required">
                <el-input v-model="form.AssetPoolName" :readonly="isEdit ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row type="flex" justify="center" class="pb10">
                <el-col :span="16">
                  <el-form-item label="资产池状态：" prop="AssetPoolStat" required="required">
                    <csceSelect :readonly="isEdit ? false : true" v-model="form.AssetPoolStat" :showcontent="{data: 'FROZEN_TYPE'}"></csceSelect>
                  </el-form-item>
                </el-col>
              </el-row> -->
          <el-row type="flex" justify="center" class="pb10">
            <el-col :span="16">
              <el-form-item label="公司名称：" prop="CompId" required="required">
                <!-- <csceSelect v-if="userInfo.UserType == 9" :readonly="isEdit ? false : true" v-model="form.CompId" :showcontent="{data: 'csce_company_bank'}"></csceSelect> -->
                <csceSelects v-if="userInfo.UserType == 9" :readonly="isEdit ? false : 'readonly'" v-model="form.CompId"
                  :showcontent="{data : 'csce_companyca_bank'}" :action="1" :filterable="true" :defoption="form.CompId">
                </csceSelects>
                <csceSelects v-if="userInfo.UserType == 2" :readonly="'readonly'" v-model="form.CompId"
                  :showcontent="{data : 'csce_companyca_bank'}" :action="1" :filterable="true" :defoption="form.CompId">
                </csceSelects>
                <!-- <el-input v-if="userInfo.UserType == 2" v-model="form.CompName" :readonly="true"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="16">
              <el-form-item label="备注：" prop="Memo">
                <el-input :readonly="isEdit ? false : 'readonly'" v-model="form.Memo" type="textarea" class="inpheight"
                  resize="none"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </csceForm>
  </div>
</template>
<script>
  import axios from 'axios';
  import request from '@/utils/request';
  import {
    Page_Save
  } from '@/utils/requestFunc';
  import csceForm from '@/components/Csce_Form'
  import {
    getUserInfo
  } from "@/utils/auth";
  import csceSelects from '@/components/L_select';
  export default {
    name: 'AssetPoolDetail',
    components: {
      csceForm,
      csceSelects
    },
    data() {
      return {
        isEdit: "", //是否编辑
        assetPoolId: null, //资产池ID
        userInfo: JSON.parse(getUserInfo()),
        form: {
          AssetPoolName: '', //资产池名称
          AssetPoolStat: '0', //资产池状态
          Memo: '', //备注
          CompName: '', //公司名称
          CompId: '' //公司id
        },
        rules: {},
        butGroup: []
      };
    },
    created() {
      this.userInfo = JSON.parse(getUserInfo())
      if (this.userInfo.UserType == 2) {
        this.form.CompName = this.userInfo.RegCompName
        this.form.CompId = this.userInfo.CompId
      }
      this.getAssetPool();
    },
    mounted() {

    },
    watch: {
      // 监测路由变化，只要变化了就调用路由参数方法将数据存储本组件即可
      // $route: "getAssetPool"
    },
    methods: {
      //获取资产池详情
      getAssetPool() {
        this.isEdit = this.$route.query.isEdit;
        this.assetPoolId = this.$route.query.id;
        if (this.assetPoolId != undefined) {
          request({
            url: '/Asset/AssetPool/Form',
            method: 'get',
            params: {
              AssetPoolId: this.assetPoolId
            }
          }).then(res => {
            this.form = res.data.ASSETPOOL;
          });
        }
        if (this.isEdit) {
          this.butGroup = [{
            type: 'primary',
            methodFun: 'saveForm',
            label: '保存'
          }]
        }

      },
      //保存资产池信息
      saveForm() {
        this.form.CompName = this.getCompanyFincList().find(
          vals => vals.compid === this.form.CompId
        ).compname
        this.$refs["form"].validate(valid => {
          if (valid) {
            Page_Save({
                AssetPool: this.form
              },
              '/Asset/AssetPool/Save',
              this.assetPoolId
            ).then(res => {
              if (res.code == 200) {
                this.$message.success(res.info);
                this.goList();
              } else {
                this.$message.error(res.info);
              }
            });
          }
        })

      },
      //跳转列表页
      goList() {
        this.$router.push({
          path: '/Asset/assetPool/pageQuery'
        });
      }
    }
  };

</script>
<style lang="scss">
  .page-main {
    .page-content {
      padding: 20px;

      .page-title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: rgb(90, 90, 90);
      }

      .btn-size {
        width: 150px;
      }

      .pb10 {
        padding-bottom: 10px;
      }

      .pt20 {
        padding-top: 20px;
      }
    }
  }

</style>
