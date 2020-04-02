<template>
  <div>
    <div class="dashboard-editor-container">
      <github-corner></github-corner>
      <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    </div>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 50px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
