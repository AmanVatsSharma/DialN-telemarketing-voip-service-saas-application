import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import reports3613d0 from './reports'
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
* @see \App\Http\Controllers\Admin\CreditManagementController::adjust
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
export const adjust = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjust.url(args, options),
    method: 'post',
})

adjust.definition = {
    methods: ["post"],
    url: '/admin/credit-management/users/{user}/adjust',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjust
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
adjust.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return adjust.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjust
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
adjust.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjust.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjust
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
const adjustForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjust.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::adjust
* @see app/Http/Controllers/Admin/CreditManagementController.php:87
* @route '/admin/credit-management/users/{user}/adjust'
*/
adjustForm.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjust.url(args, options),
    method: 'post',
})

adjust.form = adjustForm

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::transactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
export const transactions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})

transactions.definition = {
    methods: ["get","head"],
    url: '/admin/credit-management/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::transactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
transactions.url = (options?: RouteQueryOptions) => {
    return transactions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::transactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
transactions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::transactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
transactions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::transactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
const transactionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transactions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::transactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
transactionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transactions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CreditManagementController::transactions
* @see app/Http/Controllers/Admin/CreditManagementController.php:140
* @route '/admin/credit-management/transactions'
*/
transactionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transactions.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

transactions.form = transactionsForm

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

const creditManagement = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    adjust: Object.assign(adjust, adjust),
    transactions: Object.assign(transactions, transactions),
    reports: Object.assign(reports, reports3613d0),
}

export default creditManagement