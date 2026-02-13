import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:24
* @route '/credit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/credit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:24
* @route '/credit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:24
* @route '/credit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:24
* @route '/credit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:24
* @route '/credit'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:24
* @route '/credit'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:24
* @route '/credit'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\CreditController::topUp
* @see app/Http/Controllers/CreditController.php:44
* @route '/credit/top-up'
*/
export const topUp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: topUp.url(options),
    method: 'get',
})

topUp.definition = {
    methods: ["get","head"],
    url: '/credit/top-up',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::topUp
* @see app/Http/Controllers/CreditController.php:44
* @route '/credit/top-up'
*/
topUp.url = (options?: RouteQueryOptions) => {
    return topUp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::topUp
* @see app/Http/Controllers/CreditController.php:44
* @route '/credit/top-up'
*/
topUp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: topUp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::topUp
* @see app/Http/Controllers/CreditController.php:44
* @route '/credit/top-up'
*/
topUp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: topUp.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::topUp
* @see app/Http/Controllers/CreditController.php:44
* @route '/credit/top-up'
*/
const topUpForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: topUp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::topUp
* @see app/Http/Controllers/CreditController.php:44
* @route '/credit/top-up'
*/
topUpForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: topUp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::topUp
* @see app/Http/Controllers/CreditController.php:44
* @route '/credit/top-up'
*/
topUpForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: topUp.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

topUp.form = topUpForm

/**
* @see \App\Http\Controllers\CreditController::history
* @see app/Http/Controllers/CreditController.php:115
* @route '/credit/history'
*/
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/credit/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::history
* @see app/Http/Controllers/CreditController.php:115
* @route '/credit/history'
*/
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::history
* @see app/Http/Controllers/CreditController.php:115
* @route '/credit/history'
*/
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::history
* @see app/Http/Controllers/CreditController.php:115
* @route '/credit/history'
*/
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::history
* @see app/Http/Controllers/CreditController.php:115
* @route '/credit/history'
*/
const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: history.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::history
* @see app/Http/Controllers/CreditController.php:115
* @route '/credit/history'
*/
historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: history.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::history
* @see app/Http/Controllers/CreditController.php:115
* @route '/credit/history'
*/
historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: history.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

history.form = historyForm

/**
* @see \App\Http\Controllers\CreditController::updateSettings
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
export const updateSettings = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSettings.url(options),
    method: 'post',
})

updateSettings.definition = {
    methods: ["post"],
    url: '/credit/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CreditController::updateSettings
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
updateSettings.url = (options?: RouteQueryOptions) => {
    return updateSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::updateSettings
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
updateSettings.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSettings.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::updateSettings
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
const updateSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateSettings.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::updateSettings
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
updateSettingsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateSettings.url(options),
    method: 'post',
})

updateSettings.form = updateSettingsForm

/**
* @see \App\Http\Controllers\CreditController::exportMethod
* @see app/Http/Controllers/CreditController.php:182
* @route '/credit/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/credit/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::exportMethod
* @see app/Http/Controllers/CreditController.php:182
* @route '/credit/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::exportMethod
* @see app/Http/Controllers/CreditController.php:182
* @route '/credit/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::exportMethod
* @see app/Http/Controllers/CreditController.php:182
* @route '/credit/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::exportMethod
* @see app/Http/Controllers/CreditController.php:182
* @route '/credit/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::exportMethod
* @see app/Http/Controllers/CreditController.php:182
* @route '/credit/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::exportMethod
* @see app/Http/Controllers/CreditController.php:182
* @route '/credit/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\CreditController::razorpayCheckout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
export const razorpayCheckout = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: razorpayCheckout.url(options),
    method: 'get',
})

razorpayCheckout.definition = {
    methods: ["get","head"],
    url: '/credit/razorpay/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::razorpayCheckout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
razorpayCheckout.url = (options?: RouteQueryOptions) => {
    return razorpayCheckout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::razorpayCheckout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
razorpayCheckout.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: razorpayCheckout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::razorpayCheckout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
razorpayCheckout.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: razorpayCheckout.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::razorpayCheckout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
const razorpayCheckoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: razorpayCheckout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::razorpayCheckout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
razorpayCheckoutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: razorpayCheckout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::razorpayCheckout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
razorpayCheckoutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: razorpayCheckout.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

razorpayCheckout.form = razorpayCheckoutForm

const CreditController = { index, topUp, history, updateSettings, exportMethod, razorpayCheckout, export: exportMethod }

export default CreditController