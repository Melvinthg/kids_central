<template>

<div id="threadheader">
    <div id="postername">
        <!-- call name -->
        <h2>{{postername}}</h2>
    </div>

    <div id="timestamp">
        <!-- call date and time -->
        <h5>{{timestamp}}</h5>
    </div>
</div>

<div id="threadcontent">
    <div id="picture">
        <!-- call picture -->
        <img id = "bg" src={{imgsrc}} alt="pic" height="200px">
    </div>
    <div id="threadwords">
        <div id="threadtitle">
            <!-- call title -->
            <h2>{{title}}</h2>
        </div><br>

        <div id="threadtext">
            <!-- call text -->
            <h5>{{text}}</h5>
        </div>
    </div> 
</div>
<div id="threadreplies">
    <!-- call number of replies -->
    <h5>{{numreplies}} replies</h5>
</div>
</template>

<script>
export default {
    name: 'ForumThread',
    data(){
    return{
      postername: "Joshua Tan",
      timestamp: "2/21/21 9.00AM",
      imgsrc: "@/assets/logo.png",
      title: "Covered shoes please",
      text: "Dear parents, please remind your children to wear covered shoes. Wearing slides will be dangerous when they play at the playground.",
      numreplies: "3",
      classname: this.$store.state.userModel.childClass,
    }
  }
}
</script>

<style>


#threadheader{
    display: block;
    width: 90%;
    padding: 10px;
    margin-left: 5%;
    background-color:lightblue;
    height: 50px;
}

#postername{
    float: left;
    width: 25%;
    height: 0px;
}

#timestamp{
    float: right;
    width: 25%;
    height: 0px;
}

#threadcontent{
    display: inline-flex;
    width: 90%;
    padding: 10px;
    margin-left: 5%;
    background-color:lightgrey;
    height:fit-content;
}

#picture{
    float: left;
}

#threadwords{
    float: left;
}

#threadtitle{
    padding: 10px;
    float: left;
    width: 75%;
}

#threadtext{
    float: left;
    padding: 10px
}

#threadreplies{
    display: inline-flex;
    justify-content: flex-end;
    width: 90%;
    padding: 10px;
    margin-left: 5%;
    background-color:lightgrey;
    height:fit-content;
}
</style>