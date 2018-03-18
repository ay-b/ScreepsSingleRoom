var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMidas = require('role.midas');
var roleMidas1 = require('role.midas1');
var funcHarvest = require('func.harvest');
var funcPickupEnergy = require('func.pickup.energy');

var UpgradersNames = ['Aegir', 'Aesir', 'Angrboda', 'Askr', 'Audhumla', 'Austri', 'Austri', 'Balder', 'Bragi', 'Byggvir', 'Beyla', 'Disir', 'Dwarves', 'Earth', 'Easter', 'Edda', 'Eir', 'Elves', 'Embla', 'Etins', 'Fenrir', 'Forseti', 'Frey', 'Freya', 'Frigga', 'Gefjon', 'Gungnir', 'Harrow', 'Heimdall', 'Hel', 'Hod', 'Hoenir', 'Hof', 'Holda', 'Idunna', 'Ing', 'Irminsul', 'Jormungandr', 'Kvasir', 'Land-wights', 'Lif', 'Lodurr', 'Lofn', 'Loki', 'Midgard Serpent', 'Mimir', 'Mjollnir', 'Moon', 'Muspilli', 'Nanna', 'Nerthus', 'Nine Worlds', 'Njord', 'Norns', 'Odin', 'Odr', 'Odroerir', 'PoeticEdda', 'ProseEdda', 'Ragnarok', 'Ratatosk', 'Runes', 'Saga', 'SÃÂÃÂÃÂÃÂ¡ga', 'Saxnot', 'Sif', 'Sigyn', 'Sjofn', 'Skadi', 'Skirnir', 'Sleipnir', 'Snotra', 'Sunna', 'Surt', 'Syn', 'Thor', 'Thjalfi', 'Thrud', 'Thurse', 'Troll', 'Tyr', 'Ull', 'Utgard', 'Vali', 'Valkyries', 'Vanir', 'Var', 'Ve', 'Vidar', 'Vili', 'Vingolf', 'Vor', 'Walpurga', 'WartAlfs', 'Wayland', 'Wild Hunt', 'Yggdrasill'];
var BuildersNames = ['Ardhanarishvara', 'Muneeswarar', 'Muthappan', 'Bhairava', 'Nataraja', 'Pashupati', 'Harihara', 'Rudra', 'Lingam', 'Dakshinamurthy', 'Ravananugraha', 'Vaidheeswara', 'Lingodbhava', 'Somaskanda', 'Bhikshatana', 'SriManjunatha', 'Narayana', 'Thirumal', 'Perumal', 'Jagannath', 'Hayagriva', 'Venkateshwara', 'Vaikuntha', 'Chaturmurti', 'Vaikuntha', 'Kamalaja', 'Mohini', 'Lakshmi', 'Narayan', 'Vishvarupa', 'Ranganatha', 'Dasavatara', 'Padmanabha', 'AnantaShayana'];

module.exports.loop = function () {

    var tower = Game.getObjectById('de96680151dd19908ae559fb');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var midas = _.filter(Game.creeps, (creep) => creep.memory.role == 'midas');
    var midas1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'midas1');
    
    // Getting stats
    var timer = Game.time % 30;
    if (timer == 0) {
        console.log(' _____________________');
        console.log(' | Energy in store: ' +Game.spawns.Spawn1.room.energyAvailable + '|');
        console.log(' =====================');
        console.log(' |Hrv|Bld|Upg|Rep|Mid|')
        console.log(' | ' + harvesters.length + ' | ' + builders.length + ' | ' + upgraders.length + ' | ' + repairers.length + ' | ' + midas.length + ' | ');
        console.log(' `````````````````````');
    };

    if (Game.spawns.Spawn1.room.energyAvailable > 600){
        if (midas.length < 2) {
            if (Memory.pot == 1) {
                Memory.pot = 0;
            }
            else {
                Memory.pot = 1
            }
            var newName = 'Midas' + Game.time;
            console.log('Spawning new midas: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                { memory: { role: 'midas', source: Memory.pot }});
            }
        else {
            if(harvesters.length < 4) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'harvester'}});        
            }
            
            else {
                if(builders.length < 1) {
                    // var newName = 'Builder' + Game.time;
                    var newName = BuildersNames[Math.floor(Math.random() * UpgradersNames.length)];
                    console.log('Spawning new builder: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'builder'}});        
                }
                
                if(upgraders.length < 5) {
                    // var newName = 'Upgrader' + Game.time;
                    var newName = UpgradersNames[Math.floor(Math.random() * UpgradersNames.length)];
                    console.log('Spawning new upgrader: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'upgrader'}});        
                }
                // Temporary off. Harvesters will replace repairers upon absence of work                
                //
                // if(repairers.length < 0) {
                //     var newName = 'R' + Game.time;
                //     console.log('Spawning new repairer: ' + newName);
                //     Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, 
                //         {memory: {role: 'repairer'}});        
                // }

                if(Game.spawns['Spawn1'].spawning) {
                    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
                    Game.spawns['Spawn1'].room.visual.text(
                        'Spwn: ' + spawningCreep.memory.role,
                        Game.spawns['Spawn1'].pos.x + 1, 
                        Game.spawns['Spawn1'].pos.y, 
                        {align: 'left', opacity: 0.8});
                }
            }
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'midas') {
            roleMidas.run(creep);
        }
    }

    // Tower logic
    var tower = Game.getObjectById('5aa8f433b89ac10d99f94621');
    if(tower) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {return (creep.owner != 'Denter')}
        });
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

}

