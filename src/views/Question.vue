<template>
  <div>
    <b-row class="mt-3 mb-3">
      <b-col cols="8">
        <b-card>
          <h3>{{ question.title }}</h3>
          {{ question.content }}
          <hr>
          <b-link :href="'/publishAnswer/'+qid">添加回答</b-link>
        </b-card>

        <b-card no-body class="mt-3">
          <b-list-group flush>
            <b-list-group-item>
              {{ question.answer_count }} 条回答
            </b-list-group-item>
            <b-list-group-item href="#" v-for="answer in answers"
                               v-bind:key="answer.id">
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

export default {
    name: "Question",
    data() {
        return {
            qid: 0,
            question: {},
            answers: [],
            cursor: '',
            order: 'time',
            hasMore: true
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
                        ctx.answers.push.apply(ctx.answers, res.data.data.answers);
                        ctx.cursor = res.data.data.next_cursor;
                    } else {
                        ctx.hasMore = false;
                    }
                })
        }
    }
}
</script>

<style scoped>

</style>