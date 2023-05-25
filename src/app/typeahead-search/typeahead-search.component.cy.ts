import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AppDropdown } from '../components/dropdown/dropdown.component'
import { TypeaheadSearch } from './typeahead-search.component'

describe('TypeaheadSearch', () => {
    it('should create the component', () => {
        cy.mount(TypeaheadSearch, {
            imports: [HttpClientTestingModule],
            declarations: [AppDropdown]
        })
        cy.contains('Loading').rightclick()
    })
})