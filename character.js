export class Character {
    constructor(hp, mp, dmg) {
        this.maxHp = hp;
        this.hp = hp;
        this.maxMp = mp;
        this.mp = mp;
        this.dmg = dmg;
        this.exp = 0;
        this.level = 1;
        this.expForLevel = 20;
        this.multiplier = 1.2;
    }
    
    attack(target) {
        target.hp -= this.dmg;
    }
    
    gainExp(amount) {
        this.exp += amount;
        if (this.exp >= this.expForLevel) {
            this.levelUp();
        }
    }
    
    levelUp() {
        this.level++;
        this.exp -= this.expForLevel;
        this.expForLevel = Math.floor(this.expForLevel * this.multiplier);
        
        // Увеличиваем характеристики
        this.maxHp = Math.floor(this.maxHp * 1.1);
        this.maxMp = Math.floor(this.maxMp * 1.1);
        this.dmg = Math.floor(this.dmg * 1.1);
        
        // Восстанавливаем здоровье и ману
        this.hp = this.maxHp;
        this.mp = this.maxMp;
        
        // Рекурсивно проверяем, не нужно ли еще повышение уровня
        if (this.exp >= this.expForLevel) {
            this.levelUp();
        }
    }
}