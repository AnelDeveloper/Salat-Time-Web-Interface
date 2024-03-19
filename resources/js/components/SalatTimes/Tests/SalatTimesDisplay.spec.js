import { mount, flushPromises } from '@vue/test-utils';
import SalatTimesDisplay from '../SalatTimesDisplay.vue';
import LoadingState from '../../Spinner/LoadingState.vue';
import apiClient from '../../../Api/Api';

jest.mock('../../../Api/Api', () => ({
  get: jest.fn(() => Promise.resolve({
    data: [
      { date: '2023-04-01', sunrise: '6:00 AM', fajr: '4:30 AM', dhuhr: '12:00 PM', asr: '3:30 PM', maghrib: '6:15 PM', isha: '7:45 PM' }
    ]
  }))
}));

describe('SalatTimesDisplay.vue', () => {
  it('renders loading state initially and fetches data on mount', async () => {
    const wrapper = mount(SalatTimesDisplay, {
      props: {
        selectedLocationId: '1',
        selectedDate: '2023-04-01',
      },
    });

    expect(wrapper.findComponent(LoadingState).exists()).toBe(true);

    await flushPromises();

    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(apiClient.get).toHaveBeenCalledWith('/api/monthly-salat-times', expect.objectContaining({
      params: expect.objectContaining({
        locationId: '1',
        year: '2023',
        month: '04'
      })
    }));

    expect(wrapper.findComponent(LoadingState).exists()).toBe(false);
  });
});

it('displays Salat times for the selected date when data is available', async () => {
  const wrapper = mount(SalatTimesDisplay, {
    props: {
      selectedLocationId: '1',
      selectedDate: '2023-04-01',
    },
  });

  await flushPromises();

  expect(wrapper.text()).toContain('Day: April 1, 2023');
  expect(wrapper.text()).toContain('Fajr: 4:30 AM');
});

it('displays a message when no Salat times are available', async () => {
  apiClient.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

  const wrapper = mount(SalatTimesDisplay, {
    props: {
      selectedLocationId: '1',
      selectedDate: '2023-05-01',
    },
  });

  await flushPromises();

  expect(wrapper.find('.no-salat-times').text()).toContain('No Salat times available');
});
