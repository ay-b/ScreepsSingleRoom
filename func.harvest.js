
var funcHarvest = {
    run: function(creep) {
		var sources = creep.pos.findClosestByPath(FIND_SOURCES);
		while (creep.carry.energy < creep.energyCapacity) {
			if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources, { visualizePathStyle: { stroke: '#008888' } });
				creep.say('⚡');
			}			
		}
	}
};

module.exports = funcHarvest;