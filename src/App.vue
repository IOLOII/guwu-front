<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
body {
  cursor: url("/image/Illustration/mouse.ico"), auto;
}
/* .app-container{
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 800px !important;
}
.gGrid{
  height: calc(100% - 90px);
  margin-top: 6px;
} */
.el-row {
  width: 100%;
  // flex-direction: row;
  // flex-wrap: wrap;
  // & .el-row {
  //   flex-wrap: nowrap;
  // }
}
.el-dialog {
  margin-top: 15vh;
  width: 30%;
}
</style>
