song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

left_wrist_score = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.position(580,290);

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);

}

function modelloaded(){
    console.log("Model has loaded !!!")
}

function gotposes(results){
    if (results.length > 0){
        console.log(results);
        left_wrist_score= results[0].pose.keypoints[9].score;
        console.log("LEFT WRIST SCORE" + left_wrist_score);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("right Wrist X = " + rightWristX + "right Wrist Y = " + rightWristY);
    }
    
}

function draw(){
    image(video,0,0,400,400);

    stroke("black");
    fill("red");

    if(left_wrist_score > 0.2){
        circle(leftWristX,leftWristY,20);
        left_wrist= Number(leftWristY);
        remove_decimal = floor(left_wrist);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = "+ volume;
        song.setVolume(volume);
        
    }
}

function play(){
    song.play();
    song.setVolume(1)
    song.rate(1);
}

function stop(){
    song.stop();
}