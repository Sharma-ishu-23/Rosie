const products = {
    cleanser: {
        id: 'cleanser',
        name: 'Rosie Anti-Gravity Cleanser',
        tagline: 'Deep Clean. Zero Pull.',
        description: 'A gentle gel cleanser that removes impurities without stripping moisture. Leaves skin fresh, balanced, and prepped for treatment.',
        bestFor: 'All skin types',
        benefits: 'Improves skin texture\nLightweight and effective\nSuitable for daily use',
        imgPlaceholder: 'cleanser.png'
    },
    liftSerum: {
        id: 'liftSerum',
        name: 'Rosie Lift Serum',
        tagline: 'Instant Glow Lift',
        description: 'Lightweight serum infused with brightening and firming actives to improve texture, reduce dullness, and enhance skin elasticity.',
        bestFor: 'Dull, tired, uneven skin',
        benefits: 'Improves skin texture\nLightweight and effective\nSuitable for daily use',
        imgPlaceholder: 'serum.png'
    },
    hydralock: {
        id: 'hydralock',
        name: 'Rosie Hydralock Moisturizer',
        tagline: 'Lock In. Lift Up.',
        description: 'Deep hydration cream that seals moisture and strengthens the skin barrier while giving a smooth, plump finish.',
        bestFor: 'Dry and combination skin',
        benefits: 'Improves skin texture\nLightweight and effective\nSuitable for daily use',
        imgPlaceholder: 'cleanser.png'
    },
    sunscreen: {
        id: 'sunscreen',
        name: 'Rosie Anti-Gravity Sunscreen SPF 50',
        tagline: 'Protect Without Weight',
        description: 'Ultra-light sunscreen that protects against UV damage while maintaining a non-greasy, invisible finish.',
        bestFor: 'All skin types',
        benefits: 'Improves skin texture\nLightweight and effective\nSuitable for daily use',
        imgPlaceholder: 'cleanser.png'
    },
    nightRepair: {
        id: 'nightRepair',
        name: 'Rosie Night Repair Cream',
        tagline: 'Repair While You Rest',
        description: 'Rich overnight cream that helps restore skin, improve elasticity, and reduce early signs of aging.',
        bestFor: 'Dry, aging skin',
        benefits: 'Improves skin texture\nLightweight and effective\nSuitable for daily use',
        imgPlaceholder: 'serum.png'
    },
    clearSkin: {
        id: 'clearSkin',
        name: 'Rosie Clear Skin Serum',
        tagline: 'Calm. Clear. Control.',
        description: 'Targeted serum to reduce acne, control oil, and soothe inflammation without drying the skin.',
        bestFor: 'Oily, acne-prone skin',
        benefits: 'Improves skin texture\nLightweight and effective\nSuitable for daily use',
        imgPlaceholder: 'serum.png'
    }
};

const quizQuestions = [
    {
        id: 'skinType',
        question: 'What is your primary skin type?',
        options: ['Oily', 'Dry', 'Combination', 'Sensitive']
    },
    {
        id: 'concern',
        question: 'What is your main skin concern?',
        options: ['Acne / Breakouts', 'Dullness', 'Pigmentation', 'Fine lines / aging', 'Dryness']
    },
    {
        id: 'sensitivity',
        question: 'What is your skin\'s sensitivity level?',
        options: ['Low', 'Medium', 'High']
    },
    {
        id: 'water',
        question: 'How is your daily water intake?',
        options: ['Low', 'Medium', 'High']
    },
    {
        id: 'sleep',
        question: 'How would you rate your sleep?',
        options: ['Poor', 'Average', 'Good']
    },
    {
        id: 'sun',
        question: 'What is your daily sun exposure?',
        options: ['Low', 'High']
    }
];

function getRoutine(answers) {
    const { skinType, concern } = answers;
    
    // Default routine
    let routine = [products.cleanser, products.liftSerum, products.hydralock, products.sunscreen];

    if (skinType === 'Sensitive') {
        routine = [products.cleanser, products.hydralock, products.sunscreen];
    } else if (concern === 'Acne / Breakouts' && skinType === 'Oily') {
        routine = [products.cleanser, products.clearSkin, products.hydralock, products.sunscreen];
    } else if (skinType === 'Dry' && concern === 'Dullness') {
        routine = [products.cleanser, products.liftSerum, products.hydralock, products.sunscreen];
    } else if (concern === 'Fine lines / aging' && skinType === 'Dry') {
        routine = [products.cleanser, products.liftSerum, products.nightRepair, products.sunscreen];
    } else if (concern === 'Pigmentation') {
        routine = [products.cleanser, products.liftSerum, products.hydralock, products.sunscreen];
    }

    return routine;
}
