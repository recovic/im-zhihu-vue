<template>
  <div>
    <b-row class="mt-3 mb-3">
      <b-col cols="8">
        <b-card>
          <h3>{{ question.title }}</h3>
          {{ question.content }}
          <hr>
          <b-link :href="'/publishAnswer/'+qid">添加回答</b-link>
          <b-link class="ml-4" v-if="question.creator.id == storage.get(storage.ID)"
                  :href="'/modifyQuestion/'+qid">修改问题</b-link>
          <b-link class="ml-4" v-if="question.creator.id == storage.get(storage.ID)"
                  @click="removeQuestion">删除问题</b-link>
        </b-card>

        <b-card no-body class="mt-3">
          <b-list-group flush>
            <b-list-group-item>
              {{ question.answer_count }} 条回答
            </b-list-group-item>
            <b-list-group-item v-for="answer in answers"
                               v-bind:key="answer.id">
              {{ answer.content }}
              <hr>
              <b-button variant="outline-primary" size="sm" :pressed="answer.upPressed"
                        @click="upvote(answer)"><b-icon
                  icon="caret-up-fill"></b-icon>{{ answer.upvote_count }} 赞同</b-button>
              <b-button class="ml-2" variant="outline-primary" size="sm" :pressed="answer.downPressed"
                        @click="downvote(answer)"><b-icon icon="caret-down-fill"></b-icon></b-button>
              <b-link class="float-right" v-if="answer.creator.id == storage.get(storage.ID)"
                      @click="removeAnswer(answer.id)">删除回答</b-link>
              <b-link class="mr-4 float-right" v-if="answer.creator.id == storage.get(storage.ID)"
                      :href="'/modifyAnswer/'+answer.id">修改回答</b-link>
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

export default {
    name: "Question",
    data() {
        return {
            qid: 0,
            question: {},
            answers: [],
            cursor: '',
            order: 'time',
            hasMore: true,
            storage: storage
        }
    },
    mounted: function () {
        this.qid = this.$route.params.id;
        this.getQuestion();
        this.getAnswers();
    },
    methods: {
        getQuestion() {
            let ctx = this;
            request.get('/question/' + ctx.qid)
                .then((res) => {
                    ctx.question = res.data.data;
                });
        },
        getAnswers() {
            let ctx = this;
            request.get('/answer?qid=' + ctx.qid + '&cursor=' + ctx.cursor +
                '&size=15' + '&orderby=' + ctx.order)
                .then((res) => {
                    if (res.data.code === 0) {
                        let begin = ctx.answers.length;
                        ctx.answers.push.apply(ctx.answers, res.data.data.answers);
                        for (let i = begin; i < ctx.answers.length; i++) {
                            request.get('/vote/answer/' + ctx.answers[i].id)
                                .then(function (res) {
                                    if (res.data.code === 0) {
                                        let s = parseInt(res.data.data);
                                        ctx.$set(ctx.answers[i], "upPressed", Boolean(s & 1));
                                        ctx.$set(ctx.answers[i], "downPressed", Boolean(s >> 1 & 1));
                                    }
                                });
                        }
                        ctx.cursor = res.data.data.next_cursor;
                    } else {
                        ctx.hasMore = false;
                    }
                });

        },
        setVote(answer, i) {
            request.put('/vote/answer/' + answer.id + '?s=' + i)
                .then(function (res) {
                    if (res.data.code === 0) {
                        answer.upPressed = Boolean(i & 1);
                        answer.downPressed = Boolean(i >> 1 & 1);
                    }
                });
        },
        upvote(answer) {
            if (!answer.upPressed) {
                this.setVote(answer, 1);
                answer.upvote_count++;
            } else {
                this.setVote(answer, 0);
                answer.upvote_count--;
            }
        },
        downvote(answer) {
            if (answer.upPressed) {
                answer.upvote_count--;
            }
            if (!answer.downPressed) {
                this.setVote(answer, 2);
            } else {
                this.setVote(answer, 0);
            }
        },
        removeQuestion() {
            let _this = this;
            if (confirm('确认要删除问题吗？')) {
                request.delete('/question/' + _this.qid)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            window.location = '/';
                        } else {
                            inform.toastDanger(_this, '发布失败', res.data.message);
                        }
                    })
                    .catch((err) => {
                        inform.toastDanger(_this, '请求错误', err.response.data.message);
                    });
            }
        },
        removeAnswer(id) {
            let _this = this;
            if (confirm('确认要删除回答吗？')) {
                request.delete('/answer/' + id)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            window.location = '/question/' + _this.qid;
                        } else {
                            inform.toastDanger(_this, '发布失败', res.data.message);
                        }
                    })
                    .catch((err) => {
                        inform.toastDanger(_this, '请求错误', err.response.data.message);
                    });
            }
        }
    }
}
</script>

<style scoped>

</style>