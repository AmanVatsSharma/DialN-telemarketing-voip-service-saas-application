import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import systemConfigB2f7e8 from './system-config'
import cronMonitorD8941e from './cron-monitor'
import numbers from './numbers'
import numberRequests from './number-requests'
import creditManagement from './credit-management'
import pricing from './pricing'
import profit from './profit'
import profitAnalytics from './profit-analytics'
import theme from './theme'
import kyc from './kyc'
/**
* @see \App\Http\Controllers\Admin\CallLogsController::callLogs
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
export const callLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callLogs.url(options),
    method: 'get',
})

callLogs.definition = {
    methods: ["get","head"],
    url: '/admin/call-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CallLogsController::callLogs
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
callLogs.url = (options?: RouteQueryOptions) => {
    return callLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CallLogsController::callLogs
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
callLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::callLogs
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
callLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callLogs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::callLogs
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
const callLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::callLogs
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
callLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CallLogsController::callLogs
* @see app/Http/Controllers/Admin/CallLogsController.php:13
* @route '/admin/call-logs'
*/
callLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callLogs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

callLogs.form = callLogsForm

/**
* @see \App\Http\Controllers\Admin\ErrorLogsController::errorLogs
* @see app/Http/Controllers/Admin/ErrorLogsController.php:20
* @route '/admin/error-logs'
*/
export const errorLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: errorLogs.url(options),
    method: 'get',
})

errorLogs.definition = {
    methods: ["get","head"],
    url: '/admin/error-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ErrorLogsController::errorLogs
* @see app/Http/Controllers/Admin/ErrorLogsController.php:20
* @route '/admin/error-logs'
*/
errorLogs.url = (options?: RouteQueryOptions) => {
    return errorLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ErrorLogsController::errorLogs
* @see app/Http/Controllers/Admin/ErrorLogsController.php:20
* @route '/admin/error-logs'
*/
errorLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: errorLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ErrorLogsController::errorLogs
* @see app/Http/Controllers/Admin/ErrorLogsController.php:20
* @route '/admin/error-logs'
*/
errorLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: errorLogs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ErrorLogsController::errorLogs
* @see app/Http/Controllers/Admin/ErrorLogsController.php:20
* @route '/admin/error-logs'
*/
const errorLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: errorLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ErrorLogsController::errorLogs
* @see app/Http/Controllers/Admin/ErrorLogsController.php:20
* @route '/admin/error-logs'
*/
errorLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: errorLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ErrorLogsController::errorLogs
* @see app/Http/Controllers/Admin/ErrorLogsController.php:20
* @route '/admin/error-logs'
*/
errorLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: errorLogs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

errorLogs.form = errorLogsForm

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::systemConfig
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
export const systemConfig = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemConfig.url(options),
    method: 'get',
})

systemConfig.definition = {
    methods: ["get","head"],
    url: '/admin/system-config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::systemConfig
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
systemConfig.url = (options?: RouteQueryOptions) => {
    return systemConfig.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::systemConfig
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
systemConfig.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemConfig.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::systemConfig
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
systemConfig.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: systemConfig.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::systemConfig
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
const systemConfigForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: systemConfig.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::systemConfig
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
systemConfigForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: systemConfig.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SystemConfigController::systemConfig
* @see app/Http/Controllers/Admin/SystemConfigController.php:16
* @route '/admin/system-config'
*/
systemConfigForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: systemConfig.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

systemConfig.form = systemConfigForm

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cronMonitor
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
export const cronMonitor = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cronMonitor.url(options),
    method: 'get',
})

cronMonitor.definition = {
    methods: ["get","head"],
    url: '/admin/cron-monitor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cronMonitor
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
cronMonitor.url = (options?: RouteQueryOptions) => {
    return cronMonitor.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cronMonitor
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
cronMonitor.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cronMonitor.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cronMonitor
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
cronMonitor.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cronMonitor.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cronMonitor
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
const cronMonitorForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cronMonitor.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cronMonitor
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
cronMonitorForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cronMonitor.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CronMonitorController::cronMonitor
* @see app/Http/Controllers/Admin/CronMonitorController.php:18
* @route '/admin/cron-monitor'
*/
cronMonitorForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cronMonitor.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

cronMonitor.form = cronMonitorForm

const admin = {
    callLogs: Object.assign(callLogs, callLogs),
    errorLogs: Object.assign(errorLogs, errorLogs),
    systemConfig: Object.assign(systemConfig, systemConfigB2f7e8),
    cronMonitor: Object.assign(cronMonitor, cronMonitorD8941e),
    numbers: Object.assign(numbers, numbers),
    numberRequests: Object.assign(numberRequests, numberRequests),
    creditManagement: Object.assign(creditManagement, creditManagement),
    pricing: Object.assign(pricing, pricing),
    profit: Object.assign(profit, profit),
    profitAnalytics: Object.assign(profitAnalytics, profitAnalytics),
    theme: Object.assign(theme, theme),
    kyc: Object.assign(kyc, kyc),
}

export default admin