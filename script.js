var reader = new FileReader();
var model = null;
tf.loadLayersModel('model/model.json').then(e => model=e);

reader.onload = function (e) {
	// Update the image on the browser
    $('#image').attr('src', e.target.result);

    // Load the image as a tensorflow array
    var img = tf.browser.fromPixels($('#image')[0]);
}

function onImageUpload(){
	console.log("Hello World")
	reader.readAsDataURL($('#image_file')[0].files[0]);
}