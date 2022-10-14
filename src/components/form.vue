<template>
  <el-form ref="form" :model="userInfo" label-width="70px" :inline="inline">
    <el-form-item
      v-for="items in formInfo"
      :key="items.label"
      :label="items.label"
    >
      <el-input
        v-if="items.type === 'input'"
        :placeholder="'请输入' + items.label"
        v-model="userInfo[items.model]"
      ></el-input>
      <!-- <el-switch v-if="items.type === 'switch'"  v-model="userInfo[items.model]"></el-switch> -->
      <el-date-picker
        v-if="items.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="userInfo[items.model]"
      ></el-date-picker>
      <el-select
        v-if="items.type === 'select'"
        placeholder="请选择"
        v-model="userInfo[items.model]"
      >
        <el-option
          v-for="item in items.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    formInfo: [],
    userInfo: Object,
    inline: Boolean,
  },
};
</script>