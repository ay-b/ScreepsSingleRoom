var roleUpgrader = require('role.builder');
var funcHarvest = require('func.harvest');
var funcPickupEnergy = require('func.pickup.energy');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            funcHarvest.run(creep);
            // funcPickupEnergy.run(creep);
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
                    creep.say('Ã¢ÂÂ¡');
                }
        }
        if (targets == undefined) {
            roleUpgrader.run(creep);
        } 
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {return (creep.owner != 'Denter')}
        });
            if(closestHostile) {
                var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}});
                creep.moveTo(tower);
            }

	}
};

module.exports = roleHarvester;