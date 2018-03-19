var roleRepairer = require('role.repairer');
var funcHarvest = require('func.harvest');
var funcPickupEnergy = require('func.pickup.energy');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            funcPickupEnergy.run(creep);
            // funcHarvest.run(creep);
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                                
                                // ||
                                // structure.structureType == STRUCTURE_POWER_BANK ||
                                // structure.structureType == STRUCTURE_CONTAINER) 
                    }
            });
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('⚡');
                }
            if (targets == undefined) {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('ð');
                }
            } 
        }
	}
};

module.exports = roleHarvester;