<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text, index) in suggestions" :key="index" @click="$emit('search', text)">
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
    <!-- 双花括号绑定会直接输出纯文本内容 -->
    <!-- <div>{{ htmlStr }}</div> -->
    <!-- 使用 v-html指定可以绑定渲染带有HTML标签的字符串 -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  // 定义属性
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handle函数
      // 注意：handle函数名称是固定的
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },

      // debounce函数 参数1：一个函数 ，参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 500),
      immediate: true // 该回调将会在侦听之后被立即调用
    }
  },
  // 方法集合
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      // 正则表达式 //中间的内容都会被当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span style="color:red">${this.searchText}</span>`)
      // return text.replace(eval('/' + this.searchText + '/gi'), `<span style="color:red">${this.searchText}</span>` )
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
