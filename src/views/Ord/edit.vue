<template>
  <div>
    <csceForm :butGroup="btnGroup" v-loading="loading">
      <template slot="formBill">
        <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="135px"
          :disabled="isDisable">
          <el-col :span="6">
            <el-form-item label="合同编号" prop="Contid">
              <el-select v-model="formData.Contid" placeholder="请选择合同编号" clearable filterable>
                <el-option v-for="(item, index) in ContidOptions" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单号" prop="OrdNo">
              <el-input v-model="formData.OrdNo" placeholder="请输入订单号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="煤种" prop="CoalType">
              <el-input v-model="formData.CoalType" placeholder="请输入煤种" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物数量" prop="Qty">
              <el-input v-model="formData.Qty" placeholder="请输入货物数量" clearable>
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发货单位名称" prop="SCompName">
              <el-select v-model="formData.SCompId" placeholder="请选择发货单位名称" clearable @change="getSaleValue" filterable>
                <el-option v-for="(item, index) in SCompNameOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
              <div class="inphidden">
                <el-input v-model="formData.SCompName" type="hidden">
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货单位名称" prop="BCompName">
              <el-select v-model="formData.BCompId" placeholder="请选择收货单位名称" clearable @change="getBuyValue" filterable>
                <el-option v-for="(item, index) in BCompNameOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
              <div class="inphidden">
                <el-input v-model="formData.BCompName" type="hidden">
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="交割文件">
              <UpLoad :multiple="multiple" :file-type="'DeliFolderId'" :company-name="companyName" :limit="limit"
                :acceptlist="acceptlist" :key-value="formData.DeliFolderId" @fileListchange="fileListchange"
                :disabled="isDisable" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交货方式" prop="DeliType">
              <el-select v-model="formData.DeliType" placeholder="请选择交货方式" clearable>
                <el-option v-for="(item, index) in DeliTypeOptions" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式" prop="TransType">
              <el-select v-model="formData.TransType" placeholder="请选择运输方式" clearable>
                <el-option v-for="(item, index) in TransTypeOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交割数量" prop="ComfirmQty">
              <el-input v-model="formData.ComfirmQty" placeholder="请输入交割数量" clearable>
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交割时间" prop="DeliDate">
              <el-date-picker v-model="formData.DeliDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="交割点" prop="DeliAddr">
              <el-input v-model="formData.DeliAddr" placeholder="请输入交割点" clearable></el-input>
              <!-- <el-select v-model="formData.DeliAddr" placeholder="请选择交割点" clearable>
                <el-option v-for="(item, index) in DeliAddrOptions" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价" prop="Price">
              <el-input v-model="formData.Price" placeholder="请输入单价" clearable>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价加扣" prop="DisPrice">
              <el-input v-model="formData.DisPrice" placeholder="请输入单价加扣" clearable>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实际单价" prop="ActPrice">
              <el-input v-model="formData.ActPrice" placeholder="请输入实际单价" clearable>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单总价" prop="TotalPrice">
              <el-input v-model="formData.TotalPrice" placeholder="请输入订单总价" clearable>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="检验单文件">
              <UpLoad :multiple="multiple" :file-type="'ChkFolderId'" :company-name="companyName" :limit="limit"
                :acceptlist="acceptlist" :key-value="formData.ChkFolderId" @fileListchange="fileListchange1"
                :disabled="isDisable" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检验单号" prop="ChkRptNo">
              <el-input v-model="formData.ChkRptNo" placeholder="请输入检验单" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算单" prop="CrgNo">
              <el-input v-model="formData.CrgNo" placeholder="请输入结算单" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算金额" prop="CrgPrice">
              <el-input v-model="formData.CrgPrice" placeholder="请输入结算金额" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="一票含税煤炭单价" prop="CoalPrice">
              <el-input v-model="formData.CoalPrice" placeholder="请输入一票含税煤炭单价" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div :class="{ isReadOnly: isDisable }" style="display:flex">
              <span class="spantitle">检查项目</span>
              <Grid :tableData="gridData" @sendBackData="getBackData" :gridConfig="gridConfig" style="flex:1"></Grid>
            </div>
          </el-col>
        </el-form>
      </template>
    </csceForm>
  </div>
</template>
<script>
  import csceForm from "@/components/Csce_Form";
  import UpLoad from "@/components/Csce_Uploader/upload";
  import request from "@/utils/request";
  import Grid from "@/components/_New_comPonents/l_grid/index";
  export default {
    name: "ordedit",
    components: {
      csceForm,
      UpLoad,
      Grid
    },
    props: [],
    data() {
      return {
        formData: {
          ChkItemInfo: ""
        },
        //grid数据配置
        gridData: [],
        gridConfig: {
          headData: [{
              label: "检查项目",
              name: "CHKITEM",
              align: "center",
              type: "select",
              typeData: {
                action: "0",
                multiple: false,
                filterable: true,
                isTags: false,
                showcontent: {
                  data: "CHECK_ITEM"
                }
              }
            },
            {
              label: "项目值",
              name: "VAL",
              type: "input",
              align: "center"
            }
          ],
          isEdit: true,
          height: 180
          // width: 1200
        },
        //附件数据
        fileList: [],
        fileList1: [],
        multiple: false,
        limit: 3,
        acceptlist: "jpg,pdf,xlsx,png,docx",
        companyName: "AMS",
        //分页数据
        listQuery: {
          rows: 1000,
          page: 1,
          sidx: "F_CreateDate", /// 排序列
          sord: "desc", /// 排序类型
          records: 0, /// 总记录数
          total: 0 /// 总页数
        },
        isDisable: false,
        btnGroup: [], //按钮数据
        loading: true,
        //校验规则
        rules: {
          Contid: [{
            required: true,
            message: "请选择合同编号",
            trigger: "change"
          }],
          CrgPrice: [{
            required: true,
            message: "请输入结算金额",
            trigger: "blur"
          }],
          OrdNo: [{
            required: true,
            message: "请输入订单号",
            trigger: "blur"
          }],
          SCompName: [{
            required: true,
            message: "请选择卖方公司",
            trigger: "change"
          }],
          BCompName: [{
            required: true,
            message: "请选择买方公司",
            trigger: "change"
          }]
        },
        //下拉框数据
        SCompNameOptions: [],
        BCompNameOptions: [],
        DeliTypeOptions: [],
        TransTypeOptions: [],
        //合同编号数据
        ContidOptions: []
      };
    },
    created() {
      this.initData();
    },
    methods: {
      getBackData(val) {
        this.gridData = val;
      },
      // 附件上传
      setFolderId() {
        const foldID = this.formData.ChkFolderId;
        if (foldID == "" || foldID == undefined || foldID == null) {
          const genGuid = this.GUID();
          this.formData.ChkFolderId = genGuid;
        }
        const foldID1 = this.formData.DeliFolderId;
        if (foldID1 == "" || foldID1 == undefined || foldID1 == null) {
          const genGuid = this.GUID();
          this.formData.DeliFolderId = genGuid;
        }
      },
      fileListchange(item) {
        this.fileList = item;
      },
      fileListchange1(item) {
        this.fileList1 = item;
      },
      //初始化数据
      async initData() {
        const {
          types
        } = this.$route.meta;
        const ordId = this.$route.query.ordId;
        const btnGroup = [{
          type: "primary",
          methodFun: "saveForm",
          label: "保存"
        }];
        const getContData = await request({
          url: "/ams/Cont/PageQuery",
          method: "get",
          params: {
            pagination: this.listQuery,
            queryJson: {
              ContNo: ""
            }
          }
        });
        const {
          code,
          info,
          data: contDataList
        } = getContData;
        if (code == 200) {
          this.ContidOptions = contDataList.rows.map(item => {
            return {
              label: item.ContNo,
              value: item.Contid
            };
          });
        } else {
          this.$message.error(info);
        }
        if (types == "create") {
          this.btnGroup = btnGroup;
          this.setFolderId();
          this.loading = false;
        } else if (types == "view") {
          this.btnGroup = [];
          this.isDisable = true;
          this.dealGetFormData(ordId);
        } else {
          this.btnGroup = btnGroup;
          this.dealGetFormData(ordId);
        }
        //公司数据
        this.getSCompNameOptions();
        this.getBCompNameOptions();
        this.DeliTypeOptions = this.getdealDictionary("DELIVERY_TYPE");
        this.TransTypeOptions = this.getdealDictionary("TRANSFER_TYPE");
      },
      //买卖方
      getSCompNameOptions() {
        this.SCompNameOptions = this.getDealCompany();
      },
      getBCompNameOptions() {
        this.BCompNameOptions = this.getDealCompany();
      },
      getSaleValue(val) {
        if (!val) {
          return;
        }
        this.formData.SCompName = this.SCompNameOptions.find(
          vals => vals.value === val
        ).label;
      },
      getBuyValue(val) {
        if (!val) {
          return;
        }
        this.formData.BCompName = this.BCompNameOptions.find(
          vals => vals.value === val
        ).label;
      },
      //get,post request
      getFormRequest(url, id) {
        return request({
          url,
          method: "get",
          params: {
            OrdId: id
          }
        });
      },
      saveFormRequest(url, formdata, id) {
        return request({
          url,
          method: "post",
          data: {
            Data: JSON.stringify({
              entity: JSON.stringify(formdata),
              keyValue: id
            })
          }
        });
      },
      //get,post获取数据
      async dealPostFormData(url = "/ams/Ord/Save") {
        this.formData.Ordid = this.formData.Ordid ? this.formData.Ordid : "";
        this.formData.ChkItemInfo = JSON.stringify(this.gridData)
        this.setFolderId();
        const {
          code,
          info,
          data: resContData
        } = await this.saveFormRequest(
          url,
          this.formData,
          this.formData.Ordid
        );
        if (code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
            duration: 1 * 1000,
            onClose: () => {
              this.loading = false;
              this.$router.push("/ord/list");
            }
          });
        } else {
          this.$message.error(info);
          this.loading = false;
        }
      },
      async dealGetFormData(id, url = "/ams/Ord/Form") {
        const {
          code,
          info,
          data: reOrdData
        } = await this.getFormRequest(
          url,
          id
        );
        if (code == 200) {
          this.$message({
            message: "加载成功",
            type: "success",
            duration: 1 * 1000,
            onClose: () => {
              this.loading = false;
              this.formData = reOrdData.OrdDoc;
              if (this.formData.ChkItemInfo == null || this.formData.ChkItemInfo == "") {
                this.gridData = []
              } else {
                this.gridData = JSON.parse(this.formData.ChkItemInfo)
              }

            }
          });
        } else {
          this.$message.error(info);
          this.loading = false;
        }
      },
      //保存操
      saveForm() {
        this.$refs["formData"].validate(valid => {
          if (valid) {
            this.dealPostFormData();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      getForm() {}
    }
  };

</script>
<style lang="scss" scoped>
  .isReadOnly {
    pointer-events: none;
  }

  .spantitle {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    font-weight: 600;
    width: 135px;
    text-align: right;
  }

</style>
