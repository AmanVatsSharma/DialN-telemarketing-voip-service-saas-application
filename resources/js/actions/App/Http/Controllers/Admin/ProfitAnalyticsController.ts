import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::index
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:18
* @route '/admin/profit-analytics'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/profit-analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::index
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:18
* @route '/admin/profit-analytics'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::index
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:18
* @route '/admin/profit-analytics'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::index
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:18
* @route '/admin/profit-analytics'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::index
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:18
* @route '/admin/profit-analytics'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::index
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:18
* @route '/admin/profit-analytics'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::index
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:18
* @route '/admin/profit-analytics'
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
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::exportMethod
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:174
* @route '/admin/profit-analytics/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/profit-analytics/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::exportMethod
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:174
* @route '/admin/profit-analytics/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::exportMethod
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:174
* @route '/admin/profit-analytics/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::exportMethod
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:174
* @route '/admin/profit-analytics/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::exportMethod
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:174
* @route '/admin/profit-analytics/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::exportMethod
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:174
* @route '/admin/profit-analytics/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitAnalyticsController::exportMethod
* @see app/Http/Controllers/Admin/ProfitAnalyticsController.php:174
* @route '/admin/profit-analytics/export'
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

const ProfitAnalyticsController = { index, exportMethod, export: exportMethod }

export default ProfitAnalyticsController