var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMidas = require('role.midas');
var funcHarvest = require('func.harvest')
var funcPickupEnergy = require('func.pickup.energy')

var UpgradersNames = ['Aegir', 'Aesir', 'Angrboda', 'Askr', 'Audhumla', 'Austri', 'Austri', 'Balder', 'Bragi', 'Byggvir', 'Beyla', 'Disir', 'Dwarves', 'Earth', 'Easter', 'Edda', 'Eir', 'Elves', 'Embla', 'Etins', 'Fenrir', 'Forseti', 'Frey', 'Freya', 'Frigga', 'Gefjon', 'Gungnir', 'Harrow', 'Heimdall', 'Hel', 'Hod', 'Hoenir', 'Hof', 'Holda', 'Idunna', 'Ing', 'Irminsul', 'Jormungandr', 'Kvasir', 'Land-wights', 'Lif', 'Lodurr', 'Lofn', 'Loki', 'Midgard Serpent', 'Mimir', 'Mjollnir', 'Moon', 'Muspilli', 'Nanna', 'Nerthus', 'Nine Worlds', 'Njord', 'Norns', 'Odin', 'Odr', 'Odroerir', 'PoeticEdda', 'ProseEdda', 'Ragnarok', 'Ratatosk', 'Runes', 'Saga', 'Sága', 'Saxnot', 'Sif', 'Sigyn', 'Sjofn', 'Skadi', 'Skirnir', 'Sleipnir', 'Snotra', 'Sunna', 'Surt', 'Syn', 'Thor', 'Thjalfi', 'Thrud', 'Thurse', 'Troll', 'Tyr', 'Ull', 'Utgard', 'Vali', 'Valkyries', 'Vanir', 'Var', 'Ve', 'Vidar', 'Vili', 'Vingolf', 'Vor', 'Walpurga', 'WartAlfs', 'Wayland', 'Wild Hunt', 'Yggdrasill'];
var BuildersNames = ['Ardhanarishvara', 'Muneeswarar', 'Muthappan', 'Bhairava', 'Nataraja', 'Pashupati', 'Harihara', 'Rudra', 'Lingam', 'Dakshinamurthy', 'Ravananugraha', 'Vaidheeswara', 'Lingodbhava', 'Somaskanda', 'Bhikshatana', 'SriManjunatha', 'Narayana', 'Thirumal', 'Perumal', 'Jagannath', 'Hayagriva', 'Venkateshwara', 'VaikunthaChaturmurti', 'VaikunthaKamalaja', 'Mohini', 'LakshmiNarayan', 'Vishvarupa', 'Ranganatha', 'Dasavatara', 'Padmanabha', 'AnantaShayana'];

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
    // console.log('Harvesters: ' + harvesters.length);
    // console.log('Builders: ' + builders.length);
    // console.log('Upgraders: ' + upgraders.length);
    // console.log('Repairers: ' + repairers.length);
    // console.log('Midas: ' + midas.length);

    if(builders.length < 2) {
        // var newName = 'Builder' + Game.time;
        var newName = BuildersNames[Math.floor(Math.random() * UpgradersNames.length)];
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
    
    if(upgraders.length < 6) {
        // var newName = 'Upgrader' + Game.time;
        var newName = UpgradersNames[Math.floor(Math.random() * UpgradersNames.length)];
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    
    if(repairers.length < 3) {
        var newName = 'R' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'repairer'}});        
    }
    if(midas.length < 0) {
        var newName = 'M' + Game.time;
        console.log('Spawning new midas: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'midas'}});        
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
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

