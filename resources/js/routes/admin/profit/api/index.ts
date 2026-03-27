import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::stats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/admin/profit/api/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::stats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::stats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::stats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::stats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::stats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::stats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
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
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dailyTrend
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:163
* @route '/admin/profit/api/daily-trend'
*/
export const dailyTrend = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailyTrend.url(options),
    method: 'get',
})

dailyTrend.definition = {
    methods: ["get","head"],
    url: '/admin/profit/api/daily-trend',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dailyTrend
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:163
* @route '/admin/profit/api/daily-trend'
*/
dailyTrend.url = (options?: RouteQueryOptions) => {
    return dailyTrend.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dailyTrend
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:163
* @route '/admin/profit/api/daily-trend'
*/
dailyTrend.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailyTrend.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dailyTrend
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:163
* @route '/admin/profit/api/daily-trend'
*/
dailyTrend.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dailyTrend.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dailyTrend
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:163
* @route '/admin/profit/api/daily-trend'
*/
const dailyTrendForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dailyTrend.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dailyTrend
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:163
* @route '/admin/profit/api/daily-trend'
*/
dailyTrendForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dailyTrend.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::dailyTrend
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:163
* @route '/admin/profit/api/daily-trend'
*/
dailyTrendForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dailyTrend.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dailyTrend.form = dailyTrendForm

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::serviceBreakdown
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:172
* @route '/admin/profit/api/service-breakdown'
*/
export const serviceBreakdown = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serviceBreakdown.url(options),
    method: 'get',
})

serviceBreakdown.definition = {
    methods: ["get","head"],
    url: '/admin/profit/api/service-breakdown',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::serviceBreakdown
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:172
* @route '/admin/profit/api/service-breakdown'
*/
serviceBreakdown.url = (options?: RouteQueryOptions) => {
    return serviceBreakdown.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::serviceBreakdown
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:172
* @route '/admin/profit/api/service-breakdown'
*/
serviceBreakdown.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serviceBreakdown.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::serviceBreakdown
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:172
* @route '/admin/profit/api/service-breakdown'
*/
serviceBreakdown.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: serviceBreakdown.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::serviceBreakdown
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:172
* @route '/admin/profit/api/service-breakdown'
*/
const serviceBreakdownForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serviceBreakdown.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::serviceBreakdown
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:172
* @route '/admin/profit/api/service-breakdown'
*/
serviceBreakdownForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serviceBreakdown.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::serviceBreakdown
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:172
* @route '/admin/profit/api/service-breakdown'
*/
serviceBreakdownForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serviceBreakdown.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

serviceBreakdown.form = serviceBreakdownForm

const api = {
    stats: Object.assign(stats, stats),
    dailyTrend: Object.assign(dailyTrend, dailyTrend),
    serviceBreakdown: Object.assign(serviceBreakdown, serviceBreakdown),
}

export default api