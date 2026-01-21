import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CronMonitorController::index
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/cron-monitor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::index
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::index
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::index
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::index
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::index
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::index
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
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
* @see \App\Http\Controllers\Admin\CronMonitorController::cleanup
* @see app/Http/Controllers/Admin/CronMonitorController.php:87
* @route '/admin/cron-monitor/cleanup'
*/
export const cleanup = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cleanup.url(options),
    method: 'post',
})

cleanup.definition = {
    methods: ["post"],
    url: '/admin/cron-monitor/cleanup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cleanup
* @see app/Http/Controllers/Admin/CronMonitorController.php:87
* @route '/admin/cron-monitor/cleanup'
*/
cleanup.url = (options?: RouteQueryOptions) => {
    return cleanup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cleanup
* @see app/Http/Controllers/Admin/CronMonitorController.php:87
* @route '/admin/cron-monitor/cleanup'
*/
cleanup.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cleanup.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cleanup
* @see app/Http/Controllers/Admin/CronMonitorController.php:87
* @route '/admin/cron-monitor/cleanup'
*/
const cleanupForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cleanup.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cleanup
* @see app/Http/Controllers/Admin/CronMonitorController.php:87
* @route '/admin/cron-monitor/cleanup'
*/
cleanupForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cleanup.url(options),
    method: 'post',
})

cleanup.form = cleanupForm

const CronMonitorController = { index, cleanup }

export default CronMonitorController