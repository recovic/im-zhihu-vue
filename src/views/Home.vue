<template>
  <div class="home">
    <b-row class="mt-5">
      <b-col cols="8">

        <b-card no-body>
          <b-card-header header-tag="nav">
            <b-nav card-header tabs>
              <b-nav-item active>最新</b-nav-item>
              <b-nav-item>热榜</b-nav-item>
            </b-nav>
          </b-card-header>
          <b-list-group flush>
            <b-list-group-item href="#" v-for="question in questions" v-bind:key="question.id">
              <h5>{{ question.title }}</h5>
              Some content.
            </b-list-group-item>
            <b-button v-if="hasMore" variant="outline-primary" @click="getQuestions">加载更多</b-button>
          </b-list-group>

        </b-card>

      </b-col>
      <b-col>
        <b-card>
          右栏
        </b-card>
      </b-col>
    </b-row>

    <div class="float-button">
      <b-button @click="goUp" variant="outline-secondary">↑</b-button>
    </div>
  </div>
</template>

<script>

import request from "@/utils/request";

export default {

    data() {
        return {
            questions: [],
            cursor: '',
            order: 'time',
            hasMore: true
        }
    },

    mounted: function () {
        this.getQuestions();
    },

    methods: {
        getQuestions() {
            let ctx = this;
            request.get('/question?cursor=' + this.cursor + '&size=10&orderby=' + ctx.order)
                .then((res) => {
                    if (res.data.code === 0) {
                        ctx.cursor = res.data.data.next_cursor;
                        ctx.questions.push.apply(ctx.questions, res.data.data.questions);
                    } else if (res.data.code === 2101) {
                        ctx.hasMore = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        goUp() {
            let nowTop = document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
            if (nowTop > 0) {
                window.requestAnimationFrame(this.goUp);
                window.scrollTo(0, nowTop - (nowTop / 5));
            }
        }
    }
}
</script>

<style>
.float-button {
    position: fixed;
    height: 90px;
    width: 40px;
    bottom: -30px;
    right: 0px;
}
</style>