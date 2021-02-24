<template>
  <div class="elementTree" :style="{width:width+'px'}">
    <el-select v-model="valueTitle" :placeholder="text" :clearable="defMark" :multiple="defMark"
      :collapse-tags="collapseTags" ref="select" @remove-tag="removeTag" @clear="clearAll">
      <el-input placeholder="输入关键字过滤" v-model="filterText" class="searchInp" v-if="isFilter" clearable>
      </el-input>
      <el-option value="" label="" class="optTree">
        <el-tree :data="defoptions" node-key="id" :props="defaultProps" :accordion="accordion" :show-checkbox="defMark"
          :filter-node-method="filterNode" @check="handleCheck" ref="tree" default-expand-all highlight-current
          @node-click="handleNodeClick">
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>
<script>
  export default {
    name: "elementTree",
    props: {
      dictype: {
        type: String,
      },
      multiple: {
        type: Boolean,
        default: true
      },
      parentShow: {
        type: Boolean,
        default: true
      },
      accordion: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number
      },
      collapseTags: {
        type: Boolean,
        default: true
      },
      isAbled: {
        type: Array,
        default: function () {
          return []
        }
      },
      options: {
        type: Array,
        default: function () {
          return []
        }
      },
      showValue: {
        type: [Array, Number, String]
      },
      defaultProps: {
        type: Object
      },
      isFilter: {
        type: Boolean,
        default: false
      }
    },

    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },


    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      removeTag(val) {
        var itemId = this.initData.find(item => item.label == val).id
        this.$refs.tree.setChecked(itemId, false);
        this.$emit('getChecked', this.$refs.tree.getCheckedKeys(true))
      },
      clearAll() {
        this.$refs.tree.setCheckedKeys([]);
        this.$emit('getChecked', this.$refs.tree.getCheckedKeys(true))

      },
      handleNodeClick(data, node, self) {
        if (this.isFilter) {
          this.filterText = ''
        }
        if (!this.multiple) {
          if (data['id'] == '-1') {
            this.valueTitle = ''
            this.$emit('getChecked', '')
            return
          }
          if (this.defShow || !data.children) {
            this.valueTitle = data[this.defaultProps.label]
            this.$emit('getChecked', data['id'])
          }
        }


      },
      handleCheck() {
        if (this.isFilter) {
          this.filterText = ''
        }
        this.checkData = this.$refs.tree.getCheckedKeys(true)
        this.valueTitle = []
        this.initData = []
        this.checkData.forEach(val => {
          this.valueTitle.push(this.$refs.tree.getNode(val).data[this.defaultProps.label])
          this.initData.push(this.$refs.tree.getNode(val).data)
        })
        this.$emit('getChecked', this.$refs.tree.getCheckedKeys(true))
      },

    },
    data() {
      return {
        text: "请选择",
        defShow: this.parentShow,
        defMark: this.multiple,
        defoptions: this.options,
        filterText: '', //搜索数据
        valueTitle: [], //显示数据
        checkData: [], //checked数据
        initData: [] //保存node节点的data数据[{id,label}]
      };
    },
    mounted() {
      if (this.multiple) {
        this.$refs.tree.setCheckedKeys(this.showValue)
      }

    },
    created() {
      var ableArr = this.isAbled
      var newData = []
      if (this.dictype) {
        var data = this.$store.getters.dataDicCode[this.dictype] //数据字典数据
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
      if (this.multiple) {
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

      } else {
        this.defoptions = this.dictype ? newData : this.options
        this.defoptions.unshift({
          id: '-1',
          label: '---请选择---',
        })
      }

      function addDisabledAttr(item) {
        item.forEach(val => {
          val.disabled = true
          var child = val.children
          if (child) {
            addDisabledAttr(child)
          }
        })
      }
      this.$nextTick(() => {
        //key值转label值
        var treeDom = this.$refs.tree;
        if (this.multiple) {
          this.showValue.forEach(val => {
            if (treeDom.getNode(val)) {
              this.valueTitle.push(treeDom.getNode(val).data[this.defaultProps.label])
              this.initData.push(treeDom.getNode(val).data)
            }

          })

        } else {
          var val = this.showValue
          if (treeDom.getNode(val)) {
            this.valueTitle = treeDom.getNode(val).data[this.defaultProps.label]
          }

        }


      })
    },
  };

</script>
<style>
  .optTree.el-select-dropdown__item {
    height: auto;
    line-height: initial;
    overflow: auto;
    padding: 0;
  }

  .optTree .el-tree-node__label {
    font-weight: 500;
  }

  .optTree .el-tree__empty-block {
    min-height: 30px;
  }

  .searchInp {
    padding: 3px 10px;
  }

  .searchInp.el-input--medium .el-input__inner {
    height: 30px;
    line-height: 30px;
  }

  .searchInp.el-input--medium .el-input__inner::placeholder {
    font-size: 13px;
  }

  .searchInp span.el-input__suffix {
    line-height: 30px;
    padding: 0 5px;
  }

</style>
