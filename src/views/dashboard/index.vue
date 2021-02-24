<template>
  <div class="dashboard-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="chart-wrapper">
          <circle-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'
  import CircleChart from './components/CircleChart'
  export default {
    name: 'Dashboard',
    data() {
      return {

      }
    },
    components: {
      RaddarChart,
      PieChart,
      BarChart,
      CircleChart
    },
  }

</script>

<style lang="scss" scoped>
  .dashboard-container {
    height: calc(100vh - 50px);
    padding: 30px 20px;
    background-color: #f0f2f5;

    .chart-wrapper {
      width: 100%;
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 30px;
      margin-top: 30px;
    }
  }

</style>
