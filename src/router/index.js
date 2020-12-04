import Vue from 'vue';
import Router from 'vue-router';

import routeInterceptor from './hooks';

import comparison from './comparison';
import error from './error';

Vue.use(Router);

const insertRootCompHelper = (routerConf) => {
    const newRouterConf = [...routerConf];
    /**
     * 对路由进行统一自定义处理
     */
    return newRouterConf;
};

const navRouter = [
    ...insertRootCompHelper(comparison)
];

const router = new Router({
    routes: [{
            path: '/',
            redirect: navRouter[0].path
        },
        ...navRouter,
        ...error
    ]
});

router.beforeEach(routeInterceptor);

export { navRouter };
export default router;
