<template>
  <div class="page-main blockchainDetail">
    <el-form v-if="businessInfo.content" label-width="130px" class="demo-ruleForm">
      <el-card shadow="never" class="head-bg-color">
        <div slot="header">
          <span>业务基本信息</span>
        </div>
        <template v-if="businessInfo.content.CommercialContract">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同编号：">
                <span>{{ businessInfo.content.CommercialContract.ContNo?businessInfo.content.CommercialContract.ContNo:businessInfo.content.CommercialContract.contno }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="买方：">
                <span>{{ businessInfo.content.CommercialContract.BCompName?businessInfo.content.CommercialContract.BCompName:businessInfo.content.CommercialContract.bcompname }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="卖方：">
                <span>{{ businessInfo.content.CommercialContract.SCompName?businessInfo.content.CommercialContract.SCompName:businessInfo.content.CommercialContract.scompname }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数量(吨)：">
                <span>{{ businessInfo.content.CommercialContract.Qty?businessInfo.content.CommercialContract.Qty:businessInfo.content.CommercialContract.qty }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总价(元)：">
                <span>{{ businessInfo.content.CommercialContract.Price?businessInfo.content.CommercialContract.Price:businessInfo.content.CommercialContract.price}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <div class="not-data" v-else>暂无数据</div>
      </el-card>
      <el-card shadow="never" class="head-bg-color mt10">
        <div slot="header">
          <span>历史上链记录</span>
        </div>
        <template v-if="historyList.length > 0">
          <el-card shadow="never" v-for="(item,index) in historyList" :key="item.TxId" :class="index==0 ? '' : 'mt10'">
            <el-tabs v-model="item.defaultData" type="card">
              <el-tab-pane label="合同信息" name="1">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同编号：">
                      {{ item.Contract.contno }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="买方：">
                      {{ item.Contract.bcompname }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="卖方：">
                      {{ item.Contract.scompname }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同单价(元)：">
                      {{ item.Contract.price }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="数量：">
                      {{ item.Contract.qty }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>

              <el-tab-pane label="订单信息" name="2">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单编号：">
                      {{ item.OrderInfo.ordno }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="买方：">
                      {{ item.OrderInfo.bcompname }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="卖方：">
                      {{ item.OrderInfo.scompname }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="交割点：">
                      {{ item.OrderInfo.deliaddr }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="数量：">
                      {{ item.OrderInfo.qty }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="订单费用" name="3">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收款方公司名称：">
                      {{ item.OrderCost.FCompName }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="总价(元)：">
                      {{ item.OrderCost.TotalPrice }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="交割信息" name="4">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单编号：">
                      {{ item.DeliveryInfo.ordno }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="订单数量：">
                      {{ item.DeliveryInfo.qty }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="煤种：">
                      {{ getNameById('COAL_TYPE',item.DeliveryInfo.origin) }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="逾期信息" name="5">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单编号：">
                      {{ item.OverdueInfo.ordno }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="放款信息" name="6">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单编号：">
                      {{ item.LoanInfo.ordno }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="回款信息" name="7">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单编号：">
                      {{ item.ReceivePayment.ordno }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="检验信息" name="8">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单编号：">
                      {{ item.QAInfo.ordno }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="检验公司名称：">
                      {{ item.QAInfo.chkcompname }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="煤种：">
                      {{ getNameById('COAL_TYPE',item.QAInfo.origin) }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="结算信息" name="9">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="订单编号：">
                      {{ item.SettlementInfo.ordno }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="交割数量：">
                      {{ item.SettlementInfo.confirmqty }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="交割点：">
                      {{ item.SettlementInfo.deliaddr }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </template>
        <div class="not-data" v-else>暂无数据</div>
      </el-card>
    </el-form>
    <div v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
  export default {
    name: 'blockchainDetail',
    data() {
      return {
        businessInfo: {
          content: {},
        }, //业务信息
        cochainToken: null, //区块链登录Token
        id: null, //业务id
        historyList: [], //历史上链记录数据
        checkedData: '1', //选中数据
      };
    },
    created() {
      this.cochainToken = this.$route.query.token;
      this.id = this.$route.query.id;
      this.getBusinessDetail();
    },
    methods: {
      //获取业务信息
      getBusinessDetail() {
        this.$axios({
          url: 'https://baas.bravowhale-uat.com/api/coalexchange/contractdetail',
          method: 'post',
          headers: {
            Authorization: this.cochainToken,
          },
          params: {
            id: this.id
          },
        }).then((res) => {
          let resp = res.data
          if (resp.data.content) {
            resp.data.content = JSON.parse(resp.data.content);
            if (resp.data.content.CommercialContract) {
              resp.data.content.CommercialContract = JSON.parse(
                resp.data.content.CommercialContract
              );
            }
            if (resp.data.content.History) {
              this.historyList = resp.data.content.History.map(
                (item) => {
                  if (item.Asset) {
                    return {
                      ...item,
                      ...item.Asset,
                      defaultData: '1',
                    };
                  }
                }
              ).reverse();
              this.historyList.forEach((item) => {
                if (item.Contract) {
                  item.Contract = JSON.parse(item.Contract);
                }
                if (item.OrderInfo) {
                  item.OrderInfo = JSON.parse(item.OrderInfo);
                }
                if (item.OrderCost) {
                  item.OrderCost = JSON.parse(item.OrderCost);
                }
                if (item.DeliveryInfo) {
                  item.DeliveryInfo = JSON.parse(
                    item.DeliveryInfo
                  );
                }
                if (item.OverdueInfo) {
                  item.OverdueInfo = JSON.parse(item.OverdueInfo);
                }
                if (item.LoanInfo) {
                  item.LoanInfo = JSON.parse(item.LoanInfo);
                }
                if (item.ReceivePayment) {
                  item.ReceivePayment = JSON.parse(
                    item.ReceivePayment
                  );
                }
                if (item.QAInfo) {
                  item.QAInfo = JSON.parse(item.QAInfo);
                }
                if (item.SettlementInfo) {
                  item.SettlementInfo = JSON.parse(
                    item.SettlementInfo
                  );
                }
              });
            }
          }
          this.businessInfo = resp.data;
          // console.log(this.businessInfo)
          // console.log(this.historyList)
        });
      },
    },
  };

</script>
<style lang="scss">
  .page-main {
    padding: 10px;

    .mt10 {
      margin-top: 10px;
    }

    .not-data {
      text-align: center;
    }

    .head-bg-color {
      .el-card__header {
        background-color: #f5f6f8;
        padding: 10px 12px;
      }
    }
  }

</style>
