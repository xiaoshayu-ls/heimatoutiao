<template>
  <div class="home-container">
     <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 标签导航 -->
    <!-- 通过v-model绑定当前激活标签对应的索引值，交替情况下启用第一个标签。 -->
    <!-- 通过animated属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过swipeable属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title ="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channel = channel></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiaogengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道标签导航 -->

    <!-- 频道编辑弹出层 -->
    <van-popup
       v-model="isChannelEditShow"
       closeable
       position="bottom"
       close-icon-position="top-left"
       :style="{ height: '100%' }"
    >
    <channel-edit :my-channels="channels" :active="active" @updata-active="onUpdataActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { getUserChannels } from '@/api/user.js'
import ArticleList from './component/articleList'
import ChannelEdit from './component/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'homeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  // 定义属性
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false // 控制编辑频道弹出层的显示状态
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(['user'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadChannels () {
      try {
        // const { data } = await getUserChannels()
        // console.log(data)
        // this.channels = data.data.channels
        let channels = []
        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          //      有，拿来使用
          if (localChannels) {
            channels = localChannels
          }
          //      没有，请求获取默认频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdataActive(index, isChannelEditShow = true) {
      // 更新激活的频道项
      this.active = index
      // 关闭编辑啊频道弹层
      this.isChannelEditShow = isChannelEditShow
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadChannels()
  },
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
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs{
    .van-tabs__wrap{
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab{
      min-width: 200px;
      height: 82px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder{
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      width: 66px;
      height: 82px;
      i.toutiao {
        font-size: 33px;
      }
      &:before{
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
