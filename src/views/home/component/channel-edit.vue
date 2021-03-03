<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border=false>
      <div slot="title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        round
        plain
        size="small"
        @click="isEdit =! isEdit"
      >
        {{isEdit ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="index"
        @click="onMyChannelclick(channel,index)"
      >
      <van-icon slot="icon" name="clear" v-show="isEdit && !fixedChannels.includes(channel.id)"></van-icon>
      <span
        class="text"
        :class="{active:index===active}"
        slot="text"
      >
      {{channel.name}}
      </span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border=false>
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="recommond-grid" :gutter="10">
      <van-grid-item class="grid-item" icon="plus" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" @click="onAddChannel(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  name: 'ChannelEdit',
  components: {},
  // 定义属性
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false,
      fixedChannels: [0]
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      // 数组的filter方法：遍历数组 把符合条件的元素存储到新数组并返回
      return this.allChannels.filter(channel => {
        // const channels = []
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // return channels
      })
    }
    // recommendChannels() {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    // find遍历数组 找到满足条件的元素项
    //     const ret = this.myChannels.find(myChannel => {
    //       return channel.id === myChannel.id
    //     })
    //     // 如果我的频道中不包括该频道，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  // 监控data中的数据变化
  watch: {}, // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadAllChannels()
  },
  // 方法集合
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      if (this.user) {
      // 已登录，把数据请求接口放到线上
        try {
          await addUserChannel({
            id: channel.id, // 频道ID
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelclick(channel, index) {
      if (this.isEdit) {
        if (this.fixedChannels.includes(channel.id)) {
          return
        }
        // 2.删除频道项
        this.myChannels.splice(index, 1)
        // 编辑状态 ，执行删除频道
        // 参数1：要删除的元素的开始索引(包括)
        // 参数2：要删除的个数，如果不指定，则从参数1开始一直删除
        if (index < this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
        // 4.删除处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑（完成）状态，执行切换频道
        this.$emit('updata-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录 ，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除失败请稍后重试')
      }
    }
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
.channel-edit{
  padding-top: 85px;
  .title-text{
    font-size: 32px;
    color: #333333;
  }
  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text, .text{
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active{
           color:red;
      }
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }
  /deep/.my-grid{
    .grid-item{
      .van-icon-clear{
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/.recommond-grid{
    .van-grid-item{
      .van-grid-item__content{
        flex-direction: row;
        .van-icon-plus{
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
