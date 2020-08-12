import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator';
import {Todo} from '@/components/List/script';

@Component
export default class Item extends Vue {
  @Prop() todoKey!: string;
  @Prop() title!: string;
  @Prop() completed!: boolean;

  itemChecked = false;
  editingItem = false;
  itemTitleDone = this.title;
  itemTitleEdit = this.title;

  editItem() {
    if (!this.itemChecked) {
      this.editingItem = true;
    }
  }

  cancelEdit() {
    this.editingItem = false;
    this.itemTitleEdit = this.itemTitleDone;
  }

  doneEdit() {
    this.itemTitleDone = this.itemTitleEdit;
    this.editingItem = false;
    if (this.itemTitleDone === '') {
      this.deleteItem();
    }
  }

  @Emit('deleteItem')
  deleteItem() {
    return this.todoKey;
  }

  @Watch('itemChecked')
  @Watch('itemTitleDone')
  @Emit('onChange')
  updateItem(): Todo {
    return {
      key: this.todoKey,
      title: this.itemTitleDone,
      completed: this.itemChecked,
    };
  }
}
