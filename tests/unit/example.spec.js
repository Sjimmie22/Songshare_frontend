import { shallowMount } from '@vue/test-utils'
import YourSongsView from '@/views/YourSongsView.vue'
import SongsView from '@/views/SongsView.vue'
import axios from 'axios';

describe('YourSongsView.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(YourSongsView, {
    })
    expect(wrapper.exists()).toBe(true)
  })
})

jest.mock('axios');

describe('YourSongsView.vue', () => {
  it('sends a POST request when addSong is called', async () => {
    const wrapper = shallowMount(YourSongsView);

    // Simulate calling addSong method
    await wrapper.vm.addSong();

    // Assert that axios.post has been called
    expect(axios.post).toHaveBeenCalled();
  });
});

describe('YourSongsView.vue', () => {
  it('sends a GET request when fetchSongs is called', async () => {
    const wrapper = shallowMount(YourSongsView);

    // Simulate calling fetchSongs method
    await wrapper.vm.fetchSongs();

    // Assert that axios.get has been called
    expect(axios.get).toHaveBeenCalled();
  });
});
