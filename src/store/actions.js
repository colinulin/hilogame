import * as types from "./types";
import router from "./../router/";

// import helper functions
import { calculateCardValue } from "./../helpers.js";

import axios from "axios";

export default {
    [types.NEW_GAME]: ({ commit, state }, payload) => {
        return new Promise((resolve, reject) => {
            // request a new deck from API
            axios
                .get(`new/draw/?count=1`)
                .then(res => {
                    if (res.data.success) {
                        commit(types.MUTATE_NEW_GAME, {
                            game: res.data
                        });
                        resolve({ success: true });
                    } else {
                        console.log(res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    [types.DRAW_CARD]: ({ commit, state }, payload) => {
        return new Promise((resolve, reject) => {
            // request a new card with deck ID from API
            axios
                .get(`${state.game.deck_id}/draw/?count=1`)
                .then(res => {
                    if (res.data.success) {
                        const nextCardValue = calculateCardValue(
                            res.data.cards[0].value
                        );
                        let wasCorrect = false;

                        // if correct guess
                        if (
                            (payload == "higher" &&
                                state.game.cards[0].value < nextCardValue) ||
                            (payload == "lower" &&
                                state.game.cards[0].value > nextCardValue)
                        ) {
                            commit(types.MUTATE_CORRECT);
                            wasCorrect = true;
                        }
                        // if incorrect guess
                        else {
                            commit(types.MUTATE_INCORRECT);
                        }

                        commit(types.MUTATE_GAME_INFO, { game: res.data });
                        resolve({ success: true, correct: wasCorrect });
                    } else {
                        console.log(res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    [types.PASS]: ({ commit, state }, payload) => {
        commit(types.MUTATE_PASS);
    }
};
