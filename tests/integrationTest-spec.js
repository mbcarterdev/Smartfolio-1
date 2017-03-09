// initial tests for the smartfolio app.

describe('Smartfolio app', function() {
  // if app is not deployed, make sure to run the app on localhost first
  beforeEach(function() {
    browser.get('http://localhost:8000');
  });

  it('should have a title that matches "Smartfolio"', function() {
    expect(browser.getTitle()).toEqual('Smartfolio');
  });

  it('should login with Rishi\'s credentials', function() {
    element(by.model('user.username')).sendKeys('rishi@rishi.com');
    element(by.model('user.password')).sendKeys('rishi');

    element(by.id('login')).click();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/home');
  });

  it('should allow user to successfully signup and redirect to home page', function() {
    element(by.id('signup')).click();

    element(by.id('signupUSN')).sendKeys('beans@beans.com');
    element(by.id('signupPW')).sendKeys('beans');

    element(by.id('signupBTN')).click();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/home');
    done();
  });
});
