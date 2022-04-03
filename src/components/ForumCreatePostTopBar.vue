<template>
  <div id="wholegroup">
    <div id="createfirstgroup" @click = "this.$router.go('-1')">Back</div>
    <div id="secondgroup">
      <h1>CLASS {{ classname }} FORUM</h1>
      <br />
      <!-- query number of parents in the class -->
      <h4>{{ number }} members</h4>
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
      const pEmail = this.$store.state.userModel.email  
      var childClass = await this.getChildClass(pEmail);
      console.log(childClass)
      var usersInClass = await this.getUsers(
        this.$store.state.userModel.teacherClass || childClass,
      );
      this.number = usersInClass.length;
      if (this.$store.state.userModel.type == "teacher"){
        this.classname = this.$store.state.userModel.teacherClass
      } else if (this.$store.state.userModel.type == "parent"){
        this.classname = childClass;
      }
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
  display: block;
  align-items: center;

  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
}
#createfirstgroup {
  flex: 1;
  color: white;
  text-align: center;

  text-decoration: none;
  font-size: 20px;
}
#secondgroup {
  float: left;

  text-align: center;
  color: white;
  padding: 20px;
  flex: 3;
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
