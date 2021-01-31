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

    <vxe-grid
      ref="xGrid"
      border
      resizable
      height="530"
      align="center"
      :loading="loading"
      :data="tableData"
      :columns="tableColumn"
      :sort-config="{trigger: 'cell', defaultSort: {field: 'age', order: 'desc'}, orders: ['desc', 'asc', null]}"
      @sort-change="sortChangeEvent"
    >
      <!-- <vxe-table-column type="seq" width="60" />
      <vxe-table-column field="user_phone" title="用户电话" />
      <vxe-table-column field="user_name" title="用户名" />
      <vxe-table-column field="create_time" title="入库时间" :formatter="['formatDate','yyyy-MM-dd']" sortable />
      <vxe-table-column field="update_time" title="最后更新" :formatter="['formatDate']" sortable />
      <vxe-table-column field="user_mb" title="GMB (积分)" sortable /> -->
    </vxe-grid>
    <vxe-pager
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange"
    />
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
  created() {
    // this.fetchData()
  },
  mounted() {
    this.do()
  },
  methods: {
    do() {
      this.loading = true
      getUserMB().then(res => {
        this.tableData = res.data
        this.$forceUpdate()
        this.loading = false
      })
    },
    searchparam() {
      this.loading = true
      getUserMB({ user_phone: this.phone }).then(res => {
        this.tableData = res.data
        this.$forceUpdate()
        this.loading = false
      })
    },
    sortChangeEvent({ column, property, order }) {
      this.loading = true
      // console.log(arguments)
      getUserMB({ user_phone: this.phone, order: order, property: property }).then(res => {
        this.tableData = res.data
        this.$forceUpdate()
        this.loading = false
      })
    },
    // TODO:分页查询
    handlePageChange({ currentPage, pageSize }) {
      console.log(arguments)
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-input{
    width: 180px;
  }
</style>
