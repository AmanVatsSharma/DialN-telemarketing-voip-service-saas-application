import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CallLogsController::index
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/call-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CallLogsController::index
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CallLogsController::index
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::index
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::index
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::index
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::index
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
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

const CallLogsController = { index }

export default CallLogsController