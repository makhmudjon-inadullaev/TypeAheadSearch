import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { SearchService } from "../services/search.service";

@Component({
    selector: 'app-typeahead-search',
    templateUrl: './typeahead-search.component.html',
})
export class TypeaheadSearch implements OnInit {
    categories: string[] = []
    selectedCategory: string = ''
    categoryLoading = true;
    error: string | null = null;

    searchQuery: string = ''
    searchLoading: boolean = false
    searchOptions: string[] = []
    showSearchOptions = false

    constructor(private categoryService: CategoryService, private searchService: SearchService) {}

    onInputChange() {
        this.showSearchOptions = true
        this.searchService.search.next({
            query: this.searchQuery,
            category: this.selectedCategory,
            status: 'active'
        })
    }

    onCategoryChange(value: string) {
        this.selectedCategory = value
    }

    handleSelect(value: string, input: HTMLInputElement) {
        this.searchQuery = value
        this.showSearchOptions = false
        this.searchService.cacheQuery({
            query: this.searchQuery,
            category: this.selectedCategory
        })
        input.focus()
    }

    handleSearchClick() {
        this.showSearchOptions = true
        this.searchService.search.next({
            query: this.searchQuery,
            category: this.selectedCategory,
            status: 'active'
        })
    }

    ngOnInit(): void {
        this.categoryService.fetchCategories().subscribe(categories => {
            this.categories = categories
            this.selectedCategory = this.searchService.defaults.category || categories[0]
            this.searchQuery = this.searchService.defaults.query
        })
        this.categoryService.loading.subscribe(loading => this.categoryLoading = loading)
        this.categoryService.error.subscribe(error => this.error = error)
        this.searchService.loading.subscribe(loading => this.searchLoading = loading)
        this.searchService.searchError.subscribe(error => {
            this.error = error
        })
        this.searchService.getResults.subscribe(result => {
            this.searchOptions = result
        })
    }
}