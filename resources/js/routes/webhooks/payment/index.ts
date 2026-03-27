import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::webhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
export const webhook = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/webhooks/payment/{gateway}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::webhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
webhook.url = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return webhook.definition.url
            .replace('{gateway}', parsedArgs.gateway.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::webhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
webhook.post = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::webhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
const webhookForm = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::webhook
* @see app/Http/Controllers/PaymentController.php:72
* @route '/webhooks/payment/{gateway}'
*/
webhookForm.post = (args: { gateway: string | number } | [gateway: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(args, options),
    method: 'post',
})

webhook.form = webhookForm

const payment = {
    webhook: Object.assign(webhook, webhook),
}

export default payment