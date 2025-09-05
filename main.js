// main.js - основной файл игры

// Импорт классов
import { Character } from './character.js';
import { Monster } from './monster.js';

// Объект состояния игры
export const gameState = {
    player: null,
    currentMonster: null
};

// Элементы DOM
export const raceSelection = document.getElementById('raceSelection');
export const findEnemyBtn = document.getElementById('findEnemyBtn');
export const attackBtn = document.getElementById('attackBtn');
export const battleLog = document.getElementById('battleLog');
export const monsterImage = document.getElementById('monsterImage');

// Определение классов рас
export class Elf extends Character {
    constructor() {
        super(90, 70, 12);
        this.race = 'Эльф';
    }
}

export class Human extends Character {
    constructor() {
        super(110, 40, 15);
        this.race = 'Человек';
    }
}

export class Skyzer extends Character {
    constructor() {
        super(100, 170, 17);
        this.race = 'Скайзерновец';
    }
}

// Наследование для монстров
export class Goblin extends Monster {
    constructor() {
        super(40, 10, 8);
        this.type = 'Гоблин';
        this.xpDrop = 15;
    }
}

export class Orc extends Monster {
    constructor() {
        super(60, 20, 12);
        this.type = 'Орк';
        this.xpDrop = 25;
    }
}

export class DarkMage extends Monster {
    constructor() {
        super(50, 50, 5);
        this.type = 'Тёмный маг';
        this.xpDrop = 35;
    }
    
    attack(target) {
        if (this.mp >= 10) {
            this.mp -= 10;
            const damage = this.dmg + 10;
            target.hp -= damage;
            return `Тёмный маг использует магическую атаку и наносит ${damage} урона!`;
        } else {
            super.attack(target);
            return `Тёмный маг атакует и наносит ${this.dmg} урона!`;
        }
    }
}