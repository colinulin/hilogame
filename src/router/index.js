import Vue from "vue";
import Router from "vue-router";

import * as types from "./../store/types";
import { store } from "./../store/store";

import Game from "./../components/Game";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            beforeEnter: (to, from, next) => {
                // if card has NOT been drawn
                if (
                    !store.getters[types.GET_GAME_INFO].cards ||
                    store.getters[types.GET_GAME_INFO].cards[0].value === 0
                ) {
                    store.dispatch(types.NEW_GAME); // start a new game
                    next();
                } else {
                    next();
                }
            },
            path: "/",
            name: "Game",
            component: Game
        }
    ]
});
