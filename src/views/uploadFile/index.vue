<template>
  <el-container style="height: calc(100vh - 50px);">
    <el-header height="54px" class="toolbar-header">
      <!-- Header content -->
      <el-upload
        ref="upload"
        class="upload-demo"
        action="http://localhost:2414/fileUpload/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :http-request="upload"
        :multiple="false"
        :show-file-list="false"
      >
        <el-button slot="trigger" size="medium">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="medium" type="primary" @click="submitUpload">上传到服务器</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传xls文件</div> -->
        <el-button type="primary" size="medium" @click="startMix">点击开始同步</el-button>
      </el-upload>
    </el-header>
    <el-container>
      <el-main height="" style="height:calc(100% - 102px);padding:0px 20px;">
        <!-- Main content -->
        <vxe-grid
          ref="xGrid"
          border
          resizable
          height="auto"
          header-align="center"
          align="center"
          :loading="loading"
          :data="tableData"
          :columns="tableColumn"
          :sort-config="{trigger: 'cell', defaultSort: {field: 'age', order: 'desc'}, orders: ['desc', 'asc', null]}"
          @sort-change="sortChangeEvent"
        >
          <template v-slot:operation="{ row }">
            <el-button type="primary" size="medium" :disabled="row.g_status!==1" @click="starA(row)">{{ row.g_status!==1?"已导入":"导入数据库" }}</el-button>
          </template>
        </vxe-grid>
      </el-main>
      <el-footer height="48px">
        <!-- Footer content -->
        <vxe-pager
          :current-page="tablePage.currentPage"
          :page-size="tablePage.pageSize"
          :total="tablePage.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange"
        />
      </el-footer>
    </el-container>
  </el-container>

</template>

<script>
import { fileUpload, startAffair, getFileList, mixSqlData2Temp } from '@/api/guwu'
export default {
  data() {
    return {
      fileList: [],
      list: null,
      listLoading: false,
      allAlign: 'center',
      tableData: null,
      tablePage: {
        currentPage: 1,
        pageSize: 20,
        totalResult: 40
      },
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'file_name', title: '文件名', align: 'right', headerAlign: 'center' },
        { field: 'file_type', title: '文件类型', formatter: ({ cellValue }) => {
          switch (cellValue) {
            case 1: {
              return '抖音店铺订单'
            }
            case 0: {
              return '我打物流订单'
            }
            default: {
              return '其他文件'
            }
          }
        } },
        { field: 'create_time', title: '入库时间', formatter: ['formatDate', 'yyyy-MM-dd'], sortable: true },
        { field: 'update_time', title: '最后更新', formatter: ['formatDate'], sortable: true },
        { title: '操作', width: 160, showOverflow: true, slots: { default: 'operation' }}
      ],
      loading: false

    }
  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        setTimeout(() => {
          document.querySelector('.vxe-table--body-wrapper.body--wrapper').scrollTop = 0
          this.value = newVal
        })
      },
      deep: true
    }
  },
  mounted() {
    this.do()
  },
  methods: {
    do() {
      this.loading = true
      getFileList().then(res => {
        this.tableData = res.data.data
        this.tablePage.totalResult = res.data.totalResult
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    upload(params) {
      this.loading = true
      const formData = new FormData()
      formData.append('file', params.file)
      fileUpload(formData).then(res => {
        console.log(res)
        this.fileList.shift()
        this.do()
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    // 开始数据库导入excel中的数据
    starA(row) {
      var data = {
        fileName: row.file_name,
        key: row.file_type === 0 ? 'woda' : (row.file_type === 1 ? 'tiktok' : -1)
      }
      if (data.key === -1) return
      startAffair(data).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    startMix() {
      mixSqlData2Temp({}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    sortChangeEvent({ column, property, order }) {
      this.loading = true
      // console.log(arguments)
      getFileList({
        user_phone: this.phone,
        order: order,
        property: property }).then(res => {
        this.tablePage.totalResult = res.data.totalResult
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 分页查询
    handlePageChange({ currentPage, pageSize }) {
      this.loading = true
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      getFileList({
        currentPage: currentPage,
        pageSize: pageSize
      }).then(res => {
        this.tableData = res.data.data
        this.tablePage.totalResult = res.data.totalResult
        // this.$forceUpdate()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  // 通用表格样式
  @import "@/styles/commonListPage.scss";

</style>
