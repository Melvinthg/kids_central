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
            <el-input 
            v-model="info.childName" 
            placeholder="Enter Child Name"
            />
          </el-form-item>
          <el-form-item label="NRIC: ">
            <el-input 
            v-model="info.NRIC" 
            placeholder="Enter NRIC"
            />
          </el-form-item>
          <el-form-item label="Address: ">
            <el-input 
            v-model="info.Address" 
            placeholder="Enter Address"
            />
          </el-form-item>
          <el-form-item label="Gender">
            <el-select
              v-model="info.Gender"
              placeholder="Choose 1"
            >
              <el-option label="Female" value="Female" />
              <el-option label="Male" value="Male" />
              <el-option label="Others" value="Others" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="100" class="block">
          <el-form-item label="Date of Birth: ">
            <el-date-picker
              v-model="info.DOB"
              type="date"
              placeholder="Pick a Date"
              format="YYYY/MM/DD"
              value-format="DD/MM/YY"
            />
          </el-form-item>
          <el-form-item label="Nationality: ">
            <el-input 
            v-model="info.Nationality" 
            placeholder = "Enter Nationality"
            />
          </el-form-item>
          <el-form-item label="Allergies: ">
            <el-input 
            v-model="info.Allergies" 
            placeholder = "Enter Allergies / Nil"
            />
          </el-form-item>
          <el-form-item label="Class">
            <el-select
              v-model="info.Class"
              placeholder="Choose 2J/2K"
            >
              <el-option label="2K" value="2K" />
              <el-option label="2J" value="2J" />
            </el-select>
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
    ><br />
  </el-row>
</template>

<script>
import { db } from "../firebase.js";
import { ElMessage } from "element-plus";

import { setDoc, doc } from "firebase/firestore";
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
      if (this.allFilled() && this.validNRIC()) {
        this.info.childID =
          this.info.Class + this.info.NRIC.toUpperCase().slice(5, 9);
        await setDoc(doc(db, "students", this.info.childID), this.info);
        ElMessage.success("Successfully uploaded");
        this.$router.go(-1);
      } else if (this.validNRIC()) {
        ElMessage({
          message: "Please enter valid input fields",
          type: "warning",
        });
      } else {
        ElMessage({
          message: "Please fill in correct NRIC format",
          type: "warning",
        });
      }
    },

    allFilled() {
      console.log("check");
      return (
        this.info.childName != "" &&
        this.info.NRIC != "" &&
        this.info.Address != "" &&
        (this.info.Gender == "Male" || this.info.Gender == "Female") &&
        this.info.DOB != "" &&
        this.info.Nationality != "" &&
        (this.info.Class == "2J" || this.info.Class == "2K")
        && this.validNRIC()
      );
    },

    isCharNumber(c) {
      return c >= "0" && c <= "9";
    },

    validNRIC() {
      let a = this.info.NRIC;
      if (a.length == 9) {
        return (
          !this.isCharNumber(a.charAt(0)) &&
          !this.isCharNumber(a.charAt(a.length - 1)) &&
          this.isCharNumber(a.charAt(1)) &&
          this.isCharNumber(a.charAt(2)) &&
          this.isCharNumber(a.charAt(3)) &&
          this.isCharNumber(a.charAt(4)) &&
          this.isCharNumber(a.charAt(5)) &&
          this.isCharNumber(a.charAt(6)) &&
          this.isCharNumber(a.charAt(7))
        );
      } else {
        return false;
      }
    },
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