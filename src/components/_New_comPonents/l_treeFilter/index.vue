<template>
    <div class="selectChange">
        <el-select v-model="value" filterable placeholder="请选择" @change="change">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import request from "@/utils/request";
    export default {
        name: "selectChange",
        props: {
            filterFiled: {
                type: String,
                default: ""
            },
            dicField: {
                type: String,
                default: "LogisticFileType"
            },
            defaultUrl: {
                type: String,
                default: "/learun/adms/dataitem/details?data="
            },
            defoption: {
                type: String
            }
        },
        data() {
            return {
                options: [],
                value: '',
            }
        },
        created() {
            request({
                url: this.defaultUrl + this.dicField,
                method: "get"
            }).then(res => {
                var dicArr = res.data;
                this.value = this.defoption
                var resArr = dicArr.find(val => {
                    return val.F_ItemValue == this.filterFiled
                })
                if (!resArr) {
                    return undefined
                }
                var childMark = resArr.F_ItemDetailId
                var childArr = dicArr.filter(val => {
                    return val.F_ParentId == childMark
                })
                childArr.forEach(val => {
                    this.options.push({
                        value: val.F_ItemValue,
                        label: val.F_ItemName
                    })
                })
            })
        },
        methods: {
            change(val) {
                this.$emit('input', val)
            }
        }
    }
</script>