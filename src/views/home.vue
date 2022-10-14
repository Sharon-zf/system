<template>
  <el-row class="home">
    <el-col :span="9">
      <el-card>
        <div class="user">
          <img class="userImg" :src="imgSrc" alt="" />
          <div class="userInfo">
            <p class="name">admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p class="time">上次登录时间：<span>xxxx-xx-xx</span></p>
          <p class="location">上次登录地点：<span>xxx</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; heigth: auto">
        <el-table :data="tabledata">
          <el-table-column
            v-for="(item, index) in tableLable"
            :key="index"
            :prop="index"
            :label="item"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="15">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.id"
          id="numCard"
          :body-style="{ padding: '0', height: '60px', width: '180px' }"
        >
          <div class="numIcon" :style="{ background: item.color }">
            <i
              :class="'el-icon-' + item.icon"
              :style="{ color: '#fdfefe', margin: '14px 14px' }"
            ></i>
          </div>
          <div class="numInfo">
            <p class="number">￥{{ item.number }}</p>
            <p class="numName">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; margin: 10px">
        <div style="height: 280px;" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 250px; width: 45%">饼状图</el-card>
        <el-card style="height: 250px; width: 45%">柱状图</el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../api/data.js";
import * as echarts from 'echarts';

export default {
  data() {
    return {
      imgSrc: require("../assets/user1.jpg"),
      tableLable: {
        name: "品牌",
        todayBuy: "日出售数",
        monthBuy: "月出售数",
        totalBuy: "总出售数",
      },
      tabledata: [],
      countData: [
        {
          id: "1",
          name: "今日支付订单",
          number: "1123",
          icon: "success",
          color: "#22b8cc",
        },
        {
          id: "2",
          name: "今日收藏订单",
          number: "1332",
          icon: "star-on",
          color: "#ffbc7d",
        },
        {
          id: "3",
          name: "今日未支付订单",
          number: "2223",
          icon: "error",
          color: "#51adf1",
        },
        {
          id: "4",
          name: "今日支付订单",
          number: "642",
          icon: "success",
          color: "#22b8cc",
        },
        {
          id: "5",
          name: "今日收藏订单",
          number: "1231",
          icon: "star-on",
          color: "#ffbc7d",
        },
        {
          id: "6",
          name: "今日未支付订单",
          number: "3241",
          icon: "error",
          color: "#51adf1",
        },
      ],
      
    };
  },
  mounted() {
    getData().then((res) => {
      //主页数据的获取
      // console.log(res);
      const { code, data } = res.data;
      if (code === 20000) {
        //左一表格数据的获取与处理
        this.tabledata = data.tableData;
        //折线图数据的获取与处理
        const order = data.orderData;
        const xData = order.date;
        const orderKey = Object.keys(order.data[0]);
        // console.log(orderKey);
        const series = [];
        orderKey.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => (item = item[key])),
            type: "line",
          });
        });
        const option = {
          xAxis:{
            data: xData
          },
          yAxis:{},
          legend:{
            data:orderKey
          },
          series
        }
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option)
      }
    });
  },
};
</script>
<style lang="less" scoped>
.user {
  border-bottom: #e0e0e0 2px solid;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  .userImg {
    width: 30%;
    display: inline-block;
  }
}

.userInfo {
  margin-left: 20px;
  .name,
  .access {
    line-height: 20px;
    display: block;
  }
  .name {
    font-size: 1.5rem;
  }
  .access {
    font-size: 0.8rem;
    color: #8d8d8d;
  }
}
.loginInfo {
  margin: 10px 0;
  .time,
  .location {
    line-height: 20px;
    font-size: 0.8rem;
  }
}
.num {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  #numCard {
    margin-top: 10px;
    .numIcon {
      display: inline-block;
      height: 60px;
      width: 60px;
      overflow: hidden;
      font-size: 32px;
    }
    .numInfo {
      display: inline-block;
      vertical-align: top;
      .number {
        font-size: 1.2rem;
        margin-top: 5px;
        margin-left: 10px;
      }
      .numName {
        font-size: 0.9rem;
        margin-top: 5px;
        margin-left: 10px;
      }
    }
  }
  .el-card__body {
    height: 50px;
    width: 100px;
  }
}
.graph {
  display: flex;
  justify-content: space-around;
}
</style>