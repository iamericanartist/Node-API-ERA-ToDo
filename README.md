# Node-API-ERA-ToDo
Node API ERA / MEAN Stack / ToDo App

## MEAN ~Recommendations~ Rules
### Based on http://jsonapi.org
#### Divert at your own peril

1.  Only `res.send` or `res.json`
    - No `res.render`
    - No `res.redirect`
1.  A JSON object MUST be at the root of every JSON API request and response
    containing data. This object defines a document's "top level".
    - No `Array`s: `res.send[{content: 'abc'}, {content: 'def'}]`
    - No `String`s: `res.send('abc')`
    - No `Number`s: `res.send(123)`
    - No `Boolean`s: `res.send(true)`
    - No nils: `res.send(null)` or `res.send(undefined)`
1.  A document MUST contain at least one of the following top-level members:
    - `data`: the document's "primary data": `res.json({ data: [] })`
    - `errors`: an array of error objects: `res.json({ errors: [] })`
1.  `data` and `errors` MUST NOT coexist in the same document.
1.  Primary data MUST be either:
    - a single resource object, a single resource identifier object, or
        `null` for requests that target single resources
    - an array of resource objects, an array of resource identifier objects,
        or an empty array ([]), for requests that target resource collections
1.  Always use appropriate Status Codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes recommendations
1.  POST, PUT, and PATCH should respond with the updated resource(s) as if a `GET` request was made to the request URL
    - GET /messages: `res.status(200).json({ data: [...] })`
    - POST /messages: `res.status(201).json({ data: {...} })`
    - PUT or PATCH /messages/1: `res.status(200).json({ data: {...})`
    - DELETE /messages/1: `res.status(204)`
1.  Handle errors with status codes and object arrays
    - `res.status(404).json({ errors: [{ code: 404, status: 'Not Found'}] })
    - `res.status(500).json({ errors: [{ code: 500, status: 'Internal Server Error', detail: err.stack }]})
    - `res.status(400).json({ errors: [{ code: 404, status: 'Bad Request', title: 'Email', detail: 'Not a valid email address'}] })
    - `res.status(401).json({ errors: [{ title: ''}]}])
1.  
