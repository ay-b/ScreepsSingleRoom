var funcPickupEnergy = require('func.pickup.energy')


var roleRepaier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing  = false;
            creep.say('ð');
        };

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('ð ');
        };

        if(creep.memory.repairing) {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            if (creep.repair(targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffaa00' } });
                creep.say('ð ');
           }
        }
        else {    
            funcPickupEnergy.run(creep);
            // var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            // if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            //     creep.say('Eating');
            }
        }
	};


module.exports = roleRepaier;