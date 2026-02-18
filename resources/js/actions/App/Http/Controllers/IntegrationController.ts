import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IntegrationController::index
* @see app/Http/Controllers/IntegrationController.php:18
* @route '/integrations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/integrations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IntegrationController::index
* @see app/Http/Controllers/IntegrationController.php:18
* @route '/integrations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IntegrationController::index
* @see app/Http/Controllers/IntegrationController.php:18
* @route '/integrations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::index
* @see app/Http/Controllers/IntegrationController.php:18
* @route '/integrations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IntegrationController::index
* @see app/Http/Controllers/IntegrationController.php:18
* @route '/integrations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::index
* @see app/Http/Controllers/IntegrationController.php:18
* @route '/integrations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::index
* @see app/Http/Controllers/IntegrationController.php:18
* @route '/integrations'
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
* @see \App\Http\Controllers\IntegrationController::create
* @see app/Http/Controllers/IntegrationController.php:50
* @route '/integrations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/integrations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IntegrationController::create
* @see app/Http/Controllers/IntegrationController.php:50
* @route '/integrations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IntegrationController::create
* @see app/Http/Controllers/IntegrationController.php:50
* @route '/integrations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::create
* @see app/Http/Controllers/IntegrationController.php:50
* @route '/integrations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IntegrationController::create
* @see app/Http/Controllers/IntegrationController.php:50
* @route '/integrations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::create
* @see app/Http/Controllers/IntegrationController.php:50
* @route '/integrations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::create
* @see app/Http/Controllers/IntegrationController.php:50
* @route '/integrations/create'
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
* @see \App\Http\Controllers\IntegrationController::edit
* @see app/Http/Controllers/IntegrationController.php:58
* @route '/integrations/{id}/edit'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/integrations/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IntegrationController::edit
* @see app/Http/Controllers/IntegrationController.php:58
* @route '/integrations/{id}/edit'
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
* @see \App\Http\Controllers\IntegrationController::edit
* @see app/Http/Controllers/IntegrationController.php:58
* @route '/integrations/{id}/edit'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::edit
* @see app/Http/Controllers/IntegrationController.php:58
* @route '/integrations/{id}/edit'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IntegrationController::edit
* @see app/Http/Controllers/IntegrationController.php:58
* @route '/integrations/{id}/edit'
*/
const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::edit
* @see app/Http/Controllers/IntegrationController.php:58
* @route '/integrations/{id}/edit'
*/
editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::edit
* @see app/Http/Controllers/IntegrationController.php:58
* @route '/integrations/{id}/edit'
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

/**
* @see \App\Http\Controllers\IntegrationController::logs
* @see app/Http/Controllers/IntegrationController.php:71
* @route '/integrations/{id}/logs'
*/
export const logs = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(args, options),
    method: 'get',
})

logs.definition = {
    methods: ["get","head"],
    url: '/integrations/{id}/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IntegrationController::logs
* @see app/Http/Controllers/IntegrationController.php:71
* @route '/integrations/{id}/logs'
*/
logs.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return logs.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IntegrationController::logs
* @see app/Http/Controllers/IntegrationController.php:71
* @route '/integrations/{id}/logs'
*/
logs.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::logs
* @see app/Http/Controllers/IntegrationController.php:71
* @route '/integrations/{id}/logs'
*/
logs.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logs.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IntegrationController::logs
* @see app/Http/Controllers/IntegrationController.php:71
* @route '/integrations/{id}/logs'
*/
const logsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::logs
* @see app/Http/Controllers/IntegrationController.php:71
* @route '/integrations/{id}/logs'
*/
logsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::logs
* @see app/Http/Controllers/IntegrationController.php:71
* @route '/integrations/{id}/logs'
*/
logsForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

logs.form = logsForm

/**
* @see \App\Http\Controllers\IntegrationController::allLogs
* @see app/Http/Controllers/IntegrationController.php:92
* @route '/integrations/logs'
*/
export const allLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allLogs.url(options),
    method: 'get',
})

allLogs.definition = {
    methods: ["get","head"],
    url: '/integrations/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IntegrationController::allLogs
* @see app/Http/Controllers/IntegrationController.php:92
* @route '/integrations/logs'
*/
allLogs.url = (options?: RouteQueryOptions) => {
    return allLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IntegrationController::allLogs
* @see app/Http/Controllers/IntegrationController.php:92
* @route '/integrations/logs'
*/
allLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::allLogs
* @see app/Http/Controllers/IntegrationController.php:92
* @route '/integrations/logs'
*/
allLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allLogs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IntegrationController::allLogs
* @see app/Http/Controllers/IntegrationController.php:92
* @route '/integrations/logs'
*/
const allLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::allLogs
* @see app/Http/Controllers/IntegrationController.php:92
* @route '/integrations/logs'
*/
allLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IntegrationController::allLogs
* @see app/Http/Controllers/IntegrationController.php:92
* @route '/integrations/logs'
*/
allLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allLogs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allLogs.form = allLogsForm

const IntegrationController = { index, create, edit, logs, allLogs }

export default IntegrationController