'use strict';

module.exports = function(Event) {
Event.observe('before delete', function (ctx, next) {

  console.log(ctx.where);
  Event.findById(ctx.where.id ).then(function (event) {
    console.log(event);
    if (ctx.options.accessToken.userId !== event.ownerId )  {
      var errreply = new Error();
      errreply.statusCode = 401;
      next(errreply);
    }
    else {
      next();
    }
  });


});

  Event.observe('before save', function (ctx, next) {


      if(ctx.instance.start_date > ctx.instance.end_date){
        var errreply = new Error();
        errreply.statusCode = 401;
        next(errreply);
      }else{
        next();
      }


  });

};
