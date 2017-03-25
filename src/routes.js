import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Apis from './views/ApiList.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
		{
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-share',
        leaf: true,//只有一个节点
        children: [
            { path: '/api-lists', component: Apis, name: '接口列表' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
