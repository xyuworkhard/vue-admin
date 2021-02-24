<template>
  <div id="raddar" style="width:100%;height:350px"></div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    methods: {
      initChart() {
        let echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('raddar'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br />{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
          },
          series: [{
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            color: ['#008c8c', '#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f'],
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [{
                value: 320,
                name: 'Industries'
              },
              {
                value: 240,
                name: 'Technology'
              },
              {
                value: 149,
                name: 'Forex'
              },
              {
                value: 100,
                name: 'Gold'
              },
              {
                value: 59,
                name: 'Forecasts'
              }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }]
        });
      }
    }
  }

</script>
