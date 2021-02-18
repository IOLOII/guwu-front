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
      >
        <el-button slot="trigger" size="medium">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="medium" type="primary" @click="submitUpload">上传到服务器</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传xls文件</div> -->
        <el-button type="primary" size="medium" @click="starAAA">点击开始同步</el-button>
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
          align="center"
          :loading="loading"
          :data="tableData"
          :columns="tableColumn"
          :sort-config="{trigger: 'cell', defaultSort: {field: 'age', order: 'desc'}, orders: ['desc', 'asc', null]}"
          @sort-change="sortChangeEvent"
        />
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
import { fileUpload, startAffair } from '@/api/guwu'
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
        totalResult: 20
      },
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'user_phone', title: '用户电话' },
        { field: 'user_name', title: '用户名' },
        { field: 'create_time', title: '入库时间', formatter: ['formatDate', 'yyyy-MM-dd'], sortable: true },
        { field: 'update_time', title: '最后更新', formatter: ['formatDate'], sortable: true },
        { field: 'user_mb', title: 'GMB (积分)', sortable: true }
      ],
      loading: false

    }
  },
  mounted() {

  },
  methods: {
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
      const formData = new FormData()
      formData.append('file', params.file)
      fileUpload(formData).then(res => {
        console.log(res)
        this.fileList.shift()
      }).catch(error => {
        console.log(error)
      })
    },
    // 开始数据库导入excel中的数据
    starAAA() {
      var data = {
        a: 123
      }
      startAffair(data).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    sortChangeEvent() {},
    handlePageChange() {}
  }
}
</script>

<style lang="scss" scoped>
  // 通用表格样式
  @import "@/styles/commonListPage.scss";

</style>
