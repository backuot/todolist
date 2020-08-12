import {Component, Vue} from 'vue-property-decorator';
import List from '@/components/List/index.vue';

@Component({
  components: {List},
})
export default class App extends Vue {
}
