# React MyBooks Project - Udacity FEND

A React app to manage books you're reading.  

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Features

- Keep track of books you're: A. reading, B. want to or C. have read (shelves)
- Move books from shelf to shelf
- Search for books and put them in a shelf
- Click on a book to see all the book details available


## Dev Features
- Centralized app state with Freactal
- Routing with React Router v4
- Fast mobile clicks with react-fastclick
- Custom back button: last page or home page
- Loading animation for instant feedback
- Collapsible shelves


## API Book Interface
´´´
book: {
    id: string:book-alphanum-id
    title: string
    authors: [string, string, ...]
    shelf: string:shelf-key
    imageLinks: {smallThumbnail: string:url, thumbnail: string:url}

    averageRating: float
    canonicalVolumeLink: string:url-to-google-books
    categories: [string, string, ...]
    contentVersion: string
    description: string
    industryIdentifiers: [{type: string, identifier: string}, ...]
    infoLink: string:url-to-google-books
    language: string:language-lowercase-2char-code
    maturityRating: string:maturity-key
    pageCount: int
    panelizationSummary: {containsEpubBubbles: bool, containsImageBubbles: bool}
    previewLink: string:url-to-google-books-preview (doest-seem-to-work)
    printType: string
    publishedDate: string:book-date (format unreliable)
    publisher: string:publisher-name
    ratingsCount: int
    readingModes: {text: bool, image: bool}
    subtitle: string (not-always-available)
}
´´´



## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

