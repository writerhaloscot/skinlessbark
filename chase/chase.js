$(function () {

    // Wait for Images to Load
    const images = Array.from(document.querySelectorAll('img'));
    const imagePromises = images.map(img => {
        if (img.complete) return Promise.resolve(); //
        return new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
        });
    });
    Promise.all(imagePromises).then(() => {
        console.log('Images loaded.');
        $('body').addClass('loaded');
    });


});
