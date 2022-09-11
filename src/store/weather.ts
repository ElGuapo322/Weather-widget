import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

export interface State {
  cities: any[];
  weather: any[];
  isLoading: boolean;
}

export interface City {
  id: Date;
  city: string;
  country: string;
}

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    cities: [] as City[],
    weather: [] as any[],
    isLoading: false,
  }),
  getters: {},
  actions: {
    swapItems(indexes: any) {
      const { startIndex, endIndex } = indexes;

      const temp = this.weather[startIndex];
      this.weather[startIndex] = this.weather[endIndex];
      this.weather[endIndex] = temp;
    },
    deleteWeather(index: number) {
      this.weather.splice(index, 1);
    },
    async fetchWeather(city: string, country: string) {
      try {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.VUE_APP_MY_WEATHER_API_KEY}`
          )
          .then((response: AxiosResponse) => {
            // const res = response.data as any []
            this.weather.push(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserLocaiton() {
      try {
        const response = await axios.get(
          `https://ipinfo.io/json?token=61229bf5a6c1da`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async checkIfFirstTime() {
      const locations = JSON.parse(localStorage.getItem("cities") || "{}");
      if (locations !== (null || {})) {
        this.setLocalStorageLocations(locations);
      }

      if (this.cities.length === 0) {
        console.log("HERE", this.cities.length);

        this.isLoading = true;

        await this.fetchUserLocaiton().then((user_location) => {
          const locations = [
            {
              id: new Date(),
              city: user_location.city,
              country: user_location.country,
            },
          ];
          this.setLocalStorageLocations(locations);
          this.isLoading = false;
        });
      }

      this.fetchAllLocations();
    },
    async fetchAllLocations() {
      this.isLoading = true;

      for (let i = 0; i < this.cities.length; i++) {
        await this.fetchWeather(this.cities[i].city, this.cities[i].country);
      }

      this.isLoading = false;
    },
    setLocalStorageLocations(loc: City[]) {
      localStorage.setItem("cities", JSON.stringify(loc));
      const locations = JSON.parse(localStorage.getItem("cities") || "{}");
      locations !== "{}" ? (this.cities = locations) : (this.cities = []);
    },
  },
});
