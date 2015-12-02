Meteor.methods({
  addProcess(process) {
    check(process, {
      title: String,
      snippet: String,
      count: Number
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    Processes.insert({
      title: process.title,
      snippet: process.snippet,
      index: process.count,
      createdAt: new Date()
    });
  },
  removeProcess(processId) {
    check(processId, String);
    Processes.remove(processId);
  },
  updateProcessOrder(processUpdate) {
    check(processUpdate, Object);

    return Processes.update({_id: processUpdate.processId}, {
      $set: {
        "index": processUpdate.index
      }
    });
  }
});
