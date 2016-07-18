var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
};
var resizeImage = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('300', '300').stream().pipe(writeStream);
};
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images",{beforeWrite:resizeImage,transformWrite:createThumb})]
});


Attachments = new FS.Collection("attachments", {
  stores: [new FS.Store.FileSystem("attachments")]
});

