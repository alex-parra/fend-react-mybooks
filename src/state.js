import * as API from './BooksAPI'
import { provideState, mergeIntoState } from "freactal";
// See: https://github.com/FormidableLabs/freactal


export const wrapComponentWithState = provideState({
  initialState: () => ({
    loading: false,
    shelves: [
      {key: 'currentlyReading', lbl: 'Currently Reading'},
      {key: 'wantToRead', lbl: 'Want to Read'},
      {key: 'read', lbl: 'Read'},
      {key: 'none', lbl: 'None'},
    ],
    books: [],
    searchQuery: '',
    searchResults: []
  }),

  computed: {},

  effects: {
    // invoked when container is mounted in DOM
    initialize: function(effects) {
      return effects.loadBooks().then(() => mergeIntoState({}))
    },
    isLoading: function(effects, status) {
      return mergeIntoState({loading: status})
    },
    loadBooks: function(effects) {
      return effects.isLoading(true).then(() => {
        return API.getAll().then(books => { effects.isLoading(false); return books}).then(books => mergeIntoState({books}))
      })
    },
    setSearch: function(effects, search) {
      return mergeIntoState({searchQuery: search})
    },
    searchBooks: function(effects, search) {
      return effects.setSearch(search).then(() => {
        const p = search ? API.search(search) : Promise.resolve([])
        return p.then(results => mergeIntoState({searchResults: results.error ? [] : results}))
      })
    },
    setBookShelf: function(effects, book, shelf) {
      return effects.isLoading(true).then(() => {
        return API.update(book, shelf).then(() => effects.loadBooks()).then(() => mergeIntoState({}))
      })
    }
  },

}); // provideState
