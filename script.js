const imgcontainer = document.querySelector('.image-container');

const loader = document.querySelector('.loader');

let photosArray = [];
let imageLoaded = 0;
let totalImage = 0;
let ready = false;

// Unsplash API
let count = 5;
const apiKey = "3rs4Y2mRJGA3DM9YEKin272CcPLH0TiewXKrJtDts98";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Fetching photos from Unsplash API
async function getphotos() {

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos();
    }
    catch (error) {
        console.log("Error Occurred", error);
    }
}

// calling func
getphotos();

// Creating elements to add link, photos and then add to DOM
function displayPhotos() {
    imageLoaded = 0;
    totalImage = photosArray.length;
    console.log('totalimages', totalImage);

    photosArray.forEach((photo) => {

        // creating <a> tag for link to unsplash
        let anchor = document.createElement('a');

        setAttributes(anchor, {
            href: photo.links.html,
            target: ' _blank'
        })

        // creating <img> for photos
        let image = document.createElement('img');

        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        image.addEventListener('load', imgLoaded);

        // Inserting the <img> inside <a> then insert <a> inside container  
        imgcontainer.appendChild(anchor);
        anchor.appendChild(image);
    })
}

// func for setting Attributes
function setAttributes(element, attribute) {

    for (let key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}

function imgLoaded() {

    imageLoaded++;
    console.log(imageLoaded);
    if (imageLoaded === totalImage) {
        ready = true;
        loader.hidden = true;
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

        console.log('ready:', ready);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {

        ready = false;
        getphotos();
    }
})

