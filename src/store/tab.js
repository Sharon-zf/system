import Cookie from 'js-cookie'
export default {
  state: {
    //菜单是否折叠参数
    isCollapse: false,
    //面包屑参数
    tabList: [
      {
        name: 'home',
        path: '/',
        label: "首页",
        icon: "icon"
      }
    ],
    nowMenu: null,
    menu: []
  },
  mutations: {
    collapseChange(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.nowMenu = val;
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabList.push(val)
        }
      } else {
        state.nowMenu = null
      }
    },
    //对不同角色登录时菜单的管理
    //将菜单设置到cookie上
    setMenu(state, val) {
      state.menu = val;
      Cookie.set('menu', JSON.stringify(val))
    },
    //清除Cookie
    clearMenu(state) {
      state.menu = [];
      Cookie.remove('menu')
    },
    addMenu(state,router) {
      if (!Cookie.get('menu')) {
        return
      } else {
        const menu = JSON.parse(Cookie.get('menu'));
        state.menu = menu;
        const menuArray = [];
        menu.forEach(item => {
          if (item.children) {
            item.children = item.children.map(item => {
              item.component = () => import(`../views/${item.url}`)
              return item
            })
            menuArray.push(...item.children)
          } else {
            item.component = () => import(`../views/${item.url}`)
            menuArray.push(item)
          }
        });
        menuArray.forEach(item =>{
          router.addRoute('main',item)
        })
      }
    }
  }
}