const routerViewChange = {
    path: /\/\w+?\//,
    action: async({ next }) => {
        /**
         * 匹配路由后自定义操作处理
         */
        next();
    }
};

export default routerViewChange;
