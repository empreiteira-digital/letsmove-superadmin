<template>
  <div>
    <div class="login-container">
      <div class="login-form">
        <h1>Login</h1>
        <hr>
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="E-mail"
              required
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Senha"
              required
            >
          </div>
          <div
            class="error-message"
            v-if="error"
          >
            {{ error }}
          </div>
          <div class="signup-link">
            <router-link
              to="/esqueceu-senha"
            >
              Esqueceu a senha?
            </router-link>
          </div>
          <div v-if="AuthStore.isLoadingAdmin">
            <h2>
              Autenticando...
            </h2>
            <ProgressBar
              mode="indeterminate"
              style="height: 6px"
            />
          </div>
          <button
            type="submit"
            :disabled="AuthStore.isLoadingAdmin"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useAuthStore from '@/stores/AuthStore';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  async created() {
    await this.AuthStore.logout();
  },
  methods: {
    async login() {
      const params = { email: this.email, password: this.password };
      await this.AuthStore.login(params);

      if (this.AuthStore.isAuthenticated) {
        this.$router.push('/profissionais');
      } else {
        this.error = 'Login inválido';
      }
    },
  },
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>

<style scoped>
/* Estilize conforme necessário */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  width: 28.125rem;
}

h1 {
  font-size: 32px;
  margin-bottom: 40px;
  font-family: "Roboto";
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  display: block;
  outline: none;
  width: 100%;
  padding: 12px 11px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  font-weight: 400;
  font-size: 1rem;
}

button {
  font-size: 1rem;
  width: 100%;
  padding: 10px 0px;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  background-color: rgb(188, 113, 235);
  margin: 20px 0;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

a {
  text-decoration: none;
  display: block;
  width: max-content;
  margin-left: auto;
  margin-top: 5px;
  padding: 5px;
  font-size: 1rem;
  color: rgb(188, 113, 235);
}

.error-message {
  color: red;
  margin-top: 10px;
}

</style>
