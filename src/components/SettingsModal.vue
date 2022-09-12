<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"> SETTINGS </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <div class="cities-list" @dragover.prevent>
            <div
              class="row"
              v-for="city in weather.cities"
              :key="city.city"
              draggable="true"
              @dragstart="onDragStart($event, city)"
              @drop="onDrop($event, city)"
            >
              <div class="row__main">
                <div class="icon-wrapper">
                  <img src="../assets/icons/hamburger-menu-svgrepo-com.svg" />
                </div>

                <div>{{ `${city.city}, ${city.country}` }}</div>
              </div>
              <div class="icon-wrapper" @click="deleteCity(city)">
                <img src="../assets/icons/delete-svgrepo-com.svg" />
              </div>
            </div>
          </div>
        </section>

        <footer class="modal-footer">
          <AddNewLocation />
        </footer>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useWeatherStore } from "../store/weather";
import AddNewLocation from "./AddNewLocation.vue";
import { City } from "../store/weather";
export default defineComponent({
  name: "SettingsModal",
  components: { AddNewLocation },
  setup() {
    const weather = useWeatherStore();
    return { weather };
  },
  methods: {
    close() {
      this.$emit("close-settings");
    },
    onDrop(event: any, item: City) {
      const startIndex = event.dataTransfer.getData("startIndex");
      const endIndex = this.weather.cities.findIndex((e) => e.id == item.id);
      let locations = this.swapItems(this.weather.cities, startIndex, endIndex);
      this.weather.setLocalStorageLocations(locations);
      this.weather.swapItems({ startIndex: startIndex, endIndex: endIndex });
    },
    onDragStart(event: any, item: City) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      const startIndex = this.weather.cities.findIndex((e) => e.id == item.id);
      event.dataTransfer?.setData("startIndex", startIndex);
    },
    swapItems(array: City[], startIndex: number, endIndex: number) {
      let temp = array[startIndex];
      array[startIndex] = array[endIndex];
      array[endIndex] = temp;
      return array;
    },
    deleteCity(item: City) {
      let index = this.weather.cities.findIndex((e) => e.id == item.id);
      this.weather.deleteWeather(index);
      let locations = this.weather.cities.filter((e: City) => e.id !== item.id);
      this.weather.setLocalStorageLocations(locations);
      if (this.weather.cities.length === 0) {
        this.weather.checkIfFirstTime();
      }
    },
  },
});
</script>
<style scoped lang="scss">
.row {
  display: flex;
  justify-content: space-between;
  &__main {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
.icon-wrapper {
  width: 20px;
  height: 20px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background-color: rgb(218, 218, 218);
  }
  & > img {
    height: 90%;
    width: 90%;
  }
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 95%;
  border-radius: 5px;
  flex-direction: column;
  @media screen and (min-width: 650px) {
    width: 50%;
    max-width: 400px;
  }
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
  background: #eeeeee;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
