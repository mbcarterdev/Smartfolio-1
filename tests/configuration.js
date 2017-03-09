// configuration file for running integration tests.

exports.config = {
  // make sure to be running webdriver selenium server before running the tests.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['integrationTest-spec.js']
};
