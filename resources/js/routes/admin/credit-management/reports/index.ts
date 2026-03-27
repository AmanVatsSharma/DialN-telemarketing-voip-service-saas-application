import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportMethod
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/credit-management/reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportMethod
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportMethod
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportMethod
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportMethod
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportMethod
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportMethod
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
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

const reports = {
    export: Object.assign(exportMethod, exportMethod),
}

export default reports