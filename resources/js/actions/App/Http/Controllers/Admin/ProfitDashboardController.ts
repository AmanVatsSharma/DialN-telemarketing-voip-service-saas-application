import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::index
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/profit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::index
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::index
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::index
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::index
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::index
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::index
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:20
* @route '/admin/profit'
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

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::realTimeStats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
export const realTimeStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: realTimeStats.url(options),
    method: 'get',
})

realTimeStats.definition = {
    methods: ["get","head"],
    url: '/admin/profit/api/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::realTimeStats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
realTimeStats.url = (options?: RouteQueryOptions) => {
    return realTimeStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::realTimeStats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
realTimeStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: realTimeStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::realTimeStats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
realTimeStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: realTimeStats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::realTimeStats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
const realTimeStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: realTimeStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::realTimeStats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
realTimeStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: realTimeStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProfitDashboardController::realTimeStats
* @see app/Http/Controllers/Admin/ProfitDashboardController.php:155
* @route '/admin/profit/api/stats'
*/
realTimeStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: realTimeStats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

realTimeStats.form = realTimeStatsForm

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

const ProfitDashboardController = { index, exportMethod, realTimeStats, dailyTrend, serviceBreakdown, export: exportMethod }

export default ProfitDashboardController