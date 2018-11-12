<template>
    <div class="player animated fadeIn">
        <div class="discBox" draggable="true">
            <img class="disc" src="../assets/disc-plus.png" alt="">
            <img class="disc_light" :class="{rotate: this.$store.state.currentPlay ,norotate: !this.$store.state.currentPlay}" src="../assets/disc_light-plus.png" alt="" id="disc">
            <img class="cover" :class="{rotate: this.$store.state.currentPlay ,norotate: !this.$store.state.currentPlay}" id="cover" :src="this.$store.state.currentMusic.al.picUrl" alt="">
        </div>
        <audio id="audio" :src="musicUrl"></audio>
    </div>
</template>

<script>
import styler from "stylefire";
import { value, listen, spring, pointer } from "popmotion";
export default {
    name: "Player",
    data() {
        return {
            currentIndex: 0,
            lastIndex: 0
        };
    },
    computed: {
        musicUrl() {
            return `http://music.163.com/song/media/outer/url?id=${
                this.$store.state.currentMusic.id
            }.mp3`;
        }
    },
    mounted() {
        this.disc();
    },
    methods: {
        play: function() {
            let audio = document.getElementById("audio");
            if (this.$store.state.currentPlay) {
                audio.pause();
                this.$store.commit("changePlay", false);
            } else {
                audio.play();
                this.$store.commit("changePlay", true);
            }
        },
        disc: function() {
            const disc = document.querySelector(".discBox");
            const player = document.querySelector(".player");
            const divStyler = styler(disc);
            const ballXY = value({ x: 0, y: 0 }, divStyler.set);
            const audio = document.getElementById("audio");
            audio.onended = () => this.nextMusic();
            listen(disc, "mousedown touchstart").start(e => {
                e.preventDefault();
                pointer(ballXY.get()).start(ballXY);
            });

            listen(player, "mouseup touchend").start(() => {
                let endX = ballXY.get().x;
                let endY = ballXY.get().y;
                if (endX > 100) {
                    if (this.$store.state.homePage) {
                        this.$router.push(
                            `/Album/${this.$store.state.currentListName}`
                        );
                        this.$store.commit("changeComponent", false);
                    } else {
                        this.$router.push("/");
                        this.$store.commit("changeComponent", true);
                    }
                } else if (Math.abs(endX) < 100 && endX !== 0) {
                    if (endY > 150) {
                        this.nextMusic();
                    } else if (endY < -150) {
                        this.lastMusic();
                    } else {
                        this.play();
                    }
                } else if (endX < -100) {
                    if (this.$store.state.homePage) {
                        this.$store.commit("changeComponent", false);
                        this.$router.push("/Describe");
                    } else {
                        this.$store.commit("changeComponent", true);
                        this.$router.push("/");
                    }
                }
                spring({
                    from: ballXY.get(),
                    velocity: ballXY.getVelocity(),
                    to: { x: 0, y: 0 },
                    stiffness: 200
                    // mass: 1,
                    // damping: 10
                }).start(ballXY);
            });
        },
        nextMusic: function() {
            const audio = document.getElementById("audio");
            this.$store.state.currentLoop.random
                ? this.random()
                : this.singleLoop();
            setTimeout(() => {
                audio.play();
                this.$store.commit("changePlay", true);
            }, 0);
            audio.onerror = () => this.nextMusic();
            this.$store.commit("changeGradient");
        },
        random: function() {
            let musicMumber = this.$store.state.currentList.length;
            let i = Math.floor(Math.random() * (musicMumber + 1));
            this.$store.commit("changeMusic", this.$store.state.currentList[i]);
        },
        singleLoop: function() {
            setTimeout(() => {
                audio.load();
                audio.play();
                this.$store.commit("changePlay", true);
            }, 0);
        },
        lastMusic() {
            const audio = document.getElementById("audio");
            console.log("上一首");
            this.$store.commit("changeMusic", this.$store.state.lastMusic);
            setTimeout(() => {
                audio.play();
                this.$store.commit("changePlay", true);
            }, 0);
        }
    }
};
</script>

<style lang='less' scoped>
@keyframes circle {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.player {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 470px;
    justify-content: center;
    align-items: center;
    .discBox {
        width: 470px;
        height: 470px;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 35px;
        top: 35px;
        z-index: 1;
        margin-bottom: 40px;
        .disc_light {
            position: absolute;
            width: 470px;
        }
        .disc {
            position: absolute;
            width: 470px;
            height: 470px;
        }
        .cover {
            width: 292px;
            height: 292px;
            position: absolute;
            border-radius: 50%;
        }
        #hidden {
            width: 292px;
            height: 292px;
            position: absolute;
            border-radius: 50%;
        }
        .rotate {
            animation: circle 20s infinite linear;
        }
        .norotate {
            animation: circle 20s infinite linear;
            animation-play-state: paused;
        }
    }
    .about {
        color: white;
        .name {
            font-size: 40px;
        }
    }
}
</style>
