// ===== UTILITY FUNCTIONS =====

function escHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function copyText(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 1500);
    });
}

// ===== MODAL MANAGEMENT =====

function openTool(toolId) {
    const tool = TOOLS[toolId];
    if (!tool) return;

    const modal = document.getElementById('toolModal');
    document.getElementById('modalTitle').textContent = tool.title;
    document.getElementById('modalBody').innerHTML = tool.render();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Initialize tool interactivity
    if (tool.init) tool.init();
}

function closeModal() {
    document.getElementById('toolModal').style.display = 'none';
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.getElementById('toolModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('toolModal')) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== SEARCH FUNCTIONALITY =====

document.getElementById('toolSearch').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        const keywords = (card.dataset.keywords || '').toLowerCase();
        const match = !query || name.includes(query) || desc.includes(query) || keywords.includes(query);
        card.classList.toggle('hidden', !match);
    });

    // Hide empty sections
    document.querySelectorAll('.tools-container section').forEach(section => {
        const visibleCards = section.querySelectorAll('.tool-card:not(.hidden)');
        section.style.display = visibleCards.length === 0 ? 'none' : '';
    });
});

// ===== OPEN TOOL FROM URL HASH =====
if (window.location.hash) {
    const toolId = window.location.hash.slice(1);
    if (TOOLS[toolId]) openTool(toolId);
}
