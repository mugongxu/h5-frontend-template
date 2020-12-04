/**
 * 基金对比模块路由配置配置
 */
const Index = () => import ('@views/comparison/index');

export default [
    {
        path: '/fund',
        name: '基金',
        redirect: '/fund/comparison'
    }, {
        path: '/fund/comparison',
        name: '基金对比',
        component: Index
    }
];
