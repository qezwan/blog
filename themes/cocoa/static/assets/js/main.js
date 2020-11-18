// First we'll grab all the images inside a post paragraph
let ims = document.querySelectorAll('.post-content p img')

// If ims === 0 lets not do anything
if (ims.length > 0) {

  // Now we'll loop through all of the images that were picked up
  // Note that I'm doing no real error handling, you might want to clean this up
  for (let i = 0; i < ims.length; i++) {

    // For each image we get the parent element, in this case it will be <p>
    let parentElm = ims[i].parentElement;

    // Using the paraent element and the image object we replace the innerHTML
    // with our image with the class "glightbox" and a link to the image
    parentElm.innerHTML = '<a href="' + ims[i].src + '"><img src="' + ims[i].src + '" class="glightbox"></a>'
  }
}

// Finally we call GLightbox and if all went well...
const lightbox = GLightbox({});
