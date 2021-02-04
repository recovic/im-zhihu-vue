<template>
  <div>
    <b-row class="mt-3 mb-3 w-75 mx-auto">
      <b-col>
        <b-card>
          <b-form>
            <b-form-group>
              <h2>修改个人信息</h2>
            </b-form-group>

            <b-form-group label="昵称：">
              <b-form-input
                  v-model="profile.name"
                  type="text"
                  placeholder="昵称"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group label="头像：">
              <b-img v-bind:src="avatar" height="100px" width="100px" rounded alt="头像"></b-img>
              <b-form-file v-model="file" class="mt-3" plain></b-form-file>
            </b-form-group>

            <b-form-group label="性别：">
              <b-form-radio v-model="profile.gender" name="some-radios" value="0">保密</b-form-radio>
              <b-form-radio v-model="profile.gender" name="some-radios" value="1">男</b-form-radio>
              <b-form-radio v-model="profile.gender" name="some-radios" value="2">女</b-form-radio>
            </b-form-group>

            <b-form-group label="简介：">
              <b-form-textarea
                  v-model="profile.description"
                  placeholder="简介"
                  rows="3"
                  max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group>
              <b-button variant="outline-primary" @click="upload"
              >更新
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
import common from "@/utils/common";
import axios from "axios";
import inform from "@/utils/inform";
import request from "@/utils/request";
import storage from "@/utils/storage";

export default {
    name: "Profile",
    data() {
        return {
            file: null,
            avatar: '',
            profile: {
                name: '',
                gender: '',
                avatar_url: '',
                description: ''
            }
        }
    },
    watch: {
        file: function (val) {
            let ctx = this;
            let reader = new FileReader();
            reader.readAsDataURL(val);
            reader.onloadend = function(e) {
                ctx.avatar = e.target.result;
            };
        }
    },
    mounted() {
        this.getProfile();
    },
    methods: {
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
        upload() {
            let ctx = this;
            common.getFileBase64(this.file, async function (dat) {
                await axios.post(common.PIC_SERVER + "&file_name=" + ctx.file.name, { "file": dat })
                    .then((res) => {
                        if (res.data.data.err_code === 0) {
                            ctx.profile.avatar_url = res.data.data.url;
                            console.log(res.data);
                        } else {
                            inform.toastDanger(ctx, "上传图片失败", res.data.data.err_msg);
                            console.log(res.data);
                        }
                    })
                    .catch((err) => {
                        inform.toastDanger(ctx, "上传图片失败", err.response.data.msg);
                        console.log(err.response.data)
                    });
                if (typeof (ctx.profile.gender) == 'string') {
                    ctx.profile.gender = parseInt(ctx.profile.gender);
                }
                request.put('/user/profile', ctx.profile)
                    .then((res) => {
                        if (res.data.code === 0) {
                            window.location = '/';
                        } else {
                            inform.toastDanger(ctx, "更新失败", res.data.message);
                        }
                    })
                    .catch((err) => {
                        inform.toastDanger(ctx, '更新错误', err.response.data.message)
                    });
            });
        }
    }
}
</script>

<style scoped>

</style>