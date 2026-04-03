document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    const btnOpen = document.getElementById('btn-open');
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const musicControl = document.getElementById('music-control');
    const iconMusic = musicControl.querySelector('i');

    // Music Setup
    const audio = new Audio('musik/WhatsApp Audio 2026-02-12 at 13.08.27.mp4');
    audio.loop = true; // Enable looping

    let isPlaying = false;

    // Fix for autoplay policy
    const playMusic = () => {
        audio.play().then(() => {
            isPlaying = true;
            iconMusic.classList.add('fa-spin');
        }).catch(err => {
            console.log("Autoplay blocked, waiting for interaction");
        });
    };

    const toggleMusic = () => {
        if (isPlaying) {
            audio.pause();
            iconMusic.classList.remove('fa-spin');
        } else {
            audio.play();
            iconMusic.classList.add('fa-spin');
        }
        isPlaying = !isPlaying;
    };

    // Open Invitation Event
    btnOpen.addEventListener('click', () => {
        // Slide Cover Up
        cover.classList.add('open');

        // Show Main Content (allow AOS to trigger)
        mainContent.classList.remove('hidden');

        // Scroll to greeting section
        document.querySelector('.greeting').scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            mainContent.classList.add('visible');
            // Refresh AOS
            AOS.refresh();
        }, 500);

        // Play Music
        playMusic();
    });

    // Music Control Click
    musicControl.addEventListener('click', toggleMusic);

    // Disable scroll on body when cover is active? 
    // Usually cover is fixed so it covers everything, but hidden content helps performance.


    // Countdown Timer
    const countdownDate = new Date("April 24, 2026 08:00:00").getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById('days')) {
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.getElementById("countdown").innerHTML = "ACARA TELAH DIMULAI";
        }
    }, 1000);

});

// Global Copy Function
function copyText(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Nomor berhasil disalin!");
    }).catch(err => {
        console.error('Gagal menyalin:', err);
    });
}

