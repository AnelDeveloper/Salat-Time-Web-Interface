import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';
import MonthlySalatTimes from '../MonthlySalatTimes.vue'; 

jest.mock('../Modal/MonthlySalatTimesModal.vue', () => ({
  name: 'MonthlySalatTimesModal',
  template: '<div></div>'
}));

jest.mock('axios', () => ({
    get: jest.fn()
  }));

describe('MonthlySalatTimes.vue', () => {
  it('renders and can show the modal', async () => {
    const wrapper = mount(MonthlySalatTimes, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.showModal).toBe(true);
  });

  it('fetches monthly salat times on mount', async () => {
    const response = { data: [{ date: '2023-01-01', time: '12:00 PM' }] };
    axios.get.mockResolvedValue(response);

    const wrapper = mount(MonthlySalatTimes, {
      props: {
        selectedLocationId: '1',
        selectedYear: '2023',
        selectedMonth: '01'
      },
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });

    await flushPromises(); // Wait for all promises to resolve
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.monthlySalatTimes).toEqual(response.data);
  });

  // Additional tests as needed...
});
