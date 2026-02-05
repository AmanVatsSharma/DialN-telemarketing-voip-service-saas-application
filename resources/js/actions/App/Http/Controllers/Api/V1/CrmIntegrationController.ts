import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::index
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:26
* @route '/api/v1/crm-integrations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/crm-integrations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::index
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:26
* @route '/api/v1/crm-integrations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::index
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:26
* @route '/api/v1/crm-integrations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::index
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:26
* @route '/api/v1/crm-integrations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::index
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:26
* @route '/api/v1/crm-integrations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::index
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:26
* @route '/api/v1/crm-integrations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::index
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:26
* @route '/api/v1/crm-integrations'
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
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::store
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:55
* @route '/api/v1/crm-integrations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/crm-integrations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::store
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:55
* @route '/api/v1/crm-integrations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::store
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:55
* @route '/api/v1/crm-integrations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::store
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:55
* @route '/api/v1/crm-integrations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::store
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:55
* @route '/api/v1/crm-integrations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::stats
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:253
* @route '/api/v1/crm-integrations/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/crm-integrations/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::stats
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:253
* @route '/api/v1/crm-integrations/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::stats
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:253
* @route '/api/v1/crm-integrations/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::stats
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:253
* @route '/api/v1/crm-integrations/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::stats
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:253
* @route '/api/v1/crm-integrations/stats'
*/
const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::stats
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:253
* @route '/api/v1/crm-integrations/stats'
*/
statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::stats
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:253
* @route '/api/v1/crm-integrations/stats'
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
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::allLogs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:199
* @route '/api/v1/crm-integrations/logs'
*/
export const allLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allLogs.url(options),
    method: 'get',
})

allLogs.definition = {
    methods: ["get","head"],
    url: '/api/v1/crm-integrations/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::allLogs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:199
* @route '/api/v1/crm-integrations/logs'
*/
allLogs.url = (options?: RouteQueryOptions) => {
    return allLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::allLogs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:199
* @route '/api/v1/crm-integrations/logs'
*/
allLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::allLogs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:199
* @route '/api/v1/crm-integrations/logs'
*/
allLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allLogs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::allLogs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:199
* @route '/api/v1/crm-integrations/logs'
*/
const allLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::allLogs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:199
* @route '/api/v1/crm-integrations/logs'
*/
allLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::allLogs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:199
* @route '/api/v1/crm-integrations/logs'
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

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::show
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:41
* @route '/api/v1/crm-integrations/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/crm-integrations/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::show
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:41
* @route '/api/v1/crm-integrations/{id}'
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
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::show
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:41
* @route '/api/v1/crm-integrations/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::show
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:41
* @route '/api/v1/crm-integrations/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::show
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:41
* @route '/api/v1/crm-integrations/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::show
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:41
* @route '/api/v1/crm-integrations/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::show
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:41
* @route '/api/v1/crm-integrations/{id}'
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
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::update
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:101
* @route '/api/v1/crm-integrations/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/crm-integrations/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::update
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:101
* @route '/api/v1/crm-integrations/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::update
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:101
* @route '/api/v1/crm-integrations/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::update
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:101
* @route '/api/v1/crm-integrations/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::update
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:101
* @route '/api/v1/crm-integrations/{id}'
*/
updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::destroy
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:149
* @route '/api/v1/crm-integrations/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/crm-integrations/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::destroy
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:149
* @route '/api/v1/crm-integrations/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::destroy
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:149
* @route '/api/v1/crm-integrations/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::destroy
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:149
* @route '/api/v1/crm-integrations/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::destroy
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:149
* @route '/api/v1/crm-integrations/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::test
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:165
* @route '/api/v1/crm-integrations/{id}/test'
*/
export const test = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/api/v1/crm-integrations/{id}/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::test
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:165
* @route '/api/v1/crm-integrations/{id}/test'
*/
test.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return test.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::test
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:165
* @route '/api/v1/crm-integrations/{id}/test'
*/
test.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::test
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:165
* @route '/api/v1/crm-integrations/{id}/test'
*/
const testForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: test.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::test
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:165
* @route '/api/v1/crm-integrations/{id}/test'
*/
testForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: test.url(args, options),
    method: 'post',
})

test.form = testForm

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::logs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:181
* @route '/api/v1/crm-integrations/{id}/logs'
*/
export const logs = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(args, options),
    method: 'get',
})

logs.definition = {
    methods: ["get","head"],
    url: '/api/v1/crm-integrations/{id}/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::logs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:181
* @route '/api/v1/crm-integrations/{id}/logs'
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
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::logs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:181
* @route '/api/v1/crm-integrations/{id}/logs'
*/
logs.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::logs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:181
* @route '/api/v1/crm-integrations/{id}/logs'
*/
logs.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logs.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::logs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:181
* @route '/api/v1/crm-integrations/{id}/logs'
*/
const logsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::logs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:181
* @route '/api/v1/crm-integrations/{id}/logs'
*/
logsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logs.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::logs
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:181
* @route '/api/v1/crm-integrations/{id}/logs'
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
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::retry
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:235
* @route '/api/v1/crm-integrations/logs/{logId}/retry'
*/
export const retry = (args: { logId: string | number } | [logId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

retry.definition = {
    methods: ["post"],
    url: '/api/v1/crm-integrations/logs/{logId}/retry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::retry
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:235
* @route '/api/v1/crm-integrations/logs/{logId}/retry'
*/
retry.url = (args: { logId: string | number } | [logId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { logId: args }
    }

    if (Array.isArray(args)) {
        args = {
            logId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        logId: args.logId,
    }

    return retry.definition.url
            .replace('{logId}', parsedArgs.logId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::retry
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:235
* @route '/api/v1/crm-integrations/logs/{logId}/retry'
*/
retry.post = (args: { logId: string | number } | [logId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::retry
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:235
* @route '/api/v1/crm-integrations/logs/{logId}/retry'
*/
const retryForm = (args: { logId: string | number } | [logId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: retry.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\CrmIntegrationController::retry
* @see app/Http/Controllers/Api/V1/CrmIntegrationController.php:235
* @route '/api/v1/crm-integrations/logs/{logId}/retry'
*/
retryForm.post = (args: { logId: string | number } | [logId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: retry.url(args, options),
    method: 'post',
})

retry.form = retryForm

const CrmIntegrationController = { index, store, stats, allLogs, show, update, destroy, test, logs, retry }

export default CrmIntegrationController