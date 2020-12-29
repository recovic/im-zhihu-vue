<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
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
                <b-col>
                  <b-form-input
                    v-model="user.verification_code"
                    type="text"
                    placeholder="验证码"
                    required
                  ></b-form-input>
                </b-col>

                <b-col>
                  <b-button
                    variant="outline-primary"
                    @click="sendVrfCode"
                  >发送验证码</b-button>
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
              <b-button
                variant="outline-primary"
                @click="register"
                block
              >注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
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
      let out = this;
      // 验证数据
      // 请求
      axios
        .post("http://localhost:8080/user/register", { ...this.user })
        .then(function (res) {
          if (res.data.code !== 0) {
            out.$bvToast.toast(res.data.message, {
              title: `注册失败`,
              variant: "danger",
              solid: true,
            });
          } else {
            out.$bvToast.toast(res.data.message, {
              title: `注册成功`,
              variant: "success",
              solid: true,
            });
          }
        });
    },
    sendVrfCode() {
      let out = this;
      axios
        .get("http://localhost:8080/user/verify?email=" + this.user.email)
        .then(function (res) {
          if (res.data.code !== 0) {
            out.$bvToast.toast(res.data.message, {
              title: `Send Vrf Code Error`,
              variant: "danger",
              solid: true,
            });
          } else {
            out.$bvToast.toast(res.data.message, {
              title: `发送成功`,
              variant: "success",
              solid: true,
            });
          }
        });
    },
  },
};
</script>

<style>
</style>