<template>
  <div class="header">
    <el-button @click="fold()" icon="el-icon-menu" circle></el-button>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in tags"
        :key="item.path"
        :to="{ path: item.path }"
        >{{ item.label }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="rigthButton">
      <span :class="isScreenfull ? 'iconfont icon-quxiaoquanping' : 'iconfont icon-quanping'" @click="screenFull"></span>
      <div class="headImg">
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          alt=""
        />
      </div>
      <el-dropdown split-button type="primary">
        个人中心
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>编辑资料</el-dropdown-item>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item divided @click.native="longinOut()"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// 引入全屏依赖
import screenfull from "screenfull";

export default {
  data(){
    return {
      isScreenfull: false
    }
  },
  methods: {
    fold() {
      this.$store.commit("collapseChange");
    },
    longinOut() {
      // console.log("退出");
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
    screenFull(){
      // 判断是否支持
      if (!screenfull.enabled) {
        this.$message({
          message: "不支持全屏",  
          type: "warning"
        });
        return false;
      }
      screenfull.toggle()
      this.isScreenfull = !this.isScreenfull
      // if(this.isScreenfull){
      //   this.isScreenfull = false
      // }else{
      //   this.isScreenfull = true
      // }
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>
<style lang="less" scoped>
@import "../../public/iconStyle/iconfont";
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rigthButton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68%;
    width: 220px;
    .headImg {
      border-radius: 10%;
      overflow: hidden;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>