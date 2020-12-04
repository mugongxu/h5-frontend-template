import {
   ajax,
   util,
   filter,
   drawAreaLine,
   drawBar,
   drawScatter
} from '../utils';

export default {
    install(V) {
        /* eslint no-param-reassign: 0 */
        V.prototype.$ajax = ajax;
        V.prototype.$util = util;
        V.prototype.$drawAreaLine = drawAreaLine;
        V.prototype.$drawBar = drawBar;
        V.prototype.$drawScatter = drawScatter;
        // 全局filter
        for (const key in filter) {
            V.filter(key, filter[key]);
        }
    }
};
