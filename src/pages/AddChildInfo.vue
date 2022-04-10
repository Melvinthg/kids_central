<template>
  <div id="header">
    <el-button
      type="primary"
      :icon="ArrowLeft"
      @click="this.$router.go(-1)"
      style="float: left"
      id="back"
      >Back</el-button
    >
    <h4 id="title">Add Child Info</h4>
  </div>
  <div>
    <el-row justify="center">
      <el-form :label-width="150">
        <el-col :span="100" class="block">
          <!-- <div style="width:500px"> -->
          <el-form-item label="Name: ">
            <el-input v-model="info.childName" />
          </el-form-item>
          <el-form-item label="NRIC: ">
            <el-input v-model="info.NRIC" />
          </el-form-item>
          <el-form-item label="Address: ">
            <el-input v-model="info.Address" />
          </el-form-item>
          <el-form-item label="Gender: ">
            <el-input v-model="info.Gender" />
          </el-form-item>
        </el-col>
        <el-col :span="100" class="block">
          <el-form-item label="Pick date: ">
            <el-date-picker
              v-model="info.DOB"
              type="date"
              placeholder="Pick a Date"
              format="YYYY/MM/DD"
              value-format="DD/MM/YY"
            />
          </el-form-item>
          <el-form-item label="Nationality: ">
            <el-input v-model="info.Nationality" />
          </el-form-item>
          <el-form-item label="Allergies: ">
            <el-input v-model="info.Allergies" />
          </el-form-item>
          <el-form-item label="Class: ">
            <el-input v-model="info.Class" />
          </el-form-item>
        </el-col>
        <!-- </div>  -->
      </el-form>
    </el-row>
  </div>
  <br />
  <el-row justify="center">
    <span
      ><el-button class="btn" type="primary" @click="save"
        >Save Particulars</el-button
      ></span
    ><br /> </el-row
  >
</template>

<script>
import { db } from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { ElMessage } from "element-plus";
export default {
  name: "AddChildInfo",
  data() {
    return {
      info: {
        childName: "",
        NRIC: "",
        Address: "",
        Gender: "",
        DOB: "",
        Nationality: "",
        Allergies: "",
        Class: "",
        childID: "",
        Name:
          this.$store.state.userModel.first +
          " " +
          this.$store.state.userModel.last,
        parentEmail: this.$store.state.userModel.email,
      },
    };
  },
  // change document id from name to student id, add field parent email
  methods: {
    async save() {
      console.log(this.info);
      this.info.childID =
        this.info.Class + this.info.NRIC.toUpperCase().slice(5, 9);
      if (this.allFilled()) {
        setDoc(collection(db, "students", this.info.childID), this.info)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        ElMessage.success("Successfully uploaded");
        this.goBack();
      } else {
        ElMessage({message: "Please fill in all required fields", type : 'warning',})

      }
    },

    allFilled() {
      console.log("check");
      return (
        this.info.childName != "" &&
        this.info.NRIC != "" &&
        this.info.Address != "" &&
        this.info.Gender != "" &&
        this.info.DOB != "" &&
        this.info.Nationality != "" &&
        this.info.Class != ""
      );
    },

    isCharNumber(c) {
      return c >= "0" && c <= "9";
    },

    // validNRIC() {
    //   let a = this.NRIC;
    //   if (a.length == 9) {
    //     return (
    //       !this.isCharNumber(a.charAt(0)) &&
    //       !this.isCharNumber(a.charAt(a.length - 1)) &&
    //       this.isCharNumber(a.charAt(1)) &&
    //       this.isCharNumber(a.charAt(2)) &&
    //       this.isCharNumber(a.charAt(3)) &&
    //       this.isCharNumber(a.charAt(4)) &&
    //       this.isCharNumber(a.charAt(5)) &&
    //       this.isCharNumber(a.charAt(6)) &&
    //       this.isCharNumber(a.charAt(7))
    //     );
    //   } else {
    //     return false;
    //   }
    // },

    // isValidDate() {
    //   let b = document.getElementById("DOB").value;
    //   if (b.length == 10) {
    //     return (
    //       this.isCharNumber(b.charAt(0)) &&
    //       this.isCharNumber(b.charAt(1)) &&
    //       this.isCharNumber(b.charAt(3)) &&
    //       this.isCharNumber(b.charAt(4)) &&
    //       this.isCharNumber(b.charAt(6)) &&
    //       this.isCharNumber(b.charAt(7)) &&
    //       this.isCharNumber(b.charAt(8)) &&
    //       this.isCharNumber(b.charAt(9)) &&
    //       b.charAt(2) == "/" &&
    //       b.charAt(5) == "/"
    //     );
    //   } else {
    //     return false;
    //   }
    // },
  },
};
</script>

<style scoped>
#header {
  background-color: rgb(7, 119, 172);
  width: 100%;
  display: block;
  color: white;
  position: relative;
}
#title {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}
#back {
  vertical-align: middle;
  padding: 12px;
  margin: 2px;
  margin-left: 30px;
}
.btn {
  display: inline-block;
}
.block {
  float: center;
}
.save {
  text-align: center;
}
#firstGroup {
  font-size: 20px;
  color: white;
  flex: 1;
  padding: 12px;
}
#firstGroup:hover {
  color: black;
  cursor: pointer;
}
#header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#secondgroup {
  flex: 3;
}
#thirdgroup {
  flex: 1;
}

select {
  min-width: 7.5ch;
  border-radius: 6px;
  outline: none;
  color: grey;
}

select:focus {
  border: 1.5px solid #2470b7;
}
select::-ms-expand {
  display: none;
}
</style>