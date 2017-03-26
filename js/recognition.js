var canvas = document.getElementById('canvas');
var video = document.getElementById('video');
var ctx = canvas.getContext('2d');
var overlay = document.getElementById('video-overlay');

function recogniseText(){
    console.log('[' + video.videoWidth + ', ' + video.videoHeight + ']');
    if(video.videoWidth === 0 || video.videoHeight === 0) {
        return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.clientWidth, canvas.clientHeight);
    var string = OCRAD(ctx);
    overlay.innerHTML = string;
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

window.onerror = function(msg, url, line, col, error) {
    overlay.innerHTML = msg;
}

navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//Get the API according to the browser.
navigator.getUserMedia_({ video: true, audio: false }, videoSuccess, videoFailure);