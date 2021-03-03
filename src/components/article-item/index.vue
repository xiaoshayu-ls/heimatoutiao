<template>
    <!-- cell单元格的 to 属性和 VueRouter 中的 RouterLink 导航组件的 to 属性用法是一样的
    用法参考链接：https://router.vuejs.org/zh/api/#to
   :to="'/article'+article.art_id"
   :to="`/article/${article.art_id}`" -->
    <van-cell class="article-item"
      :to="{
        // 根据路由名称进行跳转
        name: 'article',
        // 传递路由动态参数
        params: {
          // 属性名：路由路径中设计的动态参数名称
          articleId: article.art_id
    }}">
      <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-warp">
          <div
            class="cover-item"
            v-for="(img,index) in article.cover.images"
            :key="index"
          >
            <van-image class="cover-item-img" :src="img" fit="cover" />
          </div>
        </div>
        <div class="label-info-warp">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate | relativeTime }}</span>
        </div>
      </div>
        <van-image
          v-if="article.cover.type === 1"
          slot="default"
          class="right-cover"
          fit="cover"
          :src="article.cover.images[0]"
      />
    </van-cell>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  name: 'ArticleItem',
  components: {},
  // 定义属性
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
.article-item{
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover{
    width: 232px;
    height: 146px;
  }
  .label-info-warp span{
    font-size: 22px;
    color:#b4b4b4;
    margin-right: 25px;
  }
  .cover-warp{
    display: flex;
    padding: 30px 0;
    .cover-item{
      flex: 1;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img{
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
