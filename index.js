

// get all html in first id selector page-content

const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require('node-fetch');
const TurndownService = require('turndown');

const turndownService = new TurndownService()

const levelObj = {
    'Level 1': [],
    'Level 2': [],
    'Level 3': [],
    'Level 4': [],
    'Level 5': []
}


const level1Spells = ['Bless',
    'Command',
    'Compelled-Duel',
    'Cure-Wounds',
    'Detect-Evil-and-Good',
    'Detect-Magic',
    'Detect-Poison-and-Disease',
    'Divine-Favor',
    'Heroism',
    'Protection-from-Evil-and-Good',
    'Purify-Food-and-Drink',
    'Searing-Smite',
    'Shield-of-Faith',
    'Silent-Image',
    'Thunderous-Smite',
    'Wrathful-Smite'];


const level2Spells = [
    'Aid',
    'Branding-Smite',
    'Find-Steed',
    'Lesser-Restoration',
    'Locate-Object',
    'Magic-Weapon',
    'Protection-from-Poison',
    'Zone-of-Truth'];


const level3Spells = [
    'Aura-of-Vitality',
    'Blinding-Smite',
    'Create-Food-and-Water',
    'Crusaders-Mantle',
    'Daylight',
    'Dispel-Magic',
    'Elemental-Weapon',
    'Magic-Circle',
    'Remove-Curse',
    'Revivify',
    'Spirit-Shroud',]

const level4Spells = [
    'Aura-of-Life',
    'Aura-of-Purity',
    'Banishment',
    'Death-Ward',
    'Locate-Creature',
    'Staggering-Smite',]

const level5Spells = [
    'Banishing-Smite',
    'Circle-of-Power',
    'Destructive-Wave',
    'Dispel-Evil-and-Good',
    'Geas',
    'Raise-Dead',
    'Summon-Celestial-Spirit']


const baseUrl = 'http://dnd5e.wikidot.com/spell:';


const ofDeath = async (level, spellArr) => {

    let textString = "## " + level;
    textString += "\n";
    textString += "***";
    textString += "\n";

    for (let i = 0; i < spellArr.length; i++) {
        const spellTxt = "";
        const spell = spellArr[i];

        textString += "## " + spell;
        textString += "\n";

        console.log(`fetching ${spell}, ${i + 1} of ${spellArr.length}`);

        const res = await fetch(baseUrl + spell);
        const html = await res.text();
        const $ = cheerio.load(html);
        const bodyTag = $('#page-content').first().html();
        const markdown = turndownService.turndown(bodyTag);

        textString += markdown;
        textString += "\n";
    }

    console.log(level + " done");
    return textString;
}

const omegaDerp = async () => {
    let str = "# Paladin Spells";
    str += "\n";

    const [level1SpellsHtml, level2SpellsHtml, level3SpellsHtml, level4SpellsHtml, level5SpellsHtml] = await Promise.all([ofDeath('Level 1', level1Spells), ofDeath('Level 2', level2Spells), ofDeath('Level 3', level3Spells), ofDeath('Level 4', level4Spells), await ofDeath('Level 5', level5Spells)]);

    str += level1SpellsHtml;
    str += "***";
    str += "\n";

    str += level2SpellsHtml;

    str += "***";
    str += "\n";

    str += level3SpellsHtml;

    str += "***";
    str += "\n";

    str += level4SpellsHtml;

    str += "***";
    str += "\n";

    str += level5SpellsHtml;

    fs.writeFile('PaladinSpellCompendium.md', str, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}



omegaDerp();