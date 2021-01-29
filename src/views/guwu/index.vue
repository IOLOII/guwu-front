<template>
  <div class="app-container">
    <!-- <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

    </el-table> -->

    <el-input v-model="phone" size="medium" placeholder="请输入电话">
      <el-button slot="append" icon="el-icon-search" @click="searchparam" />
    </el-input>

    <vxe-table
      :align="allAlign"
      :data="tableData"
    >
      <vxe-table-column type="seq" width="60" />
      <vxe-table-column field="user_phone" title="用户电话" />
      <vxe-table-column field="user_name" title="用户名" />
      <vxe-table-column field="update_time" title="最后更新" />
      <vxe-table-column field="MB" title="GMB (积分)" />
    </vxe-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { getUserMB } from '@/api/guwu'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
      phone: '',
      list: null,
      listLoading: false,
      allAlign: 'center',
      tableData: null
    }
  },
  created() {
    // this.fetchData()
  },
  mounted() {
    this.do()
  },
  methods: {
    do() {
      getUserMB().then(res => {
        this.tableData = res.data
      })
    },
    searchparam() {
      getUserMB({ user_phone: this.phone }).then(res => {
        this.tableData = res.data
        this.$forceUpdate()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-input{
    width: 180px;
  }
</style>
