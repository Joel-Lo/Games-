
window.onload = function() {
    function musicPlay() {
        document.getElementById('player').play();
    }

    const link = document.getElementById('start');

    let enabled = false;

    link.addEventListener('click', function(event) {
        if (!enabled) {
            event.preventDefault();
        }
    });

    link.classList.remove('enabled');

    setTimeout(() => {
        enabled = true;
        link.classList.add('enabled');
    }, 5000);
};
