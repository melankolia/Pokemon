
import Vue from "vue";
Vue.mixin({
    methods: {
        debounce(callback) {
            clearTimeout(this._timerId);
            this._timerId = setTimeout(() => {
              callback();
            }, 500);
        },
        parsingParams(arg) {
            const params = arg?.split("?")[1];
            if (params) {
            const urlParams = new URLSearchParams(params);
            const limit = urlParams.get('limit');
            const offset = urlParams.get('offset');
            return {limit, offset};
            }
            return null
        },
    }
})