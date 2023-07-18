import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class GiftsService {

  async getGifts() {
    // logger.log('gifts Service reached')
    const res = await api.get('api/gifts')
    // logger.log(res.data)
    const gifts = res.data.map(g => new Gift(g))
    // logger.log(gifts)
    AppState.gifts = gifts
    logger.log(AppState.gifts)
  }

  async openGift(gift) {
    const test = { opened: !gift.opened }
    const res = await api.put(`api/gifts/${gift.id}`, test)
    // logger.log(res)
    gift.opened = true
  }
  async createGift(giftObject) {
    logger.log(giftObject)
    const res = api.post(`api/gifts`, giftObject)
    const newGift = new Gift(res.data)
    AppState.gifts.push(newGift)
  }
}



export const giftsService = new GiftsService()