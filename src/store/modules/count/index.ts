import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
  state() {
    return {
      count: 0,
    }
  },
  actions: {
    inc() {
      this.count += 1
    },
    dec() {
      this.count -= 1
    },
    async asyncInc() {
      setTimeout(() => {
        this.inc()
      }, 300)
    },
  },

})
