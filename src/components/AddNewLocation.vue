<template>
  <div class="wrapper">
    <select
      class="location-select"
      placeholder="Country"
      :value="country"
      @change="changeCountry"
    >
      <option
        v-for="country in locationsCountries"
        :key="country"
        :value="country"
      >
        {{ country }}
      </option>
    </select>
    <select
      class="location-select"
      placeholder="Country"
      @change="changeCity"
      :value="city"
      :disabled="country === ''"
    >
      <option v-for="cityItem in cities" :key="cityItem" :value="cityItem">
        {{ cityItem }}
      </option>
    </select>
    <button @click="addLocation">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useWeatherStore } from "../store/weather";
import locationsData from "../assets/locations.json";
import {City} from "../store/weather";

export default defineComponent({
  name: "MainPage",
  props: {
    msg: String,
  },
  setup() {
    const store = useWeatherStore();
    return { store };
  },
  data() {
    return {
      country: "",
      city: "",
      cities: [] as string[],
      locations: locationsData as any,
    };
  },
  methods: {
    changeCountry(e: Event) {
      let myTarget = JSON.parse(JSON.stringify(this.locations[(e.target as HTMLInputElement).value]));
      this.country = (e.target as HTMLInputElement).value;
      this.cities = myTarget;
      this.city = myTarget[0];
    },
    changeCity(e: Event) {
      this.city = (e.target as HTMLInputElement).value;
    },
    addLocation() {
      let newLocation = {
        id: new Date(),
        city: this.city,
        country: this.country,
      };
      this.store.setLocalStorageLocations([...this.store.cities, newLocation]);
      this.store.fetchWeather(this.city, this.country);

      this.city = "";
      this.country = "";
    },
  },
  computed: {
    locationsCountries() {
      return Object.keys(this.locations);
    },
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > button {
    height: 35px;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgb(9, 9, 175);
    transition: all 0.25s ease;
    border: none;
    color: white;
    &:hover {
      background-color: rgb(6, 6, 127);
    }
  }
}
.location-select {
  width: 100%;
  height: 25px;
  padding: 2px;
  border-radius: 5px;
  border: 2px solid lightgray;
  color: dimgray;
  cursor: pointer;
  font-size: 15px;
  height: 35px;
  outline: none;
  &:disabled {
    cursor: default;
  }
}
</style>
