import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import provider from './provider'
import trunk from './trunk'
/**
* @see \App\Http\Controllers\ByocTrunkController::index
* @see app/Http/Controllers/ByocTrunkController.php:106
* @route '/byoc'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/byoc',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::index
* @see app/Http/Controllers/ByocTrunkController.php:106
* @route '/byoc'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::index
* @see app/Http/Controllers/ByocTrunkController.php:106
* @route '/byoc'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::index
* @see app/Http/Controllers/ByocTrunkController.php:106
* @route '/byoc'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::index
* @see app/Http/Controllers/ByocTrunkController.php:106
* @route '/byoc'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::index
* @see app/Http/Controllers/ByocTrunkController.php:106
* @route '/byoc'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::index
* @see app/Http/Controllers/ByocTrunkController.php:106
* @route '/byoc'
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
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
export const setup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(options),
    method: 'get',
})

setup.definition = {
    methods: ["get","head"],
    url: '/byoc/setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setup.url = (options?: RouteQueryOptions) => {
    return setup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setup.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
const setupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setup.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setupForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setup.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

setup.form = setupForm

/**
* @see \App\Http\Controllers\ByocTrunkController::store
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/byoc/setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::store
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::store
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::store
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::store
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ByocTrunkController::show
* @see app/Http/Controllers/ByocTrunkController.php:139
* @route '/byoc/{trunk}'
*/
export const show = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/byoc/{trunk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::show
* @see app/Http/Controllers/ByocTrunkController.php:139
* @route '/byoc/{trunk}'
*/
show.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trunk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { trunk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            trunk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        trunk: typeof args.trunk === 'object'
        ? args.trunk.id
        : args.trunk,
    }

    return show.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::show
* @see app/Http/Controllers/ByocTrunkController.php:139
* @route '/byoc/{trunk}'
*/
show.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::show
* @see app/Http/Controllers/ByocTrunkController.php:139
* @route '/byoc/{trunk}'
*/
show.head = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::show
* @see app/Http/Controllers/ByocTrunkController.php:139
* @route '/byoc/{trunk}'
*/
const showForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::show
* @see app/Http/Controllers/ByocTrunkController.php:139
* @route '/byoc/{trunk}'
*/
showForm.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::show
* @see app/Http/Controllers/ByocTrunkController.php:139
* @route '/byoc/{trunk}'
*/
showForm.head = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ByocTrunkController::destroy
* @see app/Http/Controllers/ByocTrunkController.php:300
* @route '/byoc/{trunk}'
*/
export const destroy = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/byoc/{trunk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::destroy
* @see app/Http/Controllers/ByocTrunkController.php:300
* @route '/byoc/{trunk}'
*/
destroy.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trunk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { trunk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            trunk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        trunk: typeof args.trunk === 'object'
        ? args.trunk.id
        : args.trunk,
    }

    return destroy.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::destroy
* @see app/Http/Controllers/ByocTrunkController.php:300
* @route '/byoc/{trunk}'
*/
destroy.delete = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::destroy
* @see app/Http/Controllers/ByocTrunkController.php:300
* @route '/byoc/{trunk}'
*/
const destroyForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::destroy
* @see app/Http/Controllers/ByocTrunkController.php:300
* @route '/byoc/{trunk}'
*/
destroyForm.delete = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\ByocTrunkController::setupStatus
* @see app/Http/Controllers/ByocTrunkController.php:90
* @route '/byoc/{trunk}/setup-status'
*/
export const setupStatus = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupStatus.url(args, options),
    method: 'get',
})

setupStatus.definition = {
    methods: ["get","head"],
    url: '/byoc/{trunk}/setup-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::setupStatus
* @see app/Http/Controllers/ByocTrunkController.php:90
* @route '/byoc/{trunk}/setup-status'
*/
setupStatus.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trunk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { trunk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            trunk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        trunk: typeof args.trunk === 'object'
        ? args.trunk.id
        : args.trunk,
    }

    return setupStatus.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::setupStatus
* @see app/Http/Controllers/ByocTrunkController.php:90
* @route '/byoc/{trunk}/setup-status'
*/
setupStatus.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupStatus
* @see app/Http/Controllers/ByocTrunkController.php:90
* @route '/byoc/{trunk}/setup-status'
*/
setupStatus.head = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setupStatus.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupStatus
* @see app/Http/Controllers/ByocTrunkController.php:90
* @route '/byoc/{trunk}/setup-status'
*/
const setupStatusForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupStatus
* @see app/Http/Controllers/ByocTrunkController.php:90
* @route '/byoc/{trunk}/setup-status'
*/
setupStatusForm.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupStatus
* @see app/Http/Controllers/ByocTrunkController.php:90
* @route '/byoc/{trunk}/setup-status'
*/
setupStatusForm.head = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

setupStatus.form = setupStatusForm

const byoc = {
    index: Object.assign(index, index),
    setup: Object.assign(setup, setup),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    destroy: Object.assign(destroy, destroy),
    setupStatus: Object.assign(setupStatus, setupStatus),
    provider: Object.assign(provider, provider),
    trunk: Object.assign(trunk, trunk),
}

export default byoc