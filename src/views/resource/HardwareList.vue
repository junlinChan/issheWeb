<template>
  <div class="user-list-container">
    <el-row :gutter="24">
      <el-col :span="12" >
         <el-input placeholder="搜索" v-model="search_key" @keyup.enter.native="searchClick">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input>
      </el-col>
      <el-col :span="6" :offset="6" class="text-right">
        <el-button type="primary" @click="addClick">添加</el-button>
      </el-col>
    </el-row>
    <!-- 添加Hardware开始 -->
    <el-dialog title="添加硬件" :visible.sync="isFormVisible">
        <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addRule">
            <el-form-item label="硬件名称" prop="name">
                <el-input v-model="addForm.name" maxlength="15" placeholder="请输入硬件名称"></el-input>
            </el-form-item>
            <el-form-item label="厂商" prop="manufacturer">
                <el-input v-model="addForm.manufacturer" maxlength="10" placeholder="请输入厂商"></el-input>
            </el-form-item>
            <el-form-item label="型号" prop="model_name">
                <el-input v-model="addForm.model_name" maxlength="15" placeholder="请输入型号"></el-input>
            </el-form-item>
            <el-form-item label="工作电压" prop="work_voltage">
                <el-input v-model="addForm.work_voltage" maxlength="20"  placeholder="请输入工作电压"></el-input>
            </el-form-item>
            <el-form-item label="推荐输入电压" prop="re_inputvoltage">
                <el-input v-model="addForm.re_inputvoltage" maxlength="30" placeholder="请输入推荐输入电压"></el-input>
            </el-form-item>
            <el-form-item label="极限输入电压" maxlength="50" prop="remark">
                <el-input v-model="addForm.max_inputvoltage" placeholder="请输入极限输入电压"></el-input>
            </el-form-item>
             <el-form-item label="闪存" prop="flash">
                <el-input v-model="addForm.flash" maxlength="20"  placeholder="请输入闪存"></el-input>
            </el-form-item>
            <el-form-item label="SRAM" prop="sram">
                <el-input v-model="addForm.sram" maxlength="30" placeholder="请输入SRAM"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="nums">
                <el-input v-model="addForm.nums" maxlength="30" placeholder="请输入数量"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- /结束 -->
    <!-- 修改Hardware开始 -->
    <el-dialog title="修改硬件信息" :visible.sync="isEditFormVisible">
        <el-form ref="editForm" :model="editForm" label-width="80px" :rules="addRule">
            <el-form-item label="硬件名称" prop="name">
                <el-input v-model="editForm.name" maxlength="15" placeholder="请输入硬件名称"></el-input>
            </el-form-item>
            <el-form-item label="厂商" prop="manufacturer">
                <el-input v-model="editForm.manufacturer" maxlength="10" placeholder="请输入厂商"></el-input>
            </el-form-item>
            <el-form-item label="型号" prop="model_name">
                <el-input v-model="editForm.model_name" maxlength="15" placeholder="请输入型号"></el-input>
            </el-form-item>
            <el-form-item label="工作电压" prop="work_voltage">
                <el-input v-model="editForm.work_voltage" maxlength="20" placeholder="请输入工作电压"></el-input>
            </el-form-item>
            <el-form-item label="推荐输入电压" maxlength="30" prop="re_inputvoltage">
                <el-input v-model="editForm.re_inputvoltage" placeholder="请输入推荐输入电压"></el-input>
            </el-form-item>
            <el-form-item label="极限输入电压" maxlength="50" prop="max_inputvoltage">
                <el-input v-model="editForm.max_inputvoltage" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="闪存" maxlength="30" prop="flash">
                <el-input v-model="editForm.flash" placeholder="闪存"></el-input>
            </el-form-item>
            <el-form-item label="SRAM" maxlength="50" prop="sram">
                <el-input v-model="editForm.sram" placeholder="SRAM"></el-input>
            </el-form-item>
            <el-form-item label="数量" maxlength="50" prop="nums">
                <el-input v-model="editForm.nums" placeholder="数量"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isEditFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEditForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- /结束 -->
    <el-table
            class="table"
            v-loading="loading"
            element-loading-text="拼命加载中"
            :data="dataList"
            border
            >
        <el-table-column
                prop="name"
                label="硬件名称"
                align="center">
        </el-table-column>
        <el-table-column
                prop="manufacturer"
                label="厂商"
                align="center">
        </el-table-column>
        <el-table-column
                prop="model_name"
                label="型号"
                align="center">
        </el-table-column>
        <el-table-column
                prop="work_voltage"
                label="工作电压"
                align="center">
        </el-table-column>
        <el-table-column
                prop="re_inputvoltage"
                label="推荐输入电压"
                align="center">
        </el-table-column>
        <el-table-column
                prop="max_inputvoltage"
                label="极限输入电压"
                align="center">
        </el-table-column>
        <el-table-column
                prop="flash"
                label="闪存"
                align="center">
        </el-table-column>
        <el-table-column
                prop="sram"
                label="SRAM"
                align="center">
        </el-table-column>
         <el-table-column
                prop="nums"
                label="数量"
                align="center">
        </el-table-column>
        <el-table-column
                prop=""
                label="操作"
                width="215"
                align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="editClick(scope.row)">修改</el-button>
              <el-button type="text" size="small"  @click="deleteClick(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { getHardwareList, addHardware, updateHardware, deleteHardware } from '@/api/resource'

export default {
  data() {
    return {
      loading: false,
      dataList: [],
      total_num: 0,
      page: 1,
      state: 0,

      search_key: '',
      isFormVisible: false,
      isEditFormVisible: false,
      editForm: {},
      addForm: {
        name: '',
        manufacturer: '',
        model_name: '',
        work_voltage: '',
        re_inputvoltage: '',
        max_inputvoltage: '',
        flash: '',
        sram: ''
      },
      addRule: {
        name: [
          { required: true, message: '请输入硬件名称', trigger: 'blur' }
        ],
        manufacturer: [
          { required: true, message: '请输入厂商', trigger: 'blur' }
        ],
        model_name: [
          { required: true, message: '型号', trigger: 'blur' }
        ],
        work_voltage: [
          { required: true, message: '工作电压', trigger: 'blur' }
        ],
        re_inputvoltage: [
          { required: true, message: '推荐输入电压', trigger: 'blur' }
        ],
        max_inputvoltage: [
          { required: true, message: '极限输入电压', trigger: 'blur' }
        ],
        flash: [
          { required: true, message: '闪存', trigger: 'blur' }
        ],
        sram: [
          { required: true, message: 'SRAM', trigger: 'blur' }
        ],
        nums: [
          { required: true, message: '数量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      console.log(this.search_key)
      getHardwareList({ page: this.page, name: this.search_key }).then(res => {
        this.dataList = res.results
        this.total_num = res.count
        this.loading = false
      })
    },
    searchClick() {
      this.page = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.page = val
      this.fetchData()
    },
    addClick() {
      this.isFormVisible = true
      if (this.$refs['addForm'] !== undefined) {
        this.$refs['addForm'].resetFields()
      }
    },
    submitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.addForm)
        addHardware(params).then(res => {
          this.isFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    editClick(row) {
      if (this.$refs['editForm'] !== undefined) {
        this.$refs['editForm'].resetFields()
      }

      const { id, name, manufacturer, model_name, work_voltage, re_inputvoltage, max_inputvoltage, flash, sram, nums } = row
      this.editForm = { id, name, manufacturer, model_name, work_voltage, re_inputvoltage, max_inputvoltage, flash, sram, nums }
      this.isEditFormVisible = true
    },
    submitEditForm() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return
        }
        updateHardware(this.editForm.id, this.editForm).then(res => {
          this.isEditFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    deleteClick(row) {
      this.$confirm('此操作将删除 “' + row.name + '” , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHardware(row.id).then(response => {
          this.$message({
            message: '删除 “' + row.name + '” 成功',
            type: 'success'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    }
  },
  created() {
    this.state = 1
  },
  watch: {
    state() {
      this.fetchData()
    }
  }
}
</script>
