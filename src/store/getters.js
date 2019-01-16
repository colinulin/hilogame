import * as types from "./types";

export default {
    [types.GET_GAME_INFO]: state => {
        return state.game;
    },
    [types.GET_PLAYER1]: state => {
        return state.player1;
    },
    [types.GET_PLAYER2]: state => {
        return state.player2;
    },
    [types.GET_ROUND]: state => {
        return state.round;
    }
};
