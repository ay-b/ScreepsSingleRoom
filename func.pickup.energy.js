
var funcPickupEnergy = {
    run: function(creep) {
		var energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: (resourceType) => {return (energy.resourceType == RESOURCE_ENERGY)}
		});
        if (creep.pickup(energy) == undefined) {
        	creep.say('â ');
        }
        // else (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(energy, {visualizePathStyle: {stroke: '#008888'}});
        //     creep.say('ð©');
        // }
    }
};

module.exports = funcPickupEnergy;