<template>
  <div v-if="giftProp.opened == true">
    <img class="img-fluid" :src="giftProp.url" :alt="giftProp.tag">
    <p>{{ giftProp.tag }}</p>
  </div>
  <div class="selectable" @click="openGift(giftProp)" v-else>
    <img class="img-fluid" src="https://hypland.com/cdn/shop/products/image_0561917a-0309-4770-b471-b5ee322162a3.jpg?v=1675266685" alt="Backing">
    <p>{{ giftProp.tag }}</p>
  </div>
</template>


<script>
import { Gift } from "../models/Gift.js";
import { giftsService } from "../services/GiftsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    giftProp: {type: Gift, required: true}
  },
  setup(){
    
    return {
      async openGift(gift){
        try {
          await giftsService.openGift(gift)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>