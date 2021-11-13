var reader = new FileReader();
var model = null;
var img = null;
var scale = tf.scalar(1/255);
// Load model
tf.loadLayersModel('model/model.json').then(e => model=e);

// Process new image
reader.onload = function (e) {
	// Update the image on the browser
    $('#image').attr('src', e.target.result);

    // Load the image as a tensorflow array
    img = tf.browser.fromPixels($('#image')[0]);

    // Resize image to 64 x 64
    img = tf.image.resizeBilinear(img, [64, 64]);

    // Scale between 0 and 1
    img = img.mul(scale)

    console.log(img)
}

function onImageUpload(){
	console.log("Hello World")
	reader.readAsDataURL($('#image_file')[0].files[0]);
}
