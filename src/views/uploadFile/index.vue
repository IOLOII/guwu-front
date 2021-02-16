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
      <el-main height="">
        <!-- Main content -->
      </el-main>
      <el-footer height="">
        <!-- Footer content -->
      </el-footer>
    </el-container>
  </el-container>

</template>

<script>
import { fileUpload, startAffair } from '@/api/guwu'
export default {
  data() {
    return {
      fileList: []
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
    }
  }
}
</script>

<style lang="scss" scoped>
  // 通用表格样式
  @import "@/styles/commonListPage.scss";

</style>
