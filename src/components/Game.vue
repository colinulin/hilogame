<template>
    <b-container>
        <b-row>
            <b-col sm="3"> <Scores /> </b-col>
            <b-col sm="6">
                <b-container>
                    <b-row class="mb-4">
                        <b-col>
                            <h4>Player {{ round.turn }}'s Turn</h4>
                            <div>
                                Is the next card higher or lower than the top
                                card?
                            </div>
                        </b-col>
                    </b-row>
                    <b-row class="text-center">
                        <b-col>
                            <fieldset
                                :disabled="
                                    submitted || this.game.remaining <= 1
                                "
                                style="display: block;"
                            >
                                <b-button-group>
                                    <b-button
                                        variant="success"
                                        @click="submitAnswer('higher')"
                                        >Higher &uarr;</b-button
                                    >
                                    <b-button
                                        variant="danger"
                                        @click="submitAnswer('lower')"
                                        >Lower &darr;</b-button
                                    >
                                    <b-button
                                        variant="primary"
                                        v-if="round.pass"
                                        @click="submitPass()"
                                        >PASS</b-button
                                    >
                                </b-button-group>
                            </fieldset>
                            <transition name="fade">
                                <div :class="alertClass" v-if="alertShow">
                                    {{ alertText }}
                                </div>
                            </transition>
                            <small class="text-right">TOP CARD</small><br />
                            <img :src="game.cards[0].image" />
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Scores from "./Scores.vue";

import { mapGetters, mapActions } from "vuex";
import * as types from "./../store/types";

export default {
    name: "Game",

    computed: {
        ...mapGetters({
            game: types.GET_GAME_INFO,
            round: types.GET_ROUND
        })
    },
    methods: {
        ...mapActions({
            drawCard: types.DRAW_CARD,
            pass: types.PASS
        }),
        submitAnswer(answer) {
            this.submitted = true;

            this.drawCard(answer).then(res => {
                if (res.success) {
                    if (res.correct) {
                        this.showAlert(
                            `Correct answer! You get to go again.`,
                            "alert bg-success"
                        );
                    } else {
                        this.showAlert(
                            `Incorrect answer. It is now the other player's turn.`,
                            "alert bg-danger"
                        );
                    }
                    this.submitted = false;
                } else {
                    alert("An error occurred.");
                }
            });
        },
        submitPass() {
            this.submitted = true;
            this.pass();
            this.showAlert(
                `Passed! It's player ${this.round.turn}'s turn now.`,
                "alert bg-warning"
            );
            this.submitted = false;
        },
        showAlert(text, classes) {
            this.alertText = text;
            this.alertClass = classes;
            this.alertShow = true;
            setTimeout(() => {
                this.alertShow = false;
            }, 2000);
        }
    },
    components: {
        Scores
    },
    data() {
        return {
            submitted: false,
            alertText: "Test",
            alertClass: "alert bg-success",
            alertShow: false
        };
    }
};
</script>

<style lang="css" scoped>
.fade-enter-active {
    opacity: 1;
    transition: opacity 0s;
}
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.alert {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -30px;
    font-size: 22px;
}
</style>
