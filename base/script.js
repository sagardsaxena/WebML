var reader = new FileReader();
reader.onload = function (e) {
    $('#image').attr('src', e.target.result);
}

function onImageUpload(){
	console.log("Hello World")
	reader.readAsDataURL($('#image_file')[0].files[0]);
}