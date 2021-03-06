
var funcPickupEnergy = {
    run: function(creep) {
        // var energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        //     filter: (resourceType) => { return (RESOURCE_ENERGY)}
        // });
        var energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: (resourceType) => { return (RESOURCE_ENERGY)}
        });
        // console.log(energy);
        if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energy, {visualizePathStyle: {stroke: '#008888'}});
            creep.say('ð');
        }
    }
};

module.exports = funcPickupEnergy;