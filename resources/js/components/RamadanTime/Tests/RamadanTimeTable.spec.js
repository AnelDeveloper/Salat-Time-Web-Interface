import { mount } from '@vue/test-utils'
import RamadanTimeModal from '../Modal/RamadanTimeModal.vue'
import flushPromises from 'flush-promises'

jest.mock('../../Table/Table.vue', () => ({
  name: 'Table',
  props: ['times', 'allItemsLoaded', 'loadMore', 'class'],
  template: '<div><slot></slot></div>'
}))
jest.mock('../../Spinner/LoadingState.vue', () => ({
  name: 'LoadingState',
  template: '<div>Loading...</div>'
}))
jest.mock('../../PdfDownloader/PdfDownloader.vue', () => ({
  name: 'PdfDownloader',
  props: ['data', 'fileName'],
  template: '<div></div>'
}))

describe('RamadanTimeModal.vue', () => {
    let wrapper
  
    beforeEach(() => {
      wrapper = mount(RamadanTimeModal, {
        props: {
          isVisible: true,
          timetable: Array(20).fill().map((_, index) => ({
            date: `2023-04-${String(index + 1).padStart(2, '0')}`,
            time: '5:00 AM'
          })),
        },
        global: {
          mocks: {
            $t: (msg) => msg, 
          }
        }
      })
    })
  
    it('displays loading when isLoading is true', async () => {
      wrapper.vm.loadMore()
      await flushPromises()
  
      expect(wrapper.findComponent({ name: 'LoadingState' }).exists()).toBe(true)
    })
  
    it('displays the correct number of times initially', () => {
      expect(wrapper.vm.renderedTimetable.length).toBe(10)
    })
      
  
    it('closes the modal when close button is clicked', async () => {
      await wrapper.find('button').trigger('click')
        expect(wrapper.emitted()['update:isVisible'][0]).toEqual([false])
    })
  })
  
