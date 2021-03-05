<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onfollow"
    >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onfollow"
    >关注</van-button>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { deleteFollow, addFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  // 定义属性
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onfollow() {
      this.loading = true // 展示关注按钮的loading状态
      try {
        if (this.value) {
          // 已关注，则取消关注
          await deleteFollow(this.userId)
          // this.article.is_followed = false
        } else {
          // 未关注，则添加关注
          await addFollow(this.userId)
          // this.article.is_followed = true
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        this.$emit('input', !this.value)
      } catch (err) {
        let message = '加载失败,请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false // 展示关注按钮的loading状态
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
