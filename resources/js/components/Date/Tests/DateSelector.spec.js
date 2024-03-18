import { mount } from '@vue/test-utils';
import DateSelector from '../DateSelector.vue'; 

describe('DateSelector.vue', () => {
  test('emits dateSelected event with the current date on change', async () => {
    const wrapper = mount(DateSelector);
    const today = new Date().toISOString().substr(0, 10);

    await wrapper.find('input[type="date"]').setValue(today);
    await wrapper.find('input[type="date"]').trigger('change');

    expect(wrapper.emitted().dateSelected[0]).toEqual([today]);
  });
});
