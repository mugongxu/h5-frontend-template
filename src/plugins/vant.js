/*
 * Created by guoqian.xu on 2020/9/23.
 * 按需引入 vant 组件
 * 可选择性剔除不需要的组件
 */
import {
  Col,
  Row,
  Sticky,
  Overlay,
  Button,
  Icon,
  PullRefresh,
  Empty,
  Toast,
  Image as VanImage,
  Popover
} from 'vant';

export default {
  install(V) {
    V.use(Col);
    V.use(Row);
    V.use(Sticky);
    V.use(Overlay);
    V.use(Button);
    V.use(Icon);
    V.use(PullRefresh);
    V.use(Empty);
    V.use(VanImage);
    V.use(Popover);

    V.prototype.$toast = Toast;
  }
};
