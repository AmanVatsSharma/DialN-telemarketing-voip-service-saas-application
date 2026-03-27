import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import sync22cd6d from './sync'
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
* @see \App\Http\Controllers\CallController::sync
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
export const sync = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/calls/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CallController::sync
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
sync.url = (options?: RouteQueryOptions) => {
    return sync.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CallController::sync
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
sync.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::sync
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
const syncForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CallController::sync
* @see app/Http/Controllers/CallController.php:173
* @route '/calls/sync'
*/
syncForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

sync.form = syncForm

const calls = {
    initiate: Object.assign(initiate, initiate),
    end: Object.assign(end, end),
    status: Object.assign(status, status),
    index: Object.assign(index, index),
    export: Object.assign(exportMethod, exportMethod),
    show: Object.assign(show, show),
    sync: Object.assign(sync, sync22cd6d),
}

export default calls