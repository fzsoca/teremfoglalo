'use strict';

module.exports = function(Room) {
  Room.avaliability = function(roomId, cb) {
    var currDate = Date.now();

    Room.findById(roomId, {
      include: { relation: 'events'}
      }, function (err, instance) {


        var asd = instance.toJSON();
        var avaliable = "AVALIABLE";
        asd.events.forEach(function (e) {
          if(e.start_date < currDate && e.end_date > currDate){
            avaliable = "UNAVALIABLE";
          }
        });


      cb(null, avaliable);
    });
  };
  Room.remoteMethod (
    'avaliability',
    {
      http: {path: '/avaliability', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
      returns: {arg: 'avaliable', type: 'string'}
    }
  );
};
