<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <b-card>
          <b-form>
            <b-form-group>
              <h2>注册</h2>
            </b-form-group>

            <b-form-group>
              <b-form-input
                  v-model="user.email"
                  type="email"
                  placeholder="邮箱"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-row>
                <b-col cols="8">
                  <b-form-input
                      v-model="user.verification_code"
                      type="text"
                      placeholder="验证码"
                      required
                  ></b-form-input>
                </b-col>

                <b-col>
                  <b-button variant="outline-primary" @click="sendVrfCode" block
                  >发送验证码
                  </b-button
                  >
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group>
              <b-form-input
                  v-model="user.name"
                  type="text"
                  placeholder="昵称"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                  v-model="user.password"
                  type="password"
                  placeholder="密码"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-input
                  v-model="user.re_password"
                  type="password"
                  placeholder="确认密码"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button variant="outline-primary" @click="register" block
              >注册
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
import storageService from "@/service/storageService";
import request from "@/utils/request";
import inform from "@/utils/inform";

export default {
    data() {
        return {
            user: {
                name: "",
                verification_code: "",
                email: "",
                password: "",
                re_password: "",
            },
        };
    },

    methods: {
        register() {
            let ctx = this;
            // TODO: 验证数据
            // 请求
            request.post('/user/register', ctx.user)
                .then(function (res) {
                    if (res.data.code === 0) {
                        storageService.set(storageService.USER_TOKEN, res.data.data.token);
                        this.$store.commit('setLogged');
                        ctx.$router.replace({name: "Home"});
                    } else {
                        inform.toastDanger(ctx, '注册失败', res.data.message)
                    }
                })
                .catch((err) => {
                    inform.toastDanger(ctx, '请求错误', err.response.data.message)
                });
        },

        sendVrfCode() {
            let ctx = this;
            request
                .get("/user/verify?email=" + ctx.user.email)
                .then(function (res) {
                    if (res.data.code === 0) {
                        inform.toastSuccess(ctx, '发送成功', res.data.message);
                    } else {
                        inform.toastDanger(ctx, '发送失败', res.data.message);
                    }
                })
                .catch((err) => {
                    inform.toastDanger(ctx, '请求错误', err.response.data.message);
                });
        },
    },
};
</script>

<style>
</style>