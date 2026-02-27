// Team member loader - fetches JSON and populates team page
async function loadTeamData() {
    try {
        const response = await fetch('./json/teamstruct.json');
        const teamData = await response.json();
        
        // Validate that data structure exists
        if (!teamData || typeof teamData !== 'object') {
            throw new Error('Invalid team data structure');
        }
        
        return teamData;
    } catch (error) {
        console.error('Error loading team data:', error);
        return null;
    }
}

// Check if an image exists for a team member
function imageExists(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() { resolve(true); };
        img.onerror = function() { resolve(false); };
        img.src = imagePath;
    });
}

// Build HTML for a team member with bio/profile
function buildTeamMemberBio(member) {
    const imagePath = `img/profilepic/${member.name.replace(/\s+/g, '')}.jpg`;
    
    return `
        <div class="team-member-container">
            <img src="${imagePath}" class="team-img-fixed" alt="${member.name}" style="width: 200px; height: 200px; object-fit: cover;">
            <div class="right-about-text">
                <h4>${member.name}</h4>
                <p>${member.role}</p>
            </div>
        </div>
    `;
}

// Build HTML for a list of team members (without bios) in 3-column grid
function buildTeamMemberGrid(members) {
    if (members.length === 0) return '';
    
    const memberCards = members.map(member => 
        `<div class="team-member-card">
            <h5>${member.name}</h5>
            <p>${member.role}</p>
        </div>`
    ).join('');
    
    return `
        <div class="team-members-grid">
            ${memberCards}
        </div>
    `;
}

// Generate team page HTML (expensive operation)
async function generateTeamPageHTML() {
    const teamData = await loadTeamData();
    if (!teamData) return null;
    
    let html = '<div class="team-profiles">';
    
    // Category names in order
    const categoryOrder = ['leadership', 'business', 'software', 'mech', 'elec', 'integration'];
    const categoryDisplayNames = {
        leadership: 'Leadership',
        business: 'Business & Marketing',
        software: 'Software Team',
        mech: 'Mechanical Engineering',
        elec: 'Electrical Engineering',
        integration: 'Systems Integration'
    };
    
    // Process each category in order
    for (const category of categoryOrder) {
        if (!teamData[category] || teamData[category].length === 0) continue;
        
        const members = teamData[category];
        const membersWithImages = [];
        const membersWithoutImages = [];
        
        // Check each member for an image
        for (const member of members) {
            const imagePath = `img/profilepic/${member.name.replace(/\s+/g, '')}.jpg`;
            if (await imageExists(imagePath)) {
                membersWithImages.push(member);
            } else {
                membersWithoutImages.push(member);
            }
        }
        
        // Add category section heading
        html += `<div class="team-category-section">`;
        html += `<h3 class="team-category-heading">${categoryDisplayNames[category]}</h3>`;
        
        // Add member bios/profiles to this category
        membersWithImages.forEach(member => {
            html += buildTeamMemberBio(member);
        });
        
        // Add members without images to this category grid
        if (membersWithoutImages.length > 0) {
            html += buildTeamMemberGrid(membersWithoutImages);
        }
        
        html += `</div>`;
    }
    
    html += '</div>';
    
    return html;
}

// Main function to render team page
// Note: JSON caching is handled by Service Worker (24-hour cache with auto-refresh detection)
async function renderTeamPage() {
    const container = document.getElementById('team-content');
    if (!container) return;
    
    try {
        const teamData = await loadTeamData();
        if (!teamData) {
            container.innerHTML = '<p>Error loading team data.</p>';
            return;
        }
        
        const html = await generateTeamPageHTML();
        if (html) {
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p>Error generating team profiles.</p>';
        }
    } catch (error) {
        console.error('Error in renderTeamPage:', error);
        container.innerHTML = '<p>Error loading team data.</p>';
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', renderTeamPage);
