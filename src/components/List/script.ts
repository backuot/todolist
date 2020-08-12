import {Component, Vue, Prop} from 'vue-property-decorator';
import Item from '@/components/Item/index.vue';
import Input from '@/components/Input/index.vue';

export interface Todo {
  key: string;
  title: string;
  completed: boolean;
}

@Component({
  components: {Item, Input},
})
export default class List extends Vue {
  @Prop() title!: string;

  listMap: { [key: string]: Todo } = {};

  get items() {
    const mapKeys = Object.keys(this.listMap);
    return mapKeys.map((key) => this.listMap[key]);
  }

  addItem(newItem: string) {
    if (newItem === '') {
      return;
    }

    const items = this.items;
    const length = items.length;
    const key = `${length + 1}_${newItem}`;
    const newTodo: Todo = {key, title: newItem, completed: false};
    this.listMap = {...this.listMap, [key]: newTodo};
  }

  deleteItem(todoKey: string) {
    const {[todoKey]: toDelete, ...rest} = this.listMap;
    this.listMap = rest;
  }

  updateItem({key, title, completed}: Todo) {
    this.listMap = {
      ...this.listMap,
      [key]: {...this.listMap[key], title, completed},
    };
  }
}
