<template>
  <div class="AssetMagCenter">
    <el-row v-if="isLogin">
      <el-col :span="12">
        <el-card>
          <div id="nine" :style="{width:'100%',height:height}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <div id="ten" :style="{height:height1,margin:'0 auto'}"></div>
          </el-col>
          <el-col :span="24">
            <AssetMagDetail ref="AssetMagDetail" :tableData="tableData" :step="step" :cont_Id="contId"></AssetMagDetail>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div v-else style="margin-top:20px">
      非金融机构，无显示数据
    </div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import cont from "@/views/Asset/js/cont.json";
  import AssetMagDetail from "@/views/Asset/components/AssetMagDetail";
  import request from "@/utils/request";
  import {
    param
  } from "../../../utils";
  import {
    getUserInfo
  } from "@/utils/auth";
  export default {
    name: "AssetMagCenter",
    components: {
      AssetMagDetail
    },
    data() {
      return {
        userInfo: {},
        data1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        data2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        data3: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        height: "",
        height1: "",
        step: 7,
        contId: "",
        detail: {},
        tableData: [],
        alldata: {},
        CompanyId: "",
        AssetPoolId: "",
        FinanceId: "",
        AssetId: "",
        isLogin: false,
        title: ''
      };
    },
    created() {
      // this.$nextTick(()=>{
      this.userInfo = getUserInfo();
      if (this.userInfo != undefined) {
        if (JSON.parse(this.userInfo).UserType == "9" || JSON.parse(this.userInfo).UserType == "2") {
          this.isLogin = true
          var CompanyId;
          if (JSON.parse(this.userInfo).UserType == "9") {
            CompanyId = ''
          } else {
            CompanyId = JSON.parse(this.userInfo).CompId
          }
          request({
            url: "/Asset/AssetPool/AssetCenter",
            method: "get",
            params: {
              CompanyId: CompanyId
            }
          }).then(res => {
            this.alldata = res.data.AssetCenter;
            this.alldata.rows = 1;
            if (JSON.parse(this.userInfo).UserType == "9") {
              this.alldata.children.map(rese => {
                rese.rows = 2;
                if (rese.children != undefined) {
                  rese.children.map(item => {
                    item.rows = 3;
                    if (item.children != undefined) {
                      item.children.map(con => {
                        con.rows = 4;
                        con.label = {
                          formatter(v) {
                            return v.name.slice(0, 4) + '\n' + v.name.slice(4, 12)
                          },
                          algin: "left",
                          position: 'top',
                        }
                        if (con.children != undefined) {
                          con.children.map(conc => {
                            conc.rows = 5;
                          })
                        }
                      });
                    }
                  });
                }
              });

              //获得首条资产id数据
              var firstassetidinfo = jsonPath(this.alldata.children, "$[0].[0].[0].[0].id");
              var firstassetid = "";
              if (firstassetidinfo == undefined || firstassetidinfo == false) {
                firstassetid = "";
              } else {
                firstassetid = firstassetidinfo[0];
              }
              this.getDetail("", "", "", firstassetid);

            } else {
              this.alldata.name = JSON.parse(this.userInfo).RegCompName
              this.alldata.id = JSON.parse(this.userInfo).CompId
              this.alldata.label = {
                // formatter(v) {
                //   return v.name.slice(0, 5) +'\n'+v.name.slice(5, 12)
                // },
                algin: "right",
                position: 'top',
              }
              this.alldata.children.map(rese => {
                rese.rows = 2;
                if (rese.children != undefined) {
                  let indexs = rese.children.findIndex(val => val.name == "日照云盛0908")
                  rese.children.unshift(rese.children.splice(indexs, 1)[0])
                  rese.children.map(item => {
                    item.rows = 3;
                    item.label = {
                      formatter(v) {
                        return v.name.slice(0, 4) + '\n' + v.name.slice(4, 12)
                      },
                      algin: "left",
                      position: 'top',
                    }
                    if (item.children != undefined) {
                      item.children.map(con => {
                        con.rows = 4;
                        if (con.children != undefined) {
                          con.children.map(conc => {
                            conc.rows = 5;
                          })
                        }
                      });
                    }
                  });
                }
              });

              //获得首条资产id数据
              var firstassetidinfo = jsonPath(this.alldata.children, "$[0].[0].[0].id");
              var firstassetid = "";
              if (firstassetidinfo == undefined || firstassetidinfo == false) {
                firstassetid = "";
              } else {
                firstassetid = firstassetidinfo[0];
              }
              this.title = this.alldata.name
              this.getDetail(CompanyId, "", "", firstassetid);
            }

            //页面元素的高度
            this.height = window.screen.height - 200 + "px";
            this.height1 = (window.screen.height - 300) / 2 + "px";

          }).then(item => {
            //页面加载设置初始的融资合同id及其内容
            this.drawPienine("nine");
          });
        }
      } else {
        this.isLogin = false
      }
      //  })
    },
    methods: {
      drawPienine(id) {
        //资产管理中心图
        let charts = echarts.init(document.getElementById(id));
        var data = this.alldata;
        let option = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
            // formatter: "{c}"
          },
          title: {
            text: "资产管理中心",
            x: "center",
            top: "10",
            textStyle: {
              color: "#000",
              fontSize: 18
            }
          },
          series: [{
            type: "tree",
            data: [data],
            left: "5%",
            width: "85%",
            // layout: 'radial',
            // symbol:'rect',
            symbolSize: 10,
            label: {
              position: "top",
              verticalAlign: "middle",
              align: "center",
              fontSize: 11,
            },

            leaves: {
              label: {
                position: "top",
                verticalAlign: "middle",
                align: "center"
              }
            },
            edgeShape: "polyline", //树形样式，曲线或折线，curve 和 polyline
            edgeForkPosition: '50%', //圈到分叉点的距离
            initialTreeDepth: 3, //初始展开的层级，-1为所有节点都展开，
            expandAndCollapse: true, //点击不伸展收起
            animationDuration: 550,
            animationDurationUpdate: 750
          }]
        }
        charts.setOption(option, true);
        if (charts._$handlers.click) {
          charts._$handlers.click.length = 0;
        }
        // if(charts._$handlers.dblclick){
        //     charts._$handlers.dblclick.length = 0;
        // }
        // document.oncontextmenu = function () { return false; };
        // charts.on("dblclick", params => {
        //   const name = params.data.name;
        //   const curNode = charts._chartsViews[0]._data.tree._nodes.find(item => {
        //     return item.name === name;
        //   });
        //   const depth = curNode.depth;
        //   const curIsExpand = curNode.isExpand;
        //   console.log(curNode)
        //   charts._chartsViews[0]._data.tree._nodes.forEach((item, index) => {
        //     // if (item.depth == depth && item.name != name && !curIsExpand) {
        //     //   console.log(123)
        //     //   item.isExpand = false;
        //     // }
        //     if(item.dataIndex == curNode.dataIndex&&curIsExpand){
        //       item.isExpand = false
        //     }else if(item.dataIndex == curNode.dataIndex&&!curIsExpand){
        //       item.isExpand = true
        //     }
        //   });
        //   console.log(charts._chartsViews[0]._data.tree._nodes)
        // })

        charts.on("click", params => {
          // charts._chartsViews[0]._data.tree._nodes.forEach((item, index) => {
          //   if(item.dataIndex == params.dataIndex){
          //     item.isExpand = true;
          //   }
          // });
          // console.log(params)
          // console.log(charts._chartsViews[0]._data.tree._nodes)
          //图内节点点击事件
          this.CompanyId = "",
            this.AssetPoolId = "",
            this.FinanceId = "",
            this.AssetId = "";
          this.title = params.data.name
          if (params.data.rows == 1) {
            this.drawPienine("nine");
            return
          }

          if (JSON.parse(this.userInfo).UserType == "9") {
            if (params.data.rows == 4) {
              this.FinanceId = params.data.id;
            } else if (params.data.rows == 2) {
              this.CompanyId = params.data.id;
            } else if (params.data.rows == 3) {
              this.AssetPoolId = params.data.id;
            } else if (params.data.rows == 5) {
              this.AssetId = params.data.id;
            }
          } else {
            if (params.data.rows == 3) {
              this.FinanceId = params.data.id;
            } else if (params.data.rows == 1) {
              this.CompanyId = params.data.id;
            } else if (params.data.rows == 2) {
              this.AssetPoolId = params.data.id;
            } else if (params.data.rows == 4) {
              this.AssetId = params.data.id;
            }
          }

          this.getDetail(this.CompanyId, this.AssetPoolId, this.FinanceId, this.AssetId)
        });
        window.onresize = charts.resize; //大小适应
      },
      drawPieten(id) {
        //近一周资产流向分析图
        let mycharts = echarts.init(document.getElementById(id));

        var emphasisStyle = {
          itemStyle: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "rgba(0,0,0,0.5)"
          }
        };
        mycharts.setOption({
          // brush: {
          //   toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
          //   xAxisIndex: 0
          // },
          title: {
            text: this.title + "近一周资金流向分析",
            x: "center",
            top: "10",
            textStyle: {
              color: "#000",
              fontSize: 18
            }
          },
          // toolbox: {
          //   feature: {
          //     magicType: {
          //       // type: ["tiled"]
          //     },
          //     dataView: {}
          //   }
          // },
          // legend: {
          //   data: ["流入", "流出", "净值"],
          //   left: 10
          // },
          tooltip: {},
          xAxis: {
            data: [
              getDay(-6),
              getDay(-5),
              getDay(-4),
              getDay(-3),
              getDay(-2),
              getDay(-1),
              getDay(0),
              getDay(1),
              getDay(2)
            ],
            name: "",
            axisLine: {
              onZero: true
            },
            // splitLine: { show: false },
            splitArea: {
              show: false
            }
          },
          yAxis: {
            // inverse: true,
            // data:['流入',0,'流出'],
            name: "资金(万元)",
            splitArea: {
              show: false
            },
            min: function (value) {
              return value.min - 50;
            },
            max: function (value) {
              return value.max + 50;
            }
          },
          grid: {
            left: 100
          },
          series: [{
              name: "流入",
              type: "bar",
              stack: "two",
              emphasis: emphasisStyle,
              data: this.data1,
              barWidth: 25
            },
            {
              name: "流出",
              type: "bar",
              stack: "two",
              emphasis: emphasisStyle,
              data: this.data2,
              barWidth: 25
            },
            {
              name: "净值",
              type: "line",
              stack: "one",
              emphasis: emphasisStyle,
              data: this.data3,
              barWidth: 15,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    // textStyle: { color: "black", fontSize: 10 }
                  }
                }
              }
            }
          ]
        });
      },
      getmoney(id) {
        //更新资产数据，赋在图上
        this.newdata("data1", 3, "#C23531");
        this.newdata("data2", 3, "#2F4554");
        let i = this.data3.length;
        for (var k = 0; k <= 3; k++) {
          this.data3[i - k] = {
            value: this.data3[i - k],
            // itemStyle: {
            // normal: {
            lineStyle: {
              //系列级个性化折线样式
              type: "dashed"
            }
            // }
            // }
          };
        }
        this.drawPieten("ten");
      },
      newdata(name, num, color) {
        //资产流向图，设置虚线数据部分内容及颜色
        let i = this[name].length;
        for (var k = 0; k <= num; k++) {
          this[name][i - k] = {
            value: this[name][i - k],
            itemStyle: {
              normal: {
                color: "#fff",
                barBorderColor: color,
                borderType: "dashed",
                borderWidth: "1"
              }
            }
          };
        }
      },
      getDetail(CompanyId, AssetPoolId, FinanceId, AssetId) {
        this.tableData = []
        request({
          url: "/Asset/AssetPool/AssetInfo",
          method: "get",
          params: {
            CompanyId: CompanyId,
            FinanceId: FinanceId,
            AssetPoolId: AssetPoolId,
            AssetId: AssetId
          }
        }).then(res => {
          this.data1 = res.data.AssetFlow.FlowIn.map(res => {
            return res = parseFloat((parseFloat(res) / 10000).toFixed(2))
          })
          this.data2 = res.data.AssetFlow.FlowOut.map(res => {
            return res = -parseFloat((parseFloat(res) / 10000).toFixed(2))
          })
          this.data3 = res.data.AssetFlow.FlowAct.map(res => {
            return res = parseFloat((parseFloat(res) / 10000).toFixed(2))
          })
          this.getmoney();
          if (JSON.stringify(res.data.Finance) != "{}" && res.data.Finance != null) {
            this.tableData = []
            this.tableData.push(res.data.Finance)
            this.contId = res.data.Finance.FinanceNo;
          } else {
            this.tableData = []
            this.contId = ''
          }

          this.detail = res.data.FinanceStep
          this.$refs.AssetMagDetail.getdeTailed(this.detail)

          // if(this.detail.ORD == undefined){
          //   this.step=1
          //   return
          // }else if(this.detail.ORD_DELI == undefined){
          //   this.step=2
          //   return
          // }else if(this.detail.CHK == undefined){
          //   this.step=3
          //   return
          // }else if(this.detail.FEE == undefined){
          //   this.step=4
          //   return
          // }else if(this.detail.CRG == undefined){
          //   this.step=5
          //   return
          // }else if(this.detail.FIN == undefined){
          //   this.step=6
          //   return
          // }else{
          //   this.step=7
          // }

          // this.drawPienine("nine");


        });
      }
    }
  };

  function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tMonth + "/" + tDate;
  }

  function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  }

  function dfs(array, id, dep) {
    array.forEach((obj, i) => {
      obj.dep = dep;
      if (obj.name === id) {
        current_dep = dep;
      } else if (obj.children !== undefined && obj.children.length > 0) {
        return dfs(obj.children, id, dep + 1);
      }
    })
  }

  function solve(array, id, current_dep) {
    array.forEach((obj, i) => {
      if (obj.dep < current_dep) {
        obj.collapsed = false;
        if (obj.children && obj.children.length > 0) {
          solve(obj.children, id, current_dep);
        }
      } else if (obj.dep === current_dep) {
        if (obj.name === id) {
          obj.collapsed = false;
        } else {
          obj.collapsed = true;
        }
      }
    })
  }

</script>
<style lang="scss">
  .AssetMagCenter {
    text-align: center;
  }

  .AssetMagCenter {
    min-height: 625px;
  }

</style>
