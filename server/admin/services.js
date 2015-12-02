Meteor.methods({
  addService(service) {
    check(service, {
      name: String,
      icon: String
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    Services.insert({
      name: service.name,
      icon: service.icon,
      createdAt: new Date()
    });
  },
  removeService(serviceId) {
    check(serviceId, String);
    Services.remove(serviceId);
  }
});
