Package.describe({
  name: "hocnv:publish-counts",
  summary: "Publish the count of a cursor, in real time",
  version: "0.7.3",
  git: ""
});

Package.on_use(function (api, where) {
  api.versionsFrom("METEOR@0.9.2");
  api.use(['blaze', 'templating'], 'client', { weak: true });
  api.use('mongo', 'client');
  api.add_files('client/publish-counts.js', 'client');
  api.add_files('server/publish-counts.js', 'server');
  api.export('Counts');
  api.export('publishCount', 'server');
});

Package.on_test(function (api) {
  api.use([
    'tmeasday:publish-counts',
    'tinytest',
    'mongo',
    'facts']);

  api.add_files([
    'tests/helper.js',
    'tests/has_count_test.js',
    'tests/count_test.js',
    'tests/count_local_collection_test.js',
    'tests/count_non_reactive_test.js',
    'tests/count_from_field_shallow_test.js',
    'tests/count_from_field_fn_shallow_test.js',
    'tests/count_from_field_fn_deep_test.js',
    'tests/count_from_field_length_shallow_test.js',
    'tests/count_from_field_length_fn_shallow_test.js',
    'tests/count_from_field_length_fn_deep_test.js',
    'tests/field_limit_count_test.js',
    'tests/field_limit_count_from_field_test.js',
    'tests/field_limit_count_from_field_fn_test.js',
    'tests/field_limit_count_from_field_length_test.js',
    'tests/field_limit_count_from_field_length_fn_test.js',
    'tests/no_ready_test.js',
    'tests/no_warn_test.js',
    'tests/observe_handles_test.js',
  ]);
});
