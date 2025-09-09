// BusinessAI Agent System - Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize dashboard with sample data
    initializeDashboard();
    
    // Initialize other features
    initializeChatInterface();
    initializeKnowledgeBase();
    initializeAgentConfiguration();
    initializeAPISettings();
});

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked nav item
            item.classList.add('active');
            
            // Show corresponding tab
            const tabId = item.dataset.tab + '-tab';
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

function initializeDashboard() {
    // Sample recent activity data
    const activities = [
        { type: 'document', icon: 'fa-file-alt', text: 'New document uploaded: Employee Handbook', time: '2 minutes ago' },
        { type: 'query', icon: 'fa-question-circle', text: 'Query processed successfully', time: '5 minutes ago' },
        { type: 'agent', icon: 'fa-robot', text: 'Strategy Agent activated', time: '12 minutes ago' },
        { type: 'system', icon: 'fa-cog', text: 'System health check completed', time: '1 hour ago' }
    ];
    
    const activityList = document.getElementById('activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

function initializeChatInterface() {
    const sendButton = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessageToChat('user', message);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate agent response
        setTimeout(() => {
            const responses = [
                "I understand your query. Let me search through the knowledge base for relevant information.",
                "Based on the documents in our system, here's what I found...",
                "I'll analyze this request and provide you with a comprehensive answer.",
                "Let me process this information and check our business processes."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat('agent', randomResponse);
        }, 1500);
    }
    
    function addMessageToChat(sender, text) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="message-content">
                ${text}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function initializeKnowledgeBase() {
    // Sample documents
    const documents = [
        {
            name: "Employee Onboarding SOP",
            category: "HR",
            status: "processed",
            size: "156 KB",
            date: "2025-09-08",
            tags: ["onboarding", "HR", "process"]
        },
        {
            name: "Company Vision 2025",
            category: "Strategy",
            status: "processed", 
            size: "89 KB",
            date: "2025-09-07",
            tags: ["vision", "strategy", "2025"]
        },
        {
            name: "Customer Service Process",
            category: "Customer Service",
            status: "processing",
            size: "234 KB",
            date: "2025-09-06",
            tags: ["customer", "service", "escalation"]
        }
    ];
    
    const documentsGrid = document.getElementById('documents-grid');
    if (documentsGrid) {
        documentsGrid.innerHTML = documents.map(doc => `
            <div class="document-card">
                <div class="document-header">
                    <div class="document-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="status status--${doc.status === 'processed' ? 'success' : 'warning'}">
                        ${doc.status}
                    </div>
                </div>
                <div class="document-name">${doc.name}</div>
                <div class="document-meta">${doc.size} • ${doc.date}</div>
                <div class="document-tags">
                    ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }
    
    // File upload handling
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const browseButton = document.getElementById('browse-files');
    
    if (browseButton && fileInput) {
        browseButton.addEventListener('click', () => fileInput.click());
    }
    
    if (uploadArea) {
        uploadArea.addEventListener('click', () => fileInput?.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            handleFileUpload(e.dataTransfer.files);
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            handleFileUpload(e.target.files);
        });
    }
    
    function handleFileUpload(files) {
        Array.from(files).forEach(file => {
            console.log('File uploaded:', file.name);
            // Here you would implement actual file upload logic
        });
    }
}

function initializeAgentConfiguration() {
    const agents = [
        {
            name: "Strategy Analyst",
            description: "Specializes in strategic planning, vision analysis, and business development",
            enabled: true,
            specialties: ["strategy", "vision", "planning"],
            status: "active"
        },
        {
            name: "HR Operations Specialist", 
            description: "Handles human resources processes, SOPs, and policy questions",
            enabled: true,
            specialties: ["HR", "policies", "SOPs"],
            status: "idle"
        },
        {
            name: "Operations Manager",
            description: "Manages operational processes, workflow optimization, and efficiency analysis",
            enabled: false,
            specialties: ["operations", "workflows", "optimization"],
            status: "disabled"
        }
    ];
    
    const agentsGrid = document.getElementById('agents-config-grid');
    if (agentsGrid) {
        agentsGrid.innerHTML = agents.map(agent => `
            <div class="agent-config-card">
                <div class="agent-config-header">
                    <div>
                        <div class="agent-config-name">${agent.name}</div>
                        <div class="agent-config-description">${agent.description}</div>
                    </div>
                    <button class="agent-toggle ${agent.enabled ? 'enabled' : ''}">
                        <i class="fas ${agent.enabled ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                    </button>
                </div>
                <div class="agent-specialties">
                    <h5>Specialties</h5>
                    <div class="specialty-tags">
                        ${agent.specialties.map(spec => `<span class="tag">${spec}</span>`).join('')}
                    </div>
                </div>
                <div class="status status--${agent.status === 'active' ? 'success' : agent.status === 'idle' ? 'info' : 'error'}">
                    ${agent.status}
                </div>
            </div>
        `).join('');
    }
}

function initializeAPISettings() {
    const providers = [
        {
            name: "OpenAI",
            status: "disconnected",
            models: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"]
        },
        {
            name: "Anthropic",
            status: "disconnected", 
            models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"]
        },
        {
            name: "Google",
            status: "disconnected",
            models: ["gemini-1.5-pro", "gemini-1.0-pro"]
        }
    ];
    
    const apiProviders = document.getElementById('api-providers');
    if (apiProviders) {
        apiProviders.innerHTML = providers.map(provider => `
            <div class="api-provider">
                <div class="provider-header">
                    <div class="provider-name">${provider.name}</div>
                    <div class="provider-status ${provider.status}">${provider.status}</div>
                </div>
                <div class="provider-config">
                    <div class="form-group">
                        <label class="form-label">API Key</label>
                        <input type="password" class="form-control" placeholder="Enter API key">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Default Model</label>
                        <select class="form-control">
                            <option>Select model</option>
                            ${provider.models.map(model => `<option value="${model}">${model}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="provider-actions">
                    <button class="btn btn--primary">Connect</button>
                    <button class="btn btn--outline">Test</button>
                </div>
            </div>
        `).join('');
    }
}