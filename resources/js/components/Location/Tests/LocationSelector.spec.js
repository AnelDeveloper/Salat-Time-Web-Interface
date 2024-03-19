import { mount, flushPromises } from '@vue/test-utils';
import LocationSelector from '../LocationSelector.vue';
import apiClient from '../../../Api/Api';

jest.mock('../../../Api/Api', () => ({
  get: jest.fn(() => Promise.resolve({
    data: [
      { id: '1', name: 'Location 1' },
      { id: '2', name: 'Location 2' },
    ]
  }))
}));

describe('LocationSelector.vue', () => {
  it('renders correctly and fetches locations on mount', async () => {
    const wrapper = mount(LocationSelector, {
      global: {
        mocks: {
          $t: (msg) => msg, 
        },
      },
    });

    await flushPromises();

    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll('option').length).toBeGreaterThan(1); 
  });

  it('emits "locationSelected" event with the correct payload when a location is selected', async () => {
    const wrapper = mount(LocationSelector, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });

    await flushPromises();
    await wrapper.find('select').setValue('1');

    expect(wrapper.emitted()).toHaveProperty('locationSelected');
    expect(wrapper.emitted().locationSelected[0]).toEqual(['1']);
  });
});
