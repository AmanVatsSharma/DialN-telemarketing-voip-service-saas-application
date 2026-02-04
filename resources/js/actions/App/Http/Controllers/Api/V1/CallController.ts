import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\CallController::index
* @see app/Http/Controllers/Api/V1/CallController.php:34
* @route '/api/v1/calls'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CallController::index
* @see app/Http/Controllers/Api/V1/CallController.php:34
* @route '/api/v1/calls'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CallController::index
* @see app/Http/Controllers/Api/V1/CallController.php:34
* @route '/api/v1/calls'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::index
* @see app/Http/Controllers/Api/V1/CallController.php:34
* @route '/api/v1/calls'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::index
* @see app/Http/Controllers/Api/V1/CallController.php:34
* @route '/api/v1/calls'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::index
* @see app/Http/Controllers/Api/V1/CallController.php:34
* @route '/api/v1/calls'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::index
* @see app/Http/Controllers/Api/V1/CallController.php:34
* @route '/api/v1/calls'
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
* @see \App\Http\Controllers\Api\V1\CallController::show
* @see app/Http/Controllers/Api/V1/CallController.php:65
* @route '/api/v1/calls/{call}'
*/
export const show = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/calls/{call}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CallController::show
* @see app/Http/Controllers/Api/V1/CallController.php:65
* @route '/api/v1/calls/{call}'
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
* @see \App\Http\Controllers\Api\V1\CallController::show
* @see app/Http/Controllers/Api/V1/CallController.php:65
* @route '/api/v1/calls/{call}'
*/
show.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::show
* @see app/Http/Controllers/Api/V1/CallController.php:65
* @route '/api/v1/calls/{call}'
*/
show.head = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::show
* @see app/Http/Controllers/Api/V1/CallController.php:65
* @route '/api/v1/calls/{call}'
*/
const showForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::show
* @see app/Http/Controllers/Api/V1/CallController.php:65
* @route '/api/v1/calls/{call}'
*/
showForm.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::show
* @see app/Http/Controllers/Api/V1/CallController.php:65
* @route '/api/v1/calls/{call}'
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
* @see \App\Http\Controllers\Api\V1\CallController::recording
* @see app/Http/Controllers/Api/V1/CallController.php:95
* @route '/api/v1/calls/{call}/recording'
*/
export const recording = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recording.url(args, options),
    method: 'get',
})

recording.definition = {
    methods: ["get","head"],
    url: '/api/v1/calls/{call}/recording',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CallController::recording
* @see app/Http/Controllers/Api/V1/CallController.php:95
* @route '/api/v1/calls/{call}/recording'
*/
recording.url = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return recording.definition.url
            .replace('{call}', parsedArgs.call.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CallController::recording
* @see app/Http/Controllers/Api/V1/CallController.php:95
* @route '/api/v1/calls/{call}/recording'
*/
recording.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recording.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::recording
* @see app/Http/Controllers/Api/V1/CallController.php:95
* @route '/api/v1/calls/{call}/recording'
*/
recording.head = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recording.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::recording
* @see app/Http/Controllers/Api/V1/CallController.php:95
* @route '/api/v1/calls/{call}/recording'
*/
const recordingForm = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recording.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::recording
* @see app/Http/Controllers/Api/V1/CallController.php:95
* @route '/api/v1/calls/{call}/recording'
*/
recordingForm.get = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recording.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CallController::recording
* @see app/Http/Controllers/Api/V1/CallController.php:95
* @route '/api/v1/calls/{call}/recording'
*/
recordingForm.head = (args: { call: number | { id: number } } | [call: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: recording.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

recording.form = recordingForm

const CallController = { index, show, recording }

export default CallController