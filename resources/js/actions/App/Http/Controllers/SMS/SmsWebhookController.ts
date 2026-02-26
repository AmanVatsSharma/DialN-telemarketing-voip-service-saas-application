import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleIncoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
export const handleIncoming = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleIncoming.url(args, options),
    method: 'post',
})

handleIncoming.definition = {
    methods: ["post"],
    url: '/api/sms/webhook/{provider}/incoming',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleIncoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
handleIncoming.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return handleIncoming.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleIncoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
handleIncoming.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleIncoming.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleIncoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
const handleIncomingForm = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleIncoming.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleIncoming
* @see app/Http/Controllers/SMS/SmsWebhookController.php:24
* @route '/api/sms/webhook/{provider}/incoming'
*/
handleIncomingForm.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleIncoming.url(args, options),
    method: 'post',
})

handleIncoming.form = handleIncomingForm

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleStatus
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
export const handleStatus = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleStatus.url(args, options),
    method: 'post',
})

handleStatus.definition = {
    methods: ["post"],
    url: '/api/sms/webhook/{provider}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleStatus
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
handleStatus.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return handleStatus.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleStatus
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
handleStatus.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleStatus.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleStatus
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
const handleStatusForm = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleStatus.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsWebhookController::handleStatus
* @see app/Http/Controllers/SMS/SmsWebhookController.php:127
* @route '/api/sms/webhook/{provider}/status'
*/
handleStatusForm.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleStatus.url(args, options),
    method: 'post',
})

handleStatus.form = handleStatusForm

const SmsWebhookController = { handleIncoming, handleStatus }

export default SmsWebhookController