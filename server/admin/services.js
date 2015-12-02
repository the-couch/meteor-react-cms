Meteor.methods({
  addService(service) {
    check(service, {
      name: String,
      icon: String,
      count: Number
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    Services.insert({
      name: service.name,
      icon: service.icon,
      index: service.count,
      createdAt: new Date()
    });
  },
  removeService(serviceId) {
    check(serviceId, String);
    Services.remove(serviceId);
  },
  updateServicesOrder(serviceUpdate) {
    check(serviceUpdate, Object);

    return Services.update({_id: serviceUpdate.serviceId}, {
      $set: {
        "index": serviceUpdate.index
      }
    });
  }
});
