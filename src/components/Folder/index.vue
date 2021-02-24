<template>
  <div class="mainContent">
    <div class="metas" v-if="flag">
      <slot name="searchs"></slot>
    </div>
    <div class="controls">
      <span class="context" @click="toggles">
        <span>{{more}}</span>
        <i class="el-icon-arrow-down arrows" ref="icon"></i>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        flag: false,
        more: "更多搜索条件"
      };
    },
    methods: {
      toggles() {
        this.flag = !this.flag;
        if (this.flag) {
          this.more = "收起";
          this.$refs.icon.classList.add("actives");
        } else {
          this.more = "更多搜索条件";
          this.$refs.icon.classList.remove("actives");
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  .mainContent {
    box-sizing: border-box;
    // margin-bottom: 10px;
  }

  .controls {
    text-align: center;
  }

  .context:hover {
    cursor: pointer;
  }

  .context span {
    font-size: 13px;
    color: #666;
    font-weight: 700;
  }

  .arrows {
    transition: all 0.3s;
  }

  .arrows.actives {
    transform: rotate(180deg);
  }

</style>
