<template>
  <div class="mt-3 mb-3">
    <b-card>
      <b-img v-bind:src="common.showAvatarUrl(profile.avatar_url)" height="80px" width="80px" rounded></b-img>
      <b-scan class="ml-3" style="font-size: 26px; font-weight: bold;">{{ profile.name }}</b-scan>
      <b-button style="float: right" href="/update_profile" variant="outline-primary">编辑资料</b-button>
    </b-card>
    <b-row class="mt-3">
      <b-col cols="8">

        <b-card no-body>
          <b-card-header header-tag="nav">
            <b-nav card-header tabs>
              <b-nav-item :active="flagQuestion()" @click="turnQuestion">我的提问</b-nav-item>
              <b-nav-item :active="flagAnswer()" @click="turnAnswer">我的回答</b-nav-item>
              <b-nav-item :active="flagVote()" @click="turnVote">我的点赞</b-nav-item>
            </b-nav>
          </b-card-header>

          <b-list-group v-if="flagQuestion()" flush>
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

          <b-list-group v-if="tabBit >> 1 & 3" flush>
            <b-list-group-item :href="'/question/' + answer.question_id" v-for="answer in answers"
                               v-bind:key="answer.id">
              <h5>{{ answer.question_title }}</h5>
              {{ answer.content }}
              <div class="text-gray">
                {{ answer.upvote_count }} 次赞同
              </div>
            </b-list-group-item>
            <b-button v-if="hasMore" variant="outline-primary" @click="getAnswers">加载更多</b-button>
          </b-list-group>

        </b-card>

      </b-col>
      <b-col>
        <b-card>
          右栏
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import request from "@/utils/request";
import storage from "@/utils/storage";
import inform from "@/utils/inform";
import common from "@/utils/common";

export default {
    name: "Profile",
    data() {
        return {
            questions: [],
            answers: [],
            cursor: '',
            order: 'time',
            hasMore: true,
            profile: {
                name: '',
                gender: '',
                avatar_url: '',
                description: ''
            },
            common: common,
            tabBit: 1,
        }
    },
    mounted() {
        this.getProfile();
        this.turnQuestion();
    },
    methods: {
        flagQuestion() { return this.tabBit & 1},
        flagAnswer() { return this.tabBit >> 1 & 1},
        flagVote() { return this.tabBit >> 2 & 1},
        turnQuestion() {
            this.tabBit = 1;
            this.cursor = '';
            this.questions = [];
            this.getQuestions();
        },
        turnAnswer() {
            this.tabBit = 2;
            this.cursor = '';
            this.answers = [];
            this.getAnswers();
        },
        turnVote() {
            this.tabBit = 4;
            this.cursor = '';
            this.answers = [];
            this.getVotes();
        },
        getProfile() {
            let ctx = this;
            request.get('/user/profile/' + storage.get(storage.ID))
                .then((res) => {
                    if (res.data.code === 0) {
                        ctx.profile = res.data.data;
                        ctx.avatar = ctx.profile.avatar_url;
                    } else {
                        inform.toastDanger(ctx, "获取失败", res.data.message);
                    }
                })
                .catch((err) => {
                    inform.toastDanger(ctx, '请求错误', err.response.data.message)
                });
        },
        getQuestions() {
            let ctx = this;
            request.get('/question?uid=' + storage.get(storage.ID) + '&cursor=' + this.cursor + '&size=15&orderby=' + ctx.order)
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
        getAnswers() {
            let ctx = this;
            request.get('/answer?uid=' + storage.get(storage.ID) + '&cursor=' + this.cursor + '&size=15&orderby=time')
                .then((res) => {
                    if (res.data.code === 0) {
                        ctx.cursor = res.data.data.next_cursor;
                        ctx.answers.push.apply(ctx.answers, res.data.data.answers);
                    } else if (res.data.code === 2101) {
                        ctx.hasMore = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getVotes() {
            let ctx = this;
            request.get('/answer?voteby=' + storage.get(storage.ID) + '&cursor=' + this.cursor + '&size=15&orderby=time')
                .then((res) => {
                    if (res.data.code === 0) {
                        ctx.cursor = res.data.data.next_cursor;
                        ctx.answers.push.apply(ctx.answers, res.data.data.answers);
                    } else if (res.data.code === 2101) {
                        ctx.hasMore = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>

</style>