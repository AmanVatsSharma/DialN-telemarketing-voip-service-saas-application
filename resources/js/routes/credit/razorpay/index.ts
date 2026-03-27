import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CreditController::checkout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/credit/razorpay/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::checkout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::checkout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
checkout.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::checkout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
checkout.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::checkout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::checkout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
checkoutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::checkout
* @see app/Http/Controllers/CreditController.php:82
* @route '/credit/razorpay/checkout'
*/
checkoutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

checkout.form = checkoutForm

const razorpay = {
    checkout: Object.assign(checkout, checkout),
}

export default razorpay