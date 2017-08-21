$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['Home', 'Details'],
        menu: '#menu'
    });

});

$(window).load(function(){
    $('.loading.initial').hide("fade", 1500);
});