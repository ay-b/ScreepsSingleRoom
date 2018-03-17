
var funcPickupEnergy = {
    run: function(creep) {
		var energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: (resourceType) => { return (RESOURCE_ENERGY)}
        });
        // console.log(energy);
        if (creep.pickup(energy) == undefined) {
        	creep.say('blya');
        }
        else if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energy, {visualizePathStyle: {stroke: '#008888'}});
            creep.say('gotopickup');
        }
    }
};

module.exports = funcPickupEnergy;