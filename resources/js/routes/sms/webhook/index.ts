import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::incoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
export const incoming = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: incoming.url(args, options),
    method: 'post',
})

incoming.definition = {
    methods: ["post"],
    url: '/api/sms/webhook/{provider}/incoming',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::incoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
incoming.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provider: args }
    }

    if (Array.isArray(args)) {
        args = {
            provider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        provider: args.provider,
    }

    return incoming.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::incoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
incoming.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: incoming.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::incoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
const incomingForm = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: incoming.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::incoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
incomingForm.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: incoming.url(args, options),
    method: 'post',
})

incoming.form = incomingForm

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::status
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
export const status = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/api/sms/webhook/{provider}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::status
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
status.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provider: args }
    }

    if (Array.isArray(args)) {
        args = {
            provider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        provider: args.provider,
    }

    return status.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::status
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
status.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::status
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
const statusForm = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::status
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
statusForm.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

status.form = statusForm

const webhook = {
    incoming: Object.assign(incoming, incoming),
    status: Object.assign(status, status),
}

export default webhook