<template>
  <div class="publishQuestion">
    <b-row class="mt-5">
      <b-col>
        <b-card>
          <b-form>
            <b-form-group>
              <h2>发布问题</h2>
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
              >发布
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
            question: {
                title: '',
                content: '',
                tag: ''
            }
        };
    },

    methods: {
        publish() {
            let ctx = this;
            request.post('/question', ctx.question)
                .then(function (res) {
                    if (res.data.code === 0) {
                        window.location = '/';
                    } else {
                        inform.toastDanger(ctx, '发布失败', res.data.message)
                    }
                })
                .catch((err) => {
                    inform.toastDanger(ctx, '请求错误', err.response.data.message)
                });
        }
    },
};
</script>

<style>
</style>