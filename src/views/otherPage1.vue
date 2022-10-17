<template>
  <div class="chart">
    <el-row>
      <el-col class="errPageLeft" :span="12">
        <div>
          <el-button
            icon="el-icon-arrow-left"
            class="pan-back-btn"
            @click="back"
          >
            返回
          </el-button>
          <h1 class="h1_401">Oops!</h1>
          <h2 class="h2_401">你没有权限去该页面</h2>
          <h6 class="h6_401">如有不满请联系你领导</h6>
          <ul class="ul_401">
            <li>或许你可以：</li>
            <li @click="back">
              <a href="#">回首页</a>
            </li>
            <li>
              <a href="https://www.taobao.com/">随便看看</a>
            </li>
            <li @click="dialogVisible = true">
              <a href="#">打发时间</a>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12">
        <img style="margin-top: 30px" :src="errGif" alt="">
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="打发时间">
      <img class="dislogImg" src="https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646" alt="">
    </el-dialog>
  </div>
</template>
<script>
import errGif from '../../public/img/401.gif'
export default {
  data(){
    return {
      errGif: errGif + '?' + new Date(),
      dialogVisible: false
    }
  },
  methods: {
    back() {
      this.$router.push({ path: "/home" });
    },
  },
};
</script>
<style lang="less">
.chart {
  width: 100%;
  height: 100%;
  .errPageLeft{
    display: flex;
    align-items: center;
    justify-content: center;
    .pan-back-btn{
      margin-top: 50px;
      background: #409eff;
      color: white;
    }
  }
  .h1_401 {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
    line-height: 140px;
  }
  .h2_401 {
    line-height: 70px;
  }
  .h6_401 {
    line-height: 40px;
  }
  .ul_401 {
    margin-left: 30px;
  }
  .dislogImg{
    width: 100%;
  }
}
a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}
</style>