import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * 路由配置
 * 基于角色的权限控制
 */
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { 
      title: '登录',
      hidden: true 
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { 
          title: '仪表盘',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/apartment',
    component: Layout,
    redirect: '/apartment/list',
    meta: { 
      title: '公寓管理',
      icon: 'house'
    },
    children: [
      {
        path: 'list',
        name: 'ApartmentList',
        component: () => import('@/views/apartment/list.vue'),
        meta: { 
          title: '公寓列表',
          icon: 'list'
        }
      },
      {
        path: 'create',
        name: 'ApartmentCreate',
        component: () => import('@/views/apartment/form.vue'),
        meta: { 
          title: '新增公寓',
          icon: 'plus',
          hidden: true
        }
      },
      {
        path: 'edit/:id',
        name: 'ApartmentEdit',
        component: () => import('@/views/apartment/form.vue'),
        meta: { 
          title: '编辑公寓',
          icon: 'edit',
          hidden: true
        }
      },
      {
        path: 'detail/:id',
        name: 'ApartmentDetail',
        component: () => import('@/views/apartment/detail.vue'),
        meta: { 
          title: '公寓详情',
          icon: 'view',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/room',
    component: Layout,
    redirect: '/room/list',
    meta: { 
      title: '房间管理',
      icon: 'room'
    },
    children: [
      {
        path: 'list',
        name: 'RoomList',
        component: () => import('@/views/room/list.vue'),
        meta: { 
          title: '房间列表',
          icon: 'list'
        }
      },
      {
        path: 'create',
        name: 'RoomCreate',
        component: () => import('@/views/room/form.vue'),
        meta: { 
          title: '新增房间',
          icon: 'plus',
          hidden: true
        }
      },
      {
        path: 'edit/:id',
        name: 'RoomEdit',
        component: () => import('@/views/room/form.vue'),
        meta: { 
          title: '编辑房间',
          icon: 'edit',
          hidden: true
        }
      },
      {
        path: 'detail/:id',
        name: 'RoomDetail',
        component: () => import('@/views/room/detail.vue'),
        meta: { 
          title: '房间详情',
          icon: 'view',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: { 
      title: '用户管理',
      icon: 'user',
      roles: ['admin'] // 只有管理员可以访问
    },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list.vue'),
        meta: { 
          title: '用户列表',
          icon: 'list'
        }
      },
      {
        path: 'create',
        name: 'UserCreate',
        component: () => import('@/views/user/form.vue'),
        meta: { 
          title: '新增用户',
          icon: 'plus',
          hidden: true
        }
      },
      {
        path: 'edit/:id',
        name: 'UserEdit',
        component: () => import('@/views/user/form.vue'),
        meta: { 
          title: '编辑用户',
          icon: 'edit',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/profile',
    meta: { 
      title: '系统管理',
      icon: 'setting'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/system/profile.vue'),
        meta: { 
          title: '个人中心',
          icon: 'user'
        }
      },
      // {
      //   path: 'setting',
      //   name: 'Setting',
      //   component: () => import('@/views/system/setting.vue'),
      //   meta: { 
      //     title: '系统设置',
      //     icon: 'setting'
      //   }
      // }
    ]
  },
  // 404页面
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: { 
      title: '404',
      hidden: true 
    }
  },
  // 重定向到404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

/**
 * 路由守卫
 * 权限控制和登录验证
 */
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 房产中介管理系统` : '房产中介管理系统'
  
  // 获取token
  const token = localStorage.getItem('token')
  
  // 白名单路由（不需要登录）
  const whiteList = ['/login', '/404']
  
  if (token) {
    if (to.path === '/login') {
      // 已登录，跳转到首页
      next({ path: '/' })
    } else {
      // 验证用户信息和权限
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        next()
      } else {
        // 获取用户信息失败，跳转登录
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 白名单路由，直接访问
      next()
    } else {
      // 未登录，跳转登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router 