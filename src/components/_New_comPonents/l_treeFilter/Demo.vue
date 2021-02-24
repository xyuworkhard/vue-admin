<template>
  <div>
    <selectFilter :filterFiled="config.filterFiled" :dicField="config.dicField" :defaultUrl="config.defaultUrl"
      :defoption="selectData" v-model="selectData"></selectFilter>
  </div>
</template>
<script>
  import selectFilter from './index'
  export default {
    data() {
      return {
        config: {
          filterFiled: 'a',
        },
        selectData: '33'
      }
    },
    components: {
      selectFilter
    }
  }

</script>
