// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

document.addEventListener('DOMContentLoaded', () => {

    // Music Player Logic
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicBtn.querySelector('i');
    let isPlaying = false;

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-play');
                musicBtn.classList.remove('playing');
            } else {
                bgMusic.play().then(() => {
                    musicIcon.classList.remove('fa-play');
                    musicIcon.classList.add('fa-pause');
                    musicBtn.classList.add('playing');
                }).catch(error => {
                    console.log("Audio play failed:", error);
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // Envelope Interaction
    const envelopes = document.querySelectorAll('.envelope-wrapper');
    envelopes.forEach(envelope => {
        envelope.addEventListener('click', () => {
            const isOpen = envelope.classList.toggle('open');
            if (isOpen) {
                // Trigger confetti when opening
                const rect = envelope.getBoundingClientRect();
                spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
    });

    // Confetti Animation Logic
    function spawnConfetti(x, y) {
        const colors = ['#f48fb1', '#ebb1b7', '#8b3a3a', '#ffccd5', '#d4af37', '#ffffff'];
        const count = 40;

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 6;
            const drift = (Math.random() - 0.5) * 400;
            const rot = Math.random() * 720;
            const duration = Math.random() * 2 + 1.5;
            const delay = Math.random() * 0.2;

            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size * 0.6}px`;
            confetti.style.backgroundColor = color;
            confetti.style.setProperty('--drift', `${drift}px`);
            confetti.style.setProperty('--rot', `${rot}deg`);
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), (duration + delay) * 1000);
        }
    }

    // Smooth scroll for hero arrow
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const storySection = document.getElementById('story');
            if (storySection) storySection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const video = item.querySelector('video');

            if (lightbox) {
                lightbox.style.display = "block";

                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.style.display = "block";
                    lightboxVideo.style.display = "none";
                    lightboxVideo.pause();
                } else if (video) {
                    const source = video.querySelector('source').src;
                    lightboxVideo.querySelector('source').src = source;
                    lightboxVideo.load();
                    lightboxVideo.style.display = "block";
                    lightboxImg.style.display = "none";
                    lightboxVideo.play();
                }
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
            lightboxVideo.pause();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == lightbox) {
            lightbox.style.display = "none";
            lightboxVideo.pause();
        }
    });

    // Improved Petal Generation Logic
    function createPetal() {
        const container = document.getElementById('petal-container');
        if (!container) return;

        const petal = document.createElement('div');
        petal.classList.add('petal');

        const left = Math.random() * 100;
        const size = Math.random() * 10 + 10;
        const duration = Math.random() * 7 + 5;
        const delay = Math.random() * 2;
        const opacity = Math.random() * 0.4 + 0.3;
        const rotate = Math.random() * 360;

        petal.style.left = `${left}%`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 0.8}px`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.opacity = opacity;
        petal.style.setProperty('--rotate', `${rotate}deg`);

        container.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }
    setInterval(createPetal, 400);

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        const heroContent = document.querySelector('.hero-content');

        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0005})`;
        }
        if (heroContent) {
            heroContent.style.opacity = 1 - (scrolled / 700);
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Gallery & Memory Card 3D Tilt
    const cards = document.querySelectorAll('.gallery-item, .memory-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;

            card.style.transform = `perspective(1000px) rotateY(${dx / 10}deg) rotateX(${-dy / 10}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        });
    });

    // Mouse Glow Trail
    const createGlow = (e) => {
        const glow = document.createElement('div');
        glow.className = 'glow-point';
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
        document.body.appendChild(glow);

        setTimeout(() => glow.remove(), 1000);
    };

    window.addEventListener('mousemove', createGlow);

    // Floating Hearts Interaction
    const spawnHearts = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);

        if (x === undefined || y === undefined) return;

        // Spawn 3-5 hearts per click
        const count = 3 + Math.floor(Math.random() * 3);

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';

            const size = 15 + Math.random() * 20;
            const drift = (Math.random() - 0.5) * 200;
            const rot = (Math.random() - 0.5) * 90;
            const delay = Math.random() * 0.2;

            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${size}px`;
            heart.style.setProperty('--drift', `${drift}px`);
            heart.style.setProperty('--rot', `${rot}deg`);
            heart.style.animationDelay = `${delay}s`;

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }
    };

    window.addEventListener('mousedown', spawnHearts);
    window.addEventListener('touchstart', (e) => {
        spawnHearts(e);
    }, { passive: true });




    // Premium Gift Box Interaction
    const giftCards = document.querySelectorAll('.gift-card-wrapper');
    giftCards.forEach(card => {
        card.addEventListener('click', () => {
            const giftBox = card.querySelector('.gift-box-premium');
            if (!giftBox.classList.contains('open')) {
                giftBox.classList.add('open');

                // Advanced Celebration Effect
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Burst of hearts and sparkles
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const angle = Math.random() * Math.PI * 2;
                        const distance = 50 + Math.random() * 150;
                        const x = centerX + Math.cos(angle) * distance;
                        const y = centerY + Math.sin(angle) * distance;

                        spawnHearts({ clientX: x, clientY: y });
                    }, i * 50);
                }

                // Add a temporary glow effect to the card
                card.style.boxShadow = '0 0 100px rgba(235, 177, 183, 0.8)';
                setTimeout(() => {
                    card.style.boxShadow = '';
                }, 1000);
            }
        });
    });

    // Love Quiz Logic
    const quizData = [
        {
            question: "Do you remember when we went on our first date?",
            options: ["04 Jan 2025", "25 Apr 2025", "01 May 2025", "16 Feb 2025"],
            correct: 2
        },
        {
            question: "What was the last movie we saw together?",
            options: ["Thalaivan Thalaivi", "Idli kadai", "Thug life", "Maaman"],
            correct: 1
        },
        {
            question: "Can you please let me know when I visited your house?",
            options: ["21 Nov 2025", "20 Nov 2025", "18 Nov 2025", "22 Nov 2025"],
            correct: 0
        },
        {
            question: "How many months has it been since we last saw each other?",
            options: ["3 month", "1 months", "2 months", "4 months"],
            correct: 2
        },
        {
            question: "Do you know when we first called?",
            options: ["20 March 2025", "21 March 2025", "18 March 2025", "16 March 2025"],
            correct: 3
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const startBtn = document.getElementById('start-quiz-btn');
    const restartBtn = document.getElementById('restart-quiz-btn');
    const quizStart = document.getElementById('quiz-start');
    const quizArea = document.getElementById('quiz-area');
    const quizResult = document.getElementById('quiz-result');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progress = document.getElementById('quiz-progress');
    const questionNumber = document.getElementById('question-number');
    const scoreText = document.getElementById('quiz-score-text');
    const feedbackText = document.getElementById('quiz-feedback');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            quizStart.classList.add('quiz-hidden');
            quizStart.classList.remove('quiz-active');
            quizArea.classList.remove('quiz-hidden');
            quizArea.classList.add('quiz-active');
            loadQuestion();
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            quizResult.classList.add('quiz-hidden');
            quizResult.classList.remove('quiz-active');
            quizArea.classList.remove('quiz-hidden');
            quizArea.classList.add('quiz-active');
            loadQuestion();
        });
    }

    function loadQuestion() {
        const q = quizData[currentQuestion];
        questionText.innerText = q.question;
        questionNumber.innerText = `Question ${currentQuestion + 1}/${quizData.length}`;
        progress.style.width = `${((currentQuestion) / quizData.length) * 100}%`;

        optionsContainer.innerHTML = '';
        q.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });
    }

    function selectOption(index) {
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        const correct = quizData[currentQuestion].correct;

        buttons.forEach((btn, i) => {
            btn.style.pointerEvents = 'none';
            if (i === correct) {
                btn.classList.add('correct');
            }
            if (i === index && i !== correct) {
                btn.classList.add('wrong');
            }
        });

        if (index === correct) {
            score++;
            // Celebration effect on correct answer: hearts and color papers (confetti)
            const rect = buttons[index].getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            spawnHearts({ clientX: x, clientY: y });
            spawnConfetti(x, y);

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    loadQuestion();
                } else {
                    showResult();
                }
            }, 1500);
        } else {
            // Wrong answer effect: show crying image overlay
            const overlay = document.getElementById('quiz-feedback-overlay');
            if (overlay) {
                overlay.classList.add('active');

                setTimeout(() => {
                    overlay.classList.remove('active');
                    // Reset buttons and allow retry for the same question
                    buttons.forEach(btn => {
                        btn.style.pointerEvents = 'auto';
                        btn.classList.remove('wrong');
                    });
                }, 2000);
            }
        }
    }

    function showResult() {
        quizArea.classList.add('quiz-hidden');
        quizArea.classList.remove('quiz-active');
        quizResult.classList.remove('quiz-hidden');
        quizResult.classList.add('quiz-active');

        progress.style.width = '100%';
        scoreText.innerText = `You got ${score}/${quizData.length}`;

        if (score === quizData.length) {
            feedbackText.innerText = "You know every detail of our love story perfectly! You're amazing, Akka! ❤️";
        } else if (score >= quizData.length / 2) {
            feedbackText.innerText = "Wow! You know us so well. Every moment is a treasure.";
        } else {
            feedbackText.innerText = "Every day is a new chance to learn more about each other. I love you!";
        }
    }

    // Farewell Cinematic Trigger
    const finishBtn = document.getElementById('finish-journey-btn');
    const farewellOverlay = document.getElementById('farewell-overlay');
    const farewellVideo = document.getElementById('farewell-video');

    if (finishBtn && farewellOverlay) {
        finishBtn.addEventListener('click', () => {
            // Scroll to the button position first for a focused start
            finishBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                // Pause background music for the cinematic ending
                if (bgMusic) {
                    bgMusic.pause();
                    const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;
                    if (musicIcon) {
                        musicIcon.classList.remove('fa-pause');
                        musicIcon.classList.add('fa-play');
                    }
                    if (musicBtn) musicBtn.classList.remove('playing');
                    isPlaying = false;
                }

                farewellOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable scroll

                // Play the video if it exists
                if (farewellVideo) {
                    farewellVideo.currentTime = 0;
                    farewellVideo.muted = false; // Ensure sound is on
                    farewellVideo.play().catch(err => console.log("Video auto-play blocked or failed:", err));
                }

                // Intense heart burst
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        spawnHearts({ clientX: centerX + (Math.random() - 0.5) * 200, clientY: centerY + (Math.random() - 0.5) * 200 });
                    }, i * 30);
                }
            }, 500);
        });
    }

    // Secret Video Modal Logic
    const secretTrigger = document.getElementById('secret-trigger');
    const secretModal = document.getElementById('secret-video-modal');
    const secretClose = document.querySelector('.secret-close');
    const secretVideo = document.getElementById('secret-video');

    if (secretTrigger && secretModal) {
        secretTrigger.addEventListener('click', () => {
            secretModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll

            // Play secret video
            if (secretVideo) {
                secretVideo.currentTime = 0;
                secretVideo.play().catch(err => console.log("Secret video play failed:", err));
            }

            // Burst of hearts on secret reveal
            const rect = secretTrigger.getBoundingClientRect();
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    spawnHearts({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
                }, i * 100);
            }
        });

        const closeSecretModal = () => {
            secretModal.classList.remove('active');
            document.body.style.overflow = ''; // Enable scroll
            if (secretVideo) {
                secretVideo.pause();
            }
        };

        if (secretClose) {
            secretClose.addEventListener('click', closeSecretModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === secretModal) {
                closeSecretModal();
            }
        });
    }

    console.log("Anniversary Website Loaded ❤️ - Cinematic Ending Ready & Secret Treasure Hidden");
});
