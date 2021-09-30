import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI,{ locale })
  }
}