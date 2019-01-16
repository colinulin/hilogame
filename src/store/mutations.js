import * as types from "./types";

import { calculateCardValue } from "./../helpers.js";

export default {
    [types.MUTATE_GAME_INFO]: (state, payload) => {
        payload.game.cards[0].value = calculateCardValue(
            payload.game.cards[0].value
        );
        state.game = payload.game;
    },
    [types.MUTATE_PASS]: (state, payload) => {
        state.round.turn = state.round.turn == 1 ? 2 : 1; // switch turn to other player
        state.round.pass = false; // disable passing option
    },
    [types.MUTATE_CORRECT]: (state, payload) => {
        state.round.guesses = state.round.guesses + 1;
        state.round.pass = state.round.guesses > 3; // allow passing option after 3 or more guesses and a correct answer
    },
    [types.MUTATE_INCORRECT]: (state, payload) => {
        if (state.round.turn == 1) {
            state.player1.points += state.round.guesses; // increment player 1s points
        } else {
            state.player2.points += state.round.guesses; // increment player 2s points
        }
        state.round = {
            guesses: 1,
            turn: state.round.turn == 1 ? 2 : 1, // switch turn to other player
            pass: false
        }; // reset round settings
    },
    [types.MUTATE_NEW_GAME]: (state, payload) => {
        payload.game.cards[0].value = calculateCardValue(
            payload.game.cards[0].value
        );
        state.game = payload.game;
        state.player1 = { points: 0 };
        state.player2 = { points: 0 };
        state.round = { guesses: 1, turn: 1, pass: false }; // reset round settings
    }
};
