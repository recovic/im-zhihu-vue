<template>
  <div class="login">
    <b-row class="mt-5">
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <b-card>
          <b-form>
            <b-form-group>
              <h2>登录</h2>
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
              <b-form-input
                  v-model="user.password"
                  type="password"
                  placeholder="密码"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button variant="outline-primary" @click="login" block
              >登录
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
import storage from "@/utils/storage";

export default {
    data() {
        return {
            user: {
                email: "",
                password: ""
            }
        };
    },

    methods: {
        login() {
            let ctx = this;
            // TODO: 验证数据
            // 请求
            request.post('/user/login', ctx.user)
                .then(function (res) {
                    if (res.data.code === 0) {
                        storage.set(storage.TOKEN, res.data.data.token);
                        storage.set(storage.ID, res.data.data.id);
                        storage.set(storage.LOGGED, true);
                        window.location = '/';
                    } else {
                        inform.toastDanger(ctx, '登录失败', res.data.message)
                    }
                })
                .catch((err) => {
                    inform.toastDanger(ctx, '请求错误', err.response.data.message)
                });
        }
    }
}
</script>

<style scoped>

</style>