describe('Typeahead search', function() {
  let data: {
    'background-image': string
    'task-link': string
    'repository': string
  }

  beforeEach(() => {
    cy.fixture('typeahead-search').then((fixtureData) => {
      data = fixtureData;
    })

    cy.intercept(
      {
        method: 'GET',
        url: 'https://opentdb.com/api_category.php',
      },
      { fixture: 'categories-response' }
    ).as('categories')

    cy.intercept(
      {
        method: 'GET',
        url: 'https://en.wikipedia.org/w/rest.php/v1/search/page*',
      },
      { fixture: 'search-response' }
    ).as('categories')

    cy.visit('/')
  })
    
    it('Have mandatory background image', () => {
      cy.get('body>app-root>app-typeahead-search>div>div.bg-image').should('have.css', 'background-image', `url("${data['background-image']}")`)
    })
    it('Have "notion" task reference button', () => {
      cy.get('body>app-root>app-typeahead-search>div>div.absolute.top-2.left-2.z-50.gap-4.flex>a:nth-child(1)').should('have.attr', 'href', data['task-link'])
    })
    it('Have "github" repository reference button', () => {
      cy.get('body>app-root>app-typeahead-search>div>div.absolute.top-2.left-2.z-50.gap-4.flex>a:nth-child(2)').should('have.attr', 'href', data['repository'])
    })
    it('When Search input is clicked or focused, background image gets darker', () => {
      cy.get('body>app-root>app-typeahead-search>div>div.fixed.inset-0.z-10.overflow-y-auto.p-4>div>div>div>input').click()
      cy.get('body>app-root>app-typeahead-search>div>div.bg-image').should('have.class', 'opacity-50')
    })
    it('When dropdown is opened, we should show list items', () => {
      cy.get('button:not(:disabled)[aria-haspopup="listbox"]').click()
      cy.get('ul[role="listbox"]').should('exist')
    })
    it('When one of any category selected from categories dropdown, we collapse', () => {
      cy.get('button:not(:disabled)[aria-haspopup="listbox"]').click()
      cy.get('ul[role="listbox"]').should('exist')
      cy.get('li#listbox-option-1').click()
      cy.get('ul[role="listbox"]').should('not.exist')
    })
    it('When dropdown is opened, background image gets darker', () => {
      cy.get('body>app-root>app-typeahead-search>div>div.fixed.inset-0.z-10.overflow-y-auto.p-4>div>app-dropdown>div>button>span.block.truncate').click()
      cy.get('body>app-root>app-typeahead-search>div>div.bg-image').should('have.class', 'opacity-50')
    })
    it('When dropdown is closed, background image shines', () => {
      cy.get('button:not(:disabled)[aria-haspopup="listbox"]').click()
      cy.get('li#listbox-option-1').click()
      cy.get('body>app-root>app-typeahead-search>div>div.bg-image').should('not.have.class', 'opacity-50')
    })
    it('When we type a search, we should have dropdown suggestions', () => {
      cy.get('body>app-root>app-typeahead-search>div>div.fixed.inset-0.z-10.overflow-y-auto.p-4>div>div>div>input').type('Test search text')
      cy.get('ul#options[role="listbox"]').should('exist')
    })
    it('When we click one of any search results, search input should have text replaced', () => {
      cy.get('body>app-root>app-typeahead-search>div>div.fixed.inset-0.z-10.overflow-y-auto.p-4>div>div>div>input').type('Test search text')
      cy.get('ul#options[role="listbox"]>li:nth-child(2)').click()
      cy.get('body>app-root>app-typeahead-search>div>div.fixed.inset-0.z-10.overflow-y-auto.p-4>div>div>div>input').should('have.value', 'title 2')
    })
})