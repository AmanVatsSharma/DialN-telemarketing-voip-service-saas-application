import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

const cronMonitor = {
    cleanup: Object.assign(cleanup, cleanup),
}

export default cronMonitor