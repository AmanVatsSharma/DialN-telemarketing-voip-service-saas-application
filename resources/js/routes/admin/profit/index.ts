import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import api from './api'
/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dashboard
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/profit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dashboard
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dashboard
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dashboard
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dashboard
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dashboard
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dashboard
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::exportMethod
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:72
* @route '/admin/profit/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/profit/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::exportMethod
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:72
* @route '/admin/profit/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::exportMethod
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:72
* @route '/admin/profit/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::exportMethod
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:72
* @route '/admin/profit/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::exportMethod
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:72
* @route '/admin/profit/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::exportMethod
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:72
* @route '/admin/profit/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::exportMethod
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:72
* @route '/admin/profit/export'
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

const profit = {
    dashboard: Object.assign(dashboard, dashboard),
    export: Object.assign(exportMethod, exportMethod),
    api: Object.assign(api, api),
}

export default profit