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
        projectType === "Portfolio"
    ) {

        if (features.includes("3D Experience")) {
            return [
                "3D Interactive",
                "Cinematic",
                "Experimental"
            ];
        }

        return [
            "Minimal",
            "Editorial",
            "Creative"
        ];
    }

    if (
        projectType === "AI Application"
    ) {
        return [
            "AI Native",
            "Glassmorphism",
            "Bento Grid"
        ];
    }

    if (
        projectType === "Dashboard"
    ) {
        return [
            "Modern",
            "Bento Grid",
            "Data-Centric"
        ];
    }

    if (
        projectType === "E-Commerce"
    ) {
        return [
            "Modern",
            "Bento Grid",
            "Minimal"
        ];
    }

    if (
        projectType === "Food Delivery"
    ) {
        return [
            "Modern",
            "Card-Based",
            "Bento Grid"
        ];
    }

    return [
        "Modern",
        "Minimal",
        "Responsive"
    ];
}


// =====================================================
// LAYOUT
// =====================================================

function recommendLayout(text, projectType, features) {

    if (projectType === "E-Commerce") {

        return [
            "Navbar",
            "Hero / Promotional Banner",
            "Category Navigation",
            "Product Grid",
            "Filter Sidebar",
            "Cart / Checkout"
        ];
    }

    if (projectType === "Food Delivery") {

        return [
            "Location Header",
            "Search",
            "Restaurant Categories",
            "Restaurant Grid",
            "Filter / Sort",
            "Order Tracking"
        ];
    }

    if (projectType === "Portfolio") {

        if (features.includes("3D Experience")) {

            return [
                "Full-Screen Hero",
                "3D Scene",
                "Scroll Storytelling",
                "Project Showcase",
                "About",
                "Contact"
            ];
        }

        return [
            "Hero",
            "About",
            "Skills",
            "Projects",
            "Experience",
            "Contact"
        ];
    }

    if (projectType === "Dashboard") {

        return [
            "Sidebar",
            "Top Navigation",
            "KPI Cards",
            "Charts",
            "Tables",
            "Activity Panel"
        ];
    }

    if (projectType === "AI Application") {

        return [
            "AI Command Header",
            "Chat / Workspace",
            "Prompt Input",
            "Response Area",
            "History / Sidebar"
        ];
    }

    if (projectType === "3D / Immersive Experience") {

        return [
            "Full-Screen Canvas",
            "Floating Navigation",
            "3D Scene",
            "Interactive Controls",
            "Story Sections"
        ];
    }

    return [
        "Responsive Navbar",
        "Hero",
        "Content Sections",
        "Cards",
        "Footer"
    ];
}


// =====================================================
// ANIMATION
// =====================================================

function recommendAnimation(text, projectType, features) {

    const result = [];

    if (projectType === "Dashboard") {
        result.push(
            "Subtle Micro-interactions",
            "Chart Animations",
            "Hover Effects"
        );
    }

    else if (
        projectType === "Portfolio" &&
        features.includes("3D Experience")
    ) {
        result.push(
            "GSAP",
            "ScrollTrigger",
            "Parallax",
            "Cinematic Transitions",
            "Camera Animation"
        );
    }

    else if (
        projectType === "3D / Immersive Experience"
    ) {
        result.push(
            "GSAP",
            "ScrollTrigger",
            "Camera Animation",
            "Particle Animation",
            "Cinematic Transitions"
        );
    }

    else if (
        projectType === "AI Application"
    ) {
        result.push(
            "Typing Effect",
            "Streaming Animation",
            "Message Reveal",
            "Micro-interactions"
        );
    }

    else {
        result.push(
            "Fade In",
            "Hover Effects",
            "Scroll Reveal",
            "Micro-interactions"
        );
    }

    if (features.includes("Scroll Animation")) {
        result.push("Advanced Scroll Animation");
    }

    if (features.includes("Animation")) {
        result.push("Motion System");
    }

    return unique(result);
}


// =====================================================
// 3D
// =====================================================

function recommend3D(text, projectType, features) {

    if (
        projectType === "3D / Immersive Experience" ||
        features.includes("3D Experience")
    ) {

        return [
            "Three.js",
            "React Three Fiber",
            "React Three Drei",
            "WebGL",
            "3D Models",
            "Lighting & Materials",
            "Orbit Controls",
            "Post Processing"
        ];
    }

    if (
        projectType === "Portfolio" &&
        hasAny(text, ["3d", "interactive"])
    ) {

        return [
            "Three.js",
            "React Three Fiber",
            "WebGL"
        ];
    }

    if (
        projectType === "E-Commerce" &&
        hasAny(text, ["3d product", "3d viewer"])
    ) {

        return [
            "Three.js",
            "3D Product Viewer",
            "Orbit Controls"
        ];
    }

    return [
        "Not required"
    ];
}


// =====================================================
// XR
// =====================================================

function recommendXR(text, projectType, features) {

    const result = [];

    if (
        features.includes("AR") ||
        hasAny(text, ["augmented reality"])
    ) {
        result.push(
            "WebXR",
            "AR Product Preview"
        );
    }

    if (
        features.includes("VR") ||
        hasAny(text, ["virtual reality"])
    ) {
        result.push(
            "WebXR",
            "VR Experience"
        );
    }

    if (
        projectType === "3D / Immersive Experience" &&
        result.length === 0
    ) {
        result.push(
            "WebXR — Optional",
            "Spatial Interaction — Optional"
        );
    }

    if (!result.length) {
        result.push("Not required");
    }

    return result;
}


// =====================================================
// AI
// =====================================================

function recommendAI(text, projectType, features) {

    const result = [];

    if (
        projectType === "AI Application" ||
        features.includes("AI") ||
        features.includes("AI Chatbot")
    ) {

        result.push(
            "LLM Integration",
            "AI Chatbot / Assistant",
            "Streaming Responses",
            "Structured Output",
            "Conversation Memory"
        );
    }

    if (
        features.includes("AI Recommendations") ||
        projectType === "E-Commerce"
    ) {
        result.push(
            "Recommendation AI — Optional"
        );
    }

    if (features.includes("Document AI")) {
        result.push(
            "Document Analysis",
            "RAG",
            "Semantic Search"
        );
    }

    if (features.includes("Voice AI")) {
        result.push(
            "Speech-to-Text",
            "Text-to-Speech",
            "Voice AI"
        );
    }

    if (features.includes("Vision AI")) {
        result.push(
            "Computer Vision",
            "Image Analysis"
        );
    }

    if (
        projectType === "3D / Immersive Experience" &&
        hasAny(text, ["ai", "ai controlled"])
    ) {
        result.push(
            "AI + 3D",
            "AI-Controlled 3D Interaction"
        );
    }

    if (!result.length) {
        result.push("AI not required");
    }

    return unique(result);
}


// =====================================================
// TECHNOLOGY
// =====================================================

function recommendTechnology(
    text,
    projectType,
    features,
    framework
) {

    const tech = [
        "HTML5",
        "CSS3",
        "JavaScript"
    ];

    if (
        framework.includes("TypeScript")
    ) {
        tech.push("TypeScript");
    }

    framework.forEach(item => {

        if (
            item !== "HTML5" &&
            item !== "CSS3" &&
            item !== "JavaScript"
        ) {
            tech.push(item);
        }

    });

    tech.push("Responsive Design");

    if (
        features.includes("Search") ||
        features.includes("Filters")
    ) {
        tech.push("Fetch API");
        tech.push("REST API");
    }

    if (
        features.includes("Real-Time Updates")
    ) {
        tech.push("WebSocket / SSE");
    }

    if (
        features.includes("Authentication")
    ) {
        tech.push("Authentication");
        tech.push("OAuth / Session");
    }

    if (
        features.includes("Payment")
    ) {
        tech.push("Payment Gateway");
    }

    if (
        features.includes("Maps / Location")
    ) {
        tech.push("Geolocation API");
        tech.push("Maps API");
    }

    if (
        features.includes("Analytics")
    ) {
        tech.push("Chart.js / ECharts");
    }

    if (
        features.includes("3D Experience")
    ) {
        tech.push(
            "Three.js",
            "WebGL"
        );
    }

    if (
        projectType === "3D / Immersive Experience"
    ) {
        tech.push(
            "WebGPU — Optional"
        );
    }

    if (
        features.includes("AR") ||
        features.includes("VR")
    ) {
        tech.push("WebXR");
    }

    if (
        features.includes("AI") ||
        features.includes("AI Chatbot")
    ) {
        tech.push(
            "LLM API",
            "Streaming API"
        );
    }

    if (
        features.includes("PWA") ||
        features.includes("Offline Support")
    ) {
        tech.push(
            "Service Worker",
            "Web App Manifest"
        );
    }

    return unique(tech);
}


// =====================================================
// QUALITY
// =====================================================

function recommendPerformance(
    text,
    projectType,
    features
) {

    const result = [
        "Lazy Loading",
        "Code Splitting",
        "Image Optimization",
        "Responsive Assets",
        "Caching"
    ];

    if (
        features.includes("3D Experience")
    ) {
        result.push(
            "3D Model Compression",
            "GPU Optimization",
            "LOD",
            "Lazy-load 3D Scene"
        );
    }

    if (
        projectType === "AI Application"
    ) {
        result.push(
            "Streaming Responses",
            "Request Debouncing"
        );
    }

    return unique(result);
}


function recommendAccessibility() {

    return [
        "Semantic HTML",
        "Keyboard Navigation",
        "ARIA where needed",
        "Focus Management",
        "Color Contrast",
        "Alt Text",
        "Reduced Motion Support"
    ];
}


function recommendSEO(projectType) {

    if (
        projectType === "Dashboard" ||
        projectType === "AI Application"
    ) {
        return [
            "Metadata",
            "Semantic HTML",
            "Robots Configuration"
        ];
    }

    return [
        "Title & Meta Description",
        "Open Graph",
        "Semantic HTML",
        "Sitemap",
        "Robots.txt",
        "Canonical URLs",
        "Structured Data"
    ];
}


function recommendSecurity(features) {

    const result = [
        "Input Validation",
        "XSS Protection",
        "Secure Dependencies",
        "HTTPS"
    ];

    if (features.includes("Authentication")) {
        result.push(
            "Secure Authentication",
            "Authorization",
            "Session Security"
        );
    }

    if (features.includes("Payment")) {
        result.push(
            "Payment Provider Security",
            "Never expose secret keys"
        );
    }

    return unique(result);
}


function recommendTesting(projectType, features) {

    const result = [
        "Unit Testing",
        "Component Testing",
        "E2E Testing"
    ];

    if (
        features.includes("Payment") ||
        features.includes("Authentication") ||
        projectType === "E-Commerce"
    ) {
        result.push(
            "Critical User Flow Testing"
        );
    }

    return result;
}


function recommendDeployment(
    text,
    projectType
) {

    if (
        projectType === "Portfolio" &&
        hasAny(text, ["html css javascript"])
    ) {
        return [
            "GitHub Pages",
            "Netlify",
            "Cloudflare Pages"
        ];
    }

    if (
        projectType === "3D / Immersive Experience"
    ) {
        return [
            "Vercel",
            "Cloudflare",
            "CDN"
        ];
    }

    return [
        "Vercel",
        "Netlify",
        "Cloudflare",
        "GitHub"
    ];
}


// =====================================================
// CONFIDENCE
// =====================================================

function calculateConfidence(
    projectScore,
    features,
    projectType
) {

    let score = 55;

    score += Math.min(projectScore * 4, 20);

    score += Math.min(features.length * 2, 20);

    if (projectType !== "General Web Application") {
        score += 5;
    }

    return Math.min(score, 99);
}


// =====================================================
// WORKFLOW
// =====================================================

function generateWorkflow(
    projectType,
    features
) {

    const steps = [
        "Requirements Analysis",
        "Information Architecture",
        "Design System",
        "Component Development"
    ];

    if (
        features.includes("Authentication") ||
        features.includes("Payment")
    ) {
        steps.push("API & Integration");
    }

    if (
        features.includes("AI")
    ) {
        steps.push("AI Integration");
    }

    if (
        features.includes("3D Experience")
    ) {
        steps.push("3D Scene Development");
    }

    if (
        features.includes("Real-Time Updates")
    ) {
        steps.push("Real-Time Architecture");
    }

    steps.push(
        "Testing",
        "Performance Optimization",
        "Deployment"
    );

    return unique(steps);
}


// =====================================================
// MAIN ANALYZER
// =====================================================

function analyzeProject(input) {

    const text = normalize(input);

    const project = detectProjectType(text);

    const features = detectFeatures(text);

    const complexity = calculateComplexity(
        text,
        features,
        project.type
    );

    const framework = recommendFramework(
        text,
        project.type,
        features
    );

    const architecture = recommendArchitecture(
        text,
        project.type,
        features
    );

    const pattern = recommendPattern(
        text,
        project.type,
        features
    );

    const design = recommendDesign(
        text,
        project.type,
        features
    );

    const theme = recommendTheme(
        text,
        project.type,
        features
    );

    const uiStyle = recommendUIStyle(
        text,
        project.type,
        features
    );

    const layout = recommendLayout(
        text,
        project.type,
        features
    );

    const animation = recommendAnimation(
        text,
        project.type,
        features
    );

    const threeD = recommend3D(
        text,
        project.type,
        features
    );

    const xr = recommendXR(
        text,
        project.type,
        features
    );

    const ai = recommendAI(
        text,
        project.type,
        features
    );

    const technology = recommendTechnology(
        text,
        project.type,
        features,
        framework
    );

    const performance = recommendPerformance(
        text,
        project.type,
        features
    );

    const accessibility = recommendAccessibility();

    const seo = recommendSEO(
        project.type
    );

    const security = recommendSecurity(
        features
    );

    const testing = recommendTesting(
        project.type,
        features
    );

    const deployment = recommendDeployment(
        text,
        project.type
    );

    const workflow = generateWorkflow(
        project.type,
        features
    );

    const confidence = calculateConfidence(
        project.score,
        features,
        project.type
    );


    return {

        projectType: project.type,

        complexity,

        framework,

        design,

        architecture,

        pattern,

        technology,

        theme,

        uiStyle,

        layout,

        features,

        animation,

        threeD,

        xr,

        ai,

        performance,

        accessibility,

        seo,

        security,

        testing,

        deployment,

        workflow,

        confidence

    };
}


// =====================================================
// DISPLAY
// =====================================================

function displayResults(result) {

    document.getElementById("confidenceScore").textContent =
        result.confidence + "%";

    document.getElementById("projectType").textContent =
        result.projectType;

    document.getElementById("projectComplexity").textContent =
        result.complexity;

    document.getElementById("primaryFramework").textContent =
        result.framework.join(" + ");

    document.getElementById("designDirection").textContent =
        result.design.join(" + ");


    document.getElementById("architectureResult").innerHTML =
        renderTags(result.architecture);

    document.getElementById("patternResult").innerHTML =
        renderTags(result.pattern);

    document.getElementById("technologyResult").innerHTML =
        renderTags(result.technology);

    document.getElementById("themeResult").innerHTML =
        renderTags(result.theme);

    document.getElementById("uiStyleResult").innerHTML =
        renderTags(result.uiStyle);

    document.getElementById("layoutResult").innerHTML =
        renderTags(result.layout);

    document.getElementById("featuresResult").innerHTML =
        renderTags(result.features);

    document.getElementById("animationResult").innerHTML =
        renderTags(result.animation);

    document.getElementById("threeDResult").innerHTML =
        renderTags(result.threeD);

    document.getElementById("xrResult").innerHTML =
        renderTags(result.xr);

    document.getElementById("aiResult").innerHTML =
        renderTags(result.ai);

    document.getElementById("performanceResult").innerHTML =
        renderTags(result.performance);

    document.getElementById("accessibilityResult").innerHTML =
        renderTags(result.accessibility);

    document.getElementById("seoResult").innerHTML =
        renderTags(result.seo);

    document.getElementById("securityResult").innerHTML =
        renderTags(result.security);

    document.getElementById("testingResult").innerHTML =
        renderTags(result.testing);

    document.getElementById("deploymentResult").innerHTML =
        renderTags(result.deployment);


    document.getElementById("workflowResult").innerHTML =
        result.workflow
            .map((step, index) => `
                <div class="workflow-step">
                    <span class="workflow-number">
                        ${index + 1}
                    </span>
                    <span>${step}</span>
                </div>
            `)
            .join("");


    resultsSection.classList.remove("hidden");

    resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =====================================================
// LOADING
// =====================================================

function startAnalysis() {

    const input = projectInput.value.trim();

    if (!input) {

        alert(
            "Please describe your project first."
        );

        projectInput.focus();

        return;
    }


    resultsSection.classList.add("hidden");

    loadingSection.classList.remove("hidden");

    loadingProgress.style.width = "0%";


    const messages = [
        "Understanding your project...",
        "Detecting project type...",
        "Analyzing required features...",
        "Selecting frontend architecture...",
        "Choosing technology stack...",
        "Designing UI direction...",
        "Checking animation requirements...",
        "Evaluating 3D / XR possibilities...",
        "Evaluating AI possibilities...",
        "Preparing production recommendations..."
    ];


    let index = 0;


    const interval = setInterval(() => {

        const progress = Math.min(
            ((index + 1) / messages.length) * 100,
            100
        );

        loadingProgress.style.width =
            progress + "%";

        loadingText.textContent =
            messages[index];


        index++;


        if (index >= messages.length) {

            clearInterval(interval);

            setTimeout(() => {

                const result =
                    analyzeProject(input);

                loadingSection.classList.add(
                    "hidden"
                );

                displayResults(result);

                window.currentAnalysis = result;

            }, 350);

        }

    }, 180);

}


// =====================================================
// EXAMPLES
// =====================================================

document.querySelectorAll(".example-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                projectInput.value =
                    button.dataset.example;

                projectInput.focus();

            }
        );

    });


// =====================================================
// ANALYZE BUTTON
// =====================================================

analyzeBtn.addEventListener(
    "click",
    startAnalysis
);


// =====================================================
// CTRL + ENTER
// =====================================================

projectInput.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            startAnalysis();
        }

    }
);


// =====================================================
// NEW ANALYSIS
// =====================================================

document.getElementById(
    "newAnalysisBtn"
).addEventListener(
    "click",
    () => {

        projectInput.value = "";

        resultsSection.classList.add(
            "hidden"
        );

        loadingSection.classList.add(
            "hidden"
        );

        projectInput.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// =====================================================
// COPY RESULTS
// =====================================================

document.getElementById(
    "copyResultBtn"
).addEventListener(
    "click",
    async () => {

        const result =
            window.currentAnalysis;

        if (!result) return;


        const report = `

FRONTEND PROJECT BLUEPRINT
==========================

Project Type:
${result.projectType}

Complexity:
${result.complexity}

Framework:
${result.framework.join(", ")}

Design:
${result.design.join(", ")}

Architecture:
${result.architecture.join(", ")}

Pattern:
${result.pattern.join(", ")}

Technology:
${result.technology.join(", ")}

Theme:
${result.theme.join(", ")}

UI Style:
${result.uiStyle.join(", ")}

Layout:
${result.layout.join(", ")}

Features:
${result.features.join(", ")}

Animation:
${result.animation.join(", ")}

3D:
${result.threeD.join(", ")}

XR:
${result.xr.join(", ")}

AI:
${result.ai.join(", ")}

Performance:
${result.performance.join(", ")}

Accessibility:
${result.accessibility.join(", ")}

SEO:
${result.seo.join(", ")}

Security:
${result.security.join(", ")}

Testing:
${result.testing.join(", ")}

Deployment:
${result.deployment.join(", ")}

Workflow:
${result.workflow.join(" → ")}

Confidence:
${result.confidence}%

        `.trim();


        try {

            await navigator.clipboard.writeText(
                report
            );

            alert(
                "Analysis copied successfully!"
            );

        } catch (error) {

            alert(
                "Copy failed. Please select and copy manually."
            );

        }

    }
);


// =====================================================
// THEME
// =====================================================

function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

        themeToggle.textContent = "☀️";

        localStorage.setItem(
            "frontendAnalyzerTheme",
            "light"
        );

    } else {

        document.body.classList.remove("light");

        themeToggle.textContent = "🌙";

        localStorage.setItem(
            "frontendAnalyzerTheme",
            "dark"
        );

    }
}


const savedTheme =
    localStorage.getItem(
        "frontendAnalyzerTheme"
    );


setTheme(
    savedTheme || "dark"
);


themeToggle.addEventListener(
    "click",
    () => {

        const isLight =
            document.body.classList.contains(
                "light"
            );

        setTheme(
            isLight ? "dark" : "light"
        );

    }
);


// =====================================================
// STARTUP
// =====================================================

console.log(
    "Frontend Intelligence Analyzer V2 loaded successfully."
);
