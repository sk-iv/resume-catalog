const path = require("path");

const rootDir = path.resolve(__dirname, "..", "..");
const testDir = path.join(rootDir, "test");
const srcDir = path.join(rootDir, "src");
const debug = console.debug;


module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
  testPath
  .replace(/.test.([tj]sx?)/, '.test' + snapshotExtension)
  .replace(/src([/\\]js)/, 'test/__snapshots__'),

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
  snapshotFilePath.replace(snapshotExtension, '.js').replace('test/__snapshots__', 'src/js'),

  testPathForConsistencyCheck: 'src/js/some.test.js',
};
