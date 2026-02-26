// Team member loader - fetches JSON and populates team page
async function loadTeamData() {
    try {
        const response = await fetch('./json/teamstruct.json');
        const teamData = response.json();
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

// Main function to render team page
async function renderTeamPage() {
    const teamData = await loadTeamData();
    if (!teamData) return;
    
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
    
    // Insert into the DOM
    const container = document.getElementById('team-content');
    if (container) {
        container.innerHTML = html;
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', renderTeamPage);
