<template>
  <div class="home">
    <el-container>
      <el-aside style="width:auto">
        <HomeAside></HomeAside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/header.vue"
import HomeAside from "../components/homeAside.vue"
export default {
  name: "mian",
  components: {
    HomeAside,
    Header,
  },
};
</script>
<style>
.el-menu-vertical-demo{
  height: 130vh;
}

.el-header {
  background-color: #dee1e6;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #f1f3f4;
  color: #333;
}
</style>