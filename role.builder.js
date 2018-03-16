var roleRepairer = require('role.repairer');
var funcHarvest = require('func.harvest');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Hungry');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        var sources = creep.pos.findClosestByPath(FIND_SOURCES)
	        creep.moveTo(sources) == ERR_NOT_IN_RANGE;
	        creep.say('Building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	    else {
            funcHarvest.run(creep);
	    }
        if (targets == undefined) {
	        creep.say('Repairing');
	        roleRepairer.run(creep);
		}
	}
};

module.exports = roleBuilder;