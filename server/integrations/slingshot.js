Slingshot.createDirective("fileUpload", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.amazon.AWSAccessKeyId,
  AWSSecretAccessKey: Meteor.settings.amazon.AWSSecretAccessKey,
  bucket: Meteor.settings.amazon.bucket,
  region: 'us-west-2',
  acl: "public-read",

  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024, // 10 MB (use null for unlimited).

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    var user = Meteor.users.findOne(this.userId);
    return user.username + "/" + file.name;
  }
});
