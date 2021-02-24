import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Asset/kanban/AssetMagCenter'),
      meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
    }]
  },
  {
    path: '/Asset',
    component: Layout,
    redirect: '/Asset/assetPool/pageQuery',
    name: 'Asset',
    alwaysShow: true,
    meta: {
      title: '资产管理中心',
      icon: 'tree'
    },
    children: [{
      path: 'assetPool/pageQuery',
      component: () => import('@/views/Asset/assetPool/pageQuery'),
      name: 'AssetPool',
      meta: {
        title: '资产池',
        icon: 'el-icon-s-operation',
        noCache: true
      }
    },
    {
      path: 'assetPool/edit',
      component: () => import('@/views/Asset/assetPool/edit'),
      name: 'AssetPoolDetail',
      meta: {
        title: '资产池详情',
        activeMenu: '/Asset/assetPool/pageQuery',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'finance/pageQuery',
      component: () => import('@/views/Asset/finance/pageQuery'),
      name: 'Finance',
      meta: {
        title: '融资合同',
        icon: 'el-icon-s-finance',
        noCache: true
      }
    },
    {
      path: '/assetmanger',
      component: () => import('@/views/Asset/finance/AssetManger'),
      name: 'assetManger',
      meta: {
        title: '资产管理',
        icon: 'el-icon-receiving',
        noCache: true
      }
    },
    {
      path: 'finance/edit',
      component: () => import('@/views/Asset/finance/edit'),
      name: 'FinanceDetail',
      meta: {
        title: '融资合同详情',
        activeMenu: '/Asset/finance/pageQuery',
        noCache: true
      },
      hidden: true
    }]
  },
  {
    path: '/cont',
    component: Layout,
    redirect: 'cont/list',
    alwaysShow: true,
    meta: {
      title: '合同管理',
      icon: 'el-icon-s-management'
    },
    children: [{
      path: 'list',
      name: 'contlist',
      component: () => import('@/views/Cont/index'),
      meta: { title: '我的合同', icon: 'el-icon-s-claim', noCache: true }
    },
    {
      path: 'create',
      name: 'contedit',
      component: () => import('@/views/Cont/edit'),
      meta: { title: '新建合同', icon: 'el-icon-s-claim', types: 'create', activeMenu: '/cont/list' },
      hidden: true
    },
    {
      path: 'view',
      name: 'contedit',
      component: () => import('@/views/Cont/edit'),
      meta: { title: '查看合同', icon: 'el-icon-s-claim', types: 'view', activeMenu: '/cont/list' },
      hidden: true
    },
    {
      path: 'edit',
      name: 'contedit',
      component: () => import('@/views/Cont/edit'),
      meta: { title: '编辑合同', icon: 'el-icon-s-claim', types: 'edit', activeMenu: '/cont/list' },
      hidden: true
    }
    ]
  },
  {
    path: '/ord',
    component: Layout,
    redirect: 'ord/list',
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-check'
    },
    children: [{
      path: 'list',
      name: 'ordlist',
      component: () => import('@/views/Ord/index'),
      meta: { title: '我的订单', icon: 'el-icon-s-order', noCache: true }
    },
    {
      path: 'create',
      name: 'ordedit',
      component: () => import('@/views/Ord/edit'),
      meta: { title: '新建订单', icon: 'el-icon-s-claim', types: 'create', activeMenu: '/ord/list' },
      hidden: true
    },
    {
      path: 'view',
      name: 'ordedit',
      component: () => import('@/views/Ord/edit'),
      meta: { title: '查看订单', icon: 'el-icon-s-claim', types: 'view', activeMenu: '/ord/list' },
      hidden: true
    },
    {
      path: 'edit',
      name: 'ordedit',
      component: () => import('@/views/Ord/edit'),
      meta: { title: '编辑订单', icon: 'el-icon-s-claim', types: 'edit', activeMenu: '/ord/list' },
      hidden: true
    }
    ]
  },
  {
    path: '/Blockchain',
    component: Layout,
    redirect: 'Blockchain/list',
    alwaysShow: true,
    meta: {
      title: '区块链管理',
      icon: 'el-icon-s-data'
    },
    children: [{
      path: 'list',
      name: 'blockchainlist',
      component: () => import('@/views/Chains/index'),
      meta: { title: '区块链', icon: 'el-icon-s-marketing', noCache: true }
    },
    {
      path: 'detail',
      name: 'blockchaindetail',
      component: () => import('@/views/Chains/detail'),
      meta: { title: '区块详情', icon: 'el-icon-s-claim', activeMenu: 'Blockchain/list' },
      hidden: true
    }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
