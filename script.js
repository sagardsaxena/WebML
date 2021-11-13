var reader = new FileReader();
reader.onload = function (e) {
    $('#image').attr('src', e.target.result);
    var img = tf.browser.fromPixels($('#image')[0]);
}

function onImageUpload(){
	console.log("Hello World")
	reader.readAsDataURL($('#image_file')[0].files[0]);
}