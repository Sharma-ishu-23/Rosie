document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentView = 'home';
    let quizAnswers = {};
    let currentQuizStep = 0;

    // Elements
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const views = {
        home: document.getElementById('homeView'),
        quiz: document.getElementById('quizView'),
        results: document.getElementById('resultsView')
    };

    // Particles logic
    function createParticles() {
        const container = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(particle);
        }
    }
    createParticles();

    // Navigation Logic
    function navigateTo(viewId) {
        // Hide all views
        Object.values(views).forEach(view => {
            view.classList.remove('active');
        });
        
        // Show target view
        views[viewId].classList.add('active');
        currentView = viewId;
        window.scrollTo(0, 0);

        // Close sidebar if open
        sidebar.classList.remove('active');

        if (viewId === 'quiz') {
            startQuiz();
        }
    }

    // Sidebar toggles
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Links binding
    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('data-link');
            navigateTo(target);
        });
    });

    document.getElementById('startQuizBtn').addEventListener('click', () => {
        navigateTo('quiz');
    });

    document.getElementById('startQuizBtn2').addEventListener('click', () => {
        navigateTo('quiz');
    });

    // Render Product Cards
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.imgPlaceholder}" alt="${product.name}" />
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-benefit">${product.tagline}</p>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 20px; text-align: left; white-space: pre-line;">${product.benefits}</p>
            <div class="product-actions">
                <button class="btn-primary">Add to Cart</button>
                <button class="btn-secondary">Save to Wishlist</button>
            </div>
        `;
        return card;
    }

    // Populate Featured Products (just take first 4)
    const featuredGrid = document.getElementById('featuredGrid');
    const featuredProducts = [products.liftSerum, products.hydralock, products.cleanser, products.sunscreen];
    featuredProducts.forEach(prod => {
        featuredGrid.appendChild(createProductCard(prod));
    });

    // Quiz Logic
    function startQuiz() {
        quizAnswers = {};
        currentQuizStep = 0;
        renderQuizStep();
    }

    function renderQuizStep() {
        const container = document.getElementById('quizContainer');
        const questionData = quizQuestions[currentQuizStep];
        
        // Update progress bar
        const progress = ((currentQuizStep) / quizQuestions.length) * 100;
        document.getElementById('quizProgress').style.width = `${progress}%`;

        container.innerHTML = `
            <h2 class="quiz-question">${questionData.question}</h2>
            <div class="quiz-options">
                ${questionData.options.map(opt => `
                    <button class="quiz-option" data-value="${opt}">${opt}</button>
                `).join('')}
            </div>
        `;

        // Bind options
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');
                quizAnswers[questionData.id] = value;
                
                if (currentQuizStep < quizQuestions.length - 1) {
                    currentQuizStep++;
                    // small delay for transition effect
                    container.style.opacity = 0;
                    setTimeout(() => {
                        renderQuizStep();
                        container.style.opacity = 1;
                    }, 300);
                } else {
                    finishQuiz();
                }
            });
        });
    }

    function finishQuiz() {
        // Calculate routine
        const routine = getRoutine(quizAnswers);
        renderResults(routine);
        navigateTo('results');
    }

    function renderResults(routine) {
        const grid = document.getElementById('routineGrid');
        grid.innerHTML = '';
        
        const steps = ['Cleanse', 'Treat', 'Hydrate', 'Protect'];
        
        routine.forEach((product, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'routine-step';
            
            const label = document.createElement('div');
            label.className = 'step-label';
            label.innerText = `Step ${index + 1}: ${steps[index] || 'Extra'}`;
            
            wrapper.appendChild(label);
            wrapper.appendChild(createProductCard(product));
            
            grid.appendChild(wrapper);
        });
    }

    // --- CHATBASE CLIENT IDENTIFICATION ---
    // Make sure to implement getUserToken() to fetch the JWT from your backend server
    async function getUserToken() {
        // TODO: Replace with your actual backend fetch logic
        // const response = await fetch('/api/chatbase-token');
        // const data = await response.json();
        // return data.token;
        return "MOCK_TOKEN"; 
    }

    async function identifyChatbaseUser() {
        try {
            const token = await getUserToken();
            if (window.chatbase) {
                window.chatbase('identify', { token });
            } else {
                console.warn("Chatbase script not loaded yet.");
            }
        } catch (error) {
            console.error("Error identifying Chatbase user:", error);
        }
    }

    // Uncomment this when you want to identify the user (e.g., after login)
    // identifyChatbaseUser();
});
