Progressive Web Apps (PWAs) enter Offline Mode when the viewing device is not connected to the internet, or on low-quality networks. This feature improves the user experience when internet is limited: instead of seeing a disruptive 404 error page, users can continue to browse previously-visited pages.

## Core features

The core features of Offline Mode include:

-   Notification upon going offline
-   Previous content remains visible when offline
-   New content is replaced with offline-specific content when offline

These features are enabled by default in the project starting point. There is an additional core feature that is **not enabled** in the project starting point by default:

-   Loading while offline

For the best possible PWA experience, all of these features should be used and customized to suit your brand.

### Notification upon going offline

The user should be notified when they lose network connectivity. Typically, the PWA will detect when the user has gone offline, and will notify the user by displaying a small banner under the header.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-pdp-offline.png 'Screenshot of a product detail page with an offline mode banner displayed beneath the header')

</figure>

To customize this feature, you can modify the `OfflineBanner` component. This is located in a different place depending on when your project was generated:

-   In projects generated since February 2019, this component is located in `packages/pwa/app/index.jsx`.
-   In projects generated prior to February 2019, this component is located in `web/app/containers/offline/partials/offline-banner.jsx`.

The pre-February 2019 version includes a modal with more information about Offline Mode. We also recommend customizing this component to match your brand. Find it in `web/app/modals/offline/index.jsx`.

### Previous content remains visible when offline

When the user browses to a page they've previously visited, the page content should still be visible. There should be no missing information when browsing previously visited pages, even after the user enters Offline Mode. This is just like the regular PWA experience, except an Offline Mode banner will be shown at the top of the screen.

Let's walk through an example:

1. The user starts on a fully-loaded product listing page.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-plp.png 'Fully-loaded product listing page')

</figure>

2. The product details page is loading. Content that was available on the product listing page, such as the image, name, and price are shown. Unavailable content is replaced with placeholders.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](partial-pdp.png 'Partially-loaded product details page')

</figure>

3. The product details page has finished loading and now shows all content.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-pdp.png 'Fully-loaded product details page')

</figure>

4. The user goes back to the previous page and loses internet, so they enter into Offline Mode.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-plp-offline.png 'Fully-loaded product listing page with an offline banner')

</figure>

5. The user returns to the same product details page. The page content is all shown immediately.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-pdp-offline.png 'Fully-loaded product details page with an offline banner')

</figure>

In the project starting point, this is achieved using the redux store. When you navigate to a page while online, the content for that page is added to the redux store. If you return to that page without a network connection, the content can still be displayed as long as it's still in the redux store.

In some cases, you may want to hide or modify content for Offline Mode. For example, you may want to change the state of the add to cart button to disable it while the user is offline.

### New content is replaced with offline-specific content when offline

When the user browses to a page that they have not previously visited, they are shown specific Offline Mode content in place of the actual content for the page. Typically, this will be a message reminding the user that they are offline.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](errorscreen.png 'Screenshot of offline splash screen')

</figure>

This is necessary due to the way code splitting is handled in the PWA. Each page template is split into a different JavaScript file which must be loaded before the page can be displayed. This allows us to reduce the size of the initial page load; we are able to download only the code that the user needs. However, this means that if the user goes offline _before_ we download this JavaScript file, we cannot render the page at all. Instead, we show content that's designed for Offline Mode.

There are also cases that won't result in the Offline Mode content being shown. For example, if the user has previously gone to a product details page, the PWA now has the code for rendering this page template. If the user browses to another product details page (PDP) while offline, the PWA can display partial content for this page.

Let's explore an example to demonstrate:

1. The user starts on a fully-loaded product listing page.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-plp.png 'Fully-loaded product listing page')

</figure>

2. The user browses to a product details page. The PWA loads the script for rendering the product details page.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-pdp.png 'Fully-loaded product details page')

</figure>

3. The user returns to the product listing page and goes offline.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-plp-offline.png 'Fully-loaded product listing page with an offline banner')

</figure>

4. The user browses to another product details page. The product details page renders, but only contains the content that was available on the product listing page.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](partial-pdp-offline.png 'Partially-loaded product details page')

</figure>

To customize this feature, you can modify either the `PageLoader` or the `Offline` component, depending on when your project was generated:

-   In projects generated after February 2019, modify the `PageLoader` component in `packages/pwa/app/components/page-loader/index.jsx`
-   In projects generated prior to February 2019, use the `Offline` component, found in `web/app/containers/offline/container.jsx`

### Loading while offline

If a user refreshes their page while offline, a subset of the page still loads and the request returns a 200 status code.

The subset of the page that loads while offline differs for each project, which is why there is no default implementation included in the project starting point. Instead, we will show one possible example in this doc; we encourage you to build on this based on your project requirements.

This feature requires the [service worker to be installed](../../getting-started/#additional-steps-for-tag-loaded-projects). The service worker can be used to cache resources so the page can load offline. For example, say we wanted to cache the bundle assets and homepage response for a server-side rendered PWA. We want to use the version from the network by default, but fall back to the version from the cache if needed. That might look something like this:

```js
workbox.routing.registerRoute(/\//, new workbox.strategies.NetworkFirst())
workbox.routing.registerRoute(/\/mobify\/bundle\//, new workbox.strategies.NetworkFirst())
```

For your project, you'll likely want to explore additional caching strategies. For example, you can choose to cache product listing and product detail pages, but avoid caching cart or checkout pages, as you do not want to ever show stale content on those pages. For an overview of caching strategies, read the [Offline Cookbox](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/). To see which caching strategies are available in Workbox, please read the [Workbox Strategies documentation](https://developers.google.com/web/tools/workbox/modules/workbox-strategies).

## Testing offline mode

On a mobile device, you can simulate an interrupted connection by toggling airplane mode.

In Chrome DevTools, use the throttling options under the **Network** tab.

1. While the device is connected to the internet, browse to a product listing page.

1. After the page fully loads, switch the device offline. There should be a banner that says "Currently browsing in offline mode" or similar.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](full-plp-offline.png 'Screenshot of a product listing page with an offline mode banner displayed beneath the header')

</figure>

1. Navigate to another page within the PWA by clicking on a product. There should be a custom offline splash screen stating the site is offline and needs to go online to retrieve more data.

<figure class="u-text-align-center" style="background-color: #fafafa;">

![alt_text](errorscreen.png 'Screenshot of offline splash screen')

</figure>

1. Navigate back to the previously-viewed product listing page. Navigating to previously-viewed pages should show them in a cached state (the same state as when online, plus the offline banner).

## Analytics while offline

If you are using the new [Analytics Integrations framework](../../analytics/analytics-integrations-overview/) (introduced in July 2019), all analytics events will be queued when the user goes offline.

If you are using the [legacy Analytics Manager](../../analytics/legacy-analytics-manager/), only [Pageview events](../../analytics/built-in-events/#pageview-events) are queued while the device is offline. After the device reconnects, the queued events are sent along with a summary of offline pageviews.

-   For each pageview that shows cached content, Engagement Engine will send a pageview event with `status: offline_success`
-   For each pageview that shows the offline splash screen, Engagement Engine will send a pageview event with `"status": "offline_failure"`
-   There will also be an `"action": "offlineModeUsed"` event that summarizes the number of successful offline pageviews `"page_success"` and failed offline pageviews `"page_failed"`

## FAQ

#### Q: Which Offline Mode features require service worker? <a name="require-service-worker" href="#require-service-worker">#</a>

A: The "Loading while offline" feature requires the service worker to be installed. The other features do not require the service worker.

#### Q: Does this work on iOS? <a name="ios" href="#ios">#</a>

A: Yes, the "Notification upon going offline", "Previous content remains visible when offline", and "New content is replaced with offline-specific content when offline" features all work on iOS. The "Loading while offline" feature is possible for iOS versions which support the service worker API. The [service worker API is supported on iOS 11.1](https://caniuse.com/#feat=serviceworkers), but contains [a bug that limits its functionality](https://github.com/cdegit/service-worker-cookie-demo). We recommend using a service worker on iOS versions 11.4.1 and above.

#### Q: What if the service worker loader is not yet installed? <a name="adding-service-worker" href="#adding-service-worker">#</a>

A: Follow the steps for [Developing without the Mobify Requirements](../developing-without-the-mobify-tag/)

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS ARTICLE:</b></p></div>