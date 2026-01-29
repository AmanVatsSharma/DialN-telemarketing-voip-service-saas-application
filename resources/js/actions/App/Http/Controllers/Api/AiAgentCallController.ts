import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AiAgentCallController::index
* @see app/Http/Controllers/Api/AiAgentCallController.php:26
* @route '/api/v1/ai-agent-calls'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agent-calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::index
* @see app/Http/Controllers/Api/AiAgentCallController.php:26
* @route '/api/v1/ai-agent-calls'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::index
* @see app/Http/Controllers/Api/AiAgentCallController.php:26
* @route '/api/v1/ai-agent-calls'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::index
* @see app/Http/Controllers/Api/AiAgentCallController.php:26
* @route '/api/v1/ai-agent-calls'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::index
* @see app/Http/Controllers/Api/AiAgentCallController.php:26
* @route '/api/v1/ai-agent-calls'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::index
* @see app/Http/Controllers/Api/AiAgentCallController.php:26
* @route '/api/v1/ai-agent-calls'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::index
* @see app/Http/Controllers/Api/AiAgentCallController.php:26
* @route '/api/v1/ai-agent-calls'
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
* @see \App\Http\Controllers\Api\AiAgentCallController::exportMethod
* @see app/Http/Controllers/Api/AiAgentCallController.php:417
* @route '/api/v1/ai-agent-calls/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agent-calls/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::exportMethod
* @see app/Http/Controllers/Api/AiAgentCallController.php:417
* @route '/api/v1/ai-agent-calls/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::exportMethod
* @see app/Http/Controllers/Api/AiAgentCallController.php:417
* @route '/api/v1/ai-agent-calls/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::exportMethod
* @see app/Http/Controllers/Api/AiAgentCallController.php:417
* @route '/api/v1/ai-agent-calls/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::exportMethod
* @see app/Http/Controllers/Api/AiAgentCallController.php:417
* @route '/api/v1/ai-agent-calls/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::exportMethod
* @see app/Http/Controllers/Api/AiAgentCallController.php:417
* @route '/api/v1/ai-agent-calls/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::exportMethod
* @see app/Http/Controllers/Api/AiAgentCallController.php:417
* @route '/api/v1/ai-agent-calls/export'
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
* @see \App\Http\Controllers\Api\AiAgentCallController::active
* @see app/Http/Controllers/Api/AiAgentCallController.php:137
* @route '/api/v1/ai-agent-calls/active'
*/
export const active = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})

active.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agent-calls/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::active
* @see app/Http/Controllers/Api/AiAgentCallController.php:137
* @route '/api/v1/ai-agent-calls/active'
*/
active.url = (options?: RouteQueryOptions) => {
    return active.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::active
* @see app/Http/Controllers/Api/AiAgentCallController.php:137
* @route '/api/v1/ai-agent-calls/active'
*/
active.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: active.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::active
* @see app/Http/Controllers/Api/AiAgentCallController.php:137
* @route '/api/v1/ai-agent-calls/active'
*/
active.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: active.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::active
* @see app/Http/Controllers/Api/AiAgentCallController.php:137
* @route '/api/v1/ai-agent-calls/active'
*/
const activeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: active.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::active
* @see app/Http/Controllers/Api/AiAgentCallController.php:137
* @route '/api/v1/ai-agent-calls/active'
*/
activeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: active.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::active
* @see app/Http/Controllers/Api/AiAgentCallController.php:137
* @route '/api/v1/ai-agent-calls/active'
*/
activeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: active.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

active.form = activeForm

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stats
* @see app/Http/Controllers/Api/AiAgentCallController.php:387
* @route '/api/v1/ai-agent-calls/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agent-calls/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stats
* @see app/Http/Controllers/Api/AiAgentCallController.php:387
* @route '/api/v1/ai-agent-calls/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stats
* @see app/Http/Controllers/Api/AiAgentCallController.php:387
* @route '/api/v1/ai-agent-calls/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stats
* @see app/Http/Controllers/Api/AiAgentCallController.php:387
* @route '/api/v1/ai-agent-calls/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stats
* @see app/Http/Controllers/Api/AiAgentCallController.php:387
* @route '/api/v1/ai-agent-calls/stats'
*/
const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stats
* @see app/Http/Controllers/Api/AiAgentCallController.php:387
* @route '/api/v1/ai-agent-calls/stats'
*/
statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stats
* @see app/Http/Controllers/Api/AiAgentCallController.php:387
* @route '/api/v1/ai-agent-calls/stats'
*/
statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stats.form = statsForm

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::initiate
* @see app/Http/Controllers/Api/AiAgentCallController.php:148
* @route '/api/v1/ai-agent-calls/initiate'
*/
export const initiate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

initiate.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agent-calls/initiate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::initiate
* @see app/Http/Controllers/Api/AiAgentCallController.php:148
* @route '/api/v1/ai-agent-calls/initiate'
*/
initiate.url = (options?: RouteQueryOptions) => {
    return initiate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::initiate
* @see app/Http/Controllers/Api/AiAgentCallController.php:148
* @route '/api/v1/ai-agent-calls/initiate'
*/
initiate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::initiate
* @see app/Http/Controllers/Api/AiAgentCallController.php:148
* @route '/api/v1/ai-agent-calls/initiate'
*/
const initiateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::initiate
* @see app/Http/Controllers/Api/AiAgentCallController.php:148
* @route '/api/v1/ai-agent-calls/initiate'
*/
initiateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiate.url(options),
    method: 'post',
})

initiate.form = initiateForm

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::show
* @see app/Http/Controllers/Api/AiAgentCallController.php:60
* @route '/api/v1/ai-agent-calls/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agent-calls/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::show
* @see app/Http/Controllers/Api/AiAgentCallController.php:60
* @route '/api/v1/ai-agent-calls/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::show
* @see app/Http/Controllers/Api/AiAgentCallController.php:60
* @route '/api/v1/ai-agent-calls/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::show
* @see app/Http/Controllers/Api/AiAgentCallController.php:60
* @route '/api/v1/ai-agent-calls/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::show
* @see app/Http/Controllers/Api/AiAgentCallController.php:60
* @route '/api/v1/ai-agent-calls/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::show
* @see app/Http/Controllers/Api/AiAgentCallController.php:60
* @route '/api/v1/ai-agent-calls/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::show
* @see app/Http/Controllers/Api/AiAgentCallController.php:60
* @route '/api/v1/ai-agent-calls/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\AiAgentCallController::stop
* @see app/Http/Controllers/Api/AiAgentCallController.php:254
* @route '/api/v1/ai-agent-calls/{id}/stop'
*/
export const stop = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

stop.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agent-calls/{id}/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stop
* @see app/Http/Controllers/Api/AiAgentCallController.php:254
* @route '/api/v1/ai-agent-calls/{id}/stop'
*/
stop.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return stop.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stop
* @see app/Http/Controllers/Api/AiAgentCallController.php:254
* @route '/api/v1/ai-agent-calls/{id}/stop'
*/
stop.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stop
* @see app/Http/Controllers/Api/AiAgentCallController.php:254
* @route '/api/v1/ai-agent-calls/{id}/stop'
*/
const stopForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stop.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::stop
* @see app/Http/Controllers/Api/AiAgentCallController.php:254
* @route '/api/v1/ai-agent-calls/{id}/stop'
*/
stopForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stop.url(args, options),
    method: 'post',
})

stop.form = stopForm

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::sync
* @see app/Http/Controllers/Api/AiAgentCallController.php:306
* @route '/api/v1/ai-agent-calls/{id}/sync'
*/
export const sync = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/api/v1/ai-agent-calls/{id}/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::sync
* @see app/Http/Controllers/Api/AiAgentCallController.php:306
* @route '/api/v1/ai-agent-calls/{id}/sync'
*/
sync.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return sync.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::sync
* @see app/Http/Controllers/Api/AiAgentCallController.php:306
* @route '/api/v1/ai-agent-calls/{id}/sync'
*/
sync.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::sync
* @see app/Http/Controllers/Api/AiAgentCallController.php:306
* @route '/api/v1/ai-agent-calls/{id}/sync'
*/
const syncForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::sync
* @see app/Http/Controllers/Api/AiAgentCallController.php:306
* @route '/api/v1/ai-agent-calls/{id}/sync'
*/
syncForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(args, options),
    method: 'post',
})

sync.form = syncForm

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::transcript
* @see app/Http/Controllers/Api/AiAgentCallController.php:375
* @route '/api/v1/ai-agent-calls/{id}/transcript'
*/
export const transcript = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transcript.url(args, options),
    method: 'get',
})

transcript.definition = {
    methods: ["get","head"],
    url: '/api/v1/ai-agent-calls/{id}/transcript',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::transcript
* @see app/Http/Controllers/Api/AiAgentCallController.php:375
* @route '/api/v1/ai-agent-calls/{id}/transcript'
*/
transcript.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return transcript.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::transcript
* @see app/Http/Controllers/Api/AiAgentCallController.php:375
* @route '/api/v1/ai-agent-calls/{id}/transcript'
*/
transcript.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transcript.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::transcript
* @see app/Http/Controllers/Api/AiAgentCallController.php:375
* @route '/api/v1/ai-agent-calls/{id}/transcript'
*/
transcript.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transcript.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::transcript
* @see app/Http/Controllers/Api/AiAgentCallController.php:375
* @route '/api/v1/ai-agent-calls/{id}/transcript'
*/
const transcriptForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transcript.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::transcript
* @see app/Http/Controllers/Api/AiAgentCallController.php:375
* @route '/api/v1/ai-agent-calls/{id}/transcript'
*/
transcriptForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transcript.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::transcript
* @see app/Http/Controllers/Api/AiAgentCallController.php:375
* @route '/api/v1/ai-agent-calls/{id}/transcript'
*/
transcriptForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transcript.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

transcript.form = transcriptForm

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::handleCallStatus
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
export const handleCallStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleCallStatus.url(options),
    method: 'post',
})

handleCallStatus.definition = {
    methods: ["post"],
    url: '/webhooks/twilio/call/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::handleCallStatus
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
handleCallStatus.url = (options?: RouteQueryOptions) => {
    return handleCallStatus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::handleCallStatus
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
handleCallStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleCallStatus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::handleCallStatus
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
const handleCallStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleCallStatus.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AiAgentCallController::handleCallStatus
* @see app/Http/Controllers/Api/AiAgentCallController.php:513
* @route '/webhooks/twilio/call/status'
*/
handleCallStatusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handleCallStatus.url(options),
    method: 'post',
})

handleCallStatus.form = handleCallStatusForm

const AiAgentCallController = { index, exportMethod, active, stats, initiate, show, stop, sync, transcript, handleCallStatus, export: exportMethod }

export default AiAgentCallController