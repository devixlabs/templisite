// Short-polling utilities for AJAX requests

class PollingManager {
    constructor(options = {}) {
        this.interval = options.interval || 5000; // Default 5 seconds
        this.endpoints = new Map();
        this.timers = new Map();
        this.isPolling = false;
    }

    // Add an endpoint to poll
    addEndpoint(name, url, callback, interval = null) {
        this.endpoints.set(name, {
            url: url,
            callback: callback,
            interval: interval || this.interval,
            lastResponse: null
        });
    }

    // Start polling a specific endpoint
    startPolling(name) {
        const endpoint = this.endpoints.get(name);
        if (!endpoint) {
            console.error(`Endpoint ${name} not found`);
            return;
        }

        // Clear existing timer if any
        this.stopPolling(name);

        const poll = async () => {
            try {
                this.showLoadingIndicator();
                
                const response = await fetch(endpoint.url + '?t=' + Date.now(), {
                    method: 'GET',
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Only call callback if data has changed
                if (JSON.stringify(data) !== JSON.stringify(endpoint.lastResponse)) {
                    endpoint.lastResponse = data;
                    endpoint.callback(data);
                }

                this.hideLoadingIndicator();

            } catch (error) {
                console.error(`Polling error for ${name}:`, error);
                this.hideLoadingIndicator();
                
                // Optionally show user-friendly error
                if (window.showNotification) {
                    window.showNotification('Connection error. Retrying...', 'warning');
                }
            }
        };

        // Start immediate poll, then set interval
        poll();
        const timer = setInterval(poll, endpoint.interval);
        this.timers.set(name, timer);
    }

    // Stop polling a specific endpoint
    stopPolling(name) {
        const timer = this.timers.get(name);
        if (timer) {
            clearInterval(timer);
            this.timers.delete(name);
        }
    }

    // Stop all polling
    stopAllPolling() {
        this.timers.forEach((timer, name) => {
            clearInterval(timer);
        });
        this.timers.clear();
        this.hideLoadingIndicator();
    }

    // Show loading indicator
    showLoadingIndicator() {
        let indicator = document.querySelector('.loading-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'loading-indicator';
            indicator.innerHTML = '<small>Updating...</small>';
            document.body.appendChild(indicator);
        }
        indicator.classList.add('show');
    }

    // Hide loading indicator
    hideLoadingIndicator() {
        const indicator = document.querySelector('.loading-indicator');
        if (indicator) {
            indicator.classList.remove('show');
        }
    }

    // Get latest data for an endpoint
    getLatestData(name) {
        const endpoint = this.endpoints.get(name);
        return endpoint ? endpoint.lastResponse : null;
    }
}

// Create global polling manager instance
const polling = new PollingManager();

// Example usage and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Example: Poll metadata every 5 seconds
    polling.addEndpoint('metadata', '/api/metadata.json', function(data) {
        console.log('Metadata updated:', data);
        
        // Example: Update UI based on metadata
        if (data.status && data.status !== 'normal') {
            if (window.showNotification) {
                window.showNotification(`Status: ${data.status}`, 'info');
            }
        }
    });

    // Example: Poll status every 10 seconds
    polling.addEndpoint('status', '/api/status.json', function(data) {
        console.log('Status updated:', data);
        
        // Update status indicator in UI
        updateStatusIndicator(data);
    }, 10000);

    // Start polling if enabled in site config
    if (window.siteConfig && window.siteConfig.features.polling_enabled) {
        polling.startPolling('metadata');
        // polling.startPolling('status'); // Uncomment if needed
    }
});

// Utility function to update status indicator
function updateStatusIndicator(statusData) {
    let indicator = document.querySelector('#status-indicator');
    if (!indicator) {
        // Create status indicator if it doesn't exist
        indicator = document.createElement('div');
        indicator.id = 'status-indicator';
        indicator.className = 'badge position-fixed';
        indicator.style.top = '10px';
        indicator.style.left = '10px';
        indicator.style.zIndex = '1000';
        document.body.appendChild(indicator);
    }

    // Update indicator based on status
    const status = statusData.status || 'unknown';
    indicator.className = `badge position-fixed bg-${getStatusColor(status)}`;
    indicator.textContent = status.toUpperCase();
}

function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'online':
        case 'active':
        case 'normal':
            return 'success';
        case 'warning':
        case 'maintenance':
            return 'warning';
        case 'offline':
        case 'error':
            return 'danger';
        default:
            return 'secondary';
    }
}

// Export for global use
window.polling = polling;
