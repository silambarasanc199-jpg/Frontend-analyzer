"use strict";


// =====================================================
// FRONTEND INTELLIGENCE ANALYZER
// V2 SMART RECOMMENDATION ENGINE
// =====================================================


// -----------------------------------------------------
// DOM
// -----------------------------------------------------

const projectInput = document.getElementById("projectInput");
const analyzeBtn = document.getElementById("analyzeBtn");

const loadingSection = document.getElementById("loadingSection");
const loadingText = document.getElementById("loadingText");
const loadingProgress = document.getElementById("loadingProgress");

const resultsSection = document.getElementById("resultsSection");

const themeToggle = document.getElementById("themeToggle");


// -----------------------------------------------------
// HELPERS
// -----------------------------------------------------

function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .replace(/[^\w\s.-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


function hasAny(text, keywords) {

    const value = normalize(text);

    return keywords.some(keyword =>
        value.includes(normalize(keyword))
    );
}


function unique(array) {

    return [...new Set(array)];
}


function renderTags(items) {

    if (!items || !items.length) {
        return "<span class='result-tag'>Not required</span>";
    }

    return unique(items)
        .map(item => `<span class="result-tag">${item}</span>`)
        .join("");
}


function renderText(items) {

    if (!items || !items.length) {
        return "Not specifically required.";
    }

    return items.join("<br>");
}


// =====================================================
// PROJECT TYPE ENGINE
// =====================================================

const PROJECT_RULES = [

    {
        type: "Food Delivery",
        keywords: [
            "food delivery",
            "food ordering",
            "order food",
            "restaurant delivery",
            "food app",
            "delivery app"
        ]
    },

    {
        type: "E-Commerce",
        keywords: [
            "ecommerce",
            "e-commerce",
            "online store",
            "online shop",
            "shopping website",
            "shopping app",
            "product store",
            "buy products",
            "sell products",
            "cart",
            "checkout",
            "product listing"
        ]
    },

    {
        type: "3D / Immersive Experience",
        keywords: [
            "3d website",
            "3d experience",
            "interactive 3d",
            "immersive website",
            "immersive experience",
            "virtual showroom",
            "webgl",
            "three.js",
            "threejs",
            "virtual reality",
            "vr experience",
            "ar experience"
        ]
    },

    {
        type: "AI Application",
        keywords: [
            "ai application",
            "ai app",
            "artificial intelligence",
            "ai assistant",
            "ai chatbot",
            "chatbot",
            "copilot",
            "llm",
            "generative ai",
            "ai powered"
        ]
    },

    {
        type: "Portfolio",
        keywords: [
            "portfolio",
            "personal website",
            "personal portfolio",
            "developer portfolio",
            "designer portfolio",
            "photographer portfolio",
            "creative portfolio"
        ]
    },

    {
        type: "Dashboard",
        keywords: [
            "dashboard",
            "admin dashboard",
            "analytics dashboard",
            "management dashboard",
            "admin panel",
            "analytics",
            "statistics",
            "reports"
        ]
    },

    {
        type: "SaaS",
        keywords: [
            "saas",
            "software as a service",
            "business platform",
            "management platform",
            "productivity platform"
        ]
    },

    {
        type: "Booking",
        keywords: [
            "booking",
            "reservation",
            "appointment",
            "hotel booking",
            "flight booking",
            "ticket booking"
        ]
    },

    {
        type: "Education / LMS",
        keywords: [
            "education",
            "online course",
            "learning platform",
            "lms",
            "student portal",
            "course website",
            "e-learning",
            "elearning"
        ]
    },

    {
        type: "Social / Community",
        keywords: [
            "social media",
            "social network",
            "community",
            "forum",
            "messaging platform",
            "followers",
            "friends"
        ]
    },

    {
        type: "Finance / FinTech",
        keywords: [
            "banking",
            "finance",
            "fintech",
            "investment",
            "stock market",
            "trading",
            "wallet",
            "expense tracker"
        ]
    },

    {
        type: "Healthcare",
        keywords: [
            "healthcare",
            "hospital",
            "clinic",
            "doctor",
            "medical",
            "patient",
            "health app",
            "telemedicine"
        ]
    },

    {
        type: "Blog / News",
        keywords: [
            "blog",
            "news website",
            "news portal",
            "articles",
            "magazine",
            "publishing"
        ]
    }
];


function detectProjectType(text) {

    const value = normalize(text);

    let best = {
        type: "General Web Application",
        score: 0
    };

    PROJECT_RULES.forEach(rule => {

        let score = 0;

        rule.keywords.forEach(keyword => {

            const key = normalize(keyword);

            if (value.includes(key)) {

                if (value === key) {
                    score += 10;
                } else {
                    score += key.includes(" ")
                        ? 5
                        : 2;
                }
            }

        });

        if (score > best.score) {

            best = {
                type: rule.type,
                score
            };

        }

    });

    return best;
}


// =====================================================
// FEATURE ENGINE
// =====================================================

const FEATURE_RULES = {

    Authentication: [
        "login",
        "sign in",
        "signin",
        "signup",
        "sign up",
        "register",
        "authentication",
        "auth",
        "user account"
    ],

    Search: [
        "search",
        "search bar",
        "find products",
        "find restaurants",
        "find users"
    ],

    Filters: [
        "filter",
        "filters",
        "filter products",
        "category filter",
        "price filter"
    ],

    Sorting: [
        "sort",
        "sorting",
        "sort by price",
        "sort products"
    ],

    "Shopping Cart": [
        "cart",
        "shopping cart",
        "add to cart"
    ],

    Checkout: [
        "checkout",
        "place order",
        "order confirmation"
    ],

    Payment: [
        "payment",
        "payments",
        "pay online",
        "credit card",
        "debit card",
        "upi",
        "razorpay",
        "stripe",
        "paypal"
    ],

    Wishlist: [
        "wishlist",
        "favorite products",
        "favourites",
        "save products"
    ],

    "User Profile": [
        "profile",
        "user profile",
        "account page",
        "my account"
    ],

    "Reviews & Ratings": [
        "review",
        "reviews",
        "rating",
        "ratings",
        "customer reviews"
    ],

    Comments: [
        "comment",
        "comments",
        "discussion"
    ],

    "Chat / Messaging": [
        "chat",
        "messaging",
        "messages",
        "live chat"
    ],

    Notifications: [
        "notification",
        "notifications",
        "alerts"
    ],

    "File Upload": [
        "file upload",
        "upload files",
        "upload image",
        "upload images",
        "document upload"
    ],

    "Maps / Location": [
        "map",
        "maps",
        "location",
        "gps",
        "geolocation",
        "nearby"
    ],

    "Booking / Reservation": [
        "booking",
        "reservation",
        "appointment",
        "schedule"
    ],

    "Real-Time Updates": [
        "real time",
        "real-time",
        "live tracking",
        "live updates",
        "live location",
        "instant updates"
    ],

    Analytics: [
        "analytics",
        "statistics",
        "reports",
        "charts",
        "graphs",
        "metrics"
    ],

    "Admin Panel": [
        "admin",
        "admin panel",
        "admin dashboard",
        "management panel"
    ],

    "Dark Mode": [
        "dark mode",
        "dark theme",
        "theme switcher"
    ],

    "Multi-Language": [
        "multi language",
        "multilingual",
        "multiple languages",
        "language switcher",
        "i18n"
    ],

    "Offline Support": [
        "offline",
        "offline support",
        "works offline"
    ],

    PWA: [
        "pwa",
        "progressive web app",
        "installable web app"
    ],

    Animation: [
        "animation",
        "animated",
        "motion",
        "micro interaction",
        "micro-interaction"
    ],

    "Scroll Animation": [
        "scroll animation",
        "scroll reveal",
        "scroll effects",
        "parallax",
        "scroll storytelling"
    ],

    "3D Experience": [
        "3d",
        "three.js",
        "threejs",
        "webgl",
        "interactive 3d",
        "3d model",
        "3d product"
    ],

    "Immersive Experience": [
        "immersive",
        "immersive experience",
        "virtual showroom",
        "cinematic",
        "spatial"
    ],

    AR: [
        "augmented reality",
        "ar preview",
        "ar product"
    ],

    VR: [
        "virtual reality",
        "vr experience"
    ],

    AI: [
        "ai",
        "artificial intelligence",
        "machine learning",
        "llm",
        "gpt",
        "generative ai",
        "ai powered"
    ],

    "AI Chatbot": [
        "chatbot",
        "ai chatbot",
        "ai assistant",
        "virtual assistant",
        "copilot"
    ],

    "AI Recommendations": [
        "recommendation",
        "recommend products",
        "personalization",
        "personalized",
        "recommended for you"
    ],

    "Voice AI": [
        "voice assistant",
        "speech recognition",
        "text to speech",
        "voice ai"
    ],

    "Vision AI": [
        "image recognition",
        "computer vision",
        "object detection",
        "image analysis",
        "vision ai"
    ],

    "Document AI": [
        "pdf",
        "document analysis",
        "document ai",
        "summarize documents",
        "read documents"
    ]
};


function detectFeatures(text) {

    const features = [];

    Object.entries(FEATURE_RULES).forEach(([feature, keywords]) => {

        if (hasAny(text, keywords)) {
            features.push(feature);
        }

    });

    return features;
}


// =====================================================
// COMPLEXITY
// =====================================================

function calculateComplexity(text, features, projectType) {

    let score = features.length;

    if (
        hasAny(text, [
            "real time",
            "live tracking",
            "websocket",
            "payment",
            "authentication",
            "ai",
            "3d",
            "ar",
            "vr"
        ])
    ) {
        score += 3;
    }

    if (
        projectType === "E-Commerce" ||
        projectType === "Food Delivery" ||
        projectType === "AI Application" ||
        projectType === "3D / Immersive Experience"
    ) {
        score += 2;
    }

    if (score <= 3) {
        return "Beginner";
    }

    if (score <= 7) {
        return "Intermediate";
    }

    if (score <= 11) {
        return "Advanced";
    }

    return "Expert";
}


// =====================================================
// FRAMEWORK
// =====================================================

function recommendFramework(text, projectType, features) {

    if (
        projectType === "3D / Immersive Experience" ||
        hasAny(text, ["three.js", "webgl", "3d portfolio"])
    ) {
        return [
            "React",
            "Next.js",
            "React Three Fiber",
            "Three.js"
        ];
    }

    if (
        projectType === "AI Application" ||
        features.includes("AI") ||
        features.includes("AI Chatbot")
    ) {
        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }

    if (
        projectType === "E-Commerce" ||
        projectType === "Food Delivery" ||
        projectType === "Booking"
    ) {
        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }

    if (projectType === "Dashboard") {
        return [
            "React",
            "TypeScript",
            "Vite"
        ];
    }

    if (
        projectType === "Portfolio" &&
        hasAny(text, ["simple", "basic", "static"])
    ) {
        return [
            "HTML5",
            "CSS3",
            "JavaScript"
        ];
    }

    return [
        "React",
        "TypeScript",
        "Vite"
    ];
}


// =====================================================
// ARCHITECTURE
// =====================================================

function recommendArchitecture(text, projectType, features) {

    const result = [];

    if (
        projectType === "Portfolio" &&
        features.length <= 3
    ) {
        result.push("Component Architecture");
        result.push("Static / SSG");
    }

    else if (
        projectType === "Blog / News"
    ) {
        result.push("Component Architecture");
        result.push("SSG / ISR");
    }

    else if (
        projectType === "Dashboard" ||
        projectType === "Admin Panel"
    ) {
        result.push("SPA");
        result.push("Component Architecture");
        result.push("Feature-Based Architecture");
    }

    else if (
        projectType === "E-Commerce" ||
        projectType === "Food Delivery" ||
        projectType === "Booking"
    ) {
        result.push("Hybrid Rendering");
        result.push("Component Architecture");
        result.push("Feature-Based Architecture");
    }

    else if (
        projectType === "AI Application"
    ) {
        result.push("Component Architecture");
        result.push("Feature-Based Architecture");
        result.push("Streaming UI");
    }

    else {
        result.push("Component Architecture");
        result.push("Feature-Based Architecture");
    }

    if (features.includes("Offline Support") || features.includes("PWA")) {
        result.push("PWA Architecture");
    }

    return unique(result);
}


// =====================================================
// PATTERN
// =====================================================

function recommendPattern(text, projectType, features) {

    const patterns = [
        "Component-Based"
    ];

    if (features.length >= 5) {
        patterns.push("Feature-Based Architecture");
    }

    if (
        features.includes("Authentication") ||
        features.includes("Payment") ||
        features.includes("Shopping Cart")
    ) {
        patterns.push("Unidirectional Data Flow");
    }

    if (
        features.includes("Real-Time Updates")
    ) {
        patterns.push("Event-Driven UI");
    }

    if (
        projectType === "E-Commerce" ||
        projectType === "Food Delivery"
    ) {
        patterns.push("Repository Pattern");
    }

    if (
        projectType === "Dashboard" ||
        projectType === "SaaS"
    ) {
        patterns.push("Design System");
    }

    return unique(patterns);
}


// =====================================================
// DESIGN
// =====================================================

function recommendDesign(text, projectType, features) {

    if (projectType === "Finance / FinTech") {
        return [
            "Professional",
            "Trust-Focused",
            "Data-Centric"
        ];
    }

    if (projectType === "Healthcare") {
        return [
            "Clean",
            "Professional",
            "Trust-Focused"
        ];
    }

    if (projectType === "Food Delivery") {
        return [
            "Modern",
            "Vibrant",
            "Conversion-Focused"
        ];
    }

    if (projectType === "E-Commerce") {
        return [
            "Modern",
            "Premium",
            "Conversion-Focused"
        ];
    }

    if (projectType === "Portfolio") {
        if (
            features.includes("3D Experience") ||
            hasAny(text, ["cinematic", "creative"])
        ) {
            return [
                "Creative",
                "Immersive",
                "Cinematic"
            ];
        }

        return [
            "Minimal",
            "Creative",
            "Personal"
        ];
    }

    if (
        projectType === "AI Application"
    ) {
        return [
            "Futuristic",
            "AI-Native",
            "Clean"
        ];
    }

    if (
        projectType === "3D / Immersive Experience"
    ) {
        return [
            "Futuristic",
            "Immersive",
            "Cinematic"
        ];
    }

    return [
        "Modern",
        "Clean",
        "Professional"
    ];
}


// =====================================================
// THEME
// =====================================================

function recommendTheme(text, projectType, features) {

    if (projectType === "Food Delivery") {
        return [
            "Food",
            "Vibrant",
            "Warm"
        ];
    }

    if (projectType === "E-Commerce") {
        return [
            "Modern",
            "Minimal",
            "Light / Dark"
        ];
    }

    if (projectType === "Portfolio") {

        if (
            features.includes("3D Experience") ||
            hasAny(text, ["space", "galaxy"])
        ) {
            return [
                "Space",
                "Galaxy",
                "Dark"
            ];
        }

        return [
            "Creative Portfolio",
            "Minimal",
            "Dark / Light"
        ];
    }

    if (projectType === "AI Application") {
        return [
            "AI Future",
            "Dark",
            "Gradient"
        ];
    }

    if (projectType === "3D / Immersive Experience") {
        return [
            "Sci-Fi",
            "Space",
            "Dark"
        ];
    }

    if (projectType === "Finance / FinTech") {
        return [
            "Finance",
            "Professional",
            "Dark / Light"
        ];
    }

    if (projectType === "Healthcare") {
        return [
            "Healthcare",
            "Clean",
            "Light"
        ];
    }

    if (projectType === "Education / LMS") {
        return [
            "Education",
            "Friendly",
            "Modern"
        ];
    }

    return [
        "Modern",
        "Minimal",
        "Light / Dark"
    ];
}


// =====================================================
// UI STYLE
// =====================================================

function recommendUIStyle(text, projectType, features) {

    if (
        projectType === "3D / Immersive Experience"
    ) {
        return [
            "3D Interactive",
            "Glassmorphism",
            "Cinematic"
        ];
    }

    if (
        projectType === "Portf
