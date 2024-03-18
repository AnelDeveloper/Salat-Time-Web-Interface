import { mount } from '@vue/test-utils'
import MonthlySalatTimesModal from '../Modal/MonthlySalatTimesModal.vue' 
import flushPromises from 'flush-promises';

jest.mock('../../Spinner/LoadingState.vue', () => ({
  name: 'LoadingState',
  template: '<div>Loading...</div>'
}));

jest.mock('../../Table/Table.vue', () => ({
  name: 'Table',
  template: '<div></div>'
}));

jest.mock('../../PdfDownloader/PdfDownloader.vue', () => ({
  name: 'PdfDownloader',
  template: '<div></div>'
}));

describe('MonthlySalatTimesModal.vue', () => {
  let wrapper;
  const globalMocks = {
    global: {
      mocks: {
        $t: msg => msg,
      }
    }
  };
  const propsData = {
    isVisible: true,
    monthlySalatTimes: Array(20).fill().map((_, index) => ({
      date: `2023-01-01T00:00:00.${index}`,
      salatTime: '12:00 PM'
    }))
  };

  beforeEach(() => {
    wrapper = mount(MonthlySalatTimesModal, {
      propsData,
      ...globalMocks
    });
  });

  it('renders correctly when visible', async () => {
    await flushPromises();
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find('.loading-overlay').exists()).toBe(false);
  });

  it('closes when the close button is clicked', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()['update:isVisible'][0]).toEqual([false]);
  });

  it('handles loading more items correctly', async () => {
    // Assuming your component has a method to directly trigger loading more items
    await wrapper.vm.loadMore();
    await flushPromises();

  });

  // Add more tests as needed
});
