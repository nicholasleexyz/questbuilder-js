class IDGenerator {
    constructor() { this.currentID = 1; }
    generateID() { return this.currentID++; }
}

class Quest {
    constructor(id, questtype, task, reward) {
        this.id = id;
        this.questtype = questtype;
        this.task = task;
        this.reward = reward;
    }
}

class QuestLog {
    constructor(idgenerator) {
        this.idgenerator = idgenerator;
        this.quests = [];
        this.questtext = "";
    }

    generateRandomQuest()//returns a quest
    {
        const id = this.idgenerator.generateID();
        const questtype = getrandomelem(questtypes);
        const reward = `${Math.ceil(Math.random() * 10)} ${getrandomelem(items)}(s);`
        let task = "EMPTY";

        if (questtype == "find") {
            let passiveoritem = Math.round(Math.random()) == 1 ? getrandomelem(passivetypes) : getrandomelem(items);
            task = `Find a missing ${passiveoritem}.`
        }
        else if (questtype == "rescue") {
            let passive = getrandomelem(passivetypes);
            let enemy = getrandomelem(enemytypes);
            task = `Rescue a ${passive} from a ${enemy}!`
        }
        else if (questtype == "defeat") {
            let enemy = getrandomelem(enemytypes);
            task = `Defeat a ${enemy}!`
        }
        else if (questtype == "collect") {
            let num = Math.ceil(Math.random() * 10);
            let item = getrandomelem(items);
            task = `Collect ${num} ${item}(s).`
        }

        return new Quest(id, questtype, task, reward);
    }

    printQuests() {
        let text = ""
        for (let i = 0; i < this.quests.length; i++) {
            const quest = this.quests[i];
            const line = "--------"
            const idtext = `ID: ${quest.id}`;
            const tasktext = `QUEST: ${quest.task}`;
            const rewardtext = `REWARD: ${quest.reward}`;
            text = text + [line, idtext, tasktext, rewardtext].join("\n");
            text = text + "\n";
        }
        this.questtext = text;
    }

    addQuest() {
        this.quests.push(this.generateRandomQuest());
        this.printQuests();
    }

    removeQuestByID(id) {
        let total = []
        for (let i = 0; i < this.quests.length; i++) {
            const quest = this.quests[i];
            if(quest.id != id) 
                total.push(quest);
        }
        this.quests = total;
        this.printQuests();
    }

    viewQuestByID(id) {
        let text = ""
        for (let i = 0; i < this.quests.length; i++) {
            const quest = this.quests[i];
            if(quest.id == id) {
                const line = "*--------*";
                const idtext = `ID: ${quest.id}`;
                const tasktext = `QUEST: ${quest.task}`;
                const rewardtext = `REWARD: ${quest.reward}`;
                text = text + [line, idtext, tasktext, rewardtext, line].join("\n");
                text = text + "\n\n";
            }
        }
        prompt(text + "Very detailed and very cool quest decription goes here.\n(press enter to go back)");
        this.printQuests();
    }
}

function helpText() {
    let line = "--------\n";
    let a = "a or add - add in a new quest.\n";
    let r = "r or remove - remove a quest by id.\n";
    let v = "v or view - view a quest by id.\n";
    let q = "q or quit - exit program.\n";
    let total = [line, a, r, v, q].join("");

    return total
}
let getrandomelem = arr => arr[Math.floor(arr.length * Math.random())]

const questtypes = ["find", "rescue", "defeat", "collect"]
const enemytypes = ["goblin", "troll", "skeleton", "zombie", "ogre", "demon", "dragon", "slime", "golem", "bug", "goat"]
const passivetypes = ["cat", "dog", "frog", "merchant", "noble", "monkey"]
const items = ["gold coin", "apple", "shovel", "sword", "ring", "hat!"]

let idgenerator = new IDGenerator();
let questlog = new QuestLog(idgenerator);
let running = true

while (running) {
    let input = prompt(questlog.questtext + helpText());
    if (input == "q" || input == "quit") {
        running = false;
    }
    else if (input == "a" || input == "add") {
        questlog.addQuest();
    }
    else if (input == "r" || input == "remove") {
        input = prompt(questlog.questtext + "\nWhich one? ID: ");
        questlog.removeQuestByID(input);
    }
    else if (input == "v" || input == "view") {
        input = prompt(questlog.questtext + "\nWhich one? ID: ");
        questlog.viewQuestByID(input);
    }
}