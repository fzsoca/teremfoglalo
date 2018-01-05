'use strict';



module.exports = function(Room) {

  Room.avaliability = function(buildingId, cb) {

    var currDate = new Date();

    Room.find( {
      where: {buildingId: buildingId},
      include: { relation: 'events'}
      }, function (err, instance) {

        var avaliable = true;
        var results = [];

        instance.forEach(function (room) {
          avaliable = true;
          var roomjson = room.toJSON();
          roomjson.events.forEach(function (e) {

            if((e.start_date.getTime() < currDate.getTime() && e.end_date.getTime() > currDate.getTime())){
              avaliable = false;
            }
          });

          if(avaliable){
            results.push({id: room.id, name: room.name, buildingId: room.buildingId});
          }
        });


      cb(null, results);
    });
  };
  Room.remoteMethod (
    'avaliability',
    {
      http: {path: '/avaliability', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
      returns: { arg: 'data' ,type: ['room'], root: true}
    }
  );
};
