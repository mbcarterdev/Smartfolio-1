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

// describe('Check if user can access shared files', function() {
//   beforeEach(function() {
//     browser.get('http://localhost:8000');
//   });
//
//   it('should have a title that matches "Smartfolio"', function() {
//     expect(browser.getTitle()).toEqual('Smartfolio');
//   });
//
//   it('should login with Rishi\'s credentials', function() {
//     element(by.model('user.username')).sendKeys('rishi@rishi.com');
//     element(by.model('user.password')).sendKeys('rishi');
//
//     element(by.id('login')).click();
//   });
//
//   it('should allow user to successfully signup and redirect to home page', function() {
//     element(by.id('search-side-btn')).click();
//
//     expect(browser.)
//
//     element(by.id('input_3')).sendKeys('magical@magical.com');
//     element(by.id('input_4')).sendKeys('magical');
//
// });

//
//   describe('angularjs homepage todo list', function() {
//   it('should add a todo', function() {
//     browser.get('https://angularjs.org');
//
//     element(by.model('todoList.todoText')).sendKeys('write first protractor test');
//     element(by.css('[value="add"]')).click();
//
//     var todoList = element.all(by.repeater('todo in todoList.todos'));
//     expect(todoList.count()).toEqual(3);
//     expect(todoList.get(2).getText()).toEqual('write first protractor test');
//
//     // You wrote your first test, cross it off the list
//     todoList.get(2).element(by.css('input')).click();
//     var completedAmount = element.all(by.css('.done-true'));
//     expect(completedAmount.count()).toEqual(2);
//   });
// });
