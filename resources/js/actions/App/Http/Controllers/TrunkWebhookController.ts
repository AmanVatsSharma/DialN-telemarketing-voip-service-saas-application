import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TrunkWebhookController::handleInboundCall
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
export const handleInboundCall = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleInboundCall.url(args, options),
    method: 'post',
})

handleInboundCall.definition = {
    methods: ["post"],
    url: '/sip/trunk/voice/{webhook_token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleInboundCall
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
handleInboundCall.url = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook_token: args }
    }

    if (Array.isArray(args)) {
        args = {
            webhook_token: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        webhook_token: args.webhook_token,
    }

    return handleInboundCall.definition.url
            .replace('{webhook_token}', parsedArgs.webhook_token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleInboundCall
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
handleInboundCall.post = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleInboundCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleInboundCall
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
const handleInboundCallForm = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleInboundCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleInboundCall
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
handleInboundCallForm.post = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleInboundCall.url(args, options),
    method: 'post',
})

handleInboundCall.form = handleInboundCallForm

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleStatusCallback
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
export const handleStatusCallback = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleStatusCallback.url(args, options),
    method: 'post',
})

handleStatusCallback.definition = {
    methods: ["post"],
    url: '/sip/trunk/call-status/{trunk}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleStatusCallback
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
handleStatusCallback.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trunk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { trunk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            trunk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        trunk: typeof args.trunk === 'object'
        ? args.trunk.id
        : args.trunk,
    }

    return handleStatusCallback.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleStatusCallback
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
handleStatusCallback.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleStatusCallback.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleStatusCallback
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
const handleStatusCallbackForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleStatusCallback.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleStatusCallback
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
handleStatusCallbackForm.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleStatusCallback.url(args, options),
    method: 'post',
})

handleStatusCallback.form = handleStatusCallbackForm

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleDisasterRecovery
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
export const handleDisasterRecovery = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleDisasterRecovery.url(options),
    method: 'post',
})

handleDisasterRecovery.definition = {
    methods: ["post"],
    url: '/sip/trunk/disaster-recovery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleDisasterRecovery
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
handleDisasterRecovery.url = (options?: RouteQueryOptions) => {
    return handleDisasterRecovery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleDisasterRecovery
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
handleDisasterRecovery.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleDisasterRecovery.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleDisasterRecovery
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
const handleDisasterRecoveryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleDisasterRecovery.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::handleDisasterRecovery
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
handleDisasterRecoveryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleDisasterRecovery.url(options),
    method: 'post',
})

handleDisasterRecovery.form = handleDisasterRecoveryForm

const TrunkWebhookController = { handleInboundCall, handleStatusCallback, handleDisasterRecovery }

export default TrunkWebhookController