// input.js - обработчики событий для HTML

// Импорт из main.js
import { 
    gameState, raceSelection, findEnemyBtn, attackBtn, battleLog, monsterImage,
    Elf, Human, Skyzer, Goblin, Orc, DarkMage 
} from './main.js';

// Функция для добавления записи в лог
export function addToLog(message, className = 'system-log') {
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry', className);
    logEntry.textContent = message;
    battleLog.appendChild(logEntry);
    battleLog.scrollTop = battleLog.scrollHeight;
}

// Функция для обновления статистики персонажа
export function updatePlayerStats() {
    document.getElementById('charLevel').textContent = gameState.player.level;
    document.getElementById('charExp').textContent = gameState.player.exp;
    document.getElementById('charExpNeeded').textContent = gameState.player.expForLevel;
    document.getElementById('charHp').textContent = gameState.player.hp;
    document.getElementById('charMaxHp').textContent = gameState.player.maxHp;
    document.getElementById('charMp').textContent = gameState.player.mp;
    document.getElementById('charMaxMp').textContent = gameState.player.maxMp;
    document.getElementById('charDmg').textContent = gameState.player.dmg;
    document.getElementById('charRace').textContent = gameState.player.race;
    
    // Обновление полос прогресса
    document.getElementById('charHpBar').style.width = `${(gameState.player.hp / gameState.player.maxHp) * 100}%`;
    document.getElementById('charMpBar').style.width = `${(gameState.player.mp / gameState.player.maxMp) * 100}%`;
    document.getElementById('charExpBar').style.width = `${(gameState.player.exp / gameState.player.expForLevel) * 100}%`;
}

// Функция для обновления статистики монстра
export function updateMonsterStats() {
    if (!gameState.currentMonster) return;
    
    document.getElementById('monsterType').textContent = gameState.currentMonster.type;
    document.getElementById('monsterHp').textContent = gameState.currentMonster.hp;
    document.getElementById('monsterMaxHp').textContent = gameState.currentMonster.maxHp;
    document.getElementById('monsterMp').textContent = gameState.currentMonster.mp;
    document.getElementById('monsterMaxMp').textContent = gameState.currentMonster.maxMp;
    document.getElementById('monsterDmg').textContent = gameState.currentMonster.dmg;
    
    // Обновление полос прогресса
    document.getElementById('monsterHpBar').style.width = `${(gameState.currentMonster.hp / gameState.currentMonster.maxHp) * 100}%`;
    document.getElementById('monsterMpBar').style.width = `${(gameState.currentMonster.mp / gameState.currentMonster.maxMp) * 100}%`;
    
    // Обновление изображения монстра
    if (gameState.currentMonster.type === 'Гоблин') {
        monsterImage.textContent = '👺';
    } else if (gameState.currentMonster.type === 'Орк') {
        monsterImage.textContent = '👹';
    } else if (gameState.currentMonster.type === 'Тёмный маг') {
        monsterImage.textContent = '🧙‍♂️';
    }
}

// Функция для поиска врага
export function findEnemy() {
    const monsters = [Goblin, Orc, DarkMage];
    const MonsterClass = monsters[Math.floor(Math.random() * monsters.length)];
    gameState.currentMonster = new MonsterClass();
    
    updateMonsterStats();
    attackBtn.disabled = false;
    
    addToLog(`Вы встретили ${gameState.currentMonster.type}!`, 'system-log');
}

// Функция для атаки
export function attack() {
    if (!gameState.currentMonster) return;
    
    // Атака игрока
    gameState.player.attack(gameState.currentMonster);
    addToLog(`Вы атакуете и наносите ${gameState.player.dmg} урона!`, 'player-log');
    updateMonsterStats();
    
    // Проверка на победу
    if (gameState.currentMonster.hp <= 0) {
        addToLog(`Вы победили ${gameState.currentMonster.type} и получили ${gameState.currentMonster.xpDrop} опыта!`, 'system-log');
        gameState.player.gainExp(gameState.currentMonster.xpDrop);
        updatePlayerStats();
        gameState.currentMonster = null;
        attackBtn.disabled = true;
        return;
    }
    
    // Атака монстра
    setTimeout(() => {
        let attackMessage;
        if (gameState.currentMonster.type === 'Тёмный маг') {
            attackMessage = gameState.currentMonster.attack(gameState.player);
        } else {
            gameState.currentMonster.attack(gameState.player);
            attackMessage = `${gameState.currentMonster.type} атакует и наносит ${gameState.currentMonster.dmg} урона!`;
        }
        
        addToLog(attackMessage, 'enemy-log');
        updatePlayerStats();
        
        // Проверка на поражение
        if (gameState.player.hp <= 0) {
            addToLog('Вы потерпели поражение! Игра окончена.', 'system-log');
            attackBtn.disabled = true;
            findEnemyBtn.disabled = true;
        }
    }, 500);
}

// Инициализация обработчиков событий
export function initEventHandlers() {
    // Обработчики событий для выбора расы
    raceSelection.querySelectorAll('.race-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const race = e.target.dataset.race;
            
            if (race === 'elf') {
                gameState.player = new Elf();
            } else if (race === 'human') {
                gameState.player = new Human();
            } else if (race === 'skyzer') {
                gameState.player = new Skyzer();
            }
            
            updatePlayerStats();
            findEnemyBtn.disabled = false;
            raceSelection.style.display = 'none';
            
            addToLog(`Вы выбрали расу: ${gameState.player.race}! Теперь вы можете найти врага.`, 'system-log');
        });
    });
    
    // Обработчики для кнопок действий
    findEnemyBtn.addEventListener('click', findEnemy);
    attackBtn.addEventListener('click', attack);
}