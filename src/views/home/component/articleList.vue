<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item v-for ="(article, index) in list" :key="index" :article="article"></article-item>
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { getArticle } from '@/api/article.js'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  // 定义属性
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false,
      refreshing: false,
      refreshSuccessText: ''
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        // 1.请求获取数据
        const { data } = await getArticle({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(), // timestamp简单理解就是请求数据的页码；请求第1页数据：当前最新时间戳；用于请求之后数据的时间戳会在当前请求结果中返回给你
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsbdbdfxbnxfgn')
        // }
        // 2.吧请求结果数据放到list数组中
        const { results } = data.data
        // 数组的展开操作符，他会把数组元素一个一个拿出来
        this.list.push(...results)
        // 3.设置本次加载中loading状态结束
        this.loading = false
        // 4.判断数据是否加载结束
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    async onRefresh() {
      try {
        // 1.请求获取数据
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 下拉刷新，每次请求获取最新数据，所以传递当前最新时间戳
          with_top: 1
        })
        if (Math.random() > 0.2) {
          JSON.parse('dszvdzf')
        }
        // 2.将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3.关闭刷新的状态
        this.refreshing = false
        this.refreshSuccessText = `刷新成功，刷新了${results.length}条数据`
      } catch (err) {
        this.refreshing = false
        this.refreshSuccessText = '刷新失败'
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
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
