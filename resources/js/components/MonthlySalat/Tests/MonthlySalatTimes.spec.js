

import { mount, flushPromises } from '@vue/test-utils';
import MonthlySalatTimes from '../MonthlySalatTimes.vue';

jest.mock('../../../Api/Api', () => ({
  get: jest.fn(() => Promise.resolve({ data: [{ date: '2023-01-01', time: '12:00 PM' }] }))
}));


jest.mock('../Modal/MonthlySalatTimesModal.vue', () => ({
  name: 'MonthlySalatTimesModal',
  template: '<div></div>',
}));

jest.mock('axios');

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
    const wrapper = mount(MonthlySalatTimes, {
      props: {
        selectedLocationId: '1',
        selectedYear: '2023',
        selectedMonth: '01',
      },
      global: {
        mocks: {
          $t: (msg) => msg, 
        },
      },
    });

    await flushPromises();
    expect(wrapper.vm.monthlySalatTimes).toEqual([{ date: '2023-01-01', time: '12:00 PM' }]);
  });
});
