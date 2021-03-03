import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 如果父路由有默认子路由,那他的name是没有意义的
    component: () => import('@/views/layout/layoutindex.vue'),
    children: [
      {
        path: '', // 留空默认子路由为home，只能有一个默认子路由
        name: 'home',
        component: () => import('@/views/home/homeindex.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/qaindex.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/videoindex.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/myindex.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/searchindex.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/articleindex.vue'),
    props: true // 开启props传参，实际就是把路由参数映射到组件的props数据中
  }
]

const router = new VueRouter({
  routes
})

export default router
