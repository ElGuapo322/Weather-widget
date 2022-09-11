import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, Payload,DispatchOptions, ActionContext, CommitOptions, ActionHandler, Action } from 'vuex'
import axios from "axios";

// export const key: InjectionKey<Store<State>> = Symbol()


// export interface State {
//   cities: any[]
//   weather: any[]
//   isLoading: boolean
// }

 const store =  createStore<State>({
  state: {
    cities:[],
    weather:[],
    isLoading: false,

  },
  getters: {
    
		getIsLoading(state) {
			return state.isLoading;
		},
  },
  mutations: {
    
  },
  actions: {
    async fetchWeather({commit}, city, country) {
			try {
				await axios
					.get(
						`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.MY_WEATHER_API_KEY}`
					)
					.then((response) => {
						this.weather.push(response.data)
					})
					.catch((error) => {
						console.log(error);
					});
			} catch (error) {
				console.log(error);
			}
		},
  },
  modules: {
  }
})
// export function useStore () {
//   return baseUseStore(key)
// }

export default store