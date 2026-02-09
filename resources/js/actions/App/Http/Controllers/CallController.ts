import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CallController::softphone
* @see app/Http/Controllers/CallController.php:26
* @route '/softphone'
*/
export const softphone = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: softphone.url(options),
    method: 'get',
})

softphone.definition = {
    methods: ["get","head"],
    url: '/softphone',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CallController::softphone
* @see app/Http/Controllers/CallController.php:26
* @route '/softphone'
*/
softphone.url = (options?: RouteQueryOptions) => {
    return softphone.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::softphone
* @see app/Http/Controllers/CallController.php:26
* @route '/softphone'
*/
softphone.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: softphone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::softphone
* @see app/Http/Controllers/CallController.php:26
* @route '/softphone'
*/
softphone.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: softphone.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CallController::softphone
* @see app/Http/Controllers/CallController.php:26
* @route '/softphone'
*/
const softphoneForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: softphone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::softphone
* @see app/Http/Controllers/CallController.php:26
* @route '/softphone'
*/
softphoneForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: softphone.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::softphone
* @see app/Http/Controllers/CallController.php:26
* @route '/softphone'
*/
softphoneForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: softphone.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

softphone.form = softphoneForm

/**
* @see \App\Http\Controllers\CallController::initiate
* @see app/Http/Controllers/CallController.php:229
* @route '/calls/initiate'
*/
export const initiate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

initiate.definition = {
    methods: ["post"],
    url: '/calls/initiate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::initiate
* @see app/Http/Controllers/CallController.php:229
* @route '/calls/initiate'
*/
initiate.url = (options?: RouteQueryOptions) => {
    return initiate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::initiate
* @see app/Http/Controllers/CallController.php:229
* @route '/calls/initiate'
*/
initiate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::initiate
* @see app/Http/Controllers/CallController.php:229
* @route '/calls/initiate'
*/
const initiateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::initiate
* @see app/Http/Controllers/CallController.php:229
* @route '/calls/initiate'
*/
initiateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiate.url(options),
    method: 'post',
})

initiate.form = initiateForm

/**
* @see \App\Http\Controllers\CallController::end
* @see app/Http/Controllers/CallController.php:290
* @route '/calls/{call}/end'
*/
export const end = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: end.url(args, options),
    method: 'post',
})

end.definition = {
    methods: ["post"],
    url: '/calls/{call}/end',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::end
* @see app/Http/Controllers/CallController.php:290
* @route '/calls/{call}/end'
*/
end.url = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { call: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            call: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call: typeof args.call === 'object'
        ? args.call.id
        : args.call,
    }

    return end.definition.url
            .replace('{call}', parsedArgs.call.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::end
* @see app/Http/Controllers/CallController.php:290
* @route '/calls/{call}/end'
*/
end.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: end.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::end
* @see app/Http/Controllers/CallController.php:290
* @route '/calls/{call}/end'
*/
const endForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: end.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::end
* @see app/Http/Controllers/CallController.php:290
* @route '/calls/{call}/end'
*/
endForm.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: end.url(args, options),
    method: 'post',
})

end.form = endForm

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:319
* @route '/calls/{call}/status'
*/
export const status = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/calls/{call}/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:319
* @route '/calls/{call}/status'
*/
status.url = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { call: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            call: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call: typeof args.call === 'object'
        ? args.call.id
        : args.call,
    }

    return status.definition.url
            .replace('{call}', parsedArgs.call.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:319
* @route '/calls/{call}/status'
*/
status.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:319
* @route '/calls/{call}/status'
*/
status.head = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:319
* @route '/calls/{call}/status'
*/
const statusForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:319
* @route '/calls/{call}/status'
*/
statusForm.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::status
* @see app/Http/Controllers/CallController.php:319
* @route '/calls/{call}/status'
*/
statusForm.head = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

status.form = statusForm

/**
* @see \App\Http\Controllers\CallController::index
* @see app/Http/Controllers/CallController.php:47
* @route '/calls'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CallController::index
* @see app/Http/Controllers/CallController.php:47
* @route '/calls'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::index
* @see app/Http/Controllers/CallController.php:47
* @route '/calls'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::index
* @see app/Http/Controllers/CallController.php:47
* @route '/calls'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CallController::index
* @see app/Http/Controllers/CallController.php:47
* @route '/calls'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::index
* @see app/Http/Controllers/CallController.php:47
* @route '/calls'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::index
* @see app/Http/Controllers/CallController.php:47
* @route '/calls'
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
* @see \App\Http\Controllers\CallController::exportMethod
* @see app/Http/Controllers/CallController.php:466
* @route '/calls/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/calls/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CallController::exportMethod
* @see app/Http/Controllers/CallController.php:466
* @route '/calls/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::exportMethod
* @see app/Http/Controllers/CallController.php:466
* @route '/calls/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::exportMethod
* @see app/Http/Controllers/CallController.php:466
* @route '/calls/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CallController::exportMethod
* @see app/Http/Controllers/CallController.php:466
* @route '/calls/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::exportMethod
* @see app/Http/Controllers/CallController.php:466
* @route '/calls/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::exportMethod
* @see app/Http/Controllers/CallController.php:466
* @route '/calls/export'
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
* @see \App\Http\Controllers\CallController::show
* @see app/Http/Controllers/CallController.php:143
* @route '/calls/{call}'
*/
export const show = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/calls/{call}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CallController::show
* @see app/Http/Controllers/CallController.php:143
* @route '/calls/{call}'
*/
show.url = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { call: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            call: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call: typeof args.call === 'object'
        ? args.call.id
        : args.call,
    }

    return show.definition.url
            .replace('{call}', parsedArgs.call.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::show
* @see app/Http/Controllers/CallController.php:143
* @route '/calls/{call}'
*/
show.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::show
* @see app/Http/Controllers/CallController.php:143
* @route '/calls/{call}'
*/
show.head = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CallController::show
* @see app/Http/Controllers/CallController.php:143
* @route '/calls/{call}'
*/
const showForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::show
* @see app/Http/Controllers/CallController.php:143
* @route '/calls/{call}'
*/
showForm.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CallController::show
* @see app/Http/Controllers/CallController.php:143
* @route '/calls/{call}'
*/
showForm.head = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\CallController::syncWithTwilio
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
export const syncWithTwilio = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncWithTwilio.url(options),
    method: 'post',
})

syncWithTwilio.definition = {
    methods: ["post"],
    url: '/calls/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::syncWithTwilio
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
syncWithTwilio.url = (options?: RouteQueryOptions) => {
    return syncWithTwilio.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::syncWithTwilio
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
syncWithTwilio.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncWithTwilio.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::syncWithTwilio
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
const syncWithTwilioForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: syncWithTwilio.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::syncWithTwilio
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
syncWithTwilioForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: syncWithTwilio.url(options),
    method: 'post',
})

syncWithTwilio.form = syncWithTwilioForm

/**
* @see \App\Http\Controllers\CallController::syncCall
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
export const syncCall = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncCall.url(args, options),
    method: 'post',
})

syncCall.definition = {
    methods: ["post"],
    url: '/calls/{call}/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::syncCall
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
syncCall.url = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { call: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            call: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call: typeof args.call === 'object'
        ? args.call.id
        : args.call,
    }

    return syncCall.definition.url
            .replace('{call}', parsedArgs.call.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::syncCall
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
syncCall.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::syncCall
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
const syncCallForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: syncCall.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::syncCall
* @see app/Http/Controllers/CallController.php:196
* @route '/calls/{call}/sync'
*/
syncCallForm.post = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: syncCall.url(args, options),
    method: 'post',
})

syncCall.form = syncCallForm

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
const webhookStatus3b23b7d071243f876150b361a33ce8d6 = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookStatus3b23b7d071243f876150b361a33ce8d6.url(args, options),
    method: 'post',
})

webhookStatus3b23b7d071243f876150b361a33ce8d6.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
webhookStatus3b23b7d071243f876150b361a33ce8d6.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return webhookStatus3b23b7d071243f876150b361a33ce8d6.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
webhookStatus3b23b7d071243f876150b361a33ce8d6.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookStatus3b23b7d071243f876150b361a33ce8d6.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
const webhookStatus3b23b7d071243f876150b361a33ce8d6Form = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookStatus3b23b7d071243f876150b361a33ce8d6.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/calls/{call_id}/status'
*/
webhookStatus3b23b7d071243f876150b361a33ce8d6Form.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookStatus3b23b7d071243f876150b361a33ce8d6.url(args, options),
    method: 'post',
})

webhookStatus3b23b7d071243f876150b361a33ce8d6.form = webhookStatus3b23b7d071243f876150b361a33ce8d6Form
/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
const webhookStatus3498e420b65173d0a591dc15c423dda8 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookStatus3498e420b65173d0a591dc15c423dda8.url(options),
    method: 'post',
})

webhookStatus3498e420b65173d0a591dc15c423dda8.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/call-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
webhookStatus3498e420b65173d0a591dc15c423dda8.url = (options?: RouteQueryOptions) => {
    return webhookStatus3498e420b65173d0a591dc15c423dda8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
webhookStatus3498e420b65173d0a591dc15c423dda8.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookStatus3498e420b65173d0a591dc15c423dda8.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
const webhookStatus3498e420b65173d0a591dc15c423dda8Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookStatus3498e420b65173d0a591dc15c423dda8.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookStatus
* @see app/Http/Controllers/CallController.php:337
* @route '/webhooks/twilio/call-status'
*/
webhookStatus3498e420b65173d0a591dc15c423dda8Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookStatus3498e420b65173d0a591dc15c423dda8.url(options),
    method: 'post',
})

webhookStatus3498e420b65173d0a591dc15c423dda8.form = webhookStatus3498e420b65173d0a591dc15c423dda8Form

export const webhookStatus = {
    '/webhooks/twilio/calls/{call_id}/status': webhookStatus3b23b7d071243f876150b361a33ce8d6,
    '/webhooks/twilio/call-status': webhookStatus3498e420b65173d0a591dc15c423dda8,
}

/**
* @see \App\Http\Controllers\CallController::webhookRecording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
export const webhookRecording = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookRecording.url(args, options),
    method: 'post',
})

webhookRecording.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/recording',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::webhookRecording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
webhookRecording.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return webhookRecording.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::webhookRecording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
webhookRecording.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookRecording.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookRecording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
const webhookRecordingForm = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookRecording.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookRecording
* @see app/Http/Controllers/CallController.php:380
* @route '/webhooks/twilio/calls/{call_id}/recording'
*/
webhookRecordingForm.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookRecording.url(args, options),
    method: 'post',
})

webhookRecording.form = webhookRecordingForm

/**
* @see \App\Http\Controllers\CallController::webhookTranscription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
export const webhookTranscription = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookTranscription.url(args, options),
    method: 'post',
})

webhookTranscription.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/transcription',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::webhookTranscription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
webhookTranscription.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return webhookTranscription.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::webhookTranscription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
webhookTranscription.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookTranscription.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookTranscription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
const webhookTranscriptionForm = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookTranscription.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookTranscription
* @see app/Http/Controllers/CallController.php:414
* @route '/webhooks/twilio/calls/{call_id}/transcription'
*/
webhookTranscriptionForm.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookTranscription.url(args, options),
    method: 'post',
})

webhookTranscription.form = webhookTranscriptionForm

/**
* @see \App\Http\Controllers\CallController::webhookDtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
export const webhookDtmf = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookDtmf.url(args, options),
    method: 'post',
})

webhookDtmf.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/calls/{call_id}/dtmf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::webhookDtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
webhookDtmf.url = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { call_id: args }
    }

    if (Array.isArray(args)) {
        args = {
            call_id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        call_id: args.call_id,
    }

    return webhookDtmf.definition.url
            .replace('{call_id}', parsedArgs.call_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::webhookDtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
webhookDtmf.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookDtmf.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookDtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
const webhookDtmfForm = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookDtmf.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::webhookDtmf
* @see app/Http/Controllers/CallController.php:585
* @route '/webhooks/twilio/calls/{call_id}/dtmf'
*/
webhookDtmfForm.post = (args: { call_id: string | number } | [call_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhookDtmf.url(args, options),
    method: 'post',
})

webhookDtmf.form = webhookDtmfForm

const CallController = { softphone, initiate, end, status, index, exportMethod, show, syncWithTwilio, syncCall, webhookStatus, webhookRecording, webhookTranscription, webhookDtmf, export: exportMethod }

export default CallController