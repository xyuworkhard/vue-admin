<template>
  <div class="plugDemo">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="树形下拉框(基于VueElement封装)">
        <treeElement></treeElement>
        <div class="context">
          <h3>字段属性</h3>
          <el-table :data="tableData" border>
            <el-table-column prop="field" label="参数" width="130"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="160"></el-table-column>
            <el-table-column prop="chooseVal" label="可选值" width="160"></el-table-column>
            <el-table-column prop="defValue" label="默认值" width="160"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>事件</h3>
          <el-table :data="eventData" border>
            <el-table-column prop="eventName" label="事件名称" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="calParam" label="回调参数" width="200"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>数据配置</h3>
          <el-card class="box-card">
            <pre>< tree</pre>
            <pre>
        :accordion="config.accordion" 
        :width="config.width"
        :collapseTags="config.collapseTags" 
        :multiple="config.multiple"
        :showValue="config.showValue" 
        :options="config.options"
        :defaultProps="config.defaultProps" 
        :isFilter="config.isFilter"
        :dictype="config.dictype" 
        :isAbled="config.isAbled" 
        :parentShow="config.parentShow"
        @getChecked="getChecked" />
                        </pre>
            <pre>config: {  </pre>
            <pre>
            // parentShow: false, isFilter: true, isAbled: ["a"]
            accordion: true,
            multiple: true,
            width: 400,
            dictype: 'LogisticFileType',
            showValue: ['23'], 
            options: [
                        {
                            id: 1,
                            label: '一级 1',
                            children: [{
                                id: 2,
                                label: '二级 1-1',
                                children: [
                                    {
                                        id: 3,
                                        label: '三级 1-1-1'
                                    },
                                    {
                                        id: 4,
                                        label: '三级 1-1-2'
                                    }
                                ]
                            }]
                        },
                        {
                            id: 5,
                            label: '一级 2',
                            children: [
                                {
                                    id: 6,
                                    label: '二级 2-1'
                                },
                                {
                                    id: 7,
                                    label: '二级 2-2'
                                }
                            ]
                        },
                        {
                            id: 8,
                            label: '一级 3',
                            children: [
                                {
                                    id: 9,
                                    label: '二级 3-1'
                                },
                                {
                                    id: 10,
                                    label: '二级 3-2'
                                }
                            ]
                        }],
            defaultProps:{
                            children: 'children',
                            label: 'label'
                        }
                    </pre>
            <pre>}</pre>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="树形下拉框(基于TreeSelect插件封装)">
        <treeSelect></treeSelect>
        <div class="context">
          <h3>字段属性</h3>
          <el-table :data="tableData1" border>
            <el-table-column prop="field" label="参数" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="160"></el-table-column>
            <el-table-column prop="chooseVal" label="可选值" width="160"></el-table-column>
            <el-table-column prop="defValue" label="默认值" width="160"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>事件</h3>
          <el-table :data="eventData1" border>
            <el-table-column prop="eventName" label="事件名称" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="calParam" label="回调参数" width="200"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>数据配置</h3>
          <el-card class="box-card">
            <pre>< selectTree</pre>
            <pre>
        :multiple="treeConfig.multiple" 
        :limit="treeConfig.limit" 
        :options="treeConfig.options"
        @getValue="getValue" 
        :value="treeConfig.value" 
        :width="treeConfig.width"
        :expandLevel="treeConfig.expandLevel" 
        :dictype="treeConfig.dictype" 
        :isAbled="treeConfig.isAbled" />
                        </pre>
            <pre>treeConfig: {  </pre>
            <pre>
            // height: 100,disabled: true,isAbled: ['1'],dictype: 'COAL_TYPE'
            width: 500,
            multiple: true,
            limit: 3,
            value: [],
            expandLevel: Infinity,
            options: [
            {
                id: '1',
                label: '前端',
                children: [{
                    id: '11',
                    label: '初级前端',
                    children: [{
                        id: '111',
                        label: '入门',
                    }, {
                        id: '112',
                        label: '新手',
                    }, {
                        id: '113',
                        label: '小白',
                    }],
                    // isDefaultExpanded: true
                }, {
                    id: '12',
                    label: '中级前端',
                }, {
                    id: '13',
                    label: '高级前端',
                }],
            },
            {
                id: '2',
                label: '.NET',
            },
            {
                id: '3',
                label: '测试',
                children: [{
                    id: '31',
                    label: '初级Test',
                }, {
                    id: '32',
                    label: '中级Test',
                }, {
                    id: '33',
                    label: '高级Test',
                }],
            },
            {
                id: '4',
                label: 'PHP',
            },
            {
                id: '5',
                label: 'Python',
            },
                    ]
                }
            </pre>
            <pre>}</pre>
          </el-card>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="树形数据过滤下拉框">
        <treeFilter></treeFilter>
      </el-tab-pane> -->
      <el-tab-pane label="单选框/复选框">
        <csceCheckbox></csceCheckbox>
        <div class="context">
          <h3>字段属性</h3>
          <el-table :data="tableDataCheckBox" border>
            <el-table-column prop="field" label="参数" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="160"></el-table-column>
            <el-table-column prop="chooseVal" label="可选值" width="160"></el-table-column>
            <el-table-column prop="defValue" label="默认值" width="160"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>事件</h3>
          <el-table :data="eventDataCheckBox" border>
            <el-table-column prop="eventName" label="事件名称" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="calParam" label="回调参数" width="200"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>数据配置</h3>
          <el-card class="box-card">
            <pre>< csceCheckbox</pre>
            <pre>
            :dictkey="frameData"
            :action="frameData.action"
            :chktype="frameData.chktype"
            :portrait="frameData.portrait"
            :iconType="frameData.iconType"
            :dicType="frameData.dictype"
            :defoption="frameData.defoption"
            @input="getVal" />
            </pre>
            <pre>frameData: {  </pre>
            <pre>
                action: '0',
                chktype: 'multi',
                portrait: false,
                iconType: [],
                dictype: 'LogisticFileType',
                defoption: ['10'],
                checkedValue: null,
            </pre>
            <pre>}</pre>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Grid组件">
        <Grid></Grid>
        <div class="context">
          <h3>字段属性</h3>
          <el-table :data="tableDataGrid" border>
            <el-table-column prop="field" label="参数" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="160"></el-table-column>
            <el-table-column prop="chooseVal" label="可选值" width="160"></el-table-column>
            <el-table-column prop="defValue" label="默认值" width="160"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>事件</h3>
          <el-table :data="eventDataGrid" border>
            <el-table-column prop="eventName" label="事件名称" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="calParam" label="回调参数" width="200"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>数据配置</h3>
          <el-card class="box-card">
            <pre>< Grid</pre>
            <pre>
            :tableData="tableData" 
            @sendBackData="getBackData" 
            :gridConfig="gridConfig" />
            </pre>
            <pre>< el-button @click="sumbits">提交数据< /el-button></pre>
            <pre>
            //展示数据
            tableData: [
              {
                csceInput: '121',
                csceDate: '2016-08-06',
                csceSelect: '3',
                csceRadio: '1',
                csceCheckBox: ['1', '2'],
                comments: '上海市普陀区金沙江路 1518901 1111弄',
                csceAnnexFile: 'csceAnnexFilef518d508-4a06-74a5-d939-56742729aab9',
                csceAnnex: 'csceAnnexf518d508-4a06-74a5-d939-56742729aab9',
              },
              {
                csceInput: '112',
                csceDate: '2016-08-06',
                csceSelect: '1',
                csceRadio: '0',
                csceCheckBox: ['0', '1'],
                comments: '上海市普陀区金沙江路 1518901 0000弄',
                csceAnnexFile: 'csceAnnexFilef20d6f33-4599-79b9-08b8-670c7f7a6e59',
                csceAnnex: 'csceAnnexf20d6f33-4599-79b9-08b8-670c7f7a6e59',
              },
            ],
            //Grid配置项
            gridConfig: {
              //表头配置
              headData: [
                {
                  label: '默认文本框', //必配置项,表头名称
                  name: 'csceInput', //必配置项，字段名称
                  width: 120, //选配填
                  align: 'center', //选配填，默认左对齐
                  type: 'input', //必配置项,控件类型
                },
                {
                  label: '日期选择器',
                  name: 'csceDate',
                  width: 120,
                  align: 'right',
                  type: 'date',
                },
                {
                  label: '下拉选择框',
                  name: 'csceSelect',
                  width: 160,
                  align: 'center',
                  type: 'select',
                  //select组件 具体配置参考@/components/_New_comPonents/l_select
                  typeData: {
                    action: '0',
                    actionurl: '',
                    multiple: false,
                    filterable: true,
                    isTags: false,
                    //showcontent 必填
                    showcontent: {
                      data: 'LogisticFileType',
                    },
                  },
                },
                {
                  label: '过滤选择框',
                  name: 'csceSelect1',
                  width: 160,
                  align: 'center',
                  type: 'selectFilter',
                  //treeFilter组件 具体配置参考@/components/_New_comPonents/l_treeFilter
                  typeData: {
                    filterFiled: 'a', //必填,过滤字段
                    // dicField:"",//选填,数据字典字段名
                    // defaultUrl:""//请求地址
                  },
                },
                {
                  label: '单选框',
                  name: 'csceRadio',
                  width: 280,
                  align: 'center',
                  type: 'radio',
                  //单选多选组件 具体配置参考@/components/_New_comPonents/l_checkbox
                  typeData: {
                    action: '0',
                    actionurl: '',
                    chktype: '',
                    portrait: false,
                    //iconType: ['el-icon-star-off', 'el-icon-star-on'],
                    dictkey: 'CHECK_DIRECTION',
                    defoption: '1',
                  },
                },
                {
                  label: '复选框',
                  name: 'csceCheckBox',
                  width: 260,
                  align: 'left',
                  type: 'checkBox',
                  //单选多选组件 具体配置参考@/components/_New_comPonents/l_checkbox
                  typeData: {
                    action: '0',
                    actionurl: '',
                    chktype: 'multi',
                    portrait: false,
                    //iconType: ['el-icon-star-off', 'el-icon-star-on'],
                    dictkey: 'ReimburseType',
                    defoption: ['1', '2'],
                  },
                },
                {
                  label: '备注',
                  name: 'comments',
                  width: 300,
                },
                {
                  label: '附件',
                  name: 'csceAnnex',
                  type: 'upLoader',
                  width: 500,
                  //上传组件 具体配置参考@/components/_New_comPonents/l_upload
                  typeData: {
                    fileType: 'LOGO',
                    companyName: 'CSCE',
                  },
                },
                {
                  label: '附件1',
                  name: 'csceAnnexFile',
                  type: 'upLoader',
                  width: 500,
                  //上传组件 具体配置参考@/components/_New_comPonents/l_upload
                  typeData: {
                    fileType: 'LOGOFILE',
                    companyName: 'CSCE',
                  },
                },
              ],
              isEdit: true, //选配填  是否可编辑,默认false,不可编辑
              height: 200, //选配填  table高度，默认高度185
              //width: 1200,//选配填  table宽度，默认宽度100%
            }
            </pre>
            <pre>}</pre>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="upload组件">
        <upload></upload>
        <div class="context">
          <h3>字段属性</h3>
          <el-table :data="tableDataUpload" border>
            <el-table-column prop="field" label="参数" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="160"></el-table-column>
            <el-table-column prop="chooseVal" label="可选值" width="170"></el-table-column>
            <el-table-column prop="defValue" label="默认值" width="170"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>事件</h3>
          <el-table :data="eventDataUpload" border>
            <el-table-column prop="eventName" label="事件名称" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="calParam" label="回调参数" width="200"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>数据配置</h3>
          <el-card class="box-card">
            <pre>< upload</pre>
            <pre>
              :multiple="frameData.multiple"
              :file-type="frameData.fileType"
              :company-name="frameData.companyName"
              :limit="frameData.limit"
              :acceptlist="frameData.acceptlist"
              :key-value="frameData.keyValue"></pre>
            <pre>< /upload></pre>
            <pre>frameData: {</pre>
            <pre>
            multiple: false, 
            limit: 3, 
            acceptlist: 'jpg,pdf,xlsx,png,docx', 
            keyValue: '5f6c5a3f-8902-4c3f-9e34-25796fe8c5cc',
            fileType: 'Logo1571116925257', 
            companyName: 'db1ecd5c-a79d-49ab-b7a4-cddf111c7b3a',</pre>
            <pre>}</pre>
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane label="select组件">
        <csceSelect></csceSelect>
        <div class="context">
          <h3>字段属性</h3>
          <el-table :data="tableDataSelect" border>
            <el-table-column prop="field" label="参数" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="160"></el-table-column>
            <el-table-column prop="chooseVal" label="可选值" width="170"></el-table-column>
            <el-table-column prop="defValue" label="默认值" width="170"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>事件</h3>
          <el-table :data="eventDataSelect" border>
            <el-table-column prop="eventName" label="事件名称" width="160"></el-table-column>
            <el-table-column prop="describe" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="calParam" label="回调参数" width="200"></el-table-column>
          </el-table>
        </div>
        <div class="context">
          <h3>数据配置</h3>
          <el-card class="box-card">
            <pre>< csceSelect</pre>
            <pre>
            :showcontent="frameData.showcontent"
            :action="frameData.action"
            :actionUrl="frameData.actionUrl"
            :multiple="frameData.multiple"
            :filterable="frameData.filterable"
            :defoption="frameData.defoption"
            :isTags="frameData.isTags"
            @input="getVal"></pre>
            <pre>< /csceSelect></pre>
            <pre>frameData: {</pre>
            <pre>
            showcontent: { data: 'LogisticFileType' }, 
            action: '0', 
            actionUrl: '', 
            multiple: true, 
            filterable: false, 
            defoption: '10,19', 
            isTags: false, 
            checkedValue: null, </pre>
            <pre>}</pre>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import treeElement from '@/components/_New_comPonents/l_select_tree/treeElement/TreeDemo';
  import treeSelect from '@/components/_New_comPonents/l_select_tree/treeSelect/TreeDemo';
  import treeFilter from '@/components/_New_comPonents/l_treeFilter/Demo';
  import csceCheckbox from '@/components/_New_comPonents/l_checkbox/demo';
  import Grid from '@/components/_New_comPonents/l_grid/demo';
  import upload from '@/components/_New_comPonents/l_upload/demo';
  import csceSelect from '@/components/_New_comPonents/l_select/demo';
  export default {
    data() {
      return {
        tabPosition: 'left',
        activeName: '1',
        tableData: [
          {
            field: 'accordion',
            describe: '同一级的节点，是否只能展开一个，默认全展开（false）',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'width',
            describe: 'select下拉框的宽度',
            defValue: '100%',
            type: 'Number',
            chooseVal: '——',
          },
          {
            field: 'collapseTags',
            describe: '多选内容展现形式，默认true用Tag(+1)展示已选项',
            defValue: 'true',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'isFilter',
            describe: '是否可搜索，默认不可搜索',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'options',
            describe: '树形数据，参考--数据配置的options选项',
            defValue: '——',
            type: 'Array',
            chooseVal: '[]',
          },
          {
            field: 'defaultProps',
            describe:
              '必填，设置树形结构。label-指定节点标签为节点对象的某个属性值，children-指定子树为节点对象的某个属性值',
            defValue: '——',
            type: 'Object',
            chooseVal: '{}',
          },
          {
            field: 'multiple',
            describe: '单选和多选，默认多选。true：多选，false：单选',
            defValue: 'true',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'showValue',
            describe: '必填，选中的数据,多选为[],单选为" "',
            defValue: '——',
            type: 'Array,String',
            chooseVal: '——',
          },
          {
            field: 'parentShow',
            describe: '单选时，是否可以选择父节点,默认可以选择',
            defValue: 'true',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'isAbled',
            describe:
              '(适用于多选)默认不禁用,配置后，配置的字段不禁用，其他字段项目禁用（包含children）',
            defValue: '——',
            type: 'Array',
            chooseVal: '[]',
          },
          {
            field: 'dictype',
            describe: '数据字典字段,获取对应数据字典数据',
            defValue: '——',
            type: 'String',
            chooseVal: '——',
          },
        ],
        eventData: [
          {
            eventName: 'getChecked',
            describe: '获取select选择的数据',
            calParam: '当前选中数据showValue值',
          },
        ],
        tableData1: [
          {
            field: 'disabled',
            describe: '是否禁用下拉框',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'width',
            describe: 'select下拉框的宽度',
            defValue: '100%',
            type: 'Number',
            chooseVal: '——',
          },
          {
            field: 'height',
            describe: '选择菜单栏的最大高度',
            defValue: '300',
            type: 'Number',
            chooseVal: '——',
          },
          {
            field: 'limit',
            describe:
              '限制所选选项的显示,默认显示3个，多于设置之后用Tag(+1)展示已选项',
            defValue: '3',
            type: 'Number',
            chooseVal: '——',
          },
          {
            field: 'isDefaultExpanded',
            describe: '是否展开当前选项，默认(false)不展开,true:展开',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'options',
            describe: '树形数据，参考--数据配置的options选项',
            defValue: '——',
            type: 'Array',
            chooseVal: '[]',
          },
          {
            field: 'expandLevel',
            describe:
              '展开分支节点层级,默认0不展开，设置 Infinity 展开所有分支节点',
            defValue: '0',
            type: 'Number',
            chooseVal: '0-Infinity',
          },
          {
            field: 'multiple',
            describe: '单选和多选，默认多选。true：多选，false：单选',
            defValue: 'true',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'value',
            describe: '必填，选中的数据,多选为[],单选为null',
            defValue: '——',
            type: 'Array,String',
            chooseVal: '——',
          },
          {
            field: 'isAbled',
            describe:
              '默认不禁用,配置后，配置的字段不禁用，其他字段项目禁用（包含children）',
            defValue: '——',
            type: 'Array',
            chooseVal: '[]',
          },
          {
            field: 'dictype',
            describe: '数据字典字段,获取对应数据字典数据',
            defValue: '——',
            type: 'String',
            chooseVal: '——',
          },
        ],
        eventData1: [
          {
            eventName: 'getChecked',
            describe: '获取select选择的数据',
            calParam: '当前选中数据value值',
          },
        ],
        //单选框/复选框数据
        tableDataCheckBox: [
          {
            field: 'action',
            describe: '数据接口类型（数据字典：0/数据源：1/以及其他的请求接口）',
            defValue: '0',
            type: 'String',
            chooseVal: '0,1',
          },
          {
            field: 'chktype',
            describe:
              '单选框/复选框（单选框：不传此参数或者传空/复选框：参数值为multi）',
            defValue: 'multi',
            type: 'String',
            chooseVal: 'multi',
          },
          {
            field: 'portrait',
            describe: '元素样式（true：元素独占一行显示 false：元素同排显示）',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'true,false',
          },
          {
            field: 'iconType',
            describe: '单选框/复选框icon',
            defValue: '',
            type: 'Array',
            chooseVal: "['el-icon-star-off', 'el-icon-star-on']",
          },
          {
            field: 'dictype',
            describe: '请求数据字典接口参数',
            defValue: '必填',
            type: 'String',
            chooseVal: '',
          },
          {
            field: 'defoption',
            describe: "默认选中值（复选框传数组：['1']/单选框传string：'1'）",
            defValue: '',
            type: 'String,Array',
            chooseVal: '',
          },
        ],
        //单选框/复选框数据
        eventDataCheckBox: [
          {
            eventName: 'getVal',
            describe: '获取选中的数据',
            calParam: '当前选中数据Value值',
          },
        ],
        //Grid组件数据
        tableDataGrid: [
          {
            field: 'tableData',
            describe: '展示数据',
            defValue: '',
            type: 'Array',
            chooseVal: '',
          },
          {
            field: 'gridConfig',
            describe: 'Grid配置项',
            defValue: '',
            type: 'Array',
            chooseVal: '',
          },
        ],
        //Grid组件数据
        eventDataGrid: [
          {
            eventName: 'getBackData',
            describe: '获取子组件传送的值',
            calParam: '当前table数据源',
          },
        ],
        //upload组件数据
        tableDataUpload: [
          {
            field: 'multiple',
            describe: '是否支持多选文件',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'false,true',
          },
          {
            field: 'limit',
            describe: '文件数量限制',
            defValue: '3',
            type: 'Number',
            chooseVal: '',
          },
          {
            field: 'acceptlist',
            describe: '接受上传文件的类型',
            defValue: 'jpg,pdf,xlsx,png,docx',
            type: 'String',
            chooseVal: 'jpg,pdf,xlsx,png,docx',
          },
          {
            field: 'keyValue',
            describe: '文件夹ID',
            defValue: '',
            type: 'String',
            chooseVal: '',
          },
          {
            field: 'fileType',
            describe: '文件分类',
            defValue: '',
            type: 'String',
            chooseVal: '',
          },
          {
            field: 'companyName',
            describe: '公司名称',
            defValue: '',
            type: 'String',
            chooseVal: '',
          },
        ],
        //upload组件数据
        eventDataUpload: [],
        //select组件数据
        tableDataSelect: [
          {
            field: 'showcontent',
            describe: "请求数据字典接口参数（格式：{ data: '参数名' }）",
            defValue: '',
            type: 'Object',
            chooseVal: '',
          },
          {
            field: 'action',
            describe:
              '数据接口类型（数据字典：0，数据源：1，以及其他的请求接口）',
            defValue: '0',
            type: 'String,Number',
            chooseVal: '0,1',
          },
          {
            field: 'actionUrl',
            describe: '其他接口url',
            defValue: '',
            type: 'String',
            chooseVal: '',
          },
          {
            field: 'multiple',
            describe: '是否多选',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'false,true',
          },
          {
            field: 'filterable',
            describe: '是否可搜索',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'false,true',
          },
          {
            field: 'defoption',
            describe: "默认选中值（多选：'x,x'/单选：'x'）",
            defValue: '',
            type: 'String',
            chooseVal: '',
          },
          {
            field: 'isTags',
            describe: '多选时是否将选中值按文字的形式展示',
            defValue: 'false',
            type: 'Boolean',
            chooseVal: 'false,true',
          },
        ],
        //select组件数据
        eventDataSelect: [
          {
            eventName: 'getVal',
            describe: '获取选中的数据',
            calParam: '当前选中数据Value值',
          },
        ],
      };
    },
    components: {
      treeElement,
      treeSelect,
      treeFilter,
      csceCheckbox,
      Grid,
      upload,
      csceSelect,
    },
  };
</script>
<style>
  .plugDemo .el-tabs--left .el-tabs__header.is-left {
    margin-right: 30px;
  }

  .plugDemo .el-collapse {
    margin-top: 20px;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
  }

  .plugDemo .el-collapse-item__header {
    height: 36px;
    line-height: 36px;
    font-weight: bolder;
  }

  .plugDemo .context {
    margin-top: 20px;
  }

  .plugDemo h3 {
    margin: 10px 0;
    font-weight: 400;
    color: #1f2f3d;
  }
</style>
<style lang="scss" scoped>
  .gridDemo {
    min-height: 350px;
    /* text-align: center; */
  }
</style>