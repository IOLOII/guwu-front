<template>
  <el-container style="height: calc(100vh - 50px);">
    <el-header height="54px" class="toolbar-header">
      <!-- Header content -->
      <el-input v-model="phone" size="medium" placeholder="请输入电话">
        <el-button slot="append" icon="el-icon-search" @click="searchparam" />
      </el-input>
    </el-header>
    <el-container>
      <!-- <el-aside width="200px">
          Aside content
        </el-aside> -->
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
  </el-container>
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
        totalResult: 40
      },
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'user_phone', title: '用户电话' },
        { field: 'user_name', title: '用户名' },
        { field: 'create_time', title: '入库时间', formatter: ['formatDate', 'yyyy-MM-dd'], sortable: true },
        { field: 'update_time', title: '最后更新', formatter: ['formatDate'], sortable: true },
        { field: 'user_mb', title: 'GMB (积分)', sortable: true, formatter: ({ cellValue }) => {
          return cellValue.toString().split('.')[0]
        } }
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
  created() {
    // this.fetchData()
  },
  mounted() {
    this.do()
  },
  methods: {
    // 数据获取
    do() {
      this.loading = true
      getUserMB().then(res => {
        this.tableData = res.data.data
        this.tablePage.totalResult = res.data.totalResult
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    searchparam() {
      this.loading = true
      getUserMB({ user_phone: this.phone }).then(res => {
        this.tableData = res.data.data
        this.$forceUpdate()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    sortChangeEvent({ column, property, order }) {
      this.loading = true
      // console.log(arguments)
      getUserMB({
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
      getUserMB({
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

  .el-input{
    width: 180px;
  }
  // 通用表格样式
@import "@/styles/commonListPage.scss";
  // .toolbar-header{
  //   display: flex;
  //   height: 100%;
  //   align-items: center;
  // }
</style>
