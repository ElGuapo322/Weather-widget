<template>
  <div class="card-wrapper">
    <div
      class="weather-header"
      :style="{ backgroundImage: 'url(' + getWeatherImage(weather) + ')' }"
    >
      <div class="weather-header__content">
        <h3>{{ location }}</h3>

        <div class="weather-header__content__main">
          <img :src="`http://openweathermap.org/img/wn/${icon}@2x.png`" />
          <h2>{{ temperature }} &#8451;</h2>
        </div>
        <span>{{ description }}</span>
      </div>

    </div>
    <div class="content">
      <div class="content__row">
        <div class="icon-wrapper">
          <img src="../assets/icons/wind-weather-svgrepo-com.svg"/>
        </div>
        <div class="content__row__caption">
          <span>{{`Wind: ${wind} m/s`}}</span>
        </div>
      </div>
      <div class="content__row">
        <div class="icon-wrapper">
          <img src="../assets/icons/pressure-svgrepo-com.svg"/>
        </div>
        <div class="content__row__caption">
          <span>{{`Atmospheric pressure: ${pressure} hPa`}}</span>
        </div>
      </div>
      <div class="content__row">
        <div class="icon-wrapper">
          <img src="../assets/icons/drops-svgrepo-com.svg"/>
        </div>
        <div class="content__row__caption">
          <span>{{`Humidity: ${humidity} %`}}</span>
        </div>
      </div>
      <div class="content__row">
        <div class="icon-wrapper">
          <img src="../assets/icons/visibility-view-svgrepo-com.svg"/>
        </div>
        <div class="content__row__caption">
          <span>{{`Visibility: ${visibility} m`}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherCard",
  props: {
    temperature: {
      type: Number,
      required: true,
    },
    weather: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    wind:{
      type: Number,
    },
    pressure:{
      type: Number,
    },
    humidity:{
      type: Number,
    },
    visibility:{
      type: Number,
    },

  },
  methods: {
    getWeatherImage(key: string): string {
      if (key === "broken clouds") {
        return require("../assets/weather/broken-clouds.jpg");
      } else if (key === "clear sky") {
        return require("../assets/weather/clear-sky.jpg");
      } else if (key === "few clouds") {
        return require("../assets/weather/few-clouds.jpg");
      } else if (key === "mist") {
        return require("../assets/weather/mist.jpg");
      } else if (key === "rain") {
        return require("../assets/weather/rain.jpg");
      } else if (key === "scattered clouds") {
        return require("../assets/weather/scattered-clouds.jpg");
      } else if (key === "shower rain") {
        return require("../assets/weather/shower-rain.jpg");
      } else if (key === "snow") {
        return require("../assets/weather/snow.jpg");
      } else if (key === "thunderstorm") {
        return require("../assets/weather/thunderstorm.jpg");
      } else if (key === "overcast clouds") {
        return require("../assets/weather/overcast-clouds.jpg");
      } else if (key === "moderate rain") {
        return require("../assets/weather/moderate-rain.jpg");
      }
      return "";
    },
  },
});
</script>

<style scoped lang="scss">
h3 {
  margin: 0;
}
h2 {
  text-align: right;
}
.card-wrapper {
  height: 300px;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 6px 6px 24px -2px rgba(0, 4, 7, 0.6);
  -moz-box-shadow: 6px 6px 24px -2px rgba(0, 4, 7, 0.6);
  box-shadow: 6px 6px 24px -2px rgba(0, 4, 7, 0.6);
  max-width: 285px;
}
.weather-header {
  height: 50%;
  background-size: cover;
  background-position: center;
  padding: 5px;
  border-radius: 5px;
  &__content {
    color: white;
    &__main {
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        width: 30%;
      }
    }
  }
}
.content{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.content__row{
  display:flex ;
  align-content: center;
  gap: 5px;
  padding: 5px;
  border-bottom: 1px solid #dedede;
  &__caption{
    display: flex;
    align-items: center;
  }
}
.icon-wrapper{
  width: 24px;
  height: 24px;
  &>img{
    width: 100%;
    height: 100%;
  }
}
</style>
