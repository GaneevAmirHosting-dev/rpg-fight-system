export class Monster {
    constructor(hp, mp, dmg) {
        this.maxHp = hp;
        this.hp = hp;
        this.maxMp = mp;
        this.mp = mp;
        this.dmg = dmg;
        this.xpDrop = 0;
        this.type = 'Монстр';
    }

    attack(target) {
        target.hp -= this.dmg;
    }
}