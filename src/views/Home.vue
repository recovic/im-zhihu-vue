<template>
  <div class="home">
    <b-row class="mt-3 mb-3">
      <b-col cols="8">

        <b-card no-body>
          <b-card-header header-tag="nav">
            <b-nav card-header tabs>
              <b-nav-item v-bind:active="active.newest" @click="turnNew">最新</b-nav-item>
              <b-nav-item v-bind:active="active.view" @click="turnView">最多浏览</b-nav-item>
              <b-nav-item v-bind:active="active.hot" @click="turnHot">热榜</b-nav-item>
            </b-nav>
          </b-card-header>

          <b-list-group v-if="active.newest || active.view" flush>
            <b-list-group-item :href="'/question/' + question.id" v-for="question in questions"
                               v-bind:key="question.id">
              <h5>{{ question.title }}</h5>
              {{ question.content }}
              <div class="text-gray">
                {{ question.view_count }} 次浏览・{{ question.answer_count }} 条回答
              </div>
            </b-list-group-item>
            <b-button v-if="hasMore" variant="outline-primary" @click="getQuestions">加载更多</b-button>
          </b-list-group>

          <b-list-group v-if="active.hot" flush>
            <b-list-group-item :href="'/question/' + question.id" v-for="question in questions"
                               v-bind:key="question.id">
              <h5>{{ question.title }}</h5>
              <div v-if="question.answer != null && question.answer.id != 0">
                <img v-bind:src="common.showAvatarUrl(question.answer.creator.avatar_url)" height="25px" width="25px"
                     rounded>
                {{ question.answer.creator.name }}
                <br>
                {{ question.answer.content }}
                <div class="text-gray">
                  {{ question.answer.upvote_count }} 赞同
                </div>
              </div>
            </b-list-group-item>
            <b-button v-if="hasMore" variant="outline-primary" @click="getHot">加载更多</b-button>
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
import common from "@/utils/common";

export default {

    data() {
        return {
            active: {
                newest: true,
                view: false,
                hot: false
            },
            questions: [],
            cursor: '',
            order: 'time',
            hasMore: true,
            common: common
        }
    },

    mounted: function () {
        let tab = this.$route.query.tab;
        switch (tab) {
            case 'view':
                this.turnView();
                break;
            case 'hot':
                this.turnHot();
                break;
            default:
                this.turnNew();
                break;
        }
    },

    methods: {

        clear() {
            for (let i in this.active) {
                this.active[i] = false;
            }
            this.cursor = '';
            this.questions = [];
        },

        turnNew() {
            this.clear();
            common.setUrlQuery(this, 'tab', '');
            this.active.newest = true;
            this.order = 'time';
            this.getQuestions();
        },

        turnView() {
            this.clear();
            common.setUrlQuery(this, 'tab', 'view');
            this.active.view = true;
            this.order = 'heat';
            this.getQuestions();
        },

        turnHot() {
            this.clear();
            common.setUrlQuery(this, 'tab', 'hot');
            this.active.hot = true;
            this.getHot();
        },

        getQuestions() {
            let ctx = this;
            request.get('/question?cursor=' + this.cursor + '&size=15&orderby=' + ctx.order)
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

        getHot() {
            let ctx = this;
            request.get('/hot?cursor=' + this.cursor + '&size=15')
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