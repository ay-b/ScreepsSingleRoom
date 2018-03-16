var roleRepairer = require('role.repairer');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('ð');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        var sources = creep.pos.findClosestByPath(FIND_SOURCES)
	        creep.moveTo(sources) == ERR_NOT_IN_RANGE;
	        creep.say('ð§');
	    }

	    if(creep.memory.building) {
	        var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	    else {
	        // var sources = creep.room.find(FIND_SOURCES);
            var sources = creep.pos.findClosestByPath(FIND_SOURCES)
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
        if (targets == undefined) {
	        creep.say('ð');
	        // console.log(creep.name + ': nothing to build, repairing.');
	        roleRepairer.run(creep);
		}
	}
};

module.exports = roleBuilder;