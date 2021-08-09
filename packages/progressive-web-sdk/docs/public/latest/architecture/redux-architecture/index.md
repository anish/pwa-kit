<div class="c-callout c--important">
  <p>
    <strong>Important:</strong> We've removed this article from the site navigation because the Redux store structure it describes is out of date, but we've left it here in case you still need to refer to it.
  </p>
</div>

The Redux store contains virtually all of the data that represents the state of your Progressive Web App. This state data is contained in a plain JavaScript object managed by Redux's [combineReducers](https://redux.js.org/docs/api/combineReducers.html) function. All of the branches in the state tree (with the exception of the [form](#form) and [ui](#ui) branches) are [Immutable.js](../immutablejs/) objects. 

This document describes the kind of data stored in each branch of the state tree and what that data is used for.

## app <a name="app" href="#app">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains global app state, such as the current URL. It corresponds to the `App` component, which is the top-level React component for your Progressive Web App.

## categories <a name="categories" href="#categories">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains information on product categories. It should not contain any individual product data. That data should be stored in the `products` branch.

## cart <a name="cart" href="#cart">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains information about the contents of the shopping cart, such as product names, quantities, and prices. Currently, product information is duplicated between here and the `products` branch.

## ui <a name="ui" href="#ui">#</a>

**Data type**: [plain JavaScript object](https://developer.mozilla.org/bm/docs/Web/JavaScript/Guide/Working_with_Objects)

Contains data that is relevant to the operation of the UI, but is not derived from data received from outside the app. For example, it includes flags for pieces of the UI, such as the header bar being expanded or contracted. For legacy reasons, some data from the backend is stored in this branch.

## user <a name="user" href="#user">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains data about the user, such as login status and user profile information displayed on the My Account page.

## modals <a name="modals" href="#modals">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains flags to determine whether a modal is open or closed. It does not contain any content that is displayed inside a modal. This branch also contains data to support persistence and pre-rendering of modals.

## notifications <a name="notifications" href="#notifications">#</a>

**Data type**: [Immutable.js list](https://facebook.github.io/immutable-js/docs/#/List)

Contains notifications presented by the app itself on the client (as opposed to notifications presented by a push message).

## products <a name="products" href="#products">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains information on individual products, such as names, prices, and descriptions. Each product is keyed on a string that includes the path to the product details page and the query string for the product. This allows product listing pages to store and access product information and allows product information to be reused on other pages.

## checkout <a name="checkout" href="#checkout">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains information that is relevant during the checkout process, such as billing and shipping information. It will contain a mix of server-sourced and user-entered data.

## offline <a name="offline" href="#offline">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains the `fetchError` string that is set when the user is offline and a record of the pages the have been viewed while offline. Also allows records how long the user has been offline.

## integrationManager <a name="integration-manager" href="#integration-manager">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains data that is relevant to the active Integration Manager connector. This may include hidden form field keys that are necessary for communicating with the backend but irrelevant to the UI.

## form <a name="form" href="#form">#</a>

**Data type**: [plain JavaScript object](https://developer.mozilla.org/bm/docs/Web/JavaScript/Guide/Working_with_Objects)

Contains form data. It is automatically populated by [Redux Form](https://redux-form.com) as the user interacts with a form.

## pushMessaging <a name="push-messaging" href="#push-messaging">#</a>

**Data type**: [Immutable.js map](https://facebook.github.io/immutable-js/docs/#/Map)

Contains information to support the rendering of [Push messaging](../../push-messaging/overview/) components.