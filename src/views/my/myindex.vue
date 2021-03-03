<template>
  <div class="my-container">
     <!-- 已登录头部 -->
     <div v-if="user" class="header user-info">
       <!-- 基本信息 -->
       <div class="base-info">
         <div class="left">
           <van-image
            fit="cover"
            :src="userInfo.photo"
            class="avatar"
            round
         />
         <span class="name">{{userInfo.name}}</span>
         </div>
         <div class="right">
           <van-button type="default" size="mini" round>编辑资料</van-button>
         </div>
       </div>
       <!-- 粉丝、关注 -->
       <div class="data-stats">
         <div class="data-item">
           <span class="count">{{userInfo.art_count}}</span>
           <span class="text">头条</span>
         </div>
         <div class="data-item">
           <span class="count">{{userInfo.follow_count}}</span>
           <span class="text">关注</span>
         </div>
         <div class="data-item">
           <span class="count">{{userInfo.fans_count}}</span>
           <span class="text">粉丝</span>
         </div>
         <div class="data-item">
           <span class="count">{{userInfo.like_count}}</span>
           <span class="text">获赞</span>
         </div>
       </div>
     </div>

   <!-- 未登录头部 -->
   <div v-else class="header not-login">
     <div class="login-btn" @click="$router.push({
       name:'login',
       query:{
         redirect:'/my'
       }
     })">
       <img class="mobile-img" src="~@/assets/mobile.png" alt="">
       <span class="text">登录 / 注册</span>
     </div>
   </div>
   <!-- 导航 -->
   <van-grid class="grid-nav mb-9" :column-num="2" clickable>
     <van-grid-item class="grid-item">
       <i slot="icon" class="toutiao toutiaoshoucang"></i>
       <span slot="text" class="text">文字</span>
     </van-grid-item>
     <van-grid-item class="grid-item">
       <i slot="icon" class="toutiao toutiaolishi"></i>
       <span slot="text" class="text">历史</span>
     </van-grid-item>
   </van-grid>
   <!-- cell单元格 -->
   <van-cell title="消息通知" is-link></van-cell>
   <van-cell class="mb-9" title="小志同学" is-link></van-cell>
   <van-cell v-if="user" class="logout-cell" clickable title="退出登录" is-link @click="onLogout"></van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'myIndex',
  components: {},
  // 定义属性
  props: {},
  data () {
    return {
      userInfo: {}// 用户信息
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
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
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
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
        }
      }
    }
  }
  .data-stats {
  display: flex;
  .data-item {
    height: 130px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    .count {
      font-size: 36px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 23px;
    }
  }
  }
  .grid-nav {
    .grid-item{
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiaoshoucang {
        color: #EB5253;
      }
      .toutiaolishi {
        color: #FF9D1D;
      }
      span.text {
        color: #000;
        margin-top: 8px;
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
