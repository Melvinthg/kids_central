<template>
  <div id="wholegroup">
    <el-button
      type="primary"
      :icon="ArrowLeft"
      @click="this.$router.go(-1)"
      style="float: left;margin-left: 20px;"
      >Back</el-button
    >
    <div id="secondgroup">
      <h1>CLASS {{ classname }} FORUM</h1>
      <!-- query number of parents in the class -->
    </div>
    <div id="thirdgroup"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

import { useStore, mapActions, mapState } from "vuex";
export default {
  name: "ForumTopBar",
  data() {
    return {
      number: 0,
      classname: "",
    };
  },
  methods: {
    ...mapActions({ getUsers: "getUsers" }),
    ...mapActions({getChildClass: "getChildClass"}),
    async display() {
       if (this.$store.state.userModel.type == "teacher"){
        this.classname = this.$store.state.userModel.teacherClass
      } else if (this.$store.state.userModel.type == "parent"){
        const pEmail = this.$store.state.userModel.email  
        var childClass = await this.getChildClass(pEmail);
        this.classname = childClass;
      }
      var usersInClass = await this.getUsers(
      this.$store.state.userModel.teacherClass || childClass);
      this.number = usersInClass.length;
    },
  },
  mounted() {
    this.display();
  },
};
</script>

<style scoped>
#wholegroup {
  background-color: rgb(7, 119, 172);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: white;
}
#createfirstgroup {
  flex: 1;
  color: white;
  text-align: center;

  text-decoration: none;
  font-size: 20px;
}
#secondgroup {
  flex: 5;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
  color: white;
  padding: 20px;
}

#thirdgroup {
  flex: 1;
}
#createfirstgroup:hover {
  color: black;
}
#thirdgroup:hover {
  background-color: black;
}
</style>
