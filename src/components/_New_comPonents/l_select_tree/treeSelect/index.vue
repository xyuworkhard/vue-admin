<template>
    <div class="selectTree" :style="{ width: width + 'px' }">
        <treeselect v-model="changeValue" :multiple="multiple" :limit="limit" :options="defoptions" @input="getvalue"
            placeholder="请选择" valueConsistsOf="LEAF_PRIORITY" clearAllText="清空所有选项" clearValueText="清除"
            noResultsText="无匹配数据" noChildrenText="无子节点" noOptionsText="无数据" :limitText="limitText"
            :defaultExpandLevel="expandLevel" clearOnSelect :show-count="true" :maxHeight="height"
            :disabled="disabled" />
    </div>

</template>

<script>
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: "selectTree",
        props: {
            dictype: {
                type: String,
            },
            multiple: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            limit: {
                type: Number,
                default: 3
            },
            options: {
                type: Array,
                default: function () {
                    return []
                }
            },
            isAbled: {
                type: Array,
                default: function () {
                    return []
                }
            },
            value: {
                type: [Array, String],
                default: function () {
                    return []
                }
            },
            width: {
                type: Number
            },
            height: {
                type: Number,
                default: 300
            },
            expandLevel: {
                type: Number,
                default: 0
            },

        },
        components: { Treeselect },
        data() {
            return {
                changeValue: this.value,
                defoptions: this.options,
            }

        },
        methods: {
            getvalue(value) {
                this.$emit('getValue', value)
            },
            limitText(count) {
                return `+${count}`
            }
        },
        created() {
            var ableArr = this.isAbled
            var newData = []
            if (this.dictype) {
                var data = this.$store.getters.propTable[this.dictype]//数据字典数据
                if (!data) {
                    return undefined
                } else {
                    for (var prop in data) {
                        if (data[prop].parentId == '0') {
                            newData.push({
                                id: data[prop].value,
                                label: data[prop].text,
                                selfId: prop,
                                parentId: data[prop].parentId
                            })
                        }
                    }
                    newData.forEach(val => {
                        var childArr = []
                        for (var prop in data) {
                            if (val.selfId == data[prop].parentId) {
                                childArr.push({
                                    id: data[prop].value,
                                    label: data[prop].text,
                                    selfId: prop,
                                    parentId: data[prop].parentId
                                })
                                val.children = childArr
                            }
                        }
                    })
                }
            }

            //处理禁用
            if (ableArr.length > 0) {
                var optArr = this.dictype ? newData : this.defoptions
                var comArr = optArr.filter(val => {
                    return ableArr.indexOf(val.id) != -1
                })
                var diff = optArr.filter(val => {
                    return ableArr.indexOf(val.id) == -1
                })
                addDisabledAttr(diff)
                ableArr = comArr.concat(diff)
            }

            this.defoptions = ableArr.length ? ableArr : (this.dictype ? newData : this.defoptions)
            function addDisabledAttr(item) {
                item.forEach(val => {
                    val.isDisabled = true
                    var child = val.children
                    if (child) {
                        addDisabledAttr(child)
                    }
                })
            }
        }
    }
</script>
<style>
    .vue-treeselect__multi-value-item,
    .vue-treeselect__value-remove {
        background-color: #f4f4f5;
        color: #666;
    }

    .vue-treeselect__label {
        color: #606266;
        font-weight: 500;
    }

    .vue-treeselect__checkbox-container:hover .vue-treeselect__checkbox--unchecked {
        border-color: #409eff;
    }

    .vue-treeselect__checkbox--indeterminate,
    .vue-treeselect__checkbox--checked,
    .vue-treeselect__checkbox-container:hover .vue-treeselect__checkbox--checked {
        border-color: #409eff;
        background: #409eff;
    }

    .vue-treeselect__limit-tip-text {
        background-color: #f4f4f5;
        color: #909399;
        padding: 1px 5px;
    }
</style>