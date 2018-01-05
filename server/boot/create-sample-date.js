module.exports = function(app) {
  var postgresDs = app.dataSources.postgresDs;
  postgresDs.automigrate('participation');
  postgresDs.automigrate('registrationToken');
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var CustomUser = app.models.customUser;
  CustomUser.settings.acls = [
    { principalType: 'ROLE',
      principalId: '$everyone',
      permission: 'ALLOW' }
];
  postgresDs.automigrate('customUser', function(err) {
    if (err) return;
    app.models.customUser.create({
      name: 'Asd',
      email: 'asd@asd.com',
      password: 'asd',
    }).then(function (user) {
      Role.create({
        name: 'admin'
      }, function(err, role) {
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id
        }, function(err, principal) {

        });
      });
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
        {
          name: 'IL400',
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
        end_date: Date.now() + 100000000,
        description: 'Interesting stuff',
        roomId: rooms[0].id,
      },{
        name: 'stuff',
        start_date: Date.now() - 100000,
        end_date: Date.now() - 1000,
        description: 'more stuff',
        roomId: rooms[0].id,
      }
      ], function(err, events) {
        if (err) throw err;

        console.log('Models created: \n', events);
      });
    });
  }
};
