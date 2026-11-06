const gameState = {
    screen: 'main-menu',
    mode: null,
    fieldSize: null,
    players: null,
    currentLevel: 1,
    score: 0,
    wins: 0,
    guardChoice: null,
    runnerChoice: null,
    phase: 'guard-select'
};

const levels = [
    { name: 'Kampung Halaman', bg: '#71b55f', rank: 'Pemula' },
    { name: 'Padang Desa', bg: '#90a959', rank: 'Pemain Baru' },
    { name: 'Pekan Kecil', bg: '#d4a574', rank: 'Pemain Aktif' },
    { name: 'Bandaraya', bg: '#829ca8', rank: 'Penyertai' },
    { name: 'Taman Negara', bg: '#2d6a4f', rank: 'Pertengahan' },
    { name: 'Pulau Tropika', bg: '#4ecdc4', rank: 'Mahir' },
    { name: 'Puncak Gunung', bg: '#b8c5d6', rank: 'Berpengalaman' },
    { name: 'Bulan', bg: '#c9c9c9', rank: 'Pakar' },
    { name: 'Planet Merah', bg: '#c14444', rank: 'Juara' },
    { name: 'Stesen Angkasa', bg: '#0f0c29', rank: 'Juara Agung' }
];

const characters = {
    male: ['Zul', 'Rizal', 'Afiq', 'Daus', 'Iman'],
    female: ['Lina', 'Aisha', 'Sofia', 'Maya', 'Zara']
};

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    gameState.screen = screenId;
}

function selectMode(mode) {
    gameState.mode = mode;
    showScreen('select-field');
}

function selectField(size) {
    gameState.fieldSize = size;
    showScreen('select-players');
}

function selectPlayers(count) {
    gameState.players = count;
    initGame();
    showScreen('game-screen');
}

function getFieldLayout(size) {
    const layouts = {
        4: [[1, 2], [3, 4]],
        6: [[1, 2], [3, 4], [5, 6]],
        8: [[1, 2], [3, 4], [5, 6], [7, 8]]
    };
    return layouts[size];
}

function initGame() {
    gameState.guardChoice = null;
    gameState.runnerChoice = null;
    gameState.phase = 'guard-select';
    
    const level = levels[gameState.currentLevel - 1];
    document.getElementById('level-name').textContent = `Level ${gameState.currentLevel}: ${level.name}`;
    document.getElementById('rank-display').textContent = `Pangkat: ${level.rank}`;
    
    const layout = getFieldLayout(gameState.fieldSize);
    
    const miniMap = document.getElementById('mini-map-grid');
    miniMap.innerHTML = '';
