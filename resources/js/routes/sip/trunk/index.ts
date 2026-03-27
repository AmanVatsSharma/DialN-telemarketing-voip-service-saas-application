import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TrunkWebhookController::voice
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
export const voice = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voice.url(args, options),
    method: 'post',
})

voice.definition = {
    methods: ["post"],
    url: '/sip/trunk/voice/{webhook_token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkWebhookController::voice
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
voice.url = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return voice.definition.url
            .replace('{webhook_token}', parsedArgs.webhook_token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkWebhookController::voice
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
voice.post = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voice.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::voice
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
const voiceForm = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voice.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::voice
* @see app/Http/Controllers/TrunkWebhookController.php:19
* @route '/sip/trunk/voice/{webhook_token}'
*/
voiceForm.post = (args: { webhook_token: string | number } | [webhook_token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voice.url(args, options),
    method: 'post',
})

voice.form = voiceForm

/**
* @see \App\Http\Controllers\TrunkWebhookController::status
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
export const status = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/sip/trunk/call-status/{trunk}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkWebhookController::status
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
status.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkWebhookController::status
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
status.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::status
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
const statusForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::status
* @see app/Http/Controllers/TrunkWebhookController.php:109
* @route '/sip/trunk/call-status/{trunk}'
*/
statusForm.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

status.form = statusForm

/**
* @see \App\Http\Controllers\TrunkWebhookController::disaster
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
export const disaster = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disaster.url(options),
    method: 'post',
})

disaster.definition = {
    methods: ["post"],
    url: '/sip/trunk/disaster-recovery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkWebhookController::disaster
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
disaster.url = (options?: RouteQueryOptions) => {
    return disaster.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkWebhookController::disaster
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
disaster.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disaster.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::disaster
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
const disasterForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disaster.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkWebhookController::disaster
* @see app/Http/Controllers/TrunkWebhookController.php:166
* @route '/sip/trunk/disaster-recovery'
*/
disasterForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disaster.url(options),
    method: 'post',
})

disaster.form = disasterForm

const trunk = {
    voice: Object.assign(voice, voice),
    status: Object.assign(status, status),
    disaster: Object.assign(disaster, disaster),
}

export default trunk