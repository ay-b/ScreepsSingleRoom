var roleMidas1 = {

     /** @param {Creep} creep **/
    run: function(creep) {
        console.log('Midas1')
        if(creep.carry.energy < 1030) {
            var sources = creep.room.find(FIND_SOURCES);
            console.log(sources);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('pumping');
            }
        }
    }
};

module.exports = roleMidas1;