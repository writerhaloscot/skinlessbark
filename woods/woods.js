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
        document.getElementById('loader').style.display = 'none';
        console.log('Images loaded.');
        $('body').addClass('loaded');
    });

    $('#woods img').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert($(this).attr('alt'));
    })

});
