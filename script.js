var reader = new FileReader();
var classifier = null;
var encoder = null;
var img = null;
var scale = tf.scalar(1/255);
var pos_label = 'dog';
var neg_label = 'cat';

// Load model
tf.loadLayersModel('models/classifier/model.json').then(e => {
    classifier=e;
    console.log("Loaded Classifier");
});
tf.loadLayersModel('models/encoder/model.json').then(e => {
    encoder=e;
    console.log("Loaded Encoder");
});


// distance between two embeddings
function distance(v1, v2) {
    var dist = 0.0;
    for (let i = 0; i < v1.length; i++) {
	dist += Math.pow((v1[i] - v2[i], 2));
    }
    return dist;
}

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
    class_pred = classifier.predict(img)
    embed_pred = encoder.predict(img)

    // Convert tensor to JS array
    class_pred = class_pred.dataSync()[0]
    embed_pred = embed_pred.dataSync()[0]

    // Update text
    if (class_pred < 0.5) {
        conf = 100-Math.round(class_pred*100*100)/100
        $('#pred-text')[0].innerHTML = 'This is a ' + neg_label + '!';
        $('#pred-score')[0].innerHTML = 'I am ' + conf + '% confident that this is a ' + neg_label + '!'
    } else {
        conf = Math.round(class_pred*100*100)/100
        $('#pred-text')[0].innerHTML = 'This is a ' + pos_label + '!';
        $('#pred-score')[0].innerHTML = 'I am ' + conf + '% confident that this is a ' + pos_label + '!'
    }

    // Find closest embeddings
    distances = embedding_data["embeddings"].map(v => distance(v, embed_pred));
    distances = distances.map((dist, idx) => [dist, idx]).sort((dist1, dist2) => dist2 - dist1);

    for (let i = 0; i < 5; i++) {
	dist = distances[i][0];
	idx = distances[i][1];
	console.log(dist);
	console.log(embedding_data["embedding_filenames"][idx]);
        $(`#image{i}`).attr('src', embedding_data["embedding_filenames"][idx]);
    }
}

function onImageUpload(){
    console.log("Image Uploaded")
    reader.readAsDataURL($('#image_file')[0].files[0]);
}
