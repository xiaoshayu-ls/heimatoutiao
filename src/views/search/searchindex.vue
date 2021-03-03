<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text='searchText'></search-result>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch">
    </search-suggestion>
    <!-- /联想建议 -->
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-history="searchHistories=[]"
      @search="onSearch">
    </search-history>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import SearchHistory from './component/searchhistory'
import SearchSuggestion from './component/searchsuggestion'
import SearchResult from './component/searchresult'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'searchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  // 定义属性
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的显示
      searchHistories: getItem('TOUTIAO_SAERCH_HOSTORIES') || [] // 搜索历史记录数据
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SAERCH_HOSTORIES', value)
    }
  },
  // 方法集合
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求：不要有重复历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
      console.log(val)
    },
    onCancel() {
      this.$router.back()
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
.search-container{
  padding-top: 108px;
  .van-search__action{
    color: #fff;
  }
  .search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
