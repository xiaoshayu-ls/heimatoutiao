<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
      <span @click="$emit('clear-search-history')">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell @click="onSearchClick(text, index)" v-for="(text, index) in searchHistories" :key="index" :title="text">
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  name: 'SearchHistory',
  components: {},
  // 定义属性
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSearchClick(text, index) {
      if (this.isDeleteShow) {
        // 删除状态 ，删除历史记录数据
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态，直接进入搜索
        this.$emit('search', text)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
</style>
