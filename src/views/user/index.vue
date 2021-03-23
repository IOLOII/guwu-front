<template>
  <el-container style="height: calc(100vh - 50px);">
    <el-header height="54px" class="toolbar-header">
      <!-- Header content -->
      <el-input v-model="searchparam" size="medium" placeholder="请输入账号">
        <el-button slot="append" icon="el-icon-search" @click="searchParam" />
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
import { getUserInfoList } from '@/api/user'

export default {
  data() {
    return {
      searchparam: '',
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
        { field: 'user_name', title: '用户名' },
        { field: 'user_phone', title: '用户电话' },
        { field: 'create_time', title: '入库时间', formatter: ['formatDate', 'yyyy-MM-dd'], sortable: true },
        { field: 'update_time', title: '最后更新', formatter: ['formatDate'], sortable: true },
        { field: 'g_status', title: '是否可登录', sortable: true, formatter: ({ cellValue }) => {
          return cellValue === 1 ? '允许' : '禁止'
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
    this.do()
  },
  mounted() {
  },
  methods: {
    // 数据获取
    do() {
      this.loading = true
      getUserInfoList().then(res => {
        this.tableData = res.data.data
        this.tablePage.totalResult = res.data.totalResult
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    searchParam() {
      this.loading = true
      getUserInfoList({ user_name: this.searchparam }).then(res => {
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
      getUserInfoList({
        user_name: this.searchparam,
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
      getUserInfoList({
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
