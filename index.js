class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key); //meep: 4, elf: 5
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);
        console.log('index', index)
        if (!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index]
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure has is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}


function main() {
    const lor = new HashMap()
    lor.MAX_LOAD_RATIO = .5
    lor.SIZE_RATIO - 3

    lor.set("Hobbit", "Bilbo")
    lor.set("Hobbit", "Frodo")
    lor.set("Wizard", "Galdalf")
    lor.set("Maiar", "The Necromancer")
    lor.set("Maiar", "Sauron")
    lor.set("RingBearer", "Gollum")
    lor.set("LadyOfLight", "Galadriel")
    lor.set("HalfElven", "Arwen")
    lor.set("Ent", "Treebeard")

    console.log(lor)
    console.log(lor.get("Hobbit"))
    console.log(lor.get("Maiar"))
}

//yes all items were hashed, but some got overidden by the same key
//Sauran & Frodo
//discprepancy beacuse the second value for the same key of hobbit and maiar replaced the inital value
//capacity: 8. it never got resized since only 7 of the slots are taken

// main()


//console logs 20 and 10

const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1, 10);
    map1.set(str2, 20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20);
    map2.set(str4, 10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}
WhatDoesThisDo()









//10 % 11 = 10
//22 % 11 = 0
//31 % 11 = 9
//4 % 11 = 4
//15 % 11 = 4
//28 % 11 = 6
//17 % 11 = 6
//88 % 11 = 0
//59 % 11 = 4
//3. 
// 1. {22*, 88*, 2, 3, 4*, 15*, 28*, 17*, 59*, 31*, 10*}

// 2. 

//5 % 9 = 5
//28 % 9 = 1
//19 % 9 = 1
//15 % 9 = 6
//20 % 9 = 2
//33 % 9 = 5
//12 % 9 = 3
//17 % 9 = 8
//10 % 9 = 1

// {0, 28* -> 19* -> 10*, 20*, 12*, 4, 5* -> 33*, 15*, 7, 17*}
