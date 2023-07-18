<template>
<div class="container-fluid">
  <div class="row">
    <!-- SECTION form and search bar -->
    <div class="col-4">
      <h2>Add a Gift!</h2>
      <form @submit.prevent="createGift()">
        <div>
          <label for="tag">Tag</label>
        </div>
        <input v-model="editable.tag" type="text" name="tag" id="tag" required>
        <div>
          <label for="url">url</label>
        </div>
        <input v-model="editable.url" type="url" name="url" id="url" required>
        <div>
          <input type="submit">
        </div>
      </form>
    </div>
    <!-- SECTION gifts section -->
    <div  class="col-8">
      <div class="row" >
        <div class="col-4 card p-4" v-for="gift in gifts" :key="gift.id">

          <GiftComponent :giftProp="gift"/>
          <!-- <img class="img-fluid" :src="gift.url" :alt="gift.tag">
          <p>{{ gift.tag }}</p> -->
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import Pop from "../utils/Pop.js";
import {giftsService} from "../services/GiftsService.js"
import { computed, onMounted, ref } from "vue";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import GiftComponent from "../components/GiftComponent.vue";

export default {

  setup() {
      const editable = ref({});
        async function getGifts() {
            try {
                await giftsService.getGifts();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        onMounted(() => {
            logger.log("home page mounted");
            getGifts();
        });
        return {
          editable,
          gifts: computed(() => AppState.gifts),
          async createGift(){
            try {
              const giftObject = editable.value
              await giftsService.createGift(giftObject)
            } catch (error) {
              Pop.error(error)
            }
          }
        };
    },
    components: { GiftComponent }
}
</script>

<style scoped lang="scss">

.carde{
  height: 20vh;
}
</style>
