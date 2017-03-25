var canvas = document.getElementById('canvas');
var video = document.getElementById('video');
var text = document.getElementById('text');
var ctx = canvas.getContext('2d');

function recogniseText(){
    ctx.drawImage(video, 0, 0);
    var string = OCRAD(ctx);
    text.innerHTML = string;
}

function timerCallback() {
    recogniseText();

    setTimeout(function() {
        timerCallback();
    }, 100);
};

function videoSuccess(stream) {
    var domURL = window.URL || window.webkitURL;
	//start streaming via the video element
	video.src = domURL ? domURL.createObjectURL(stream) : stream;
    timerCallback();
}

function videoFailure() {
    alert('video failed');
}

navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//Get the API according to the browser.
navigator.getUserMedia_({ video: true, audio: false }, videoSuccess, videoFailure);