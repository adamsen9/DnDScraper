const source = require('./Bard_and_sorcerer_spells.json');
const fs = require('fs');

let str = "# MutliClassMarco";
str += "\n";

for (const spellLevel in source) {
    str += "# " + spellLevel;
    str += "\n";

    for (const spellName in source[spellLevel]) {
        const spell = source[spellLevel][spellName];
        str += "## " + spellName;
        str += "\n";
        str += spell.markdown;
        str += "\n";
    }

}


fs.writeFile('MutliClassMarco.md', str, function (err) {
    if (err) throw err;
    console.log('Done!');
});
