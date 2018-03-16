var roleRepaier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing  = false;
            creep.say('Hungry');
        }

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('Fixing');
        }

        if(creep.memory.repairing) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.reverse(({ hits: h1, hitsMax: hMax1 }, { hits: h2, hitsMax: hMax2 }) => (hMax1 / h1) - (hMax2 / h2));
            // targets.sort(({ hits: h1, hitsMax: hMax1 }, { hits: h2, hitsMax: hMax2 }) => (hMax1 / h1) - (hMax2 / h2));

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.say('Repairing');
                }
            }
        }
        else {    
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('Eating');
            }
        }
	}
};

module.exports = roleRepaier;