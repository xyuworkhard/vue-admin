<template>
  <div class="page-main">
    <el-tabs type="border-card" tab-position="left" @tab-click="switchType">
      <el-tab-pane :label="item.name" v-for="item in menuList" :key="item.id">
        <div class="list-content">
          <el-form ref="form" :model="form" size="small">
            <el-card>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="业务编号:" label-width="90px" prop="DocNo">
                    <el-input placeholder="请输入" v-model="form.DocNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="节点名称:" label-width="90px" prop="PeerName">
                    <csceSelect ref="typeSelect" v-model="form.PeerName" :action="0"
                      :showcontent="{ data: 'ChainPeer' }"></csceSelect>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="区块链供应商:" label-width="120px" prop="Vendor">
                    <csceSelect ref="typeSelect1" v-model="form.Vendor" :action="0"
                      :showcontent="{ data: 'ChainVendor' }"></csceSelect>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="60px">
                    <el-button type="primary" size="mini" @click="searchList">查询</el-button>
                    <el-button size="mini" @click="reset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
          <el-card style="margin-top:10px" v-loading="notLoading">
            <el-tabs v-model="activeNames" type="card" @tab-click="switchCochain()">
              <el-tab-pane label="待上链" name="first">
                <div style="margin-bottom: 10px">
                  <el-button plain @click="batchCochain">批量上链</el-button>
                </div>
                <el-table v-if="contList.length > 0" :data="contList" @selection-change="selectList" border fit
                  highlight-current-row style="width: 100%" max-height="610">
                  <el-table-column type="selection" width="39">
                  </el-table-column>
                  <el-table-column align="center" label="合同编号" min-width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.ContNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="合同单价(元)" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.Price }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="合同签订日期" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.ContDate | dateFormat('yyyy-MM-dd') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="合同状态" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ getNameById('CONTRACT_STATUS',scope.row.ContStat) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="煤种" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ getNameById("COAL_TYPE", scope.row.CoalType) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="saveCochain(scope.row.ContId)">上链</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table v-else-if="ordList.length > 0" :data="ordList" @selection-change="selectList" border fit
                  highlight-current-row style="width: 100%" max-height="610">
                  <el-table-column type="selection" width="39"></el-table-column>
                  <el-table-column align="center" label="订单编号" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.OrdNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="订单状态" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ getNameById('ORDER_STATUS',scope.row.OrdStat) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="订单数量" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.Qty }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="煤种" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ getNameById('COAL_TYPE', scope.row.CoalType) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="saveCochain(scope.row.OrdId)">上链</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table v-else-if="orderFeeList.length > 0" :data="orderFeeList" @selection-change="selectList" border
                  fit highlight-current-row style="width: 100%" max-height="610">
                  <el-table-column type="selection" width="39"></el-table-column>
                  <el-table-column align="center" label="收款方公司名称" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.FCompName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="总价(元)" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.TotalPrice }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="saveCochain(scope.row.OrdFId)">上链</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table v-else-if="chkRptList.length > 0" :data="chkRptList" @selection-change="selectList" border fit
                  highlight-current-row style="width: 100%" max-height="610">
                  <el-table-column type="selection" width="39"></el-table-column>
                  <el-table-column align="center" label="检验单编号" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.ChkRptNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="检验公司名称" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.ChkCompName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="煤种" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ getNameById('COAL_TYPE', scope.row.Coal) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="saveCochain(scope.row.ChkRptId)">上链</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table v-else-if="crgList.length > 0" :data="crgList" @selection-change="selectList" border fit
                  highlight-current-row style="width: 100%" max-height="610">
                  <el-table-column type="selection" width="39"></el-table-column>
                  <el-table-column align="center" label="结算单编号" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.CrgNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="结算方公司名称" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.CCompName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="总价(元)" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.TotalPrice }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="结算单状态" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ getNameById('CHARGE_STATUS', scope.row.CrgStat) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="saveCochain(scope.row.CrgId)">上链</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table v-else-if="financList.length > 0" :data="financList" @selection-change="selectList" border fit
                  highlight-current-row style="width: 100%" max-height="610">
                  <el-table-column type="selection" width="39"></el-table-column>
                  <el-table-column align="center" label="融资合同编号" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.FinanceNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="融资卖方" min-width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.SCompName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="融资买方" min-width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.BCompName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="数量" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.Qty }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="结算金额(元)" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.CMoney }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="融资金额(元)" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.FMoney }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="saveCochain(scope.row.FinanceId)">上链</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-else class="not-data">暂无数据</div>
                <Pagination v-show="notListQuery.records>0" :total="notListQuery.records" :page.sync="notListQuery.page"
                  :limit.sync="notListQuery.rows" @pagination="getNotCochain(api,selectedMenu)" />
              </el-tab-pane>
              <el-tab-pane label="已上链" name="second">
                <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%"
                  max-height="610">
                  <el-table-column align="center" label="区块高度" min-width="100" prop="blockHeight" sortable>
                    <!-- <template slot-scope="scope">
                                            <span>{{ scope.row.blockHeight }}</span>
                                        </template> -->
                  </el-table-column>
                  <el-table-column align="center" label="业务hash值" min-width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <a href="javascript:;" @click="getBusinessDetail(scope.row.txHash)">{{ scope.row.txHash }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="上链业务类型" width="200">
                    <template slot-scope="scope">
                      <span>{{ getNameById('cochaiType',scope.row.Step) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="业务编号" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.DocNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="上链时间" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.ChainDate }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="节点名称" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.PeerName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="区块链供应商" min-width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.Vendor }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="goDetail(scope.row.KeyId)">业务详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <Pagination v-show="listQuery.records>0" :total="listQuery.records" :page.sync="listQuery.page"
                  :limit.sync="listQuery.rows" @pagination="getChainFinishedList" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="区块链供应商" :visible.sync="dialogVendorData.status" v-if="dialogVendorData.status" width="500px"
      :destroy-on-close="true" center>
      <el-form :model="dialogVendorData.form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="供应商名称:">
          <csceCheckbox v-model="dialogVendorData.form.Vendor" :dictkey="frameData" :action="0"
            :chktype="frameData.chktype" :dicType="frameData.dictype" :defoption="['bravowhale']"></csceCheckbox>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button type="primary" size="mini" @click="saveVendor">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="业务信息" :visible.sync="dialogBusinessData.status" v-if="dialogBusinessData.status" width="700px"
      :destroy-on-close="true" center>
      <el-form v-if="dialogBusinessData.info" v-loading="dialogBusinessData.loading" label-width="100px"
        class="demo-ruleForm">
        <div>
          <el-card shadow="never" class="dialog-content">
            <el-form-item label="区块高度：">
              <span>{{ dialogBusinessData.info.blockHeight }}</span>
            </el-form-item>
            <el-form-item label="Hash值：">
              <span>{{ dialogBusinessData.info.blockHash }}</span>
            </el-form-item>
            <el-form-item label="交易发起方：">
              <span>{{ dialogBusinessData.info.transSender }}</span>
            </el-form-item>
            <el-form-item label="交易总数：">
              <span>{{ dialogBusinessData.info.txCount }}</span>
            </el-form-item>
            <el-form-item label="合同编号：">
              <span>{{ dialogBusinessData.info.key }}</span>
            </el-form-item>
          </el-card>
        </div>
      </el-form>
      <div v-else class="not-data">暂无数据</div>
    </el-dialog>
  </div>
</template>
<script>
  //   import axios from '@/utils/requestBLOCK';
  import {
    getUserInfo,
    getToken,
    getMark
  } from '@/utils/auth'
  import Pagination from '@/components/Pagination';
  import csceSelect from '@/components/_New_comPonents/l_select';
  import csceCheckbox from '@/components/_New_comPonents/l_checkbox';
  export default {
    name: 'blockchainList',
    components: {
      Pagination,
      csceSelect,
      csceCheckbox
    },
    data() {
      return {
        tableData: [], //已上链表格数据
        //复选框数据
        frameData: {
          chktype: 'multi',
          dictype: 'ChainVendor',
        },
        api: '/blockchain/ContList', //默认查询api
        postApi: '/blockchain/ContUp', //默认上链api
        selectedMenu: '合同类型', //默认左侧选中菜单
        form: {
          DocNo: '', //业务编号
          BizType: 'BIZ_CONT', //上链业务类型
          PeerName: '', //节点名称
          Vendor: '', //区块链供应商
        },
        currentId: null, //当前id
        listLoading: false, //已上链loading等待
        notLoading: false, //未上链loading等待
        activeNames: 'first', //已上链/待上链tab默认选中值
        selsectedList: [], //批量上链中已勾选的数据
        contList: [], //合同未上链数据
        ordList: [], //订单未上链数据
        orderFeeList: [], //订单交割未上链数据
        chkRptList: [], //检验未上链数据
        crgList: [], //订单结算未上链数据
        financList: [], //融资合同未上链数据
        listQuery: {
          rows: 10, // 每页行数
          page: 1, // 当前页
          sidx: '', // 排序列
          sord: '', // 排序类型
          records: 0, // 总记录数
          total: 0, // 总页数
        },
        notListQuery: {
          rows: 10, // 每页行数
          page: 1, // 当前页
          sidx: '', // 排序列
          sord: '', // 排序类型
          records: 0, // 总记录数
          total: 0, // 总页数
        },
        userId: null,
        compId: null,
        //区块链供应商弹窗
        dialogVendorData: {
          status: false, //弹窗状态
          form: {
            Vendor: null, //区块链供应商名称
          },
        },
        //业务信息弹窗
        dialogBusinessData: {
          loading: false, //loading等待
          status: false, //弹窗状态
          cochainToken: null, //登录区块链token
          info: null,
        },
        //左侧菜单数据
        menuList: [{
            id: 'menu-1',
            name: '合同类型',
          },
          {
            id: 'menu-2',
            name: '订单类型',
          },
          {
            id: 'menu-3',
            name: '订单交割类型',
          },
          {
            id: 'menu-4',
            name: '订单费用类型',
          },
          {
            id: 'menu-5',
            name: '检验类型',
          },
          {
            id: 'menu-6',
            name: '结算单类型',
          },
          {
            id: 'menu-7',
            name: '融资合同类型',
          },
        ],
      };
    },
    created() {
      this.getToken();
      this.getChainFinishedList();
      this.getNotCochain(this.api, '合同类型');
      this.userId = JSON.parse(getUserInfo()).UserId;
      this.compId = JSON.parse(getUserInfo()).CompId;
    },
    methods: {
      //获取已上链数据
      getChainFinishedList() {
        this.listLoading = true;
        let userId = null;
        let compId = null;
        if (JSON.parse(getUserInfo()).UserType != '9') {
          compId = this.compId;
          compId = this.userId;
        } else {
          userId = '';
          compId = '';
        }
        this.$axios({
          url: '/blockchain/ChainFinishedList',
          method: 'get',
          params: {
            pagination: {
              ...this.listQuery,
            },
            queryJson: {
              CompId: compId,
              F_CreateUserId: userId,
              DocNo: this.form.DocNo,
              PeerName: this.form.PeerName,
              Vendor: this.form.Vendor,
              BizType: this.form.BizType,
            },
            token: getToken(),
            loginMark: getMark()
          },
        }).then((res) => {
          let resp = res.data;
          this.tableData = resp.data.rows.sort((a, b) => {
            return Number(b.blockHeight) > Number(a.blockHeight) ? 1 : -1;
          });
          this.listQuery.page = resp.data.page;
          this.listQuery.records = resp.data.records;
          this.listQuery.total = resp.data.total;
          this.listLoading = false;
        });
      },
      //获取未上链数据
      getNotCochain(url, obj) {
        this.notLoading = true;
        let userId = null;
        let compId = null;
        if (JSON.parse(getUserInfo()).UserType != '9') {
          compId = this.compId;
          userId = this.userId;
        } else {
          userId = '';
          compId = '';
        }
        this.$axios({
          url: url,
          method: 'get',
          params: {
            pagination: {
              ...this.notListQuery,
            },
            queryJson: {
              CompId: compId,
              F_CreateUserId: userId,
              DocNo: this.form.DocNo,
            },
            token: getToken(),
            loginMark: getMark()
          },
        }).then((res) => {
          let resp = res.data
          this.contList = obj == '合同类型' ? resp.data.rows : [];
          this.ordList =
            obj == '订单类型' || obj == '订单交割类型' ?
            resp.data.rows : [];
          this.orderFeeList = obj == '订单费用类型' ? resp.data.rows : [];
          this.chkRptList = obj == '检验类型' ? resp.data.rows : [];
          this.crgList = obj == '结算单类型' ? resp.data.rows : [];
          this.financList = obj == '融资合同类型' ? resp.data.rows : [];
          this.notListQuery.page = resp.data.page;
          this.notListQuery.records = resp.data.records;
          this.notListQuery.total = resp.data.total;
          this.notLoading = false;
        });
      },
      //上链
      saveCochain(id) {
        this.dialogVendorData.status = true;
        this.currentId = id;
      },
      //获取区块链登录Token
      getToken() {
        this.$axios({
          url: '/blockchain/GetToken',
          method: 'get',
          params: {
            token: getToken(),
            loginMark: getMark()
          },
        }).then((res) => {
          this.dialogBusinessData.cochainToken = res.data.info;
        });
      },
      //跳转到业务详情界面
      goDetail(val) {
        this.$router.push({
          path: '/Blockchain/detail',
          query: {
            id: val,
            token: this.dialogBusinessData.cochainToken,
          },
        });
      },
      //获取业务详情
      getBusinessDetail(val) {
        this.dialogBusinessData.status = true; //弹窗状态
        this.dialogBusinessData.loading = true; //弹窗loading状态
        this.$axios({
          url: 'https://baas.bravowhale-uat.com/api/coalexchange/transactiondetail',
          method: 'post',
          headers: {
            Authorization: this.dialogBusinessData.cochainToken,
          },
          params: {
            blockHash: val,
            token: getToken(),
            loginMark: getMark()
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
          }
          this.dialogBusinessData.info = resp.data;
          this.$nextTick(() => {
            this.dialogBusinessData.loading = false;
          });
        });
      },
      //查询
      searchList() {
        this.getChainFinishedList();
        this.getNotCochain(this.api, this.selectedMenu);
        this.activeNames = 'second';
      },
      //重置
      reset() {
        this.form.DocNo = '';
        let arr = this.$refs;
        for (var i in arr) {
          if (i.search('typeSelect') != -1) {
            this.$refs[i][0].chooseItem = null;
          }
        }
      },
      //批量上链
      batchCochain() {
        if (this.selsectedList.length == 0) {
          this.$message.error('请先勾选您要上链的数据');
          return;
        }
        this.dialogVendorData.form.Vendor = null;
        this.dialogVendorData.status = true;
      },
      //勾选
      selectList(val) {
        this.selsectedList = val;
      },
      //切换已上链/待上链
      switchCochain() {
        this.notLoading = true;
        setTimeout(() => {
          this.notLoading = false;
        }, 600);
      },
      //切换左侧菜单
      switchType(tab, event) {
        this.notListQuery = {
          rows: 10, // 每页行数
          page: 1, // 当前页
          sidx: '', // 排序列
          sord: '', // 排序类型
          records: 0, // 总记录数
          total: 0, // 总页数
        };
        if (event.target.textContent == '合同类型') {
          this.form.BizType = 'BIZ_CONT';
          this.api = '/blockchain/ContList';
          this.postApi = '/blockchain/ContUp';
        }
        if (event.target.textContent == '订单类型') {
          this.form.BizType = 'ORD';
          this.api = '/blockchain/OrdList';
          this.postApi = '/blockchain/OrdUp';
        }
        if (event.target.textContent == '订单交割类型') {
          this.form.BizType = 'ORD_DELI';
          this.api = '/blockchain/OrdDeliList';
          this.postApi = '/blockchain/OrdDeliUp';
        }
        if (event.target.textContent == '检验类型') {
          this.form.BizType = 'CHK';
          this.api = '/blockchain/ChkRptList';
          this.postApi = '/blockchain/ChkUp';
        }
        if (event.target.textContent == '订单费用类型') {
          this.form.BizType = 'FEE';
          this.api = '/blockchain/ordFeeList';
          this.postApi = '/blockchain/OrdFeeUp';
        }
        if (event.target.textContent == '结算单类型') {
          this.form.BizType = 'CRG';
          this.api = '/blockchain/CrgList';
          this.postApi = '/blockchain/CrgUp';
        }
        if (event.target.textContent == '融资合同类型') {
          this.form.BizType = 'FIN';
          this.api = '/blockchain/FinList';
          this.postApi = '/blockchain/FinUp';
        }
        this.selectedMenu = event.target.textContent;
        this.getChainFinishedList();
        this.getNotCochain(this.api, event.target.textContent);
      },
      //保存区块链供应商
      saveVendor() {
        if (!this.dialogVendorData.form.Vendor) {
          this.$message.error('请选择区块链供应商');
          return;
        }
        let requestCount =
          this.selsectedList.length > 0 ? this.selsectedList.length : 1;
        for (let i = 0; i < requestCount; i++) {
          let obj = null;
          if (this.postApi == '/blockchain/ContUp') {
            obj = {
              contid: this.selsectedList.length > 0 ?
                this.selsectedList[i].ContId : this.currentId,
            };
          }
          if (
            this.postApi == '/blockchain/OrdUp' ||
            this.postApi == '/blockchain/OrdDeliUp'
          ) {
            obj = {
              ordid: this.selsectedList.length > 0 ?
                this.selsectedList[i].OrdId : this.currentId,
            };
          }
          if (this.postApi == '/blockchain/ChkUp') {
            obj = {
              chkrptid: this.selsectedList.length > 0 ?
                this.selsectedList[i].ChkRptId : this.currentId,
            };
          }
          if (this.postApi == '/blockchain/OrdFeeUp') {
            obj = {
              ordfid: this.selsectedList.length > 0 ?
                this.selsectedList[i].OrdFId : this.currentId,
            };
          }
          if (this.postApi == '/blockchain/CrgUp') {
            obj = {
              crgid: this.selsectedList.length > 0 ?
                this.selsectedList[i].CrgId : this.currentId,
            };
          }
          if (this.postApi == '/blockchain/FinUp') {
            obj = {
              financeid: this.selsectedList.length > 0 ?
                this.selsectedList[i].FinanceId : this.currentId,
            };
          }
          this.$axios({
            url: this.postApi,
            method: 'post',
            data: {
              token: getToken(),
              loginMark: getMark(),
              Data: JSON.stringify({
                ...obj,
                vendor: this.dialogVendorData.form.Vendor.length == 1 ?
                  this.dialogVendorData.form.Vendor.join('') : this.dialogVendorData.form.Vendor.join(
                    ','
                  ),
                keyValue: '',
              }),
            },
          }).then((res) => {
            let resp = res.data
            if (resp.code == 200) {
              this.$message.success('上链成功');
              this.getChainFinishedList();
              this.getNotCochain(this.api, this.selectedMenu);
            }
          });
        }
        this.$nextTick(() => {
          this.dialogVendorData.status = false;
        });
      },
    },
  };

</script>
<style lang="scss">
  .page-main {
    .mt {
      margin-top: 10px;
    }

    padding: 10px;

    .el-tabs--border-card {
      box-shadow: none;
    }

    .el-tabs__header {
      border-bottom: 1px solid #dfe4ed;
    }

    .list-content {
      .item-content {
        min-height: 500px;
      }

      .el-collapse-item__header {
        color: #606266;
        font-weight: bold;
      }
    }

    .dialog-content {
      height: 350px;
      overflow: scroll;
    }

    .not-data {
      text-align: center;
      height: 200px;
      line-height: 200px;
      border: 1px solid #dfe6ec;
    }
  }

</style>
