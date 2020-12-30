<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand href="/">主页</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

<!--          <b-navbar-nav>-->
<!--            <b-nav-item href="#">Link</b-nav-item>-->
<!--            <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
<!--          </b-navbar-nav>-->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>

            <!-- <b-nav-item-dropdown right>
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown> -->

            <b-nav-item v-if="!isLogged()" href="/register">注册</b-nav-item>
            <b-nav-item v-if="!isLogged()" href="/login">登录</b-nav-item>
            <b-nav-item v-if="isLogged()" href="/publishQuestion">发布问题</b-nav-item>
            <b-nav-item-dropdown v-if="isLogged()" text="我的" right>
              <b-dropdown-item href="#">个人中心</b-dropdown-item>
              <b-dropdown-item @click="logout">退出登录</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>

export default {
    methods: {
        isLogged() {
            return localStorage.logged;
        },
        logout() {
            localStorage.removeItem('logged');
            localStorage.removeItem('token');
            window.location = '/';
        }
    }
}
</script>

<style>
</style>