import { mount, flushPromises } from '@vue/test-utils';
import RamadanTimetable from '../RamadanTimetable.vue';
import apiClient from '../../../Api/Api'; 

jest.mock('../../../Api/Api', () => ({
  get: jest.fn(() => Promise.resolve({
    data: [{ date: '2023-04-01', fajr: '5:00 AM', maghrib: '6:30 PM' }]
  }))
}));

describe('RamadanTimetable.vue', () => {
  it('renders and can show the modal', async () => {
    const wrapper = mount(RamadanTimetable, {
      props: {
        locationId: '1',
        year: '2023',
      },
      global: {
        mocks: {
          $t: msg => msg, 
        },
      },
    });

    await flushPromises();

    const button = wrapper.find('button.ramadan-button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('ramadanTimeTable');

    await button.trigger('click');
    expect(wrapper.vm.showModal).toBe(true);
  });

  it('fetches Ramadan timetable on mount and updates the timetable data', async () => {
    const wrapper = mount(RamadanTimetable, {
      props: {
        locationId: '1',
        year: '2023',
      },
      global: {
        mocks: {
          $t: msg => msg, 
        },
      },
    });

    await flushPromises();

    expect(apiClient.get).toHaveBeenCalledTimes(2);
    expect(apiClient.get).toHaveBeenCalledWith('/api/ramadan-timetable', {
      params: {
        locationId: '1',
        year: '2023',
      },
    });

    expect(wrapper.vm.ramadanTimetable).toEqual([{ date: '2023-04-01', fajr: '5:00 AM', maghrib: '6:30 PM' }]);
  });

});
