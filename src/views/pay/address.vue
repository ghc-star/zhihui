<template>
  <div>
    <div class="add" v-if="xianshi">
      <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
      <div>
        <div class="info" v-if="true">
          <div class="info-content">
            <span class="name">11</span> <span class="mobile">18240755158</span>
          </div>
          <div class="info-address">上海 上海市 黑马程序员1号楼101室</div>
          <div class="box2">
            <van-checkbox v-model="checked">默认</van-checkbox>
            <span>编辑</span>
            <span>删除</span>
          </div>
        </div>
        <hr />
      </div>
      <button>添加新地址</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      xianshi: true,
    };
  },
  methods: {
    onClickLeft() {
      history.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  justify-content: space-between;
  .price {
    color: #fa2209;
  }
}
.box2 {
  display: flex;
  justify-content: space-between;
}
button {
  height: 30px;
  width: 100%;
  border-radius: 15px;
}
</style>