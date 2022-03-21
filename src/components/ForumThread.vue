<template>

<div id="threadheader">
    <div id="postersname">
        <!-- call name -->
        <h2>Joshua Tan</h2>
    </div>

    <div id="timestamp">
        <!-- call date and time -->
        <h5>2/21/21 9.00AM</h5>
    </div>
</div>

<div id="threadcontent">
    <div id="picture">
        <!-- call picture -->
        <img id = "bg" src="@/assets/logo.png" alt="" height="200px">
    </div>
    <div id="threadwords">
        <div id="threadtitle">
            <!-- call title -->
            <h2>Covered Shoes please</h2>
        </div><br>

        <div id="threadtext">
            <!-- call text -->
            <h5>Dear parents, please remind your children to wear covered shoes. 
                Wearing slides will be dangerous when they play at the playground.</h5>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>


#threadheader{
    display: block;
    width: 90%;
    padding: 10px;
    /* border: 10px green; */
    margin-left: 5%;
    background-color:lightblue;
    height: 50px;
}

#postersname{
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
    /* border: 10px green; */
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
</style>