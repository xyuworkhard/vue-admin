<template>
    <div style="display: flex;align-items: center;">
        <!-- getValue 事件函数，子传父获取数据-->
        <selectTree :multiple="treeConfig.multiple" :limit="treeConfig.limit" :options="treeConfig.options"
            @getValue="getValue" :value="treeConfig.value" :width="treeConfig.width"
            :expandLevel="treeConfig.expandLevel" :dictype="treeConfig.dictype" :isAbled="treeConfig.isAbled">
        </selectTree>
        <p style="margin-left:30px">{{treeConfig.value}}</p>
        <!-- <br>
        <el-button @click="sumbits">提交数据</el-button> -->
    </div>
</template>
<script>
    import selectTree from './index'
    export default {
        data() {
            return {
                /*
                配置
                width:盒子宽度
                height:选择菜单的最大高度
                disabled:是否禁用该组件
                multiple:单选和多选，默认多选。true：多选，false：单选
                limit: 限制所选选项的显示,默认显示3个,
                value:select选中的数据,值为null(单选)或[](多选)
                options:标准树形数据，数组,
                isDefaultExpanded:是否展开当前选项，默认(false)不展开,true:展开
                expandLevel:展开分支节点层级,默认0不展开，设置 Infinity 展开所有分支节点
                isAbled:默认不禁用,配置后，配置的字段不禁用，其他字段项目禁用（包含children）
                dictype:数据字典字段
                */
                treeConfig: {
                    width: 500,
                    // height: 100,
                    // disabled: true,
                    isAbled: ['1'],
                    multiple: true,
                    limit: 3,
                    value: ['12'],
                    expandLevel: Infinity,
                    // dictype: 'COAL_TYPE',
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

            }
        },
        components: { selectTree },
        methods: {
            getValue(val) {
                this.treeConfig.value = val
            },
            sumbits() {
                console.log(this.treeConfig.value)
            }
        },
    }
</script>