<template>
  <div>
    <csceForm :butGroup="btnGroup" v-loading="loading">
      <template slot="formBill">
        <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px"
          :disabled="isDisable">
          <el-col :span="6">
            <el-form-item label="合同编号" prop="ContNo">
              <el-input v-model="formData.ContNo" placeholder="请输入合同号" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卖方公司" prop="SCompName">
              <el-select v-model="formData.SCompId" placeholder="请选择卖方公司" clearable @change="getSaleValue" filterable>
                <el-option v-for="(item, index) in SCompNameOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
              <div class="inphidden">
                <el-input v-model="formData.SCompName" type="hidden">
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="买方公司" prop="BCompName">
              <el-select v-model="formData.BCompId" placeholder="请选择买方公司" clearable @change="getBuyValue" filterable>
                <el-option v-for="(item, index) in BCompNameOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
            <div class="inphidden">
              <el-input v-model="formData.BCompName" type="hidden">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <el-form-item label="煤种" prop="CoalType">
              <el-input v-model="formData.CoalType" placeholder="请输入煤种" clearable>
              </el-input>
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
            <el-form-item label="数量" prop="Qty">
              <el-input v-model="formData.Qty" placeholder="请输入数量" clearable>
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件上传">
              <UpLoad :multiple="multiple" :file-type="'FolderId'" :company-name="companyName" :limit="limit"
                :acceptlist="acceptlist" :key-value="formData.FolderId" @fileListchange="fileListchange"
                :disabled="isDisable" />
            </el-form-item>
          </el-col>
        </el-form>
      </template>
    </csceForm>
    <div class="ordList" v-if="ordtableData.length>0" v-loading="listLoading">
      <el-table :data="ordtableData" border fit highlight-current-row style="width: 100%" max-height="650"
        class="tableBtn">
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
      <pagination :total="listQuery.records" :page.sync="listQuery.page" :limit.sync="listQuery.rows"
        @pagination="getOrdList" />
    </div>
  </div>
</template>
<script>
  import csceForm from "@/components/Csce_Form";
  import UpLoad from "@/components/Csce_Uploader/upload";
  import request from '@/utils/request';
  import Pagination from "@/components/Pagination";
  export default {
    name: "contedit",
    components: {
      csceForm,
      UpLoad,
      Pagination
    },
    props: [],
    data() {
      return {
        formData: {
          ContNo: "",
          SCompName: "",
          SCompId: "",
          BCompName: "",
          BCompName: "",
          CoalType: "",
          Price: "",
          Qty: "",
          FolderId: "",
        },
        //附件数据
        fileList: [],
        multiple: false,
        limit: 3,
        acceptlist: "jpg,pdf,xlsx,png,docx",
        keyValues: "",
        companyName: "CSCE",
        //
        ordtableData: [], //订单列表数据
        btnGroup: [], //按钮数据
        isDisable: false,
        listLoading: true,
        loading: true,
        //分页查询
        listQuery: {
          rows: 10,
          page: 1,
          sidx: 'F_CreateDate', /// 排序列
          sord: "desc", /// 排序类型
          records: 0, /// 总记录数
          total: 0 /// 总页数
        },
        //校验规则
        rules: {
          ContNo: [{
            required: true,
            message: "请输入合同号",
            trigger: "blur",
          }, ],
          SCompName: [{
            required: true,
            message: "请选择卖方公司",
            trigger: "change",
          }, ],
          BCompName: [{
            required: true,
            message: "请选择买方公司",
            trigger: "change",
          }, ],
        },
        //买卖方
        SCompNameOptions: [],
        BCompNameOptions: [],
      };
    },
    created() {
      this.initData()
    },
    methods: {
      // 附件上传方法
      fileListchange(item) {
        this.fileList = item;
      },
      //初始化操作
      initData() {
        const {
          types
        } = this.$route.meta;
        const contId = this.$route.query.contId
        const btnGroup = [{
          type: "primary",
          methodFun: "saveForm",
          label: "保存",
        }]

        if (types == 'create') {
          this.loading = false;
          this.btnGroup = btnGroup
          const foldID = this.formData.FolderId;
          if (foldID == "" || foldID == undefined || foldID == null) {
            const genGuid = this.GUID();
            this.formData.FolderId = genGuid;
          }
        } else if (types == 'view') {
          this.btnGroup = [];
          this.isDisable = true;

          this.dealGetFormData(contId)
          this.getOrdList()
        } else {
          this.btnGroup = btnGroup
          this.dealGetFormData(contId)
          this.getOrdList()
        }
        //公司数据
        this.getSCompNameOptions();
        this.getBCompNameOptions();

      },
      //买卖方公司
      getSCompNameOptions() {
        this.SCompNameOptions = this.getDealCompany();
      },
      getBCompNameOptions() {
        this.BCompNameOptions = this.getDealCompany();
      },
      getSaleValue(val) {
        if (!val) {
          return
        }
        this.formData.SCompName = this.SCompNameOptions.find(
          (vals) => vals.value === val
        ).label;
      },
      getBuyValue(val) {
        if (!val) {
          return
        }
        this.formData.BCompName = this.BCompNameOptions.find(
          (vals) => vals.value === val
        ).label;
      },
      //获取订单列表
      getOrdList() {
        request({
          url: "/ams/Ord/AssetList",
          method: 'get',
          params: {
            pagination: this.listQuery,
            queryJson: {
              Contid: this.$route.query.contId
            }
          }
        }).then(res => {
          const {
            code,
            info,
            data: ordListData
          } = res
          if (code == 200) {
            this.ordtableData = ordListData.rows.filter(res => res.contid == this.$route.query.contId)
            this.listQuery.records = ordListData.records;
            this.listQuery.page = ordListData.page;
            this.listQuery.total = ordListData.total;
            this.listLoading = false;
          } else {
            this.$message.error(info);
            this.listLoading = false;
          }
        })
      },
      //get,post请求
      getFormRequest(url, id) {
        return request({
          url,
          method: 'get',
          params: {
            ContId: id
          }
        })
      },
      saveFormRequest(url, formdata, id) {
        return request({
          url,
          method: 'post',
          data: {
            Data: JSON.stringify({
              entity: JSON.stringify(formdata),
              keyValue: id
            })
          }
        })
      },
      //get,post获取数据处理
      async dealPostFormData(url = '/ams/Cont/Save') {
        this.formData.Contid = this.formData.Contid ? this.formData.Contid : ""
        // 附件处理
        const foldID = this.formData.FolderId;
        if (foldID == "" || foldID == undefined || foldID == null) {
          const genGuid = this.GUID();
          this.formData.FolderId = genGuid;
        }
        const {
          code,
          info,
          data: resContData
        } = await this.saveFormRequest(url, this.formData, this.formData.Contid)
        if (code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
            duration: 1 * 1000,
            onClose: () => {
              this.loading = false;
              this.$router.push("/cont/list");
            }
          });
        } else {
          this.$message.error(info);
          this.loading = false;
        }
      },
      async dealGetFormData(id, url = '/ams/Cont/Form') {
        const {
          code,
          info,
          data: resContData
        } = await this.getFormRequest(url, id)
        if (code == 200) {
          this.$message({
            message: "加载成功",
            type: "success",
            duration: 1 * 1000,
            onClose: () => {
              this.loading = false;
              this.formData = resContData.ContDoc
            }
          });
        } else {
          this.$message.error(info);
          this.loading = false;
        }
      },
      //保存操作
      saveForm() {
        this.$refs["formData"].validate(valid => {
          if (valid) {
            this.dealPostFormData()
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      }
    },
  };

</script>
<style lang="scss" scoped>
  .ordList {
    margin: 20px 40px
  }

</style>
