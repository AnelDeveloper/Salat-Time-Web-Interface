import { mount } from '@vue/test-utils';
import SalatTimesDisplay from '../SalatTimesDisplay.vue';
import axios from 'axios';

jest.mock('axios');

describe('SalatTimesDisplay', () => {
  it('displays loading state when isLoading is true', async () => {
    const wrapper = mount(SalatTimesDisplay, {
      props: {
        selectedLocationId: 'locationId',
        selectedDate: '2024-03-18'
      }
    });

    expect(wrapper.findComponent({ name: 'LoadingState' }).exists()).toBe(true);
    await wrapper.vm.$nextTick();
  });

  it('displays salat times when not loading and salatTimes array is not empty', async () => {
    const mockSalatTimes = [
      { id: 1, date: '2024-03-18', fajr: '5:30 AM', dhuhr: '12:00 PM', asr: '3:00 PM', maghrib: '6:00 PM', isha: '8:00 PM' },
      { id: 2, date: '2024-03-19', fajr: '5:31 AM', dhuhr: '12:01 PM', asr: '3:01 PM', maghrib: '6:01 PM', isha: '8:01 PM' }
    ];

    axios.get.mockResolvedValue({ data: mockSalatTimes });

    const wrapper = mount(SalatTimesDisplay, {
      props: {
        selectedLocationId: 'locationId',
        selectedDate: '2024-03-18'
      }
    });

    await wrapper.vm.$nextTick();

    const salatTimeCards = wrapper.findAll('.salat-time-card');
    expect(salatTimeCards).toHaveLength(mockSalatTimes.length);

    mockSalatTimes.forEach((time, index) => {
      const salatTimeCard = salatTimeCards.at(index);
      expect(salatTimeCard.find('.salat-day').text()).toBe(`Day: ${wrapper.vm.formatDate(time.date)}`);
      expect(salatTimeCard.find('.salat-time-detail:nth-of-type(1)').text()).toContain(`Fajr: ${time.fajr}`);
      expect(salatTimeCard.find('.salat-time-detail:nth-of-type(2)').text()).toContain(`Dhuhr: ${time.dhuhr}`);
      expect(salatTimeCard.find('.salat-time-detail:nth-of-type(3)').text()).toContain(`Asr: ${time.asr}`);
      expect(salatTimeCard.find('.salat-time-detail:nth-of-type(4)').text()).toContain(`Maghrib: ${time.maghrib}`);
      expect(salatTimeCard.find('.salat-time-detail:nth-of-type(5)').text()).toContain(`Isha: ${time.isha}`);
    });
  });

  it('displays "No Salat times available" message when salatTimes array is empty', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const wrapper = mount(SalatTimesDisplay, {
      props: {
        selectedLocationId: 'locationId',
        selectedDate: '2024-03-18'
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.no-salat-times').exists()).toBe(true);
  });
});