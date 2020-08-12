import {Component, Vue, Emit} from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  newItem = '';

  get disableAddItem() {
    return this.newItem === '';
  }

  @Emit('addItem')
  addItem() {
    const valueToEmit = this.newItem;
    this.newItem = '';
    return valueToEmit;
  }
}
