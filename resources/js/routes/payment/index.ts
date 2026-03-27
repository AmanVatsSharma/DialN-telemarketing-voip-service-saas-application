import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::checkout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/payment/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::checkout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::checkout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::checkout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::checkout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
checkoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkout.url(options),
    method: 'post',
})

checkout.form = checkoutForm

/**
* @see \App\Http\Controllers\PaymentController::success
* @see app/Http/Controllers/PaymentController.php:95
* @route '/payment/success'
*/
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/payment/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::success
* @see app/Http/Controllers/PaymentController.php:95
* @route '/payment/success'
*/
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::success
* @see app/Http/Controllers/PaymentController.php:95
* @route '/payment/success'
*/
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::success
* @see app/Http/Controllers/PaymentController.php:95
* @route '/payment/success'
*/
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentController::success
* @see app/Http/Controllers/PaymentController.php:95
* @route '/payment/success'
*/
const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::success
* @see app/Http/Controllers/PaymentController.php:95
* @route '/payment/success'
*/
successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::success
* @see app/Http/Controllers/PaymentController.php:95
* @route '/payment/success'
*/
successForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

success.form = successForm

/**
* @see \App\Http\Controllers\PaymentController::cancel
* @see app/Http/Controllers/PaymentController.php:150
* @route '/payment/cancel'
*/
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

cancel.definition = {
    methods: ["get","head"],
    url: '/payment/cancel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::cancel
* @see app/Http/Controllers/PaymentController.php:150
* @route '/payment/cancel'
*/
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::cancel
* @see app/Http/Controllers/PaymentController.php:150
* @route '/payment/cancel'
*/
cancel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::cancel
* @see app/Http/Controllers/PaymentController.php:150
* @route '/payment/cancel'
*/
cancel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancel.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentController::cancel
* @see app/Http/Controllers/PaymentController.php:150
* @route '/payment/cancel'
*/
const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cancel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::cancel
* @see app/Http/Controllers/PaymentController.php:150
* @route '/payment/cancel'
*/
cancelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cancel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentController::cancel
* @see app/Http/Controllers/PaymentController.php:150
* @route '/payment/cancel'
*/
cancelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cancel.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

cancel.form = cancelForm

/**
* @see \App\Http\Controllers\PaymentController::refund
* @see app/Http/Controllers/PaymentController.php:158
* @route '/payment/refund/{transaction}'
*/
export const refund = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refund.url(args, options),
    method: 'post',
})

refund.definition = {
    methods: ["post"],
    url: '/payment/refund/{transaction}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::refund
* @see app/Http/Controllers/PaymentController.php:158
* @route '/payment/refund/{transaction}'
*/
refund.url = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transaction: args }
    }

    if (Array.isArray(args)) {
        args = {
            transaction: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        transaction: args.transaction,
    }

    return refund.definition.url
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::refund
* @see app/Http/Controllers/PaymentController.php:158
* @route '/payment/refund/{transaction}'
*/
refund.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refund.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::refund
* @see app/Http/Controllers/PaymentController.php:158
* @route '/payment/refund/{transaction}'
*/
const refundForm = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refund.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::refund
* @see app/Http/Controllers/PaymentController.php:158
* @route '/payment/refund/{transaction}'
*/
refundForm.post = (args: { transaction: string | number } | [transaction: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refund.url(args, options),
    method: 'post',
})

refund.form = refundForm

const payment = {
    checkout: Object.assign(checkout, checkout),
    success: Object.assign(success, success),
    cancel: Object.assign(cancel, cancel),
    refund: Object.assign(refund, refund),
}

export default payment