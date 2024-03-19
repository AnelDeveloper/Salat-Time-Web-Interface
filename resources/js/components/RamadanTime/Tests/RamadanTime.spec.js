import { mount, flushPromises } from '@vue/test-utils';
import RamadanTimetable from '../RamadanTimetable.vue'; 

jest.mock('../../../Api/Api', () => ({
  get: jest.fn(() => Promise.resolve({
    data: [{ date: '2023-04-01', fajr: '5:00 AM', maghrib: '6:30 PM' }]
  }))
}));

describe('RamadanTimetable.vue', () => {
  it('fetches Ramadan timetable on mount', async () => {
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

    expect(wrapper.vm.ramadanTimetable).toEqual([{ date: '2023-04-01', fajr: '5:00 AM', maghrib: '6:30 PM' }]);
  });
});
