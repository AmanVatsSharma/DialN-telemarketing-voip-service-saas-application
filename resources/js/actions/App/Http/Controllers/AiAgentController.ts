import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AiAgentController::index
* @see app/Http/Controllers/AiAgentController.php:16
* @route '/ai-agents'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ai-agents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AiAgentController::index
* @see app/Http/Controllers/AiAgentController.php:16
* @route '/ai-agents'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AiAgentController::index
* @see app/Http/Controllers/AiAgentController.php:16
* @route '/ai-agents'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::index
* @see app/Http/Controllers/AiAgentController.php:16
* @route '/ai-agents'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AiAgentController::index
* @see app/Http/Controllers/AiAgentController.php:16
* @route '/ai-agents'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::index
* @see app/Http/Controllers/AiAgentController.php:16
* @route '/ai-agents'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::index
* @see app/Http/Controllers/AiAgentController.php:16
* @route '/ai-agents'
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
* @see \App\Http\Controllers\AiAgentController::create
* @see app/Http/Controllers/AiAgentController.php:24
* @route '/ai-agents/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ai-agents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AiAgentController::create
* @see app/Http/Controllers/AiAgentController.php:24
* @route '/ai-agents/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AiAgentController::create
* @see app/Http/Controllers/AiAgentController.php:24
* @route '/ai-agents/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::create
* @see app/Http/Controllers/AiAgentController.php:24
* @route '/ai-agents/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AiAgentController::create
* @see app/Http/Controllers/AiAgentController.php:24
* @route '/ai-agents/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::create
* @see app/Http/Controllers/AiAgentController.php:24
* @route '/ai-agents/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::create
* @see app/Http/Controllers/AiAgentController.php:24
* @route '/ai-agents/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\AiAgentController::live
* @see app/Http/Controllers/AiAgentController.php:32
* @route '/ai-agents/live'
*/
export const live = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: live.url(options),
    method: 'get',
})

live.definition = {
    methods: ["get","head"],
    url: '/ai-agents/live',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AiAgentController::live
* @see app/Http/Controllers/AiAgentController.php:32
* @route '/ai-agents/live'
*/
live.url = (options?: RouteQueryOptions) => {
    return live.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AiAgentController::live
* @see app/Http/Controllers/AiAgentController.php:32
* @route '/ai-agents/live'
*/
live.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: live.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::live
* @see app/Http/Controllers/AiAgentController.php:32
* @route '/ai-agents/live'
*/
live.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: live.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AiAgentController::live
* @see app/Http/Controllers/AiAgentController.php:32
* @route '/ai-agents/live'
*/
const liveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: live.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::live
* @see app/Http/Controllers/AiAgentController.php:32
* @route '/ai-agents/live'
*/
liveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: live.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::live
* @see app/Http/Controllers/AiAgentController.php:32
* @route '/ai-agents/live'
*/
liveForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: live.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

live.form = liveForm

/**
* @see \App\Http\Controllers\AiAgentController::calls
* @see app/Http/Controllers/AiAgentController.php:40
* @route '/ai-agents/calls'
*/
export const calls = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(options),
    method: 'get',
})

calls.definition = {
    methods: ["get","head"],
    url: '/ai-agents/calls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AiAgentController::calls
* @see app/Http/Controllers/AiAgentController.php:40
* @route '/ai-agents/calls'
*/
calls.url = (options?: RouteQueryOptions) => {
    return calls.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AiAgentController::calls
* @see app/Http/Controllers/AiAgentController.php:40
* @route '/ai-agents/calls'
*/
calls.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calls.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::calls
* @see app/Http/Controllers/AiAgentController.php:40
* @route '/ai-agents/calls'
*/
calls.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calls.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AiAgentController::calls
* @see app/Http/Controllers/AiAgentController.php:40
* @route '/ai-agents/calls'
*/
const callsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::calls
* @see app/Http/Controllers/AiAgentController.php:40
* @route '/ai-agents/calls'
*/
callsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::calls
* @see app/Http/Controllers/AiAgentController.php:40
* @route '/ai-agents/calls'
*/
callsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calls.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

calls.form = callsForm

/**
* @see \App\Http\Controllers\AiAgentController::show
* @see app/Http/Controllers/AiAgentController.php:48
* @route '/ai-agents/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/ai-agents/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AiAgentController::show
* @see app/Http/Controllers/AiAgentController.php:48
* @route '/ai-agents/{id}'
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
* @see \App\Http\Controllers\AiAgentController::show
* @see app/Http/Controllers/AiAgentController.php:48
* @route '/ai-agents/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::show
* @see app/Http/Controllers/AiAgentController.php:48
* @route '/ai-agents/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AiAgentController::show
* @see app/Http/Controllers/AiAgentController.php:48
* @route '/ai-agents/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::show
* @see app/Http/Controllers/AiAgentController.php:48
* @route '/ai-agents/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::show
* @see app/Http/Controllers/AiAgentController.php:48
* @route '/ai-agents/{id}'
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
* @see \App\Http\Controllers\AiAgentController::edit
* @see app/Http/Controllers/AiAgentController.php:58
* @route '/ai-agents/{id}/edit'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/ai-agents/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AiAgentController::edit
* @see app/Http/Controllers/AiAgentController.php:58
* @route '/ai-agents/{id}/edit'
*/
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AiAgentController::edit
* @see app/Http/Controllers/AiAgentController.php:58
* @route '/ai-agents/{id}/edit'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::edit
* @see app/Http/Controllers/AiAgentController.php:58
* @route '/ai-agents/{id}/edit'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AiAgentController::edit
* @see app/Http/Controllers/AiAgentController.php:58
* @route '/ai-agents/{id}/edit'
*/
const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::edit
* @see app/Http/Controllers/AiAgentController.php:58
* @route '/ai-agents/{id}/edit'
*/
editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AiAgentController::edit
* @see app/Http/Controllers/AiAgentController.php:58
* @route '/ai-agents/{id}/edit'
*/
editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

const AiAgentController = { index, create, live, calls, show, edit }

export default AiAgentController