module.exports = function(app) {
  var postgresDs = app.dataSources.postgresDs;

  postgresDs.automigrate('customUser', function(err) {
    if (err) return;
    app.models.customUser.create({
      name: 'Asd',
      email: 'asd@asd.com',
      password: 'asd',
    });
  });

  postgresDs.automigrate('building', function(err) {
    if (err) return;
    app.models.building.create([{
      name: 'I',
      address: 'Neumann J. utca 23.',
    }, {
      name: 'Q',
      address: 'Neumann J. utca 25.',
    }], function(err, buildings) {
      if (err) throw err;
      createRooms(buildings);
      console.log('Models created: \n', buildings);
    });
  });

  function createRooms(buildings) {
    postgresDs.automigrate('room', function(err) {
      app.models.room.create([{
        name: 'IL205',
        buildingId: buildings[0].id,
      },
      ], function(err, rooms) {
        if (err) throw err;
        createEvents(rooms);
        console.log('Models created: \n', rooms);
      });
    });
  }

  function createEvents(rooms) {
    postgresDs.automigrate('event', function(err) {
      app.models.event.create([{
        name: 'eloadas',
        start_date: Date.now(),
        end_date: Date.now() + 10000,
        description: 'Interesting stuff',
        roomId: rooms[0].id,
      }], function(err, events) {
        if (err) throw err;

        console.log('Models created: \n', events);
      });
    });
  }
};
