<div class="c-callout c--important">
 <p>
   <strong>Important:</strong> This article is no longer relevant for projects using Mobify's new scaffold, so if you're using version 1.0.4-alpha.0 or later, go ahead and skip this article. Not sure of your version? Check out our <a href="../mobify-platform-versions/">Mobify Platform Versions</a> guide for help understanding Mobify versions.
 </p>
</div>

The routing system in the Progressive Web SDK is based on version 3 of the
`react-router` package. It wraps and extends that package to provide
additional useful behavior. Several of the components in the
`react-router` package are re-exported by the SDK, so that projects do
not need to depend on `react-router` directly.

## The Router component

A customized React Router component, this component forms the root of all of the routed components. It
should be the second-outermost of the components rendered in the app,
just inside the `react-redux` `<Provider>` component. It wraps the
`Router` component in the `react-router` library, attaching some
useful defaults.

This generally looks like:
```jsx
const Toplevel = ({store}) => (
    <Provider store={store}>
        <Router>
            {/* Insert routes here */}
        </Router>
    </Provider>
)
```

Compared to the base `Router` component it:

- Configures it to use the `browserHistory` history store by default
- Applies the `react-router-scroll` middleware to manage the page scroll position separately for each route
- Sets up the route list for the `isReactRoute` function, allowing links in the app to automatically render as internal or external links depending on whether they point to an existing route.

### Props
The `Router` can be further configured through the `history` prop.

#### history

The `history` prop can be used to override the default history object for the router.

## The Route component

This component is included directly from `react-router`, and is the
backbone of the URL routing in projects. We use some custom props on
this component to communicate with parts of the framework; this
section will describe the standard usage in Progressive Web projects.

Projects have a top-level container component `App` and then container
components for each route/page. Each page route needs additional parameters
beyond just the path and the route component to ensure that the data for the
page is loaded correctly. For example:

```jsx
<Route path="account/signin"
       component={Login}
       routeName="signin"
/>
// or
<Route path="account/register"
       component={Login}
       routeName="register"
/>
```

The `routeName` prop identifies the particular route to the rest of
the application.

It is important to note that the `Route` components in the router are
resolved in the order that they are written. This allows general rules
to be written with specific exceptions, so long as the exceptions are
written above the more general rule.

## The IndexRoute component

Route components can be nested; this serves two purposes. Child routes
have their paths resolved relative to their parents, removing the
need to repeat parts of the path. Additionally, if both parent and
child routes have associated components, the child route component is
rendered as a child of the parent route component.

It is for the second purpose that the `IndexRoute` component is
necessary. It specifies a component and options for visiting the
parent path directly, without any additional elements. We can see this
with an excerpt from the PWA project router:

```jsx
<Route path="/" component={App} onChange={OnChange}>
    <IndexRoute component={Home} routeName="home" />
    <Route component={Cart} path="checkout/cart/" routeName="cart" />
</Route>
```

If we visit the path `/`, the `Home` component is rendered inside the
`App` component, whereas if we visit the path `/checkout/cart/`, the
`Cart` component is rendered inside `App`.

## The QueryRouter and QueryRoute components

The `react-router` system can only route based on the URL
path. Occasionally, we encounter pages with different templates that
differ only by query parameters. As such, we have extended
`react-router` with the `QueryRouter` and `QueryRoute` components.

We use these components (inside the router) like so:

```jsx
<QueryRouter path="details" defaultComponent={ErrorPage} defaultRouteName="error">
    <QueryRoute param="account" component={Account} routeName="account" />
    <QueryRoute param="category" value="contact" component={ContactInfo} routeName="contactInfo" />
    <QueryRoute param="category" value="purchases" component={PurchaseDetails} routeName="purchaseDetails" />
</QueryRouter>
```

If this is inside the root path of this router, this sets up the
following routes:

- `/details?account` to the `Account` component
- `/details?category=contact` to the `ContactInfo` component
- `/details?category=purchases` to the `PurchaseDetails` component
- `/details` or `/details?<anything else>` to the `ErrorPage`
  component

## The SelectorRouter and SelectorRoute components

It can be difficult to determine the contents of a page from the URL alone. Occasionally, to be sure which page we should render for a given URL, we need to examine the contents of that page on desktop. The `SelectorRouter` allows us to do just that.

A `SelectorRouter` contains a list of `SelectorRoute`s. Each `SelectorRoute` must have a `selector` and `component` prop. This `selector` prop should be a CSS selector that can be used to determine the page type. When the user navigates to a new page, `SelectorRouter` sends a request to the new URL. It checks if the response contains a selector defined on one of its `SelectorRoute`s. If it does, then that `SelectorRoute`'s component is the one that is mounted.

We use these components (inside the router) like so:

```jsx
<SelectorRouter path="potions*" defaultComponent={PLP} defaultRouteName="productListPage">
    <SelectorRoute selector=".category-view" component={CategoryView} routeName="category" />
    <SelectorRoute selector="#pdp-content" component={ProductDetails} routeName="productDetailsPage" />
</SelectorRouter>
```

If this is inside the root path of this router, this sets up the
following routes:

- A page with a url that contains `/potions` and a DOM element with the class `category-view2` will mount the CategoryView component
- A page with a url that contains `/potions` and a DOM element with the id `pdp-content` will mount the ProductDetails component

### Props
The `SelectorRouter` can be further configured through these additional props.

#### path

The `path` prop determines the scope of the `SelectorRouter`. The `SelectorRouter` will only run against URLs that match its path.

If you want to have the SelectorRouter run on all paths, you can set the `path` to `*`. If you do this, you will need to update a setting in your `package.json` to allow the PWA to control all paths.

```js
// ...
"config": {
    // ...
    "controlsAllPaths": true
}
```

#### defaultComponent
This component will be rendered if no matching component is found.

#### defaultRouteName
This route name will be used if no matching component is found.

#### makeRequest
This function is called to send the request for the desktop page. This function will be passed the `url` to request, and should return a `Response` object. By default, the SDK's `makeRequest` utility is used.

#### handleFetchError
This function is called if the request for the desktop page has failed. This can occur if the user has gone offline, or if the request cannot be completed for some reason.

## An Example Router

```jsx
<Router>
    <Route path="/" component={App}>
        <IndexRoute component={Home} routeName="home" />
        <Route path="categories/*/" component={ProductList} routeName="productList" />

        /*
            The QueryRouter can appear anywhere within the routes list
        */
        <QueryRouter path="details" defaultComponent={ErrorPage} defaultRouteName="error">
            <QueryRoute param="account" component={Account} routeName="account" />
            <QueryRoute param="category" value="contact" component={ContactInfo} routeName="contactInfo" />
            <QueryRoute param="category" value="purchases" component={PurchaseDetails} routeName="purchaseDetails" />
        </QueryRouter>

        <Route path="products/*/" component={ProductDetails} routeName="productDetails" />

        /*
            The SelectorRouter will almost always be at the bottom of the routes list.
            It should only be used if you can't match the route with any other method.
        */
        <SelectorRouter path="*" defaultComponent={NotFound} defaultRouteName="notFound" >
            <SelectorRoute selector=".category-view" component={CategoryView} routeName="categoryView" />
            <SelectorRoute selector="#store-finder" component={StoreFinder} routeName="storeFinder" />
        </SelectorRouter>
    </Route>
</Router>
```

## PWA vs non-PWA routes

Every URL on a site using a Progressive Web App is either a **PWA route** or a **non-PWA route**.

If a URL is a PWA route, when the user navigates to that URL the PWA will be loaded. Within the PWA, links to PWA routes navigate to the new URL without refreshing the page. This is called a soft navigation.

If a URL is a non-PWA route, when the user navigates to that URL the PWA will not be loaded. Instead, the site will be loaded in non-PWA mode. This mode typically loads the original or desktop site, although it may also add new features like push messaging. Within the PWA, clicking on a link to a non-PWA route does refresh the page. This is called a hard navigation.

We determine if a given page is a PWA or non-PWA route using the generated `loader-routes.js` file. 

### The generated loader-routes.js file

This file contains an array of regexes. If a given URL matches any of these regexes, that URL is considered a PWA route.

This file is generated based off of `router.jsx`. It is generated whenever you start the development server with `npm start`. It can also be generated manually by using the command `npm run update-loader-routes`. This file is **not** automatically regenerated whenever changes are made to `router.jsx`.

Do not modify this file directly. If you wish to disable a specific route, see [Disabling routes](#disabling-routes).

### Disabling routes

In order to disable specific routes for the PWA, create a blacklist. We recommend storing this blacklist in a config file.

```js
// in config/route-blacklist.js
const blacklist = [
    // These must be regexes, not string literals
    /content/,
    /legal\/terms/
]

export blacklist
```

In `loader.js`, call the `setBlacklist` function from the Progressive Web SDK. This will prevent this route from rendering the PWA.

```js
// in loader.js
import {isReactRoute, setRouteList, setBlacklist} from 'progressive-web-sdk/dist/routing/is-react-route'
import ReactRegexes from './loader-routes'
import blacklist from './config/route-blacklist'

// Set up the routes here so that the isReactRoute function can be used
setRouteList(ReactRegexes)

// Set up the blacklist
setBlacklist(blacklist)

// isReactRoute will take both the route list and blacklist into account
const isPWARoute = () => isReactRoute(window.location.pathname)
```

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS ARTICLE:</b></p></div>