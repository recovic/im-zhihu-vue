<template>
  <div class="modifyQuestion">
    <b-row class="mt-3 mt-3">
      <b-col>
        <b-card>
          <b-form>
            <b-form-group>
              <h2>修改问题</h2>
            </b-form-group>

            <b-form-group>
              <b-form-input
                  v-model="question.title"
                  type="text"
                  placeholder="标题"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-textarea
                  id="textarea"
                  v-model="question.content"
                  placeholder="问题详情"
                  rows="10"
                  max-rows="20"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group>
              <b-form-input
                  v-model="question.tag"
                  type="text"
                  placeholder="标签"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button variant="outline-primary" @click="publish"
              >修改
              </b-button
              >
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>


import request from "@/utils/request";
import inform from "@/utils/inform";

export default {
    data() {
        return {
            qid: 0,
            question: {
                title: '',
                content: '',
                tag: ''
            }
        };
    },

    mounted: function () {
        this.qid = this.$route.params.id;
        this.getQuestion();
    },

    methods: {
        getQuestion() {
            let ctx = this;
            request.get('/question/' + ctx.qid)
                .then((res) => {
                    ctx.question.title = res.data.data.title;
                    ctx.question.content = res.data.data.content;
                    ctx.question.tag = res.data.data.tag;
                });
        },
        publish() {
            let _this = this;
            request.put('/question/' + _this.$route.params.id, _this.question)
                .then(function (res) {
                    if (res.data.code === 0) {
                        //inform.toastSuccess(ctx, '发布成功', res.data.message);
                        //ctx.$router.replace({name: "Home"});
                        window.location = '/question/' + _this.$route.params.id;
                    } else {
                        inform.toastDanger(_this, '发布失败', res.data.message);
                    }
                })
                .catch((err) => {
                    inform.toastDanger(_this, '请求错误', err.response.data.message);
                });
        }
    },
};
</script>

<style>
</style>