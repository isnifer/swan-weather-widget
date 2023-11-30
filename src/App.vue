<template>
  <div id="content">
    <div type="button" v-on:click="goFullScreen">
      <h1 class="time">
        {{ timeHours }}<span class="dots">:</span>{{ timeMinutes }}
      </h1>
      <h2 class="date">{{ timeFour }}, {{ timeThree }}</h2>
    </div>
    <vue-weather
      units="uk"
      latitude="52.4789022"
      longitude="13.2929962"
      v-bind:api-key="apiKey"
      v-bind:updateInterval="updateInterval"
    />
  </div>
</template>

<script lang="js">
import dayjs from 'dayjs';
import VueWeather from './components/VueWeatherWidget';

export default {
  data() {
    return {
      apiKey: import.meta.env.VITE_API_KEY,
      updateInterval: 300000,

      timeHours: dayjs().format('HH'),
      timeMinutes: dayjs().format('mm'),
      timeThree: dayjs().format('DD MMMM'),
      timeFour: dayjs().format('dddd'),

      fullScreenOpened: false,
    };
  },
  mounted() {
    setInterval(() => {
      this.timeHours = dayjs().format('HH');
      this.timeMinutes = dayjs().format('mm');
      this.timeThree = dayjs().format('DD MMMM');
      this.timeFour = dayjs().format('dddd');
    }, 1000);
  },
  methods: {
    goFullScreen() {
      const elem = document.documentElement;
      if (this.fullScreenOpened) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          this.fullScreenOpened = false;
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
          this.fullScreenOpened = false;
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
          this.fullScreenOpened = false;
        }
      } else {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
          this.fullScreenOpened = true;
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
          this.fullScreenOpened = true;
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
          this.fullScreenOpened = true;
        }
      }
    },
  },
  components: {
    VueWeather,
  },
};
</script>

<style lang="css">
@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Helvetica", sans-serif;
  font-weight: 700;
}

.time {
  transition: 0.2s;
  font-size: 12em;
  line-height: 1;
  margin: 0;
  text-align: center;
}

.date {
  transition: 0.2s;
  font-size: 2em;
  line-height: 1;
  margin: 0 0 50px;
  text-align: center;
}

.dots {
  animation: flickerAnimation 2s infinite;
}

p {
  transition: 0.2s;
}

.faded {
  opacity: 0;
  transition: 0.2s;
}
</style>
