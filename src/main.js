import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import App from "./App";

import router from "./router";
import { store } from "./store/store";

/* Axios Setup */
axios.defaults.baseURL = "https://deckofcardsapi.com/api/deck/";

/* Bootstrap setup and CSS import */
import "./styles/style.scss";
Vue.use(BootstrapVue);

/* Vue general configuration */
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
