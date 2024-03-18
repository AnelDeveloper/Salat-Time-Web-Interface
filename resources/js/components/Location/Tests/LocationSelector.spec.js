
import { mount } from '@vue/test-utils';
import axios from 'axios';
import flushPromises from 'flush-promises';
import LocationSelector from '../LocationSelector.vue'; 

jest.mock('axios');

describe('LocationSelector.vue', () => {
  it('fetches locations and renders them as options', async () => {
    axios.get.mockResolvedValue({ data: [{ id: '1', name: 'Location 1' }, { id: '2', name: 'Location 2' }] });

    const wrapper = mount(LocationSelector, {
      global: {
        mocks: {
          $t: (msg) => msg,
        }
      }
    });

    await flushPromises();
    expect(wrapper.findAll('option').length).toBe(3); 
    expect(wrapper.text()).toContain('Location 1');
    expect(wrapper.text()).toContain('Location 2');
  });
});
