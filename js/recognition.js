var canvas = document.getElementById('canvas');
var signaturePad = new SignaturePad(canvas);
var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var recogniseButton = wrapper.querySelector("[data-action=recognise]");
var description = document.getElementById("description");
var signaturePad = new SignaturePad(canvas, {
    minWidth: 5,
    backgroundColor: "rgb(255,255,255)",
});
var context = canvas.getContext("2d");

function recogniseText() {
    var string = OCRAD(context);
    alert(string);
}

function resizeCanvas() {
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    context.scale(ratio, ratio);
    signaturePad.clear();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

recogniseButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        recogniseText();
    }
});