Meteor.methods({
  updateAbout(about) {
    check(about, {
      about: String
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    var page = Pages.findOne({});

    if (page) {
      return Pages.update({_id: page._id}, {
        $set: {
          "about": about.about
        }
      });
    } else {
      return Pages.insert(about);
    }
  },
  updateProcess(process) {
    check(process, {
      process: String
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    var page = Pages.findOne({});

    if (page) {
      return Pages.update({_id: page._id}, {
        $set: {
          "process": process.process
        }
      });
    } else {
      return Pages.insert(process);
    }
  },
  addHeaderImage(header) {
    check(header, {
      headerImage: String
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    var page = Pages.findOne({});

    if (page) {
      return Pages.update({_id: page._id}, {
        $set: {
          "headerImage": header.headerImage
        }
      });
    } else {
      return Pages.insert(header);
    }
  },
});
