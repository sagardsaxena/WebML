var reader = new FileReader();
var classifier = null;
var encoder = null;
var img = null;
var scale = tf.scalar(1/255);
var pos_label = 'dog';
var neg_label = 'cat';

// Load model
tf.loadLayersModel('models/classifier/model.json').then(e => classifier=e);

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

    // Create batch of size 1
    img = tf.expandDims(img)

    // Get model prediction
    class_pred = model.predict(img)
    embed_pred = encoder.predict(img)

    // Convert tensor to JS array
    class_pred = class_pred.dataSync()[0]
    embed_pred = embed_pred.dataSync()[0]

    // Update text
    if (pred < 0.5) {
        conf = 100-Math.round(pred*100*100)/100
        $('#pred-text')[0].innerHTML = 'This is a ' + neg_label + '!';
        $('#pred-score')[0].innerHTML = 'I am ' + conf + '% confident that this is a ' + neg_label + '!'
    } else {
        conf = Math.round(pred*100*100)/100
        $('#pred-text')[0].innerHTML = 'This is a ' + pos_label + '!';
        $('#pred-score')[0].innerHTML = 'I am ' + conf + '% confident that this is a ' + pos_label + '!'
    }
}

function onImageUpload(){
	console.log("Hello World")
	reader.readAsDataURL($('#image_file')[0].files[0]);
}
