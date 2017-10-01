import { BookteraAngularPage } from './app.po';

describe('booktera-angular App', () => {
  let page: BookteraAngularPage;

  beforeEach(() => {
    page = new BookteraAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
