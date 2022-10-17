<template>
  <div class="chart">
    <el-row>
      <el-col :span="14">
        <img class="errpage2_img" src="../../public/img/404.png" alt="" />
        <img
          class="errpage2_imgChildLeft"
          src="../../public/img/404_cloud.png"
          alt=""
        />
        <img
          class="errpage2_imgChildMin"
          src="../../public/img/404_cloud.png"
          alt=""
        />
        <img
          class="errpage2_imgChildRight"
          src="../../public/img/404_cloud.png"
          alt=""
        />
      </el-col>
      <el-col :span="10">
        <div>
          <div class="errpage2_title">OOPS!</div>
          <div class="errpage2_info1">
            版权所有
            <a class="errpage2_src" href="https://github.com/Sharon-zf/system"
              >GitHub</a
            >
          </div>
          <div class="errpage2_info2">网站管理员说你不能进入这个页面。。。</div>
          <div class="errpage2_info1">
            请检查您输入的URL是否正确，<br />或单击下面的按钮返回主页。
          </div>
          <el-button
            icon="el-icon-arrow-left"
            class="pan-back-btn"
            @click="back"
          >
            返回首页
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.push({ path: "/home" });
    },
  },
};
</script>
<style lang="less">
.errpage2_img {
  width: 100%;
  margin-top: 80px;
}
.errpage2_imgChildLeft {
  width: 80px;
  position: absolute;
  top: 30px;
  left: 200px;
  opacity: 0;
  animation-name: cloudLeft;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-delay: 1s;
}
.errpage2_imgChildMin {
  width: 46px;
  position: absolute;
  top: 90px;
  left: 340px;
  opacity: 0;
  animation-name: cloudMin;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-delay: 1.2s;
}
.errpage2_imgChildRight {
  width: 64px;
  position: absolute;
  top: 170px;
  left: 450px;
  opacity: 0;
  animation-name: cloudRight;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-delay: 1s;
}
@keyframes cloudLeft {
  0% {
    top: 30px;
    left: 200px;
    opacity: 0;
  }
  20% {
    top: 46px;
    left: 168px;
    opacity: 1;
  }
  80% {
    left: 72px;
    top: 94px;
    opacity: 1;
  }
  100% {
    left: 40px;
    top: 110px;
    opacity: 0;
  }
}
@keyframes cloudMin {
  0% {
    top: 90px;
    left: 340px;
    opacity: 0;
  }
  20% {
    top: 120px;
    left: 280px;
    opacity: 1;
  }
  80% {
    top: 210px;
    left: 100px;
    opacity: 1;
  }
  100% {
    top: 240px;
    left: 40px;
    opacity: 0;
  }
}
@keyframes cloudRight {
  0% {
    top: 170px;
    left: 450px;
    opacity: 0;
  }
  20% {
    top: 190px;
    left: 410px;
    opacity: 1;
  }
  80% {
    top: 250px;
    left: 290px;
    opacity: 1;
  }
  100% {
    top: 270px;
    left: 250px;
    opacity: 0;
  }
}
.pan-back-btn {
  margin-top: 30px;
  background: #409eff;
  color: white;
}
.errpage2_title {
  font-size: 45px;
  font-weight: 600px;
  color: #1582f0;
  margin-top: 80px;
}
.errpage2_info1 {
  color: #808080;
  font-size: 13px;
  margin: 20px 0px;
}
a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
  font-size: 20px;
  color: #1582f0;
}
// .errpage2_src{

// }
</style>