<template :post = "post">

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
    <!-- <router-link to="/forumreply" className="linktoreplies">{{numreplies}} replies</router-link> -->
</div>



</template>

<script>
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";


export default {
    
    name: 'ForumThread',
    data(){
    return{
      postername: "",
      timestamp: "",
      imgsrc: "",
      title: "",
      text: "",
      numreplies: "",
    }
    },
    props: {
        post: { type:Object }
    },
    methods: {
        async displaythread(fpid){
            const docRef = doc(db, "forumposts", fpid);
            const docSnap = await getDoc(docRef);
            // if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            // } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            // }
            let docdata = docSnap.data();

            this.postername = this.$store.state.userModel.first + " " + this.$store.state.userModel.last
            //must change
            this.timestamp = docdata.date
            this.imgsrc = docdata.imageUrl
            this.title = docdata.title
            this.text = docdata.text  
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