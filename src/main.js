//导入vue
import Vue from 'vue';
//导入App.vue
import App from './App.vue';
//导入router
import VueRouter from 'vue-router';
Vue.use(VueRouter)
    //导入login.vue
import login from './components/admin/account/login.vue';
//导入layout.vue;
import layout from './components/admin/layout.vue';
//导入dooslist.vue
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue';
import catelist from './components/admin/goods/catelist.vue'
var router = new VueRouter({
    routes: [{
            name: 'default',
            path: '/',
            redirect: '/admin'
        },
        {
            name: 'login',
            path: '/login',
            component: login
        },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            children: [{
                    name: 'goodslist',
                    path: 'goodslist',
                    component: goodslist,
                    meta: { menuno: '1-1', ischangemenu: true }
                },
                {
                    name: 'goodsadd',
                    path: 'goodsadd',
                    component: goodsadd
                },
                {
                    name: 'catelist',
                    path: 'catelist',
                    component: catelist,
                    meta: { menuno: '1-2', ischangemenu: true }
                }
            ]
        },
    ]
});



// 2.0 axios的使用
// 2.0.1 导入axios包
import axios from 'axios';
// 2.0.2 设定axios的基本的url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';

// 2.0.3 想要在将来的每个子组件中的方法中均可以使用 this.$http去调用其方法执行ajax请求
//就要将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;
axios.defaults.withCredentials = true;
// 2.0.4 绑定到vue上
Vue.use(axios);

var menulist = {
    '1-1': 'goodslist',
    '1-2': 'catelist'
}

router.afterEach((to, from) => {
    //根据dangqia6nlocalStrorage中的,menuno从menulist中获取到路由规则的名称通过vue-router的导航跳转
    var routerName = menulist[localStorage.getItem('currentMenuNo')]
    if (routerName) {
        router.push({ name: routerName })
    }
})

//路由全局周围(路由钩子函数)
//to:当前要进入的理由  form:代表路由来源  next:要执行一下next()方法才能正常渲染出页面组件页面
router.beforeEach((to, from, next) => {
    if (to.meta.ischangemenu) {
        localStorage.setItem('mName', to.name)
    }
    if (to.meta.menuno) {
        store.dispatch('changeMenuID', to.meta.menuno)
    }
    if (to.name == 'login') {
        next();

    } else {
        axios.get('/admin/account/islogin').then(res => {
            if (res.data.code == 'logined') {
                next();
            } else {
                router.push({ name: 'login' })
            }
        })
    }
})


//导入饿了么
import ElementUI from 'element-ui';
//导入全局样式
import '../static/theme_rms/index.css'
//导入饿了么css控制样式
import '../static/css/site.css';
//绑定
Vue.use(ElementUI)


//导入vuex
import vuex from 'vuex';
//绑定
Vue.use(vuex)
var state = { menuid: '1-1' };

var actions = {
    changeMenuID({ commit }, menuid) {
        commit('changeMenuID', menuid)
    }
}

var mutations = {
    changeMenuID(state, menuid) {
        state.menuid = menuid;
    }
}



var getters = {
    getMenuID() {
        return state.menuID
    }
}


const store = new vuex.Store({
    modules: {
        global: {
            state,
            mutations,
            actions,
            getters
        }
    }
})

Vue.filter('dateftm', (input, fmtstring) => {
    var mydate = new Date(input);

    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if (fmtstring == 'YYYY-MM-DD') {
        return y + '-' + m + '-' + d;
    }
    if (fmtstring == 'YYYY-MM-DD HH:mm:ss') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s
    }
})


new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    router,
    store,
    // es6的写法
    render: create => create(App)
});