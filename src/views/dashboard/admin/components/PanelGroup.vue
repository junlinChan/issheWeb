<template>
  <el-row class="panel-group" :gutter="40">
    <!-- <el-col :xs="14" :sm="14" :lg="8" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="excel" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总计：</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count" :duration="2600"></count-to>
        </div>
      </div>
    </el-col> -->
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="phy" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">物理机</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="phy_host_num" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="cloud" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">云服务器</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="cloud_host_num" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="vmware" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">虚拟机</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="vm_host_num" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="online" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">在线主机</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="online_host_num" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="line" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">离线主机</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="line_host_num" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="error" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">异常主机</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="abnormal_host_num" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="sum" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总计</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="count" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { countServer } from '@/api/resource'

export default {
  data() {
    return {
      count: 0,
      vm_host_num: 0,
      phy_host_num: 0,
      cloud_host_num: 0,
      online_host_num: 0,
      abnormal_host_num: 0,
      line_host_num: 0
    }
  },
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  },
  created() {
    countServer().then(res => {
      console.log(res.phy_host_num)
      this.count = res.count
      this.vm_host_num = res.vm_host_num
      this.phy_host_num = res.phy_host_num
      this.cloud_host_num = res.cloud_host_num
      this.online_host_num = res.online_host_num
      this.abnormal_host_num = res.abnormal_host_num
      this.line_host_num = res.line_host_num
      // alert(res['results'][0]['cloud_host_num'])
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 40px;
  }
  .card-panel {
    height: 220px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #cdcdcd;
      }
      .icon-message {
        background: #cdcdcd;
      }
      .icon-money {
        background: #cdcdcd;
      }
      .icon-shoppingCard {
        background: #cdcdcd
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 20px 0 0 20px;
      padding: 20px;
      transition: all 0.38s ease-out;
      border-radius: 10px;
    }
    .card-panel-icon {
      float: left;
      font-size: 85px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 40px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 25px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 35px;
      }
    }
  }
}
</style>
