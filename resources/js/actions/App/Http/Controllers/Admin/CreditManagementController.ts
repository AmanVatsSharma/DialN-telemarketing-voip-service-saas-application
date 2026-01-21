import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CreditManagementController::index
* @see app/Http/Controllers/Admin/CreditManagementController.php:25
* @route '/admin/credit-management'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/credit-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::index
* @see app/Http/Controllers/Admin/CreditManagementController.php:25
* @route '/admin/credit-management'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::index
* @see app/Http/Controllers/Admin/CreditManagementController.php:25
* @route '/admin/credit-management'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::index
* @see app/Http/Controllers/Admin/CreditManagementController.php:25
* @route '/admin/credit-management'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::index
* @see app/Http/Controllers/Admin/CreditManagementController.php:25
* @route '/admin/credit-management'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::index
* @see app/Http/Controllers/Admin/CreditManagementController.php:25
* @route '/admin/credit-management'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::index
* @see app/Http/Controllers/Admin/CreditManagementController.php:25
* @route '/admin/credit-management'
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
* @see \App\Http\Controllers\Admin\CreditManagementController::show
* @see app/Http/Controllers/Admin/CreditManagementController.php:68
* @route '/admin/credit-management/users/{user}'
*/
export const show = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/credit-management/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::show
* @see app/Http/Controllers/Admin/CreditManagementController.php:68
* @route '/admin/credit-management/users/{user}'
*/
show.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::show
* @see app/Http/Controllers/Admin/CreditManagementController.php:68
* @route '/admin/credit-management/users/{user}'
*/
show.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::show
* @see app/Http/Controllers/Admin/CreditManagementController.php:68
* @route '/admin/credit-management/users/{user}'
*/
show.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::show
* @see app/Http/Controllers/Admin/CreditManagementController.php:68
* @route '/admin/credit-management/users/{user}'
*/
const showForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::show
* @see app/Http/Controllers/Admin/CreditManagementController.php:68
* @route '/admin/credit-management/users/{user}'
*/
showForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::show
* @see app/Http/Controllers/Admin/CreditManagementController.php:68
* @route '/admin/credit-management/users/{user}'
*/
showForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CreditManagementController::adjustCredit
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
export const adjustCredit = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjustCredit.url(args, options),
    method: 'post',
})

adjustCredit.definition = {
    methods: ["post"],
    url: '/admin/credit-management/users/{user}/adjust',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjustCredit
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
adjustCredit.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return adjustCredit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjustCredit
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
adjustCredit.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjustCredit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjustCredit
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
const adjustCreditForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjustCredit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjustCredit
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
adjustCreditForm.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjustCredit.url(args, options),
    method: 'post',
})

adjustCredit.form = adjustCreditForm

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::allTransactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
export const allTransactions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTransactions.url(options),
    method: 'get',
})

allTransactions.definition = {
    methods: ["get","head"],
    url: '/admin/credit-management/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::allTransactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
allTransactions.url = (options?: RouteQueryOptions) => {
    return allTransactions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::allTransactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
allTransactions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTransactions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::allTransactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
allTransactions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allTransactions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::allTransactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
const allTransactionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTransactions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::allTransactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
allTransactionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTransactions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::allTransactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
allTransactionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: allTransactions.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

allTransactions.form = allTransactionsForm

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::reports
* @see app/Http/Controllers/Admin/CreditManagementController.php:225
* @route '/admin/credit-management/reports'
*/
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/admin/credit-management/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::reports
* @see app/Http/Controllers/Admin/CreditManagementController.php:225
* @route '/admin/credit-management/reports'
*/
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::reports
* @see app/Http/Controllers/Admin/CreditManagementController.php:225
* @route '/admin/credit-management/reports'
*/
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::reports
* @see app/Http/Controllers/Admin/CreditManagementController.php:225
* @route '/admin/credit-management/reports'
*/
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::reports
* @see app/Http/Controllers/Admin/CreditManagementController.php:225
* @route '/admin/credit-management/reports'
*/
const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reports.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::reports
* @see app/Http/Controllers/Admin/CreditManagementController.php:225
* @route '/admin/credit-management/reports'
*/
reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reports.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::reports
* @see app/Http/Controllers/Admin/CreditManagementController.php:225
* @route '/admin/credit-management/reports'
*/
reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reports.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reports.form = reportsForm

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportReport
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
export const exportReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportReport.url(options),
    method: 'get',
})

exportReport.definition = {
    methods: ["get","head"],
    url: '/admin/credit-management/reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportReport
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportReport.url = (options?: RouteQueryOptions) => {
    return exportReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportReport
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportReport
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportReport.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportReport
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
const exportReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportReport
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportReport.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::exportReport
* @see app/Http/Controllers/Admin/CreditManagementController.php:293
* @route '/admin/credit-management/reports/export'
*/
exportReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportReport.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportReport.form = exportReportForm

const CreditManagementController = { index, show, adjustCredit, allTransactions, reports, exportReport }

export default CreditManagementController