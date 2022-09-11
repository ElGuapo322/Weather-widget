<template>
   <header class="header" >
    <h2>Weather</h2>
    <div @click="closeSettings">
        <img src="../assets/icons/gear-svgrepo-com.svg"/>
    </div>
    
    </header>
    <div class="weather-wrapper">
        <WeatherCard
            v-for="weather in store.weather"
            :key="weather.id"
            :temperature="Math.round(weather.main.temp)"
            :weather="weather.weather[0].description"
            :location="`${weather.name}, ${weather.sys.country}`"
            :description="`Feels like ${Math.round(weather.main.feels_like)}&#8451;, ${weather.weather[0].description}`"
            :icon="weather.weather[0].icon"
        />
    </div>
   <SettingsModal 
        v-if="isSettingsModalOpen"
        v-on:close-settings="closeSettings"
   />
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useWeatherStore } from '../store/weather'
import SettingsModal from './SettingsModal.vue'
import WeatherCard from './WeatherCard.vue';
  
  export default defineComponent({
    name: "MainPage",
    components: { SettingsModal, WeatherCard },
    setup() {
        const store = useWeatherStore();
        const location = store.fetchUserLocaiton();
        const check = store.checkIfFirstTime()
        return { location, store, check };
    },
    data(){
        return{
            isSettingsModalOpen: false,
        }
    },
    methods:{
        closeSettings(){
            this.isSettingsModalOpen = !this.isSettingsModalOpen
        }
    }
    
    
});
  </script>
  
  
  <style scoped lang="scss">
    .weather-wrapper{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 10px;
      
    }
    .header{
        background: linear-gradient(90deg, rgba(25,15,193,1) 0%, rgba(0,212,255,1) 100%);
        height: 35px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        &>div{
            height: 100%;
            width: 40px;
            display: flex;
            align-items: center;
            &>img{
                width: 80%;
                height: 80%;
                &:hover{
                    transition: all 0.25s ease;
                    transform: scale(1.1);
                    cursor: pointer;
                }
            }
        }
    }
 
  </style>
  