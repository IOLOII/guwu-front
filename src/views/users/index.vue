<template>
  <el-container style="height: calc(100vh - 50px)">
    <el-header height="54px" class="toolbar-header">
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col :span="12" :offset="0">
          <el-row type="flex" justify="start">
            <el-input
              v-model="searchparam"
              size="medium"
              placeholder="请输入账号"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchParam"
              />
            </el-input>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row type="flex" justify="end">
            <el-button size="medium" type="primary" @click="addUser('open')"
              >新增用户</el-button
            >
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- <el-aside width="200px">
          Aside content
        </el-aside> -->
      <el-container>
        <el-main
          height=""
          style="height: calc(100% - 102px); padding: 0px 20px"
        >
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
            :sort-config="{
              trigger: 'cell',
              defaultSort: { field: 'age', order: 'desc' },
              orders: ['desc', 'asc', null],
            }"
            @sort-change="sortChangeEvent"
          >
            <template v-slot:operate="{ row }">
              <!-- <template v-if="$refs.xGrid.isActiveByRow(row)">
                <vxe-button
                  icon="fa fa-save"
                  status="primary"
                  title="保存"
                  circle
                  @click="saveRowEvent(row)"
                ></vxe-button>
              </template>
              <template v-else>
                <vxe-button
                  icon="fa fa-edit"
                  title="编辑"
                  circle
                  @click="editRowEvent(row)"
                ></vxe-button>
              </template> -->
              <el-popconfirm
                :title="`确定删除用户【${row.user_name}】吗？`"
                @onConfirm="delUser(row)"
              >
                <vxe-button
                  title="删除"
                  circle
                  type="danger"
                  icon="el-icon-delete"
                  slot="reference"
                ></vxe-button>
              </el-popconfirm>

              <!-- <vxe-button icon="fa fa-eye" title="查看" circle></vxe-button>
              <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button> -->
            </template>
          </vxe-grid>
        </el-main>
        <el-footer height="48px">
          <!-- Footer content -->
          <vxe-pager
            :current-page="tablePage.currentPage"
            :page-size="tablePage.pageSize"
            :total="tablePage.totalResult"
            :layouts="[
              'PrevPage',
              'JumpNumber',
              'NextPage',
              'FullJump',
              'Sizes',
              'Total',
            ]"
            @page-change="handlePageChange"
          />
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="width"
      :before-close="dialogBeforeClose"
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="用户账号" prop="username">
                <el-input
                  v-model="form.username"
                  placeholder="请填写用户账号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户密码" prop="password">
                <el-input
                  type="password"
                  :disabled="true"
                  v-model="form.password"
                  placeholder="请填写用户账号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="确认密码" prop="password">
                <el-input
                  type="password"
                  :disabled="true"
                  v-model="form.password"
                  placeholder="请填写用户账号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户电话">
                <el-input
                  v-model="form.phone"
                  placeholder="请填写用户电话"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" @click="addUser('submit')">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { getUserInfoList, addUserIn } from '@/api/user'

export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 5, max: 13, message: '长度在 5 到 13 个字符', trigger: 'blur' }
        ]
      },
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
        { field: 'user_name', title: '用户账号' },
        { field: 'user_phone', title: '用户电话' },
        {
          field: 'create_time',
          title: '入库时间',
          formatter: ['formatDate', 'yyyy-MM-dd'],
          sortable: true
        },
        {
          field: 'update_time',
          title: '最后更新',
          formatter: ['formatDate'],
          sortable: true
        },
        {
          field: 'g_status',
          title: '是否可登录',
          sortable: true,
          formatter: ({ cellValue }) => {
            return cellValue === 1 ? '允许' : '禁止'
          }
        },
        {
          title: '操作',
          width: 160,
          showOverflow: true,
          slots: { default: 'operate' }
        }
      ],
      loading: false,
      dialogVisible: false,
      form: {
        username: '',
        password: '123456',
        phone: ''
      }
    }
  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        setTimeout(() => {
          document.querySelector(
            '.vxe-table--body-wrapper.body--wrapper'
          ).scrollTop = 0
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
  mounted() {},
  methods: {
    // 数据获取
    do() {
      this.loading = true
      getUserInfoList()
        .then(res => {
          this.tableData = res.data.data
          this.tablePage.totalResult = res.data.totalResult
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    searchParam() {
      this.loading = true
      getUserInfoList({ user_name: this.searchparam })
        .then(res => {
          this.tableData = res.data.data
          this.$forceUpdate()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    sortChangeEvent({ column, property, order }) {
      this.loading = true
      // console.log(arguments)
      getUserInfoList({
        user_name: this.searchparam,
        order: order,
        property: property
      })
        .then(res => {
          this.tablePage.totalResult = res.data.totalResult
          this.loading = false
        })
        .catch(() => {
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
      })
        .then(res => {
          this.tableData = res.data.data
          this.tablePage.totalResult = res.data.totalResult
          // this.$forceUpdate()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    addUser(flag) {
      if (flag === 'submit') {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 发送请求 注册用户
            addUserIn(this.form)
              .then(res => {
                this.do()
                this.dialogBeforeClose()
              })
              .catch(() => {})
              .finally(() => {})
          }
        })
      } else {
        this.dialogVisible = true
      }
    },
    dialogBeforeClose() {
      this.form = {
        username: '',
        password: '123456',
        phone: ''
      }
      this.dialogVisible = false
    },
    delUser(row) {
      this.$message.info('相关功能正在开发中')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
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
