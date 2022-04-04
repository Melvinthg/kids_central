<template>
  <div id="wholegroup">
    <div id="firstGroup"></div>

    <div id="secondgroup">
      <h1>CLASS {{ classname }} FORUM</h1>
      <br />
      <!-- query number of parents in the class -->
      <h4>{{ number }} members</h4>
    </div>
    <div id="thirdgroup" @click="this.$router.push('/forumcreatepost')">
      New Post
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

import {useStore, mapActions, mapState} from "vuex"


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
  overflow: hidden;
  height: 120px;
  background-color: rgb(7, 119, 172);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0%;
  padding: 5px;
  width: 100%;
  color: white;
}


#firstGroup {
  flex: 1;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 100%;
  float: right;
  width: auto;
  text-align: center;
  font-size: 20px;
  padding-right: 20px;
  color: white;

}
#thirdgroup:hover {
  color: black;
  cursor: pointer;
}

</style>

