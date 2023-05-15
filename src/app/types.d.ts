type FetchCategoriesResponse = {
    trivia_categories: {
        id: number
        name: string
    }[]
}

type FetchSearchResponse = {
    pages: {
        id: number
        key: string
        title: string
        excerpt: string
        matched_title: string | null
        description: string
        thumbnail: null | {
            mimetype: string
            size: null | number
            width: null | number,
            height: null | number,
            duration: null | number,
            url: string
        }
    }[]
}

type LastResultCache = {
    query: string
    category: string
    status: 'active' | 'inactive'
}