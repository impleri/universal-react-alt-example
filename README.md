
Universal Example with React and Alt
====================================

This is currently a work in progress.

## Preface

This is an example showcasing how to build a universal (isomorphic for those still living in 2015) react application with [`Alt`](https://github.com/goatslacker/alt) which utilizes the same codebase on both server and browser and able to correctly handle multiple requests at one time.

## Legacy

While Redux is great, I still prefer Alt. Thankfully, Jeremy Lu had developed an [earlier version](https://github.com/coodoo/react-alt-isomorphic-example) of this example (with Alt and all!) before deprecating it for [Redux](https://github.com/coodoo/react-redux-isomorphic-example). I have taken the earlier Alt example, pulled some updates from the Redux example, and worked a few new things.

## How to run the sample

```
$ npm install
$ npm start
```

## 5000ft overview

Here's a 5000ft view of how a web application works on the server.

When a read request hits the server, we figure out what data it needs, fetch those, feed them to react app, let the app populates all stores and renders the views, when it's all done we invoke `React.renderToString` to get a html string which can be returned to the client request.

Write requests, on the other hand, are server-side only.

One key goal here is we want to use the same codebase on both server and browser, without any modification.

The only instance in which this does not happen is in the Alt Source(s) used by the Actions. The browser functionality of a Source is to make AJAX request to the server. In the context of server rendering, that doesn't work; so the server-side Sources access the server data directly.
