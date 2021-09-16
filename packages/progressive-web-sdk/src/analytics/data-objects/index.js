/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2021 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Page from './page'
import Product from './product'
import Transaction from './transaction'
import ShoppingList from './shopping-list'
import UIInteraction from './ui-interaction'

// Data Action Schema
export const EVENT_ACTION = {
    pageview: 'pageview',
    purchase: 'purchase',
    addToCart: 'addToCart',
    productDetail: 'productDetail',
    productImpression: 'productImpression',
    removeFromCart: 'removeFromCart',
    addToWishlist: 'addToWishlist',
    removeFromWishlist: 'removeFromWishlist',
    search: 'search',
    uiInteraction: 'uiInteraction',
    launchedFromHomeScreen: 'launchedFromHomeScreen',
    setCurrency: 'setCurrency',
    setPageTemplateName: 'setPageTemplateName',
    performance: 'performance',
    applePayOptionDisplayed: 'applePayOptionDisplayed',
    applePayButtonDisplayed: 'applePayButtonDisplayed',
    applePayButtonClicked: 'applePayButtonClicked',
    offlineModeUsed: 'offlineModeUsed'
}

export const PERFORMANCE_METRICS = {
    pageStart: 'pageStart',
    mobifyStart: 'mobifyStart',
    firstPaint: 'firstPaint',
    firstContentfulPaint: 'firstContentfulPaint',
    appStart: 'appStart',
    templateWillMount: 'templateWillMount',
    templateDidMount: 'templateDidMount',
    templateAPIEnd: 'templateAPIEnd',
    fullPageLoad: 'fullPageLoad',
    timeToInteractive: 'timeToInteractive',
    inputLatency: 'inputLatency',
    isSavedPage: 'isSavedPage'
}

// Interaction Schema
export const UI_SUBJECT = {
    app: 'app',
    user: 'user'
}

export const UI_ACTION = {
    click: 'Click',
    focus: 'Focus',
    blur: 'Blur',
    open: 'Open',
    close: 'Close',
    display: 'Display',
    receive: 'Receive',
    swipe: 'Swipe'
}

export const UI_OBJECT = {
    button: 'Button',
    element: 'Element',
    error: 'Error',
    input: 'Input',
    modal: 'Modal'
}

export const UI_NAME = {
    accept: 'accept',
    accordion: 'accordion',
    additionalAddressInfo: 'additional_address_info',
    address: 'address',
    addressName: 'address_name',
    addNewAddress: 'add_new_address',
    addNewCard: 'add_new_card',
    addPromotionCode: 'add_promotion_code',
    addToCart: 'add_to_cart',
    addToHome: 'add_to_home',
    askQuestions: 'ask_questions',
    autoReplenish: 'auto_replenish',
    autoReplenishFrequency: 'auto_replenish_frequency',
    all: 'all',
    applePay: 'apple_pay',
    applePayPaymentMethod: 'apple_pay_payment_method',
    bottom: 'bottom',
    billingAddress: 'billing_address',
    browserForward: 'browser_forward',
    browserRefresh: 'browser_refresh',
    cancel: 'cancel',
    cancelAutoReplenish: 'cancel_auto_replenish',
    cancelRemoveItem: 'cancel_remove_item',
    calculateTax: 'calculate_tax',
    cardExpiryDate: 'card_expiry_date',
    cardHolderName: 'card_holder_name',
    cardNumber: 'card_number',
    cardVerification: 'card_verification',
    carousel: 'carousel',
    clearFilters: 'clear_filters',
    clearSearch: 'clear_search',
    checkBalance: 'check_balance',
    checkout: 'checkout',
    contactUs: 'contact_us',
    chooseFile: 'choose_file',
    city: 'city',
    collapse: 'collapse',
    consensus: 'consensus',
    copy: 'copy',
    count: 'count',
    country: 'country',
    company: 'company',
    confirmation: 'confirmation',
    confirmEmail: 'confirm_email',
    confirmPassword: 'confirm_password',
    confirmRemoveItem: 'confirm_remove_item',
    continueCheckout: 'continue_checkout',
    continueOffline: 'continue_offline',
    continueShopping: 'continue_shopping',
    createAccountConfirmation: 'create_account_confirmation',
    currentPassword: 'current_password',
    custom: 'custom',
    customerName: 'customer_name',
    dateOfBirth: 'date_of_birth',
    decrementQuantity: 'decrement_quantity',
    dismiss: 'dismiss',
    dismissModal: 'dismiss_modal',
    dismissNotification: 'dismiss_notification',
    dismissSearch: 'dismiss_search',
    donate: 'donate',
    editBag: 'edit_bag',
    editItem: 'edit_item',
    editSavedAddress: 'edit_saved_address',
    email: 'email',
    enablePushNotification: 'enable_push_notification',
    enableLocationService: 'enable_location_service',
    expand: 'expand',
    estimateShipping: 'estimate_shipping',
    facebook: 'facebook',
    feedback: 'feedback',
    filters: 'filters',
    firstName: 'first_name',
    gender: 'gender',
    gift: 'gift',
    giftCertificate: 'gift_certificate',
    giftCertificateAmount: 'gift_certificate_amount',
    giftCertificatePin: 'gift_certificate_pin',
    goToCart: 'go_to_cart',
    goToRegister: 'go_to_register',
    goToSignIn: 'go_to_sign_in',
    incrementQuantity: 'increment_quantity',
    info: 'info',
    inputValidation: 'input_validation',
    lastName: 'last_name',
    launch: 'launch',
    login: 'login',
    logout: 'logout',
    menu: 'menu',
    message: 'message',
    miniCart: 'mini_cart',
    moreMenu: 'more_menu',
    moreSwatches: 'more_swatches',
    navigateBack: 'navigate_back',
    next: 'next',
    offline: 'offline',
    page: 'page',
    pagination: 'pagination',
    password: 'password',
    payment: 'payment',
    paymentMethod: 'payment_method',
    phone: 'phone',
    postcode: 'zip_postal_code',
    previous: 'previous',
    print: 'print',
    promotionCode: 'promotion_code',
    prompt: 'prompt',
    recalculateTax: 'recalculate_tax',
    recipientEmail: 'recipient_email',
    recipientName: 'recipient_name',
    region: 'state_province_region',
    register: 'register',
    remember: 'remember',
    removeDiscount: 'remove_discount',
    removeItem: 'remove_item',
    removePromotionCode: 'remove_promotion_code',
    removeSavedAddress: 'remove_saved_address',
    reorder: 'reorder',
    rewards: 'rewards',
    retryConnection: 'retry_connection',
    salutation: 'salutation',
    savedAddress: 'saved_address',
    savedCard: 'saved_card',
    saveItem: 'save_item',
    sameAsShipping: 'same_as_shipping',
    sample: 'sample',
    search: 'search',
    setCurrency: 'set_currency',
    setDefault: 'set_default',
    setLanguage: 'set_language',
    shareCopy: 'share_copy',
    shareEmail: 'share_email',
    shareModal: 'share_modal',
    sharePrint: 'share_print',
    shareFacebook: 'share_facebook',
    shareTwitter: 'share_twitter',
    shippingAddress: 'shipping_address',
    shippingMethod: 'shipping_method',
    sortBy: 'sort_by',
    showFilters: 'show_filters',
    showMenu: 'show_menu',
    showMiniCart: 'show_mini_cart',
    showMoreAddressFields: 'show_more_address_fields',
    showPromotionCode: 'show_promotion_code',
    showSearchBar: 'show_search_bar',
    showStoreLocator: 'show_store_locator',
    snapchat: 'snapchat',
    socialLogin: 'social_login',
    stockNotification: 'stock_notification',
    storeSearch: 'store_search',
    swatch: 'swatch',
    submitOrder: 'submit_order',
    submitPromoCode: 'submit_promo_code',
    subscribe: 'subscribe',
    top: 'top',
    twitter: 'twitter',
    togglePasswordText: 'toggle_password_text',
    upload: 'upload',
    validateAddress: 'validate_address',
    view: 'view',
    viewAllStores: 'view_all_stores',
    wishlist: 'wishlist',
    zoom: 'zoom'
}

export {Page, Product, Transaction, ShoppingList, UIInteraction}