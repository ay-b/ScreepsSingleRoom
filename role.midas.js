var roleMidas = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < 1030) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('â¨' + creep.memory.source);
            }
        }
    }
};

module.exports = roleMidas;