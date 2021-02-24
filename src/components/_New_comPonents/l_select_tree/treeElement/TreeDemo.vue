<template>
    <div>
        <div style="display: flex;align-items: center;">
            <tree :accordion="config.accordion" :width="config.width" :collapseTags="config.collapseTags"
                :multiple="config.multiple" :showValue="config.showValue" :options="config.options"
                :defaultProps="config.defaultProps" :isFilter="config.isFilter" :dictype="config.dictype"
                :isAbled="config.isAbled" :parentShow="config.parentShow" @getChecked="getChecked" />
            <!-- <el-button @click="sumbits" style="margin-left:20px">提交数据</el-button> -->
            <p style="margin-left:30px">{{config.showValue}}</p>
        </div>
    </div>

</template>
<script>
    import tree from './index'
    export default {
        /*
        accordion:同一级的节点，是否只能展开一个，默认false
        width:宽度，number
        collapseTags：多选内容展现形式，默认（true）用Tag展示已选项
        isFilter:是否可搜索，默认不可搜索
        options:树形数据
        defaultProps:必填
        multiple:单选和多选，默认多选。true：多选，false：单选
        showValue:必填，选中的数据,多选为[],单选为'',
        parentShow:单选时，是否展示父节点,默认展示
        isAbled:(适用于多选)默认不禁用,配置后，配置的字段不禁用，其他字段项目禁用（包含children）
        dictype:数据字典字段
       
        */
        data() {
            return {
                config: {
                    accordion: true,
                    multiple: true,
                    width: 500,
                    // parentShow: false,
                    // isFilter: true,
                    dictype: 'LogisticFileType',
                    isAbled: ["a"],
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
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    }
                }
            }
        },
        methods: {
            getChecked(val) {
                this.config.showValue = val
            },
            sumbits() {
                console.log(this.config.showValue)
            }
        },
        components: { tree }
    }
</script>