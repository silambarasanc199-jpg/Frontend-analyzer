"use strict";

/* =====================================================
   FRONTEND INTELLIGENCE ANALYZER
   STEP 2 - SMART STACK RECOMMENDER
   ===================================================== */


/* =====================================================
   DOM
   ===================================================== */

const projectInput = document.getElementById("projectInput");
const analyzeBtn = document.getElementById("analyzeBtn");

const loadingSection = document.getElementById("loadingSection");
const loadingText = document.getElementById("loadingText");
const loadingProgress = document.getElementById("loadingProgress");

const resultsSection = document.getElementById("resultsSection");

const themeToggle = document.getElementById("themeToggle");


/* =====================================================
   HELPERS
   ===================================================== */

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
        .map(item =>
            `<span class="result-tag">${item}</span>`
        )
        .join("");
}


/* =====================================================
   PROJECT TYPE
   ===================================================== */

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

            if (value.includes(normalize(keyword))) {

                score += keyword.includes(" ")
                    ? 5
                    : 2;

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


/* =====================================================
   FEATURES
   ===================================================== */

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
    ],

    PWA: [
        "pwa",
        "progressive web app",
        "installable web app"
    ],

    "Offline Support": [
        "offline",
        "offline support",
        "works offline"
    ]

};


function detectFeatures(text) {

    const features = [];

    Object.entries(FEATURE_RULES).forEach(
        ([feature, keywords]) => {

            if (hasAny(text, keywords)) {
                features.push(feature);
            }

        }
    );

    return features;
}


/* =====================================================
   COMPLEXITY
   ===================================================== */

function calculateComplexity(
    text,
    features,
    projectType
) {

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
        [
            "E-Commerce",
            "Food Delivery",
            "AI Application",
            "3D / Immersive Experience",
            "SaaS"
        ].includes(projectType)
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


/* =====================================================
   STEP 2 - SMART FRAMEWORK ENGINE
   ===================================================== */

function recommendFramework(
    text,
    projectType,
    features,
    complexity
) {

    /*
       SIMPLE STATIC PROJECT
    */

    if (
        projectType === "Portfolio" &&
        complexity === "Beginner" &&
        !features.includes("3D Experience") &&
        !features.includes("AI")
    ) {

        return [
            "HTML5",
            "CSS3",
            "JavaScript"
        ];
    }


    /*
       3D / IMMERSIVE
    */

    if (
        projectType === "3D / Immersive Experience" ||
        features.includes("3D Experience")
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript",
            "React Three Fiber",
            "Three.js"
        ];
    }


    /*
       AI
    */

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


    /*
       E-COMMERCE
    */

    if (
        projectType === "E-Commerce"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       FOOD DELIVERY
    */

    if (
        projectType === "Food Delivery"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       DASHBOARD
    */

    if (
        projectType === "Dashboard"
    ) {

        return [
            "React",
            "TypeScript",
            "Vite"
        ];
    }


    /*
       SAAS
    */

    if (
        projectType === "SaaS"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       BOOKING
    */

    if (
        projectType === "Booking"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       EDUCATION
    */

    if (
        projectType === "Education / LMS"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       SOCIAL
    */

    if (
        projectType === "Social / Community"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       FINANCE
    */

    if (
        projectType === "Finance / FinTech"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       HEALTHCARE
    */

    if (
        projectType === "Healthcare"
    ) {

        return [
            "React",
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       BLOG
    */

    if (
        projectType === "Blog / News"
    ) {

        return [
            "Next.js",
            "TypeScript"
        ];
    }


    /*
       DEFAULT
    */

    if (complexity === "Beginner") {

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


/* =====================================================
   CSS / UI LIBRARY
   ===================================================== */

function recommendCSS(
    text,
    projectType,
    features
) {

    if (
        hasAny(text, [
            "simple",
            "basic",
            "html css javascript"
        ]) &&
        projectType === "Portfolio"
    ) {
        return [
            "Custom CSS",
            "CSS Variables",
            "Responsive CSS"
        ];
    }


    if (
        projectType === "Dashboard"
    ) {
        return [
            "Tailwind CSS",
            "CSS Grid",
            "Responsive Design"
        ];
    }


    if (
        projectType === "3D / Immersive Experience"
    ) {
        return [
            "Tailwind CSS",
            "Custom CSS",
            "CSS Transforms"
        ];
    }


    return [
        "Tailwind CSS",
        "CSS Variables",
        "Responsive Design"
    ];
}


/* =====================================================
   STATE MANAGEMENT
   ===================================================== */

function recommendState(
    text,
    projectType,
    features
) {

    if (
        features.length <= 2
    ) {
        return [
            "Local Component State"
        ];
    }


    if (
        projectType === "Dashboard"
    ) {
        return [
            "Zustand",
            "React State",
            "Server State"
        ];
    }


    if (
        projectType === "E-Commerce"
    ) {

        return [
            "Zustand",
            "Server State",
            "URL State"
        ];
    }


    if (
        features.includes("Real-Time Updates")
    ) {

        return [
            "Zustand",
            "Server State",
            "Real-Time State"
        ];
    }


    if (
        projectType === "AI Application"
    ) {

        return [
            "React State",
            "Server State",
            "Conversation State"
        ];
    }


    return [
        "React State",
        "Server State"
    ];
}


/* =====================================================
   API / DATA
   ===================================================== */

function recommendAPI(
    text,
    projectType,
    features
) {

    const result = [];


    if (
        features.includes("Search") ||
        features.includes("Filters") ||
        features.includes("Shopping Cart") ||
        features.includes("User Profile") ||
        features.includes("Authentication")
    ) {

        result.push(
            "REST API",
            "Fetch API"
        );
    }


    if (
        features.includes("Real-Time Updates") ||
        features.includes("Chat / Messaging")
    ) {

        result.push(
            "WebSocket",
            "SSE"
        );
    }


    if (
        projectType === "AI Application" ||
        features.includes("AI")
    ) {

        result.push(
            "LLM API",
            "Streaming API"
        );
    }


    if (
        features.includes("Maps / Location")
    ) {

        result.push(
            "Maps API",
            "Geolocation API"
        );
    }


    if (
        features.includes("Payment")
    ) {

        result.push(
            "Payment Gateway API"
        );
    }


    if (
        projectType === "E-Commerce" ||
        projectType === "SaaS"
    ) {

        result.push(
            "Server Data Layer"
        );
    }


    if (!result.length) {
        result.push("No external API required");
    }


    return unique(result);
}


/* =====================================================
   ARCHITECTURE
   ===================================================== */

function recommendArchitecture(
    text,
    projectType,
    features
) {

    const result = [];


    if (
        projectType === "Portfolio" &&
        features.length <= 3
    ) {

        result.push(
            "Component Architecture",
            "Static / SSG"
        );

    }

    else if (
        projectType === "Blog / News"
    ) {

        result.push(
            "Component Architecture",
            "SSG / ISR"
        );

    }

    else if (
        projectType === "Dashboard"
    ) {

        result.push(
            "SPA",
            "Component Architecture",
            "Feature-Based Architecture"
        );

    }

    else if (
        projectType === "AI Application"
    ) {

        result.push(
            "Component Architecture",
            "Feature-Based Architecture",
            "Streaming UI"
        );

    }

    else if (
        projectType === "3D / Immersive Experience"
    ) {

        result.push(
            "Component Architecture",
            "Scene-Based Architecture"
        );

    }

    else {

        result.push(
            "Component Architecture",
            "
