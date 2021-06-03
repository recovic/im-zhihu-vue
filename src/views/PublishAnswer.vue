<template>
  <div class="publishQuestion">
    <b-row class="mt-3 mt-3">
      <b-col>
        <b-card>
          <b-form>
            <b-form-group>
              <h2>发布回答</h2>
            </b-form-group>

            <b-form-group>
              <b-form-textarea
                  id="textarea"
                  v-model="answer.content"
                  placeholder="内容"
                  rows="10"
                  max-rows="20"
              ></b-form-textarea>
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
            answer: {
                content: ''
            },
            qid: 0
        };
    },

    mounted: function () {
        this.qid = this.$route.params.id;
    },

    methods: {
        publish() {
            let ctx = this;
            request.post('/answer?qid=' + ctx.qid, ctx.answer)
                .then(function (res) {
                    if (res.data.code === 0) {
                        //inform.toastSuccess(ctx, '发布成功', res.data.message);
                        //ctx.$router.replace({name: "Home"});
                        window.location = '/question/' + ctx.qid;
                    } else {
                        inform.toastDanger(ctx, '发布失败', res.data.message);
                    }
                })
                .catch((err) => {
                    inform.toastDanger(ctx, '请求错误', err.response.data.message);
                });
        }
    },
};
</script>

<style>
</style>