// 通用频率高的组件
import LabelItem from './labelItem';
import TabCard from './tabCard';
import VueTable from './vueTable';
import StripeTable from './stripeTable';

export default {
  install(V) {
    V.component('LabelItem', LabelItem);
    V.component('TabCard', TabCard);
    V.component('VueTable', VueTable);
    V.component('StripeTable', StripeTable);
  }
};
