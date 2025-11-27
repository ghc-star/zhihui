<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search
      v-model="search"
      show-action
      placeholder="请输入搜索关键词"
      clearable
    >
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clean" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div
          class="list-item"
          v-for="item in history"
          :key="item"
          @click="goSearch(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory } from "@/utils/storage";
export default {
  name: "SearchIndex",
  data() {
    return {
      search: "",
      history: getHistory(), //历史记录
    };
  },
  methods: {
    goSearch(key) {
      // const index = this.history.indexOf(key);
      // if (index !== -1) {
      //   //存在相同的项，将原有关键字移除
      //   //splice(从哪开始，删除几个，项一，项二)
      //   this.history.splice(index, 1);
      // }
      // this.history.unshift(key);

      //用filter方法实现
      const filteredHistory = this.history.filter((item) => item !== key);
      this.history = [key, ...filteredHistory];
      setHistory(this.history);
      //跳到搜索列表页
      this.$router.push(`/searchList?search=${key}`);
    },
    clean() {
      setHistory((this.history = []));
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>