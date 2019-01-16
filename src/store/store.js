import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

/* Vuex setup */
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export const store = new Vuex.Store({
    state: {
        player1: {
            score: 0
        },
        player2: {
            score: 0
        },
        round: {
            guesses: 0,
            turn: 1,
            pass: false
        },
        game: {
            remaining: 52,
            cards: [
                {
                    image: "",
                    value: 0
                }
            ]
        }
    },
    getters,
    mutations,
    actions,
    modules: {},
    plugins: [vuexLocal.plugin]
});
