<template>
    <div>
        <b-card style="max-width: 18rem;" no-body>
            <b-list-group>
                <b-list-group-item>
                    <h4 class="card-title">Current Game</h4>
                    <div class="player player-dealer">
                        Player 1: <span>{{ player1.points }}</span> point{{
                            player1.points == 1 ? "" : "s"
                        }}
                    </div>
                    <div class="player player-player">
                        Player 2: <span>{{ player2.points }}</span> point{{
                            player2.points == 1 ? "" : "s"
                        }}
                    </div>
                </b-list-group-item>
                <b-list-group-item>
                    <div>Face Up Cards: {{ round.guesses }}</div>
                    <div>Remaining Cards: {{ game.remaining }}</div>
                </b-list-group-item>
                <b-list-group-item>
                    <b-button
                        variant="secondary"
                        style="width: 100%"
                        class="mb-2"
                        @click="showRules = !showRules"
                        >Rules</b-button
                    >
                    <b-button
                        variant="warning"
                        style="width: 100%"
                        @click="restartGame()"
                        >Restart Game</b-button
                    >
                </b-list-group-item>
            </b-list-group>
        </b-card>
        <b-modal
            v-model="game.remaining <= 1"
            hide-footer
            hide-header
            class="text-center"
        >
            <h2>{{ winnerText }}</h2>
            <br />
            <b-button
                variant="success"
                style="width: 100%"
                @click="restartGame()"
                >New Game</b-button
            >
        </b-modal>
        <b-modal v-model="showRules" hide-footer title="Hi - Lo Rules">
            <p>
                Play consists of a dealer and a player and progresses as
                follows:
            </p>
            <ol>
                <li>
                    The dealer draws a card from the top of the deck and places
                    it face up.
                </li>
                <li>
                    The player must guess whether the next card drawn from the
                    deck will be higher or lower than the face up card.
                </li>
                <li>
                    Once the player guesses, the dealer draws the next card and
                    places it face up on top of the previous card.
                </li>
                <li>If the player is correct, go back to step 2.</li>
                <li>
                    If the player is wrong, the player receives a point for each
                    card in the face up pile, and the face up pile is discarded.
                    Then play begins at step 1 again.
                </li>
            </ol>
            <p>
                When the player has made three correct guesses in a row, s/he
                may make another guess, or choose to pass and the roles are
                reversed with the face up pile continuing to build. The player
                may choose to continue if there is a high likelihood that their
                next guess would be correct. If they are wrong, play starts over
                at step 1 and the player must again make three correct guesses
                before being allowed to pass. If they are correct, they can
                continue or pass.
            </p>
            <p>The goal is to end the game with as few points as possible.</p>
            <p><strong>NOTE:</strong> Aces are low.</p>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "./../store/types";

export default {
    name: "Header",

    computed: {
        ...mapGetters({
            game: types.GET_GAME_INFO,
            player1: types.GET_PLAYER1,
            player2: types.GET_PLAYER2,
            round: types.GET_ROUND
        }),
        winnerText() {
            if (this.player1.points == this.player2.points)
                return "It was a tie!";
            return `Player ${
                this.player1.points < this.player2.points ? 1 : 2
            } has won the game with only ${
                this.player1.points < this.player2.points
                    ? this.player1.points
                    : this.player2.points
            } points!`;
        }
    },
    methods: {
        ...mapActions({
            newGame: types.NEW_GAME
        }),
        restartGame() {
            // confirm new game before submitting newGame action
            if (confirm("Are you sure you want to start a new game?")) {
                this.newGame();
            }
        }
    },
    data() {
        return {
            showRules: false
        };
    }
};
</script>
