song="";
song_2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1_status="";
scoreLeftWrist=0;
song2_status = "";
scoreRightWrist = 0;

function preload() {
    song=loadSound("music.mp3");
    song_2=loadSound("Coffin_Dance.mp3");
}

function setup() {
    canvas= createCanvas(600 ,500);
    canvas.position(500,200);

    video=createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on('pose' , gotPoses);
}

function draw() {
  image(video , 0 , 0 , 600 , 500);
  fill("#FF0000");
  stroke("#FF0000");
  if (song.isPlaying()) {
      song1_status=true;
  }

  if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song_2.stop();
    if(song1_status==true){
song.play();
document.getElementById("song").innerHTML = "Hedwig's Theme";
    }
  }

  if (song_2.isPlaying()) {
    song2_status=true;
}

if(scoreRightWrist>0.2){
  circle(rightWristX,rightWristY,20);
  song.stop();
  if(song2_status==true){
song_2.play();
document.getElementById("song").innerHTML = "Coffin Dance";
  }
}
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("song").innerHTML = "Hedwig's Theme";
}

function stop(){
    song.pause();
}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) {


    if (results.length>0) {
        console.log(results);
      
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY); 
    }
}