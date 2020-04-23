<template>
  <div>
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item>
        <el-select v-model="searchForm.idc" style="width: 150px">
          <el-option
            v-for="(item, index) in searchIdcsList"
            :key="index"
            :label="item.idc_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.cabinet" style="width: 150px">
          <el-option
            v-for="(item, index) in searchCabinetList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.hostname" placeholder="请输入主机名或IP地址" style="width: 180px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchClick()">搜索</el-button>
        <el-button type="primary" @click="addClick()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="serverList"
          border
          class="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form  label-position="left" inline class="table-form-expand">
            <el-form-item label="制造商：">
              <span>{{ props.row.manufacturer }}</span>
            </el-form-item>
            <el-form-item label="服务器类型：">
              <span>{{ props.row.model_name }}</span>
            </el-form-item>
            <el-form-item label="操作系统：">
              <span>{{ props.row.os }}</span>
            </el-form-item>
             <el-form-item label="uuid：">
              <span>{{ props.row.uuid }}</span>
            </el-form-item>
            <el-form-item label="CPU：">
              <span>{{ props.row.cpu }}</span>
            </el-form-item>
            <el-form-item label="CPU使用率：">
              <span>{{ props.row.cpu_use }}</span>
            </el-form-item>
             <el-form-item label="网卡设备名：">
              <span>{{ props.row.network_name }}</span>
            </el-form-item>
            <el-form-item label="网卡MAC：">
              <span>{{ props.row.network_mac }}</span>
            </el-form-item>
            <el-form-item label="硬盘名：">
              <span>{{ props.row.disk_name }}</span>
            </el-form-item>
            <el-form-item label="硬盘大小：">
              <span>{{ props.row.disk_size }}</span>
            </el-form-item>
            <el-form-item label="内存：">
              <span>{{ props.row.mem }}</span>
            </el-form-item>
            <el-form-item label="内存使用率：">
              <span>{{ props.row.mem_use }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
              prop="hostname"
              label="主机名"
              align="center">
      </el-table-column>
      <el-table-column
              prop="ip"
              label="IP"
              align="center">
      </el-table-column>
      <el-table-column
              prop="server_type"
              label="主机类型"
              align="center">
      </el-table-column>
      <el-table-column
              prop="use"
              label="用途"
              align="center">
      </el-table-column>
      <el-table-column
              label="状态"
              align="center">
          <template slot-scope="scope">
            <el-tag type=success v-if="scope.row.status === '在线'">在线</el-tag>
            <el-tag type=warning v-if="scope.row.status === '异常'">异常</el-tag>
            <el-tag type=info v-if="scope.row.status === '离线'">离线</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="idc.name"
        label="所在机房"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cabinet.name"
        label="所在机柜"
        align="center">
      </el-table-column>
      <el-table-column
              label="WebSSH"
              align="center">
            <template slot-scope="scope">
           <el-button
          size="mini"
          v-if="scope.row.status === '离线'"
          disabled=true
          @click="rtty(scope.row)">连接</el-button>
          <el-button
          size="mini"
          v-if="scope.row.status === '异常' || scope.row.status === '在线'"
          @click="rtty(scope.row)">连接</el-button>
          </template>
      </el-table-column>
      <el-table-column
              label="系统状态"
              align="center">
            <template slot-scope="scope">
           <el-button
          size="mini"
          v-if="scope.row.status === '离线'"
          disabled=true
          @click="vmstats(scope.row)">查看</el-button>
          <el-button
          size="mini"
          v-if="scope.row.status === '异常' || scope.row.status === '在线'"
          @click="vmstats(scope.row)">查看</el-button>
          </template>
      </el-table-column>
      <el-table-column
              prop="last_check"
              label="LAST CHECK"
              width="155"
              align="center">
      </el-table-column>
      <el-table-column
              prop=""
              label="操作"
              width="100"
              align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editClick(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="text-center" v-show="total_num>=10">
      <el-pagination
              background
              @current-change="paginationChange"
              layout="total, prev, pager, next, jumper"
              :current-page.sync="page"
              :total="total_num">
      </el-pagination>
    </div>
    <el-dialog title="添加主机" :visible.sync="addServerVisible">
      <el-form ref="addServerForm" :model="addServerForm" label-width="75px" :rules="addServerFormRules">
        <el-form-item label="主机IP" prop="ip">
            <el-input v-model="addServerForm.ip" placeholder="请输入主机IP"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="addServerForm.username" placeholder="请输入主机登录用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" show-password>
            <el-input placeholder="请输入主机登录密码" type="password" v-model="addServerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="主机类型" prop="server_type">
            <el-select v-model="addServerForm.server_type">
              <el-option
                v-for="(item, index) in servertypeList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="系统类型" prop="os_type">
            <el-input v-model="addServerForm.os_type" placeholder="请输入操作系统类型"></el-input>
        </el-form-item> -->
        <el-form-item label="用途" prop="use">
            <el-input v-model="addServerForm.use" placeholder="请输入主机用途"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="addServerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改主机" :visible.sync="changeServerVisible">
      <el-form ref="changeServerForm" :model="changeServerForm" label-width="70px" :rules="changeServerFormRules">
        <el-form-item label="主机名称" prop="hostname">
            <el-input v-model="changeServerForm.hostname" :disabled="true" placeholder="请输入主机名称"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="manage_ip">
            <el-input v-model="changeServerForm.ip" :disabled="true" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-select v-model="changeServerForm.status">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="机房" prop="idc">
          <el-select v-model="changeServerForm.idc" @change="changeIdc">
            <el-option
              v-for="(item, index) in idcsList"
              :key="index"
              :label="item.idc_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机柜" prop="cabinet">
          <el-select v-model="changeServerForm.cabinet">
            <el-option
              v-for="(item, index) in cabinetList"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="changeServerForm.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="changeServerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitchangeServerClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getServerList, deleteServer, getIdcsList, getCabinetList, updateServer, addServer } from '@/api/resource'
export default {
  data() {
    return {
      loading: false,
      serverList: [],
      total_num: 0,
      page: 1,
      isFormVisible: false,
      state: 0,
      searchForm: {
        hostname: '',
        idc: '',
        cabinet: '',
        'page': 1
      },
      idcsList: [],
      cabinetList: [],
      cardList: [],
      ipList: [],
      searchCabinetList: [{ id: '', name: '所有机柜' }],
      addServerVisible: false,
      changeServerVisible: false,
      statusList: ['在线', '离线', '异常'],
      servertypeList: ['物理机', '虚拟机', '云服务器'],
      addServerForm: {
        ip: '',
        username: '',
        password: '',
        use: '',
        server_type: ''
      },
      changeServerForm: {
        id: '',
        hostname: '',
        ip: '',
        status: '',
        remark: '',
        idc: '',
        cabinet: ''
      },
      addServerFormRules: {
        ip: [
          { required: true, trigger: 'blur', message: '请输入IP' }
        ],
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        server_type: [
          { required: true, trigger: 'blur', message: '请选择主机类型' }
        ],
        use: [
          { required: true, trigger: 'blur', message: '请输入用途' }
        ]
      },
      changeServerFormRules: {
        status: [
          { required: true, trigger: 'blur', message: '请选择状态' }
        ]
      }
    }
  },
  computed: {
    searchIdcsList() {
      return [{ id: '', idc_name: '所有机房' }].concat(this.idcsList)
    }
  },
  watch: {
    state() {
      getIdcsList({ page_size: 0 }).then(res => {
        this.idcsList = res.map(item => {
          return { id: item.id, idc_name: item.name }
        })
      })
      this.fetchData()
      // getCabinetList({ page_size: 0 }).then(res => {
      //   this.cabinetList = res
      //   console.log(this.cabinetList)
      // })
    },
    'searchForm.idc'(val) {
      this.searchCabinetList = [{ id: '', name: '所有机柜' }]
      this.searchForm.cabinet = ''
      // if (!val) {
      //   this.searchForm.cabinet = ''
      //   return
      // }
      getCabinetList({ idc: val, page_size: 0 }).then(res => {
        this.searchCabinetList = this.searchCabinetList.concat(res.map(item => {
          return { id: item.id, name: item.name }
        }))
      })
    },
    'changeServerForm.idc'(val) {
      if (!val) {
        this.changeServerForm.cabinet = ''
        return
      }
      getCabinetList({ idc: val, page_size: 0 }).then(res => {
        this.cabinetList = res.map(item => {
          return { id: item.id, name: item.name }
        })
      })
    }
  },
  created() {
    this.state = 1
  },
  methods: {
    fetchData(params) {
      this.loading = true
      getServerList(params).then(res => {
        this.serverList = res.results
        this.total_num = res.count
        this.loading = false
      })
    },
    paginationChange(val) {
      this.searchForm.page = val
      this.fetchData(Object.assign(this.searchForm))
    },
    searchClick() {
      this.fetchData(Object.assign(this.searchForm))
    },
    changeIdc() {
      this.changeServerForm.cabinet = ''
    },
    editClick(row) {
      if (this.$refs['changeServerForm'] !== undefined) {
        this.$refs['changeServerForm'].resetFields()
      }
      const { id, hostname, ip, status, remark } = row
      const { idc } = { idc: row.idc.id }
      const { cabinet } = { cabinet: row.cabinet.id }
      this.changeServerForm = { id, hostname, ip, status, remark, idc, cabinet }
      this.changeServerVisible = true
    },
    addClick() {
      this.addServerVisible = true
      if (this.$refs['addServerVisible'] !== undefined) {
        this.$refs['addServerVisible'].resetFields()
      }
    },
    deleteClick(row) {
      this.$confirm('是否删除 ' + row.hostname + '【' + row.ip + '】', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServer(row.id).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          if (this.serverList.length === 1 && this.searchForm.page > 1) {
            this.searchForm.page = this.searchForm.page - 1
          }
          this.fetchData(Object.assign(this.searchForm))
        })
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    },
    rtty(row) {
      window.open('http://39.97.118.148:5912/#/?id=' + row.network_mac)
    },
    vmstats(row) {
      window.open('http://' + row.ip + ':9231')
    },
    submitForm() {
      this.$refs['addServerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.addServerForm)
        addServer(params).then(res => {
          this.addServerVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    submitchangeServerClick() {
      this.$refs['changeServerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        updateServer(this.changeServerForm.id, this.changeServerForm).then(res => {
          this.changeServerVisible = false
          this.fetchData(Object.assign(this.searchForm))
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-form-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>



