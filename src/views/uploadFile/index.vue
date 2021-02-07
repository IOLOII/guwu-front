<template>
  <div class="app-container">
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
      <el-button slot="trigger" size="small">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
    </el-upload>
  </div>

</template>

<script>
import { fileUpload } from '@/api/guwu'
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
    }
  }
}
</script>

<style>

</style>
