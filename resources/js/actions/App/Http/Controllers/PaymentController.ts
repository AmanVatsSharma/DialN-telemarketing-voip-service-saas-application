import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::createCheckout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
export const createCheckout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCheckout.url(options),
    method: 'post',
})

createCheckout.definition = {
    methods: ["post"],
    url: '/payment/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::createCheckout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
createCheckout.url = (options?: RouteQueryOptions) => {
    return createCheckout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::createCheckout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
createCheckout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createCheckout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::createCheckout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
const createCheckoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createCheckout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::createCheckout
* @see app/Http/Controllers/PaymentController.php:22
* @route '/payment/checkout'
*/
createCheckoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createCheckout.url(options),
    method: 'post',
})

createCheckout.form = createCheckoutForm

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

/**
* @see \App\Http\Controllers\PaymentController::handleWebhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
export const handleWebhook = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleWebhook.url(args, options),
    method: 'post',
})

handleWebhook.definition = {
    methods: ["post"],
    url: '/webhooks/payment/{gateway}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::handleWebhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
handleWebhook.url = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gateway: args }
    }

    if (Array.isArray(args)) {
        args = {
            gateway: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        gateway: args.gateway,
    }

    return handleWebhook.definition.url
            .replace('{gateway}', parsedArgs.gateway.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::handleWebhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
handleWebhook.post = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleWebhook.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::handleWebhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
const handleWebhookForm = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleWebhook.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::handleWebhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
handleWebhookForm.post = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleWebhook.url(args, options),
    method: 'post',
})

handleWebhook.form = handleWebhookForm

const PaymentController = { createCheckout, success, cancel, refund, handleWebhook }

export default PaymentController