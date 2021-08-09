<div class="c-callout c--important">
  <p>
    <strong>Important:</strong> Projects generated <em>after</em> 2019 do not use the Integration Manager because it has been replaced with our <a href="../../integrations/commerce-integrations/">Commerce Integrations</a> technology.
  </p>

  <p>
     For anyone working on projects that were generated <em>before</em> 2019, we've left the Integration Manager documentation here in case you still need to refer to it.
  </p>
</div>

During the course of a build, you may find that the Integration Manager (IM)
doesn't provide all of the functionality required by your Progressive Web App
(PWA). For those cases we've designed methods for extending the IM and the
connector you're using. There are three areas that have been designed for
extensibility, [implementing new features using new commands](#section-new-commands),
[replacing existing commands](#section-overriding-commands) and
[adding data to the Redux state](#section-add-data).

## Prerequisites

This guide assumes that you're already familiar with the terminology related to
the IM and how to use it. If you haven't already, read through the
[Overview](../ecommerce-overview) and [Usage Guide](../usage/) and look through your
project folder structure to get an understanding of how your app will use the
Integration Manager.


## The Connector Extension

To extend a connecter you will need to create a connector extension. The
connector extension will live in your project folder and will be used to
help you create new commands for a connector (custom commands), and replace
existing ones (command overrides).

Overall the structure of the connector-extension folder is up to you, but there
are a few requirements. The first is an index.js file. This file should export an
object containing your custom commands, and your command overrides.

```js
//connector-extension/index.js
const addToCart = () => (dispatch) => {
    // custom implementation
}

const customCommand = () => (dispatch) => {
    // custom implementation
}

// The key is to export an object with keys being the command branch name
// Under the keys, individual commands are attached to the proper command branches
export {cart: {addToCart}, custom: {customCommand}}
```

Previously connector extensions were registered by calling `registerConnectorExtension`
and passing in your extension object. The `registerConnectorExtension` function has been
deprecated in favour of the above approach.

## Adding New Commands

New commands can be added in your project's [connector extension](#section-connector-extension)
folder. The commands should be Redux thunk actions and should
use results actions defined in the SDK to update the Redux Store. If your new command requires
storing additional data, read the section on [adding data to the Redux Store](#section-add-data).

Once you've created the command you will need to import it into either a React container,
or one of your template action files. Custom commands should be imported through the IM.
This will allow us to perform monitoring tasks for all IM commands (including custom ones).

Here is an example of how to register custom commands for SFCC connector, same method applies to all connectors:
```js
// /custom-commands.js
export customCommand = () => (dispatch) => {
    // your custom command
}

export default {customCommand}
```
```js
// /connector-extension/index.js
import * as custom from './custom-commands'

export default {custom}
```
```js
// /actions.js
import IntegrationManager from 'mobify-integration-manager/dist/'
const action = () => (dispatch) => {
    dispatch(IntegrationManager.custom.customCommand())
}
```

In this example, we've created `custom-commands.js` and that export the custom command object.
Additional folders or files may be added to help you keep the extension organized,
as long as `connector-extension/index.js` exports an object containing the
 custom command object.


## Overriding Existing Commands

Similar to new commands, command overrides should go in your project's
[connector extension](#section-connector-extension) folder. They will need to be
Redux thunk actions and should use results actions defined
in the SDK to update the Redux Store.

As noted in the [connector extension](#section-connector-extension) section, Overriding an existing connector
command requires matching the structure of Integration Manager commands as part of an extension For example,
if you wanted to override the `addToCart` command, which is found under `cart` in the Integration Manager,
then your extension object that is exported by `connector-extension/index.js` must include the `cart` key
with the `addToCart` command nested under it.

Once you've defined a command override, it can be imported into your template action or
container file the same as you would if it wasn't being overriden. The IM will know about
the override and provide the correct command to your project.

An example of this is as folows:

```js
// /cart/index.js
export addToCart = () => (dispatch) => {
    // your addToCart implementation
}

export default {addToCart}
```
 ```js
// /connector-extension/index.js
import * as cart from './cart' // the addToCart command is overriden here

export {cart}
```

In the above example the object that is imported into `connector-extension/index.js` looks like this:
 ```js
{
    cart: {
        addToCart
    }
}
```
The pseudo code to use the overriden `addToCart`:
```js
// /containers/cart/actions.js
...
import IntegrationManager from 'mobify-integration-manager/dist/'
...

export const onClick = (items) => (dispatch) => {
    return dispatch(IntegrationManager.cart.addToCart(items))
}

```
## Registering the Connector Extension

Once you've created your connector extension you can import the extension object
(found at /connector-extension/index.js) into the project's main.jsx file. To do this,
add the extension object as a second parameter to your `initialize` call.

```js
import {Connector} from 'mobify-integration-manager/dist/connectors/sfcc'
import IntegrationManager from 'mobify-integration-manager/dist/'
import connectorExtension from './connector-extension'

IntegrationManager.initialize(Connector({
    siteID: 'my-test-site',
    clientID: '1234'
}), connectorExtension)
```

## Adding Data to the Redux Store

Our SDK manages most of the data in the Redux Store, it uses an ecommerce schema that we've
designed. However you may find while working on your app that you need to add data to the app
state to support new functionality required by your app. To do this you will need to put
any of that additional data under a key named `custom`. Data can be added at any point in the store,
but it must be nested under this `custom` key in order to prevent SDK updates from overriding your
changes. If content is added to the state outside of these `custom` keys it's possible that you won't
be able to upgrade the SDK for your build.

We have added a number of results and reducers to the SDK that can be used by actions
and commands to add custom content. We have also added selectors for all of the possible
locations of custom content so that once the data has been added to the store you can
easily access it within a connected component or within your Redux thunk actions.

In the example below you'll see how you could use a custom branch to add pick up
locations to the checkout section of the Redux store.

```js
// /connector-extension/checkout/commands.js
import {buildApiUrl} from '../utils'

export const fetchStorePickupLocations = (itemID) => (dispatch) => {
    return makeRequest(buildApiUrl('/pickup/stores'), {method: 'GET', body: `{itemID: ${itemID}}`})
        .then((response) => response.json())
        .then(({availableLocations}) => {
            if (availableLocations) {
                return dispatch(receiveCheckoutCustomContent({
                    storePickupLocations: availableLocations
                }))
            }
        })
}
```
In the above example we've created a [custom command](#section-new-commands) `fetchStorePickupLocations` that
dispatches a result to add custom content to the checkout branch of the app store.

```js
// /containers/checkout-shipping/selectors.js

import {getCheckoutCustomContent} from 'progressive-web-sdk/dist/store/checkout/selectors'
import {createGetSelector} from 'reselect-immutable-helpers'

export const getPickupStores = createGetSelector(getCheckoutCustomContent, 'storePickupLocations')
```
Once the data has been added to the store, we can import the selector that gets the custom branch
of the checkout store and create a new selector to get our `storePickupLocations`.

```js
// /containers/checkout-shipping/partials/store-pickup.js
import {getPickupStores} from '../selectors'

const StorePickup = ({storePickupLocations}) => {
    return (
        <div>
            {storePickupLocations.map(({name}) => <h3 key={name}>{name}</h3>)}
        </div>
    )
}

mapStateToProps = createStructuredSelector({
    storePickupLocations: getPickupStores
})

export default connect(mapStateToProps)(StorePickup)
```

Finally, we can import the selector we've made into this connected `StorePickup`
container to render out the store data received in the custom command.

## URL Mapper

URLs for both desktop and mobile experiences must be exactly the same for optimal user experience and SEO
performance. Imagine a desktop user tries to access a specific page on mobile, they will be frustrated to
see 404 pages. To make the URLs consistent between desktop and mobile site, we provide a utility called
URL mapper that maps the url between your desktop site and the PWA. Your project starts with
standard Salesforce and SAP Hybris storefront URL mappers, but it's likely your desktop site has customized
URLs. To customize the URL mappers, we need to look at `/app/config/sfcc/url.js` or `/app/config/hybris/url.js`
(it depends on which ecommerce connector are using in your project, if your project implements a custom connector,
the following instruction also applies).

In this file, there are two functions that help us to convert the URL: `getSearchUrl` and `parseSearchUrl`.

### `getSearchUrl(searchParameters) => URL` 
This function builds desktop site URL from  a single parameter `searchParameters` that has the following schema:

```js
{
  count,  // int
  sort,   // array
  start,  // int
  total,  // int
  query,  // array
  filters // object
}
```

### `parseSearchUrl(URL) => searchParameters` 
This function is the inverse of `getSearchUrl`, it converts a desktop URL into `searchParameters`.
The `product-list` container will use this to interpret the search parameters found in the desktop URL,
and take care of the rendering of PLP (Product Listing Page).

### Registering URL Mapper
To register your URL Mapper, for example with the SFCC connector, in `init-sfcc-connector.js`:
```js
import IntegrationManager from 'mobify-integration-manager/dist/'
import * as sfccMappers from './config/sfcc/url.js'
import urlMapper from './config/url-mapper'

const initConnector = () => {
    // Register the SFCC URL mapper
    urlMapper.initialize(sfccMappers)

    IntegrationManager.initialize(Connector({
        features: {
            jqueryResponse
        }
    }))
}
```

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS ARTICLE:</b></p></div>