<template>
  <div>
    <form class="form-signin p-3 border" @submit.prevent="register">
      <div class="m-5">
        <center class="mb-4">
          <div class="my-3">
            <i
              class="fa fa-pencil fa-5x text-primary border rounded-circle p-5 cus-shadow"
              aria-hidden="true"
            ></i>
          </div>
          <h1>Mini WP</h1>
        </center>
        <center>
          <h5 class="font-weight-normal">Register new account</h5>
        </center>
        <div class="my-3">
          <label for="name" class="sr-only">Name</label>
          <input
            v-model="inputLoginRegister.name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Name"
          >

          <label for="email" class="sr-only">Email address</label>
          <input
            v-model="inputLoginRegister.email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Email address"
          >

          <label for="password" class="sr-only">Password</label>
          <input
            v-model="inputLoginRegister.password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
          >
        </div>
        <button class="btn btn-lg btn-primary btn-block my-3" type="submit">Register</button>
        <div class="text-center">
          Have an account?
          <a href @click.prevent.prevent="page_login">Login</a>
        </div>
        <center>
          <p class="mt-3 mb-3 text-muted">© Novi Irnawati</p>
        </center>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["input", "ax"],
  data() {
    return {
      inputLoginRegister: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  created() {
    this.inputLoginRegister = this.input;
  },
  methods: {
    register() {
      let { name, email, password } = this.inputLoginRegister;
      let inputVal = { name, email, password };
      if (name !== "" && email !== "" && password !== "") {
        this.ax({
          method: "POST",
          url: "/users/register",
          data: inputVal
        })
          .then(({ data }) => {
            this.$emit("pindah_login_afteregister", data.email);
          })
          .catch(err => {
            console.log(err);
            console.log("error register", JSON.stringify(err, null, 2));
            if (err.response.data.message) {
              swal("Sorry", err.response.data.message, "error");
            } else {
              swal("Sorry", "Problem occured, try again later", "error");
            }
          });
      }
    },
    page_login() {
      this.$emit("pindah_login");
    }
  }
};
</script>