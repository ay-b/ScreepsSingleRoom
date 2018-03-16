
var funcPickupEnergy = {
    run: function(creep) {
		var energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
			filter: (resourceType) => {return (energy.resourceType == RESOURCE_ENERGY)}
		});
        if (creep.pickup(energy) == undefined) {
        	creep.say('pickup');
        }
        else if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energy, {visualizePathStyle: {stroke: '#008888'}});
            creep.say('gotopickup');
        }
    }
};

module.exports = funcPickupEnergy;