Released on August 16, 2018

## New features

### Progressive Web Apps
For this release, a key area of focus was improving how quickly a shopper can start interacting with an experience on first load, based on the [Time to Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) metric. Data we have collected shows improving the experience around first load will result in higher conversion rates and therefore higher revenue.

As a target, we have focused on showing how to achieve a baseline score of TTI below 10 seconds, as defined by the [Google PWA checklist](https://developers.google.com/web/progressive-web-apps/checklist#first-load-fast-even-on-3g), using the latest version of [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to measure.

#### Performance Manager (Early Access)
A Performance Manager module has been added to the SDK that can be enabled within projects. The Performance Manager unlocks three key optimizations:
- Task Splitting, which moves tasks off the main thread on the browser, so that user interactions are unblocked
- Download Management, which limits and prioritizes the number of simultaneous downloads, so that user interactions are unblocked on slower networks, for browsers that support Service Workers
- Delaying lower priority work until the the core interactive elements of the PWA have been loaded and has become quiet

Currently, the Performance Manager is not enabled by default on projects, but this will be changed in future releases. Project teams who are interested in using Performance Manager can request access to the docs that detail how to enable and leverage this module in projects.

## Enhancements

### Progressive Web Apps

#### Time to Interactive improvements
The starting project scaffold has been updated with a few key performance enhancements that bring down Time to Interactive by a significant amount. In our testing, Time to Interactive decreases by 2-3 seconds potentially with these changes.

These changes are recommended to be applied to existing projects for they following areas:
- The size of `loader.js` has been reduced significantly to minify code and remove the unnecessary `buffer` package
- Webpack configuration has been updated to remove `lodash-es` as part of the final `vendor.js` bundle, as this is an unnecessary duplicate of `lodash`
- Webpack configuration has been updated to upgrade the `webpack-bundle-analyzer` version, which will provide more accurate dependency bundle sizes to assist with analyzing how to decrease file sizes when using the `npm run analyze-build` command

#### Add to Home Screen adjustments
With the release of Chrome 68, it was announced that there would be a [change to the behavior of add to home screen](https://developers.google.com/web/updates/2018/06/a2hs-updates). Chrome will no longer show the add to home screen banner and will instead show a new mini-infobar. Chrome 68 also now gives developers the ability to manually trigger the add to home screen dialog off of a user gesture. Note that these changes only affect the add to home experience on Chrome.

<figure class="u-text-align-center">
    <div>
        <img alt="New Add to Homescreen Flow" src="images/a2hs.gif"/>
    </div>
    <figcaption>New Add to Homescreen Flow</figcaption>
</figure>

We've added a new [`addToHomescreen`](https://docs.mobify.com/progressive-web/latest/components/#!/AddToHomescreen) higher order component to take advantage of this new ability. With the `addToHomescreen` higher order component, developers will easily be able to wrap add to home screen functionality within any component or UI of their choosing. A reference implementation utilizing the `addToHomeScreen` component can be found in our project starting point, where we wrap the `addToHomescreen` component within the navigation component.

## Known issues

### Progressive Web Apps
* [Navigation component](https://docs.mobify.com/progressive-web/latest/components/#!/Nav) will throw an error if two or more children in the navigation tree have the same path.
* Service Worker support on iOS is disabled due to an outstanding Apple Safari bug introduced in iOS 11.4. Support will be re-enabled when a fix is deployed by Apple. Apple bug ID 40670799
* Errors appear in the browser console when Service Worker loads cached assets while Chrome is in Incognito mode


### Native Apps
* Back navigations will intermittently cause a brief flash on the screen before the apps content fully loads in.
* Apps on Super retina (iPhone X) resolutions don't render properly with the notch
* Unexpected additional content within the account page on Android
* The account tab segmented control does not show up in new versions of iOS
* Account dashboard is unresponsive after user registers

## Fixes

### Native Apps
* Native components will now properly be localized on Android API 25 and up
* Adjusted the `NavigationPlugin`'s `popToRoot` function to handle empty stacks
* Changed the `DefaultLoaderPlugin` to open instead of public, enabling developers to inherit the plugin