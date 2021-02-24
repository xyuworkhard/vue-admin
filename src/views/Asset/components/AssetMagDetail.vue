<template>
  <div>
    <el-card class="contDetail">
      <div slot="header" class="clearfix">
        <span style="font-size:18px;color:#000;font-weight:bolder">资产详情</span>
      </div>
      <div id="tened" style="width:100%;">
        <div style="height:24px;font-weight:bold;color:#525354">融资合同号:{{cont_Id}}</div>
        <div style="height:46px;margin-bottom:17px">
          <el-table :data="tableData" style="width: 100%" border size="mini" :show-overflow-tooltip="true">
            <el-table-column prop="FinanceTitle" label="融资名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="BCompName" label="融资方" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Qty" label="融资数量" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="FMoney" label="融资金额" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="CMoney" label="结算金额" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="PayDay" label="账期(天)" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
        <el-steps :active="step" align-center>
          <el-step @click.native="changeTabs('contract',1)" :class="{'clickTabs':activeNamed=='contract'}" title="合同">
          </el-step>
          <el-step @click.native="changeTabs('order',2)" :class="{'clickTabs':activeNamed=='order'}" title="订单">
          </el-step>
          <el-step title="交割" @click.native="changeTabs('delivery',3)" :class="{'clickTabs':activeNamed=='delivery'}">
          </el-step>
          <el-step title="质检" @click.native="changeTabs('quality',4)" :class="{'clickTabs':activeNamed=='quality'}">
          </el-step>
          <el-step title="费用" @click.native="changeTabs('fee',5)" :class="{'clickTabs':activeNamed=='fee'}"></el-step>
          <el-step title="结算" @click.native="changeTabs('settlement',6)"
            :class="{'clickTabs':activeNamed=='settlement'}"></el-step>
          <el-step title="融资服务" @click.native="changeTabs('service',7)" :class="{'clickTabs':activeNamed=='service'}">
          </el-step>
        </el-steps>
        <el-tabs style="height:320px" v-model="activeNamed">
          <el-tab-pane label="合同" v-if="step>=1&&detail.BIZ_CONT!=undefined" name="contract">
            <el-row>
              <div class="description">
                <el-col :span="12" class="showVertical">
                  <p>合同号:<router-link :to="'/cont/edit?contId='+detail.BIZ_CONT.Contid"><span
                        style="text-decoration:underline;cursor:pointer;color:blue">{{detail.BIZ_CONT.ContNo}}</span>
                    </router-link>
                  </p>
                  <p>卖方:{{detail.BIZ_CONT.SCompName}}</p>
                  <p>买方:{{detail.BIZ_CONT.BCompName}}</p>
                  <p>数量（万吨）:{{getQty(detail.BIZ_CONT.Qty)}}</p>
                  <p>煤种：{{ detail.BIZ_CONT.CoalType}}</p>
                  <p>单价(元/吨):{{detail.BIZ_CONT.Price}}元</p>
                  <p v-if="detail.BIZ_CONT.Text!=null">
                    合同文件:
                    <span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="preview(detail.BIZ_CONT.FolderId,detail.BIZ_CONT.keyValue,detail.BIZ_CONT.Text)">{{detail.BIZ_CONT.Text}}</span>
                  </p>
                </el-col>
                <!-- <el-col :span="12" class="dividerVertical">
                  <p>区块更新时间:{{detail.BIZ_CONT.Block.time}}</p>
                  <p>区块更新组织名:{{detail.BIZ_CONT.Block.name}}</p>
                  <p>区块高度:{{detail.BIZ_CONT.Block.height}}</p>
                  <p>哈希值：{{detail.BIZ_CONT.Block.hash}}</p>
                </el-col> -->
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="订单" v-if="step>=2&&detail.ORD!=undefined" name="order">
            <div class="description">
              <!-- <el-collapse accordion v-model="order">
                <el-collapse-item
                  v-for="(item,index) in detail.ORD"
                  :title="'订单：'+item.OrdNo"
                  :name="(index+1)"
                  :key="index"
                  
            >-->
              <el-row>
                <el-col :span="12" class="showVertical">
                  <!-- <p>订单编号:{{item.num}}</p> -->
                  <!-- <p>订单编号:<span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="getOrdId(detail.ORD_DELI.OrdNo)">{{detail.ORD_DELI.OrdNo}}</span></p> -->
                  <p>订单编号:<router-link :to="'/ord/edit?ordId='+detail.ORD_DELI.Ordid"><span
                        style="text-decoration:underline;cursor:pointer;color:blue">{{detail.ORD_DELI.OrdNo}}</span>
                    </router-link>
                  </p>
                  <p>发货单位:{{detail.ORD.SCompName}}</p>
                  <p>货物数量(吨):{{detail.ORD.Qty}}</p>
                  <p>运输方式:{{ getNameById('TRANSFER_TYPE',detail.ORD.TransType) }}</p>
                  <p>交货方式:{{ getNameById('DELIVERY_TYPE',detail.ORD.DeliType) }}</p>
                  <p>收货单位:{{detail.ORD.BCompName}}</p>
                  <!-- <p>交割点:{{detail.ORD.DeliAddr}}</p> -->
                  <!-- <p>
                    <router-link :to="'/logistics/OrdLogisticsInfo?orderNo='+detail.ORD.Ordno+'&&show=true'"><span
                        style="text-decoration:underline;cursor:pointer;color:blue">物流信息</span></router-link>
                  </p> -->
                </el-col>
                <!-- <el-col :span="12" class="dividerVertical">
                  <p>区块更新时间:{{detail.ORD.Block.time}}</p>
                  <p>区块更新组织名:{{detail.ORD.Block.name}}</p>
                  <p>区块高度:{{detail.ORD.Block.height}}</p>
                  <p>哈希值：{{detail.ORD.Block.hash}}</p>
                </el-col> -->
              </el-row>
              <!-- </el-collapse-item>
            </el-collapse>-->
            </div>
          </el-tab-pane>
          <el-tab-pane label="交割" v-if="step>=3&&detail.ORD_DELI!=undefined" name="delivery">
            <div class="description">
              <!-- <el-collapse accordion v-model="deliveryq">
                <el-collapse-item
                  v-for="(item,index) in detail.ORD_DELI"
                  :title="'交割订单:'+item.OrdNo"
                  :name="(index+1)"
                  :key="index"
            >-->
              <el-row>
                <el-col :span="12" class="showVertical">
                  <!-- <p>关联订单号:<span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="getOrdId(detail.ORD_DELI.Ordno)">{{detail.ORD_DELI.Ordno}}</span></p> -->
                  <p>关联订单号:<router-link :to="'/ord/edit?ordId='+detail.ORD_DELI.Ordid"><span
                        style="text-decoration:underline;cursor:pointer;color:blue">{{detail.ORD_DELI.OrdNo}}</span>
                    </router-link>
                  </p>
                  <p>交割数量(吨):{{detail.ORD_DELI.ComfirmQty}}</p>
                  <!-- <p>交割点:{{detail.ORD_DELI.DeliAddr}}</p> -->
                  <p>交割时间:{{detail.ORD_DELI.DeliDate}}</p>
                  <p v-if="detail.ORD_DELI.Bill!=undefined">
                    交割文件：
                    <span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="preview(detail.ORD_DELI.DeliFolderId,detail.ORD_DELI.DkeyValue,detail.ORD_DELI.DText)">{{detail.ORD_DELI.DText}}</span>
                  </p>

                  <!-- <p>货转证明:<a :href="item.bill.transfer">点击查看</a></p>
                      <p>水尺计量表:<a :href="item.bill.graft">点击查看</a></p>
                <p>水运清单:<a :href="item.bill.ship">点击查看</a></p>-->
                </el-col>
                <!-- <el-col :span="12" class="dividerVertical">
                  <p>区块更新时间:{{detail.ORD_DELI.Block.time}}</p>
                  <p>区块更新组织名:{{detail.ORD_DELI.Block.name}}</p>
                  <p>区块高度:{{detail.ORD_DELI.Block.height}}</p>
                  <p>哈希值：{{detail.ORD_DELI.Block.hash}}</p>
                </el-col> -->
              </el-row>
              <!-- </el-collapse-item>
            </el-collapse>-->
            </div>
          </el-tab-pane>
          <el-tab-pane label="质量检测" v-if="step>=4&&detail.CHK!=undefined" name="quality">
            <div class="description">
              <!-- <el-collapse accordion v-model="quality">
                <el-collapse-item
                  v-for="(item,index) in detail.CHK"
                  :title="'检验单：'+item.OrdNo"
                  :name="(index+1)"
                  :key="index"
            >-->
              <el-row>
                <el-col :span="12" class="showVertical">
                  <!-- <p>检验单号:<span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="getOrdId(detail.CHK.OrdNo,4)">{{detail.CHK.ChkRptNo}}</span></p> -->
                  <!-- <p>关联订单号:<span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="getOrdId(detail.CHK.OrdNo)">{{detail.CHK.OrdNo}}</span></p> -->
                  <p>检验单号:<router-link :to="'/ord/edit?ordId='+detail.ORD_DELI.Ordid"><span
                        style="text-decoration:underline;cursor:pointer;color:blue">{{detail.ORD_DELI.ChkRptNo}}</span>
                    </router-link>
                  </p>
                  <p>关联订单号:<router-link :to="'/ord/edit?ordId='+detail.ORD_DELI.Ordid"><span
                        style="text-decoration:underline;cursor:pointer;color:blue">{{detail.ORD_DELI.OrdNo}}</span>
                    </router-link>
                  </p>
                  <p>煤种:{{ detail.CHK.CoalType}}</p>
                  <div v-for="(items,index) in JSON.parse(detail.CHK.ChkItemInfo)">
                    <!-- v-if="items.CHKITEM|getComboText('CHECK_ITEM')}} == '高位发热量'||items.CHKITEM|getComboText('CHECK_ITEM')}} == '低位发热量'||items.CHKITEM|getComboText('CHECK_ITEM')}} == '灰分'||items.CHKITEM|getComboText('CHECK_ITEM')}} == '全水分'||items.CHKITEM|getComboText('CHECK_ITEM')}} == '硫量'||items.CHKITEM|getComboText('CHECK_ITEM')}} == '挥发分'" -->
                    <!-- v-if="items.CHKITEM==11||items.CHKITEM==6||items.CHKITEM==2||items.CHKITEM==0||items.CHKITEM==1||items.CHKITEM==3" -->
                    <p
                      v-if="items.CHKITEM==11||items.CHKITEM==6||items.CHKITEM==2||items.CHKITEM==0||items.CHKITEM==1||items.CHKITEM==3">
                      {{ getNameById('CHECK_ITEM',items.CHKITEM) }}:{{items.VAL}}
                      {{getNameById('CHECK_ITEM_UNIT',items.CHKITEM)}}
                    </p>
                  </div>
                  <p v-if="detail.CHK.Text!=null">
                    检验报告:
                    <span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="preview(detail.CHK.ChkFolderId,detail.CHK.CkeyValue,detail.CHK.CText)">{{detail.CHK.CText}}</span>
                  </p>
                  <!-- <p>低位发热量:{{item.kcal}}(Kcal/Kg)</p>
                      <p>硫份:{{item.sulfur}}</p>
                      <p>挥发份:{{item.volatile}}</p>
                <p>水份:{{item.water}}</p>-->
                  <!-- <p>检验报告:<a :href="item.report">点击查看</a></p> -->
                </el-col>
                <!-- <el-col :span="12" class="dividerVertical">
                  <p>区块更新时间:{{detail.CHK.Block.time}}</p>
                  <p>区块更新组织名:{{detail.CHK.Block.name}}</p>
                  <p>区块高度:{{detail.CHK.Block.height}}</p>
                  <p>哈希值：{{detail.CHK.Block.hash}}</p>
                </el-col> -->
              </el-row>
              <!-- </el-collapse-item>
            </el-collapse>-->
            </div>
          </el-tab-pane>
          <el-tab-pane label="订单费用" v-if="step>=5&&detail.FEE!=undefined" name="fee">
            <div class="description">
              <!-- <el-collapse accordion v-model="feeq">
                <el-collapse-item
                  v-for="(item,index) in detail.ORD_FEE"
                  :title="'合同号：'+item.OrdNo"
                  :name="(index+1)"
                  :key="index"
            >-->
              <!-- <p>订单编号:{{item.num}}</p> -->
              <el-row>
                <el-col :span="12" class="showVertical">
                  <!-- <p><span
                        style="text-decoration:underline;cursor:pointer;color:blue" @click="getOrdId(detail.FEE.OrdNo,5)">费用详情</span></p> -->
                  <!-- <p>订单号:<span style="text-decoration:underline;cursor:pointer;color:blue"
                      @click="getOrdId(detail.FEE.OrdNo)">{{detail.FEE.OrdNo}}</span></p> -->
                  <p>订单编号:<router-link :to="'/ord/edit?ordId='+detail.ORD_DELI.Ordid"><span
                        style="text-decoration:underline;cursor:pointer;color:blue">{{detail.ORD_DELI.OrdNo}}</span>
                    </router-link>
                  </p>
                  <p>订单数量(吨):{{detail.FEE.Qty}}</p>
                  <p>单价(元/吨):{{detail.FEE.Price}}</p>
                  <p>单价加扣(元/吨):{{detail.FEE.DisPrice}}</p>
                  <p>实际单价(元/吨):{{detail.FEE.ActPrice}}</p>
                  <p>订单总价(元):{{detail.FEE.TotalPrice}}</p>
                </el-col>
                <!-- <el-col :span="12" class="dividerVertical">
                  <p>区块更新时间:{{detail.FEE.Block.time}}</p>
                  <p>区块更新组织名:{{detail.FEE.Block.name}}</p>
                  <p>区块高度:{{detail.FEE.Block.height}}</p>
                  <p>哈希值：{{detail.FEE.Block.hash}}</p>
                </el-col> -->
              </el-row>
              <!-- </el-collapse-item>
            </el-collapse>-->
            </div>
          </el-tab-pane>
          <el-tab-pane label="结算" v-if="step>=6&&detail.CRG!=undefined" name="settlement">
            <div class="description" v-if="detail.CRG.CrgNo!=''">
              <!-- <el-collapse accordion v-model="settlement"> -->
              <!-- <el-collapse-item
                  v-for="(item,index) in cont_Doc.orderList"
                  :title="'结算单：'"
                  :name="(index+1)"
            >-->
              <el-row>
                <el-col :span="12" class="showVertical">
                  <p>结算单号:{{detail.CRG.CrgNo}}</p>
                  <!-- <p>关联订单号:{{calculation.count}}</p> -->
                  <!-- <p>结算数量(吨):{{detail.calculation.count}}</p> -->
                  <p>结算金额(元):{{detail.CRG.TotalPrice}}</p>
                  <p>一票含税煤炭总价(元):{{detail.CRG.CoalPrice}}</p>
                </el-col>
                <!-- <el-col :span="12" class="dividerVertical">
                  <p>区块更新时间:{{detail.CRG.Block.time}}</p>
                  <p>区块更新组织名:{{detail.CRG.Block.name}}</p>
                  <p>区块高度:{{detail.CRG.Block.height}}</p>
                  <p>哈希值：{{detail.CRG.Block.hash}}</p>
                </el-col> -->
              </el-row>

              <!-- </el-collapse-item>
            </el-collapse>-->
            </div>
          </el-tab-pane>
          <el-tab-pane label="融资服务" v-if="step>=7&&detail.FIN!=undefined" name="service">
            <div class="description">
              <el-row>
                <el-col :span="12" class="showVertical">
                  <p>融资服务合同:{{detail.FIN.FinanceNo}}</p>
                  <!-- <p>关联订单号:{{calculation.count}}</p> -->
                  <p>资产池:{{detail.FIN.AssetPoolName}}</p>
                  <p>账期(天):{{detail.FIN.PayDay}}</p>
                  <p>融资金额(元):{{detail.FIN.FMoney}}</p>
                  <p>到期日:{{detail.FIN.EndDate}}</p>
                </el-col>
                <!-- <el-col :span="12" class="dividerVertical">
                  <p>区块更新时间:{{detail.FIN.Block.time}}</p>
                  <p>区块更新组织名:{{detail.FIN.Block.name}}</p>
                  <p>区块高度:{{detail.FIN.Block.height}}</p>
                  <p>哈希值：{{detail.FIN.Block.hash}}</p>
                </el-col> -->
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <div v-if="previewshow">
      <div class="uploader" @click="close"></div>
      <div>
        <div>
          <div class="preview">
            <div class="uptitle">
              <el-row type="flex" class="row-bg" justify="space-between" bg-purple>
                <el-col :span="6">{{previewTitle}}</el-col>
                <el-col :span="6">
                  <div class="grid-content" style="text-align: right;cursor: pointer;" @click="close()">
                    <i class="el-icon-close"></i>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div id="text" style="height:calc(100% - 45px);position:relative">
              <img v-if="previewtype == 'image'" :src="previewFlie" />
              <iframe v-else :src="previewFlie" width="100%" id="myiframe" scrolling="auto" frameborder="0"
                :height="iframeheight">

                <head>
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                </head>
              </iframe>

              <!-- <a v-else id="media" :href="previewFlie"></a>   -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="查看检验报告" :visible.sync="ChkListForm" label-position="center" label-width="1000px"
      label-height="800px" width="90%" class="ordChk">
      <OrdChk :is-edit="false" :is-chkpart="false" :is-chkfin="false" :id-ord="OrderId" :is-cando="chkCando"></OrdChk>
    </el-dialog> -->
    <!-- <el-dialog title="订单费用" :visible.sync="FeeForm" label-position="center" label-width="600px" label-height="500px"
      class="ordFee">
      <OrdFee :is-edit="false" :is-bpart="true"  :is-feeexit="goodFeeExitFlag"></OrdFee>
    </el-dialog> -->
  </div>
</template>
<script>
  import axios from "axios";
  import request from "@/utils/request";
  // import OrdChk from "@/views/ord/components/OrdChk";
  // import OrdFee from "@/views/ord/components/OrdFee";
  var preD = function (e) {
    e.preventDefault();
  };
  export default {
    name: "AssetMagDetail",
    props: {
      cont_Id: {
        type: String
      },
      tableData: {
        type: Array
      },
      step: {
        type: Number
      }
    },
    components: {
      // OrdChk,
      // OrdFee
    },
    data() {
      return {
        activeNamed: "contract",
        order: 1,
        deliveryq: 1,
        quality: 1,
        feeq: 1,
        settlement: 1,
        detail: {},
        previewshow: false,
        previewFlie: '',
        previewtype: '',
        iframeheight: '',
        previewTitle: '',
        ChkListForm: false,
        chkCando: false,
        FeeForm: false,
        OrderId: ''
      };
    },
    methods: {
      changeTabs(item, index) {
        if (index <= this.step) {
          //判断点击的是否是在可点击步骤以内
          this.activeNamed = item;
        }
      },
      getdeTailed(val) {
        this.detail = val;
      },
      preview(FolderId, keyValue, name) {
        // this.previewtype = name.split('.')[1]
        this.previewTitle = name
        axios
          .get(this.apiroute + "//csce/learun/adms/annexes/preview?data=" + keyValue)
          .then(res => {
            this.previewshow = true;
            this.previewFlie = res.config.url;
            this.iframeheight =
              document.documentElement.clientHeight * 0.8 - 45 + "px";
            var keyArr = Object.keys(res.headers)
            var keyindex = keyArr.indexOf('content-type');
            this.previewtype = res.headers[keyArr[keyindex]].split("/")[0]
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      close() {
        this.previewshow = false
      },
      getOrdId(item, num) {
        request({
          url: "/ORD/ORD_DOC/Form",
          methods: 'get',
          params: {
            data: item
          }
        }).then(res => {
          this.OrderId = res.data.ORD_DOC.OrdId
          if (num == 4) {
            this.ChkListForm = true
          } else if (num == 5) {
            this.FeeForm = true
          } else {
            this.$router.push({
              path: '/ord/edit/' + res.data.ORD_DOC.OrdId,
            })
          }

        })
      },
      getQty(val) {
        return parseFloat((val / 10000).toFixed(4))
      }
    },
    created() {

    },
    watch: {
      previewshow() {
        if (this.previewshow == false) {
          document.body.style.overflow = ""; // 出现滚动条
          document.removeEventListener("touchmove", preD, {
            passive: false
          });
        } else {
          document.body.style.overflow = "hidden";
          document.addEventListener("touchmove", preD, {
            passive: false
          }); // 禁止页面滑动
        }
      }
    }
  };

</script>
<style lang="scss">
  .AssetMagCenter {
    text-align: center;
  }

  .AssetMagCenter {
    min-height: 625px;
  }

  .AssetMagCenter .el-card__header {
    padding: 10px 20px;
    border: 0px;
  }

  .AssetMagCenter .el-table th>.cell {
    white-space: nowrap;
    padding-left: 5px;
    padding-right: 5px;
  }

  .AssetMagCenter .el-table__empty-block {
    min-height: 23px;
  }

  .AssetMagCenter .el-table__empty-text {
    line-height: 23px;
  }

  .AssetMagCenter .el-table--border th {
    background-color: #f7f7f7;
  }

  .AssetMagCenter .el-table--mini th,
  .el-table--mini td {
    padding: 0;
  }

  .contDetail .el-card__body {
    padding-top: 0px;
  }

  .AssetMagCenter .el-step__title.is-finish {
    color: #2c3e50;
  }

  .AssetMagCenter .el-step__title.is-process {
    color: #c0c4cc;
  }

  .AssetMagCenter .el-step__head.is-process {
    color: #c0c4cc;
    border-color: #c0c4cc;
  }

  .AssetMagCenter .el-step__head.is-finish {
    color: #033a71;
    border-color: #033a71;
  }

  .description {
    text-align: left;
    padding: 0px 10px;
    border-radius: 5px;
    max-height: 320px;
    overflow-y: auto;
  }

  .description p {
    margin: 0;
    font-size: 12px;
    line-height: 1.769230769230769;
    width: 100%;
    word-break: break-all;
  }

  .description a {
    color: #2c3e50;
  }

  .description a:hover {
    text-decoration: underline;
  }

  .description .el-tabs--border-card>.el-tabs__content {
    padding: 15px 0px;
  }

  .AssetMagCenter .el-collapse-item__header {
    height: 36px;
    line-height: 36px;
  }

  .AssetMagCenter .el-collapse-item__content {
    padding-bottom: 15px;
  }

  .AssetMagCenter .el-step__icon {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .AssetMagCenter .el-step__title {
    font-size: 14px;
    line-height: 28px;
    cursor: pointer;
  }

  .clickTabs .el-step__head.is-finish,
  .clickTabs .el-step__title.is-finish {
    color: #1890ff;
  }

  .clickTabs .el-step__icon.is-text {
    border-color: initial;
  }

  .AssetMagCenter .el-tabs__nav-wrap {
    display: none;
  }

  .dividerVertical {
    padding-left: 20px;
    border-left: 1px solid #efefef;
  }

  .showVertical {
    padding-left: 20px;
  }

  .uploader {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.45);
  }

  .uploadertext,
  .preview {
    position: fixed;
    left: 50%;
    top: 46%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  .preview {
    width: 1000px;
    height: 80vh;
    background-color: white;
    border: 1px solid #e0dede;
    border-radius: 5px;
    /* overflow-y: scroll; */
    /* overflow: overlay; */
    z-index: 11;
  }

  .preview img {
    display: block;
    max-width: 100%;
    max-height: calc(100% - 45px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  #myiframe {
    overflow: hidden;
  }

  /*修改滚动条样式*/
  .preview::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  .preview::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
  }

  .preview::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }

</style>
