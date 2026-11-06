// ==========================================
// GALAH PANJANG DIGITAL
// Fail: script.js
// Versi: Penuh & Lengkap
// ==========================================

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

// ==========================================
// TUKAR SKRIN
// ==========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    gameState.screen = screenId;
}

// ==========================================
// PILIHAN MOD & PADANG
// ==========================================
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

// ==========================================
// SUSUNAN PADANG
// ==========================================
function getFieldLayout(size) {
    const layouts = {
        4: [[1, 2], [3, 4]],
        6: [[1, 2], [3, 4], [5, 6]],
        8: [[1, 2], [3, 4], [5, 6], [7, 8]]
    };
    return layouts[size];
}

// ==========================================
// MULA PERMAINAN
// ==========================================
function initGame() {
    gameState.guardChoice = null;
    gameState.runnerChoice = null;
    gameState.phase = 'guard-select';
    
    const level = levels[gameState.currentLevel - 1];
    document.getElementById('level-name').textContent = `Level ${gameState.currentLevel}: ${level.name}`;
    document.getElementById('rank-display').textContent = `Pangkat: ${level.rank}`;
    
    const layout = getFieldLayout(gameState.fieldSize);
    
    // Bina Peta Kecil
    const miniMap = document.getElementById('mini-map-grid');
    miniMap.innerHTML = '';
    miniMap.style.gridTemplateColumns = 'repeat(2, 1fr)';
    layout.forEach(row => {
        row.forEach(cell => {
            const cellEl = document.createElement('div');
            cellEl.className = 'mini-cell';
            cellEl.textContent = cell;
            miniMap.appendChild(cellEl);
        });
    });

    // Bina Padang Utama
    const field = document.getElementById('field-container');
    field.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'field-grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    
    layout.forEach(row => {
        row.forEach(cell => {
            const cellEl = document.createElement('div');
            cellEl.className = 'game-cell';
            cellEl.id = `cell-${cell}`;
            cellEl.textContent = cell;
            grid.appendChild(cellEl);
        });
    });
    field.appendChild(grid);
    field.style.background = levels[gameState.currentLevel - 1].bg + '33';

    // Reset butang & teks
    updateChoices();
    document.getElementById('result-text').textContent = '';
    document.getElementById('result-text').className = 'result-text';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('guard-choices').style.display = 'block';
    document.getElementById('runner-choices').style.display = 'none';
    document.getElementById('turn-indicator').textContent = '🛡️ PENJAGA: Pilih kotak untuk jaga';
}

// ==========================================
// KEMASKINI PILIHAN KOTAK
// ==========================================
function updateChoices() {
    const guardBtns = document.getElementById('guard-buttons');
    const runnerBtns = document.getElementById('runner-buttons');
    
    guardBtns.innerHTML = '';
    runnerBtns.innerHTML = '';
    
    for (let i = 1; i <= gameState.fieldSize; i++) {
        // Butang Penjaga
        const gBtn = document.createElement('button');
        gBtn.className = 'choice-btn' + (gameState.guardChoice === i ? ' selected' : '');
        gBtn.textContent = i;
        gBtn.onclick = () => selectGuard(i);
        guardBtns.appendChild(gBtn);
        
        // Butang Pemasuk
        const rBtn = document.createElement('button');
        rBtn.className = 'choice-btn' + (gameState.runnerChoice === i ? ' selected' : '');
        rBtn.textContent = i;
        rBtn.onclick = () => selectRunner(i);
        runnerBtns.appendChild(rBtn);
    }
}

// ==========================================
// PENJAGA PILIH KOTAK
// ==========================================
function selectGuard(num) {
    // Keluarkan tanda lama
    for (let i = 1; i <= gameState.fieldSize; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell) cell.classList.remove('selected-guard');
    }
    
    gameState.guardChoice = num;
    updateChoices();
    document.getElementById(`cell-${num}`).classList.add('selected-guard');
    
    // Tukar ke Pemasuk
    setTimeout(() => {
        document.getElementById('guard-choices').style.display = 'none';
        document.getElementById('runner-choices').style.display = 'block';
        document.getElementById('turn-indicator').textContent = '🏃 PEMASUK: Pilih kotak untuk lalu';
    }, 300);
}

// ==========================================
// PEMASUK PILIH KOTAK
// ==========================================
function selectRunner(num) {
    // Keluarkan tanda lama
    for (let i = 1; i <= gameState.fieldSize; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell) cell.classList.remove('selected-runner', 'highlight');
    }
    
    gameState.runnerChoice = num;
    updateChoices();
    document.getElementById(`cell-${num}`).classList.add('selected-runner');
    
    // Tunjuk butang Mula
    document.getElementById('runner-choices').style.display = 'none';
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('turn-indicator').textContent = 'Tekan ⚡MULA bila sedia!';
}

// ==========================================
// MULA PUSINGAN
// ==========================================
function startRound() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('turn-indicator').textContent = '⚡ BERLARI...';
    
    setTimeout(() => {
        const resultText = document.getElementById('result-text');
        
        if (gameState.guardChoice === gameState.runnerChoice) {
            // Tertangkap
            resultText.textContent = '❌ TERTANGKAP! Pemasuk keluar pusingan ini.';
            resultText.className = 'result-text fail';
        } else {
            // Berjaya Lepas
            resultText.textContent = '✅ BERJAYA LEPAS! Pergi & balik = VICTORY!';
            resultText.className = 'result-text success';
            gameState.wins++;
            document.getElementById(`cell-${gameState.runnerChoice}`).classList.add('highlight');
            
            // Naik Level setiap 3 kemenangan
            if (gameState.wins % 3 === 0 && gameState.currentLevel < 10) {
                gameState.currentLevel++;
                setTimeout(() => {
                    alert(`🎉 NAIK PANGKAT!\nLevel ${gameState.currentLevel}: ${levels[gameState.currentLevel - 1].name}`);
                    initGame();
                }, 1200);
                return;
            }
        }
        
        // Tanya main lagi
        setTimeout(() => {
            if (confirm('Pusingan tamat. Main satu pusingan lagi?')) {
                initGame();
            } else {
                backToMenu();
            }
        }, 2200);
    }, 1500);
}

// ==========================================
// KEMBALI KE MENU UTAMA
// ==========================================
function backToMenu() {
    gameState.guardChoice = null;
    gameState.runnerChoice = null;
    showScreen('main-menu');
}

// ==========================================
// MULA APLIKASI
// ==========================================
showScreen('main-menu');
