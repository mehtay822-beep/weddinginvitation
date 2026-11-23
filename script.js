/* =====================================
   WEDDING INVITATION - JAVASCRIPT
   Edit names, family details and date here
===================================== */

// 1. BRIDE, GROOM AND WEDDING DETAILS

const weddingDetails = {
    brideName: 'Bride Name',
    brideFamily: 'Daughter of [Bride Family Name]',

    groomName: 'Groom Name',
    groomFamily: 'Son of [Groom Family Name]',

    day: '11',
    month: 'OCTOBER',
    year: '2026',
    weekday: 'SUNDAY'
};


// 2. SHORTCUT FUNCTION

const $ = (id) => document.getElementById(id);

function setText(id, value) {
    const element = $(id);

    if (element) {
        element.textContent = value;
    }
}


// 3. SHOW BRIDE, GROOM AND DATE DETAILS

function initDetails() {

    setText('brideName', weddingDetails.brideName);
    setText('brideDetail', weddingDetails.brideFamily);

    setText('groomName', weddingDetails.groomName);
    setText('groomDetail', weddingDetails.groomFamily);

    setText('weddingDay', weddingDetails.day);
    setText('weddingMonth', weddingDetails.month);
    setText('weddingYear', weddingDetails.year);
    setText('weddingWeekday', weddingDetails.weekday);

}


// 4. OPEN WEDDING INVITATION ANIMATION

const openButton = $('openInvitation');

if (openButton) {

    openButton.addEventListener('click', () => {

        const opening = $('opening');
        const invitation = $('invitation');

        if (!opening || !invitation) return;

        opening.classList.add('opening-exit');

        window.setTimeout(() => {

            opening.style.display = 'none';

            invitation.classList.remove('hidden');

            document.body.classList.add('invitation-open');

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            revealOnScroll();

        }, 650);

    });

}


// 5. BRIDE AND GROOM STORY ANIMATION

function storyToggle(buttonId, cardId) {

    const button = $(buttonId);
    const card = $(cardId);

    if (!button || !card) return;

    button.addEventListener('click', () => {

        const opened = card.classList.toggle('story-open');

        const label =
            buttonId === 'brideReveal'
                ? 'Discover her story'
                : 'Discover his story';

        button.innerHTML = `
            ${opened ? 'Close story' : label}
            <span>${opened ? '−' : '＋'}</span>
        `;

    });

}

storyToggle('brideReveal', 'brideCard');
storyToggle('groomReveal', 'groomCard');


// 6. WEDDING DATE REVEAL ANIMATION

const revealDateButton = $('revealDate');

if (revealDateButton) {

    revealDateButton.addEventListener('click', () => {

        const section = $('bigDay');

        if (!section) return;

        if (section.classList.contains('date-shown')) {
            return;
        }

        section.classList.add('date-shown');

        revealDateButton.innerHTML = `
            <span class="date-button-icon">✦</span>
            <span>OUR SPECIAL DAY</span>
            <span class="date-button-arrow">♥</span>
        `;

        launchConfetti();

    });

}


// 7. CELEBRATION CONFETTI ANIMATION

function launchConfetti() {

    const layer = $('confettiLayer');

    if (!layer) return;

    const symbols = ['✦', '✿', '❀', '✧', '♥'];

    for (let i = 0; i < 75; i++) {

        const piece = document.createElement('span');

        piece.className = 'confetti-piece';

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = `${Math.random() * 100}%`;

        piece.style.animationDelay =
            `${Math.random() * 1.7}s`;

        piece.style.animationDuration =
            `${2.8 + Math.random() * 2}s`;

        piece.style.setProperty(
            '--drift',
            `${Math.random() * 180 - 90}px`
        );

        layer.appendChild(piece);

        window.setTimeout(() => {
            piece.remove();
        }, 6500);

    }

}


// 8. WEDDING CEREMONIES - VIEW DETAILS

const modal = $('ceremonyModal');

function closeModal() {

    if (!modal) return;

    modal.classList.remove('show');

    document.body.style.overflow = '';

}


document.querySelectorAll('.ceremony-card').forEach(card => {

    const viewButton = card.querySelector('.view-btn');

    if (!viewButton) return;

    viewButton.addEventListener('click', () => {

        if (!modal) return;

        setText('modalTitle', card.dataset.title);
        setText('modalDescription', card.dataset.description);
        setText('modalDate', card.dataset.date);
        setText('modalTime', card.dataset.time);
        setText('modalVenue', card.dataset.venue);

        modal.classList.add('show');

        document.body.style.overflow = 'hidden';

    });

});


// 9. CLOSE CEREMONY DETAILS

const modalClose = $('modalClose');

if (modalClose) {

    modalClose.addEventListener('click', closeModal);

}

if (modal) {

    modal.addEventListener('click', (event) => {

        if (event.target === modal) {
            closeModal();
        }

    });

}

document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
        closeModal();
    }

});


// 10. SCROLL REVEAL ANIMATIONS

function revealOnScroll() {

    const targets = document.querySelectorAll(
        '.person-card, .couple-photo-block, .ceremony-card, .gallery-item, .note-card, .family-photo'
    );

    if (!('IntersectionObserver' in window)) {

        targets.forEach(element => {
            element.classList.add('in-view');
        });

        return;
    }

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('in-view');

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    targets.forEach(element => {
        observer.observe(element);
    });

}


// 11. START WEBSITE

initDetails();