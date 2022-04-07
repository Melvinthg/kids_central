<template>
  <nav>
    <div
      @click="this.$router.push($store.state.user ? '/home' : '/')"
      class="navtitle"
    >
      <img
        src="@/assets/KidsCentralLogo.png"
        alt=""
        style="width: 30px; height: 30px; margin-right: 5px"
      />
      <span>Kids Central</span>
    </div>

    <div
      style="margin-left: auto"
      v-if="!$store.state.user && $router.currentRoute.value.path == '/'"
    >
      <el-button
        type="text"
        @click="this.$router.push('/login')"
        class="loginbtn"
      >
        Login
      </el-button>
      <el-dropdown class="dropdown">
        <el-button>
          Register <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="this.$router.push('/signupparent')">
              Register as Parent</el-dropdown-item
            >
            <el-dropdown-item @click="this.$router.push('/signupteacher')">
              Register as Teacher
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-popover :width="250" v-model:visible="visible" v-if="$store.state.user">
      <div style="padding: 15px">
        <span style="font-size: 16px">
          Hi <b>{{ name }}</b>
        </span>
        <br />
        <span class="email">{{ email }}</span>
        <br />
        <!-- <span>Type: {{ this.type }}</span> -->
        <el-divider />
        <el-button @click="logout" type="danger" style="width: 100%">
          Log out
        </el-button>
      </div>
      <template #reference>
        <el-button class="useravatar" circle @click="visible = !visible">
          <b>{{ name.charAt(0) }}</b>
        </el-button>
      </template>
    </el-popover>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { onBeforeMount } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { mapState } from "vuex";

export default {
  name: "LandingTopBar",
  data() {
    return {
      name: "",
      email: "",
      type: "",
      visible: false,
    };
  },
  computed: mapState(["userModel"]),
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.visible = false;
    },
    getUserDetails() {
      if (this.$store.state.userModel) {
        this.name =
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last;
        this.email = this.$store.state.userModel.email;
        this.type = this.$store.state.userModel.type;
      }
    },
  },
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
  },
  created() {
    this.getUserDetails();
  },
  watch: {
    userModel() {
      this.getUserDetails();
    },
  },
  components: {
    ArrowDown,
  },
};
</script>

<style scoped>
nav {
  padding: 10px 20px;
  background-color: lightskyblue;
  display: flex;
}

.navtitle {
  color: white;
  font-size: 23px;
  cursor: pointer;
}

.dropdown {
  vertical-align: middle;
  cursor: pointer;
}

.loginbtn {
  color: white;
  margin-right: 20px;
  font-size: 15px;
}

.loginbtn:hover {
  color: white;
  text-decoration: underline;
}

.useravatar {
  margin-left: auto;
  width: 32px;
  height: 35x;
}

.email {
  color: grey;
  font-size: 13px;
}
</style>
