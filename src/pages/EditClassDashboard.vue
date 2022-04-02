<template>
  <div>
    <div id="topbar">
      <div></div>
      <div id="secondgroup">
        <h1><strong> Manage Dashboard</strong></h1>
      </div>
    </div>
    <br /><br /><br />

    <el-row :gutter="21" justify="space-evenly">
      <el-col :span="6" class="col">
        <el-card class="card" @click="$router.push('home')">
          <img
            src="https://images.unsplash.com/photo-1584650000640-a70adafd062e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbGQlMjB0ZW1wZXJhdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            class="image"
          />
          <div class="cardName">
            <h5><strong> Update Child Temperature </strong></h5>
            <!-- <span> Enter Student ID </span>
                    <el-input
                        id="studentID"
                        ref="type"
                        v-model="message"
                        :rows="1"
                        v-on:keydown="typing()"
                        type="textarea"
                        placeholder="Enter Student ID..."
                        /> -->

            <!-- push to next update temperature page -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="col">
        <el-card class="card" @click="$router.push('caregiveruploadreport')">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHVwZGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            class="image"
          />
          <div class="cardName">
            <h5><strong> Update Child Report </strong></h5>
            <!-- <el-button @click="$router.push('home')"> Proceed </el-button> -->
            <!-- <h5> <strong> Update Temperature </strong> </h5>
                    <el-input
                        v-model="input1"
                        class="w-50 m-2"
                        size="medium"
                        placeholder="Enter daily temperature here..."
                        /> -->

            <!-- push to update report page -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="col">
        <el-card class="card" @click="$router.push('caregiveruploadgrade')">
          <img
            src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fHNjb3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            class="image"
          />
          <div class="cardName">
            <h5><strong> Update Child Gradebook </strong></h5>

            <!-- push to update gradebook page -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
const auth = getAuth();

// import { ref } from 'vue'
// const num = ref(1)
export default {
  name: "EditClassDashboard",
  data() {
    return {
      studentID: "",
      user: auth.currentUser,
    };
  },

  components: {},


  methods: {
    //proceed method to
    // proceed() {
    // }
  },
};
</script>

<style scoped>
.el-row {
  height: 600px;
}

.col {
}
.card {
  display: flex;
  flex-direction: column;

  justify-content: center;
  height: 60%;
  padding: 24px;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 100%;
}
.card:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.cardName {
}
#topbar {
  overflow: hidden;
  background-color: whitesmoke;
  display: block;
  margin: 0%;
  padding: 5px;
  width: 100%;
}
#firstgroup {
  float: left;
  width: 10%;
  color: blue;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  font-size: 20px;
  line-height: 80px;
}
#secondgroup {
  float: center;
  width: 100%;
  text-align: center;
  color: Black;
  padding: 20px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button {
  padding: 0;
  min-height: auto;
}
.image {
  width: 100%;
  display: block;
}
</style>