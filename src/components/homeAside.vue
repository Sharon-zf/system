<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3 id="tittle">{{ isCollapse ? "后台" : "某某后台管理系统" }}</h3>
    <!-- <span slot="title">分组一</span> -->
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
      @click="changePath(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.label">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="items in item.children" :key="items.name">
        <el-menu-item :index="items.path" @click="changePath(items)"
          >{{ items.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
     
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changePath(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      // console.log(this.asyncMenu.filter((item) => !item.children))
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      // console.log(this.asyncMenu.filter((item) => item.children)[0].children,'has')
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      // console.log(this.$store.state.tab.menu)
      return this.$store.state.tab.menu;
    },
  },
};
</script>
<style lang="less" scoped>
#tittle {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #409eff;
}
</style>