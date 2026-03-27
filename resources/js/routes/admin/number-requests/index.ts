import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NumberRequestController::index
* @see app/Http/Controllers/Admin/NumberRequestController.php:23
* @route '/admin/number-requests'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/number-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::index
* @see app/Http/Controllers/Admin/NumberRequestController.php:23
* @route '/admin/number-requests'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::index
* @see app/Http/Controllers/Admin/NumberRequestController.php:23
* @route '/admin/number-requests'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::index
* @see app/Http/Controllers/Admin/NumberRequestController.php:23
* @route '/admin/number-requests'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::index
* @see app/Http/Controllers/Admin/NumberRequestController.php:23
* @route '/admin/number-requests'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::index
* @see app/Http/Controllers/Admin/NumberRequestController.php:23
* @route '/admin/number-requests'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::index
* @see app/Http/Controllers/Admin/NumberRequestController.php:23
* @route '/admin/number-requests'
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
* @see \App\Http\Controllers\Admin\NumberRequestController::show
* @see app/Http/Controllers/Admin/NumberRequestController.php:60
* @route '/admin/number-requests/{numberRequest}'
*/
export const show = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/number-requests/{numberRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::show
* @see app/Http/Controllers/Admin/NumberRequestController.php:60
* @route '/admin/number-requests/{numberRequest}'
*/
show.url = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { numberRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { numberRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            numberRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        numberRequest: typeof args.numberRequest === 'object'
        ? args.numberRequest.id
        : args.numberRequest,
    }

    return show.definition.url
            .replace('{numberRequest}', parsedArgs.numberRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::show
* @see app/Http/Controllers/Admin/NumberRequestController.php:60
* @route '/admin/number-requests/{numberRequest}'
*/
show.get = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::show
* @see app/Http/Controllers/Admin/NumberRequestController.php:60
* @route '/admin/number-requests/{numberRequest}'
*/
show.head = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::show
* @see app/Http/Controllers/Admin/NumberRequestController.php:60
* @route '/admin/number-requests/{numberRequest}'
*/
const showForm = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::show
* @see app/Http/Controllers/Admin/NumberRequestController.php:60
* @route '/admin/number-requests/{numberRequest}'
*/
showForm.get = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::show
* @see app/Http/Controllers/Admin/NumberRequestController.php:60
* @route '/admin/number-requests/{numberRequest}'
*/
showForm.head = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\NumberRequestController::approve
* @see app/Http/Controllers/Admin/NumberRequestController.php:74
* @route '/admin/number-requests/{numberRequest}/approve'
*/
export const approve = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/number-requests/{numberRequest}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::approve
* @see app/Http/Controllers/Admin/NumberRequestController.php:74
* @route '/admin/number-requests/{numberRequest}/approve'
*/
approve.url = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { numberRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { numberRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            numberRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        numberRequest: typeof args.numberRequest === 'object'
        ? args.numberRequest.id
        : args.numberRequest,
    }

    return approve.definition.url
            .replace('{numberRequest}', parsedArgs.numberRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::approve
* @see app/Http/Controllers/Admin/NumberRequestController.php:74
* @route '/admin/number-requests/{numberRequest}/approve'
*/
approve.post = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::approve
* @see app/Http/Controllers/Admin/NumberRequestController.php:74
* @route '/admin/number-requests/{numberRequest}/approve'
*/
const approveForm = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::approve
* @see app/Http/Controllers/Admin/NumberRequestController.php:74
* @route '/admin/number-requests/{numberRequest}/approve'
*/
approveForm.post = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::reject
* @see app/Http/Controllers/Admin/NumberRequestController.php:98
* @route '/admin/number-requests/{numberRequest}/reject'
*/
export const reject = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/number-requests/{numberRequest}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::reject
* @see app/Http/Controllers/Admin/NumberRequestController.php:98
* @route '/admin/number-requests/{numberRequest}/reject'
*/
reject.url = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { numberRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { numberRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            numberRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        numberRequest: typeof args.numberRequest === 'object'
        ? args.numberRequest.id
        : args.numberRequest,
    }

    return reject.definition.url
            .replace('{numberRequest}', parsedArgs.numberRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::reject
* @see app/Http/Controllers/Admin/NumberRequestController.php:98
* @route '/admin/number-requests/{numberRequest}/reject'
*/
reject.post = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::reject
* @see app/Http/Controllers/Admin/NumberRequestController.php:98
* @route '/admin/number-requests/{numberRequest}/reject'
*/
const rejectForm = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::reject
* @see app/Http/Controllers/Admin/NumberRequestController.php:98
* @route '/admin/number-requests/{numberRequest}/reject'
*/
rejectForm.post = (args: { numberRequest: number | { id: number } } | [numberRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::pendingCount
* @see app/Http/Controllers/Admin/NumberRequestController.php:122
* @route '/admin/number-requests/pending/count'
*/
export const pendingCount = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendingCount.url(options),
    method: 'get',
})

pendingCount.definition = {
    methods: ["get","head"],
    url: '/admin/number-requests/pending/count',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::pendingCount
* @see app/Http/Controllers/Admin/NumberRequestController.php:122
* @route '/admin/number-requests/pending/count'
*/
pendingCount.url = (options?: RouteQueryOptions) => {
    return pendingCount.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::pendingCount
* @see app/Http/Controllers/Admin/NumberRequestController.php:122
* @route '/admin/number-requests/pending/count'
*/
pendingCount.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendingCount.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::pendingCount
* @see app/Http/Controllers/Admin/NumberRequestController.php:122
* @route '/admin/number-requests/pending/count'
*/
pendingCount.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pendingCount.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::pendingCount
* @see app/Http/Controllers/Admin/NumberRequestController.php:122
* @route '/admin/number-requests/pending/count'
*/
const pendingCountForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pendingCount.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::pendingCount
* @see app/Http/Controllers/Admin/NumberRequestController.php:122
* @route '/admin/number-requests/pending/count'
*/
pendingCountForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pendingCount.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NumberRequestController::pendingCount
* @see app/Http/Controllers/Admin/NumberRequestController.php:122
* @route '/admin/number-requests/pending/count'
*/
pendingCountForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pendingCount.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pendingCount.form = pendingCountForm

const numberRequests = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    approve: Object.assign(approve, approve),
    reject: Object.assign(reject, reject),
    pendingCount: Object.assign(pendingCount, pendingCount),
}

export default numberRequests