<template>
  <div class="mask">
    <div class="login">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="loginItmes"
        style="max-width: 460px"
        :rules="rules"
        status-icon
      >
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="loginItmes.username" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input placeholder="请输入密码" v-model="loginItmes.password" type="password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" class="loginBtn" @click="login()"
        >登录</el-button
      >
    </div>
  </div>
</template>
<script>
import { getMenu } from '@/api/data';
export default {
  data() {
    return {
      labelPosition: "right",
      loginItmes: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods:{
    login(){
      getMenu(this.loginItmes).then(({ data: res })=>{
        // console.log(res)
        if(res.code === 20000){
          this.$store.commit('clearMenu');
          this.$store.commit('setMenu',res.data.menu);
          this.$store.commit('setToken',res.data.token);
          this.$store.commit('addMenu',this.$router);
          this.$router.push({name: 'home'})
        }else{
          this.$message.warning(res.data.message)
        }
      })
    }
  }
};
</script>
<style lang="less">
.mask {
  width: 100%;
  height: 100vh;
  background-color: rgb(168, 172, 175);
  .login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    padding: 30px 50px;
    border-radius: 7px;
    .loginBtn {
      display: block;
      margin: 10px auto;
    }
  }
}
</style>