/**
 * 错误模块路由配置配置
 */
const Error = () => import('@views/error/404');
const Identify = () => import('@views/error/identify');

export default [
    {
        path: '/error',
        name: 'error',
        redirect: '/error/404'
    },
    {
        path: '/error/404',
        name: '404',
        component: Error
    },
    {
        path: '/error/identify',
        name: 'identify',
        component: Identify
    }
];
