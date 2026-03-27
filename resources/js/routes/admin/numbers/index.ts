import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::index
* @see app/Http/Controllers/Admin/PhoneNumberController.php:25
* @route '/admin/numbers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/numbers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::index
* @see app/Http/Controllers/Admin/PhoneNumberController.php:25
* @route '/admin/numbers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::index
* @see app/Http/Controllers/Admin/PhoneNumberController.php:25
* @route '/admin/numbers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::index
* @see app/Http/Controllers/Admin/PhoneNumberController.php:25
* @route '/admin/numbers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::index
* @see app/Http/Controllers/Admin/PhoneNumberController.php:25
* @route '/admin/numbers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::index
* @see app/Http/Controllers/Admin/PhoneNumberController.php:25
* @route '/admin/numbers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::index
* @see app/Http/Controllers/Admin/PhoneNumberController.php:25
* @route '/admin/numbers'
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
* @see \App\Http\Controllers\Admin\PhoneNumberController::supportedCountries
* @see app/Http/Controllers/Admin/PhoneNumberController.php:649
* @route '/admin/numbers/supported-countries'
*/
export const supportedCountries = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: supportedCountries.url(options),
    method: 'get',
})

supportedCountries.definition = {
    methods: ["get","head"],
    url: '/admin/numbers/supported-countries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::supportedCountries
* @see app/Http/Controllers/Admin/PhoneNumberController.php:649
* @route '/admin/numbers/supported-countries'
*/
supportedCountries.url = (options?: RouteQueryOptions) => {
    return supportedCountries.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::supportedCountries
* @see app/Http/Controllers/Admin/PhoneNumberController.php:649
* @route '/admin/numbers/supported-countries'
*/
supportedCountries.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: supportedCountries.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::supportedCountries
* @see app/Http/Controllers/Admin/PhoneNumberController.php:649
* @route '/admin/numbers/supported-countries'
*/
supportedCountries.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: supportedCountries.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::supportedCountries
* @see app/Http/Controllers/Admin/PhoneNumberController.php:649
* @route '/admin/numbers/supported-countries'
*/
const supportedCountriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: supportedCountries.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::supportedCountries
* @see app/Http/Controllers/Admin/PhoneNumberController.php:649
* @route '/admin/numbers/supported-countries'
*/
supportedCountriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: supportedCountries.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::supportedCountries
* @see app/Http/Controllers/Admin/PhoneNumberController.php:649
* @route '/admin/numbers/supported-countries'
*/
supportedCountriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: supportedCountries.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

supportedCountries.form = supportedCountriesForm

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::sync
* @see app/Http/Controllers/Admin/PhoneNumberController.php:247
* @route '/admin/numbers/sync'
*/
export const sync = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/admin/numbers/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::sync
* @see app/Http/Controllers/Admin/PhoneNumberController.php:247
* @route '/admin/numbers/sync'
*/
sync.url = (options?: RouteQueryOptions) => {
    return sync.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::sync
* @see app/Http/Controllers/Admin/PhoneNumberController.php:247
* @route '/admin/numbers/sync'
*/
sync.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::sync
* @see app/Http/Controllers/Admin/PhoneNumberController.php:247
* @route '/admin/numbers/sync'
*/
const syncForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::sync
* @see app/Http/Controllers/Admin/PhoneNumberController.php:247
* @route '/admin/numbers/sync'
*/
syncForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(options),
    method: 'post',
})

sync.form = syncForm

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::configure
* @see app/Http/Controllers/Admin/PhoneNumberController.php:336
* @route '/admin/numbers/configure'
*/
export const configure = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configure.url(options),
    method: 'post',
})

configure.definition = {
    methods: ["post"],
    url: '/admin/numbers/configure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::configure
* @see app/Http/Controllers/Admin/PhoneNumberController.php:336
* @route '/admin/numbers/configure'
*/
configure.url = (options?: RouteQueryOptions) => {
    return configure.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::configure
* @see app/Http/Controllers/Admin/PhoneNumberController.php:336
* @route '/admin/numbers/configure'
*/
configure.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configure.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::configure
* @see app/Http/Controllers/Admin/PhoneNumberController.php:336
* @route '/admin/numbers/configure'
*/
const configureForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configure.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::configure
* @see app/Http/Controllers/Admin/PhoneNumberController.php:336
* @route '/admin/numbers/configure'
*/
configureForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: configure.url(options),
    method: 'post',
})

configure.form = configureForm

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::assign
* @see app/Http/Controllers/Admin/PhoneNumberController.php:469
* @route '/admin/numbers/assign'
*/
export const assign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/admin/numbers/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::assign
* @see app/Http/Controllers/Admin/PhoneNumberController.php:469
* @route '/admin/numbers/assign'
*/
assign.url = (options?: RouteQueryOptions) => {
    return assign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::assign
* @see app/Http/Controllers/Admin/PhoneNumberController.php:469
* @route '/admin/numbers/assign'
*/
assign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::assign
* @see app/Http/Controllers/Admin/PhoneNumberController.php:469
* @route '/admin/numbers/assign'
*/
const assignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::assign
* @see app/Http/Controllers/Admin/PhoneNumberController.php:469
* @route '/admin/numbers/assign'
*/
assignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assign.url(options),
    method: 'post',
})

assign.form = assignForm

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::release
* @see app/Http/Controllers/Admin/PhoneNumberController.php:405
* @route '/admin/numbers/{phoneNumber}/release'
*/
export const release = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: release.url(args, options),
    method: 'delete',
})

release.definition = {
    methods: ["delete"],
    url: '/admin/numbers/{phoneNumber}/release',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::release
* @see app/Http/Controllers/Admin/PhoneNumberController.php:405
* @route '/admin/numbers/{phoneNumber}/release'
*/
release.url = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { phoneNumber: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { phoneNumber: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            phoneNumber: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        phoneNumber: typeof args.phoneNumber === 'object'
        ? args.phoneNumber.id
        : args.phoneNumber,
    }

    return release.definition.url
            .replace('{phoneNumber}', parsedArgs.phoneNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::release
* @see app/Http/Controllers/Admin/PhoneNumberController.php:405
* @route '/admin/numbers/{phoneNumber}/release'
*/
release.delete = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: release.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::release
* @see app/Http/Controllers/Admin/PhoneNumberController.php:405
* @route '/admin/numbers/{phoneNumber}/release'
*/
const releaseForm = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: release.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::release
* @see app/Http/Controllers/Admin/PhoneNumberController.php:405
* @route '/admin/numbers/{phoneNumber}/release'
*/
releaseForm.delete = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: release.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

release.form = releaseForm

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::revoke
* @see app/Http/Controllers/Admin/PhoneNumberController.php:421
* @route '/admin/numbers/{phoneNumber}/revoke'
*/
export const revoke = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

revoke.definition = {
    methods: ["post"],
    url: '/admin/numbers/{phoneNumber}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::revoke
* @see app/Http/Controllers/Admin/PhoneNumberController.php:421
* @route '/admin/numbers/{phoneNumber}/revoke'
*/
revoke.url = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { phoneNumber: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { phoneNumber: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            phoneNumber: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        phoneNumber: typeof args.phoneNumber === 'object'
        ? args.phoneNumber.id
        : args.phoneNumber,
    }

    return revoke.definition.url
            .replace('{phoneNumber}', parsedArgs.phoneNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::revoke
* @see app/Http/Controllers/Admin/PhoneNumberController.php:421
* @route '/admin/numbers/{phoneNumber}/revoke'
*/
revoke.post = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::revoke
* @see app/Http/Controllers/Admin/PhoneNumberController.php:421
* @route '/admin/numbers/{phoneNumber}/revoke'
*/
const revokeForm = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::revoke
* @see app/Http/Controllers/Admin/PhoneNumberController.php:421
* @route '/admin/numbers/{phoneNumber}/revoke'
*/
revokeForm.post = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, options),
    method: 'post',
})

revoke.form = revokeForm

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::available
* @see app/Http/Controllers/Admin/PhoneNumberController.php:438
* @route '/admin/numbers/available'
*/
export const available = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})

available.definition = {
    methods: ["get","head"],
    url: '/admin/numbers/available',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::available
* @see app/Http/Controllers/Admin/PhoneNumberController.php:438
* @route '/admin/numbers/available'
*/
available.url = (options?: RouteQueryOptions) => {
    return available.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::available
* @see app/Http/Controllers/Admin/PhoneNumberController.php:438
* @route '/admin/numbers/available'
*/
available.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::available
* @see app/Http/Controllers/Admin/PhoneNumberController.php:438
* @route '/admin/numbers/available'
*/
available.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: available.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::available
* @see app/Http/Controllers/Admin/PhoneNumberController.php:438
* @route '/admin/numbers/available'
*/
const availableForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: available.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::available
* @see app/Http/Controllers/Admin/PhoneNumberController.php:438
* @route '/admin/numbers/available'
*/
availableForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: available.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::available
* @see app/Http/Controllers/Admin/PhoneNumberController.php:438
* @route '/admin/numbers/available'
*/
availableForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: available.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

available.form = availableForm

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::statistics
* @see app/Http/Controllers/Admin/PhoneNumberController.php:457
* @route '/admin/numbers/statistics'
*/
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/admin/numbers/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::statistics
* @see app/Http/Controllers/Admin/PhoneNumberController.php:457
* @route '/admin/numbers/statistics'
*/
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::statistics
* @see app/Http/Controllers/Admin/PhoneNumberController.php:457
* @route '/admin/numbers/statistics'
*/
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::statistics
* @see app/Http/Controllers/Admin/PhoneNumberController.php:457
* @route '/admin/numbers/statistics'
*/
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::statistics
* @see app/Http/Controllers/Admin/PhoneNumberController.php:457
* @route '/admin/numbers/statistics'
*/
const statisticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::statistics
* @see app/Http/Controllers/Admin/PhoneNumberController.php:457
* @route '/admin/numbers/statistics'
*/
statisticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PhoneNumberController::statistics
* @see app/Http/Controllers/Admin/PhoneNumberController.php:457
* @route '/admin/numbers/statistics'
*/
statisticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statistics.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

statistics.form = statisticsForm

const numbers = {
    index: Object.assign(index, index),
    supportedCountries: Object.assign(supportedCountries, supportedCountries),
    sync: Object.assign(sync, sync),
    configure: Object.assign(configure, configure),
    assign: Object.assign(assign, assign),
    release: Object.assign(release, release),
    revoke: Object.assign(revoke, revoke),
    available: Object.assign(available, available),
    statistics: Object.assign(statistics, statistics),
}

export default numbers