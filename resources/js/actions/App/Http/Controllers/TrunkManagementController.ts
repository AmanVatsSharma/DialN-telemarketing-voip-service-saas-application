import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TrunkManagementController::index
* @see app/Http/Controllers/TrunkManagementController.php:35
* @route '/sip-trunk'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sip-trunk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::index
* @see app/Http/Controllers/TrunkManagementController.php:35
* @route '/sip-trunk'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkManagementController::index
* @see app/Http/Controllers/TrunkManagementController.php:35
* @route '/sip-trunk'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::index
* @see app/Http/Controllers/TrunkManagementController.php:35
* @route '/sip-trunk'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::index
* @see app/Http/Controllers/TrunkManagementController.php:35
* @route '/sip-trunk'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::index
* @see app/Http/Controllers/TrunkManagementController.php:35
* @route '/sip-trunk'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::index
* @see app/Http/Controllers/TrunkManagementController.php:35
* @route '/sip-trunk'
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
* @see \App\Http\Controllers\TrunkManagementController::create
* @see app/Http/Controllers/TrunkManagementController.php:72
* @route '/sip-trunk/setup'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sip-trunk/setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::create
* @see app/Http/Controllers/TrunkManagementController.php:72
* @route '/sip-trunk/setup'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkManagementController::create
* @see app/Http/Controllers/TrunkManagementController.php:72
* @route '/sip-trunk/setup'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::create
* @see app/Http/Controllers/TrunkManagementController.php:72
* @route '/sip-trunk/setup'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::create
* @see app/Http/Controllers/TrunkManagementController.php:72
* @route '/sip-trunk/setup'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::create
* @see app/Http/Controllers/TrunkManagementController.php:72
* @route '/sip-trunk/setup'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::create
* @see app/Http/Controllers/TrunkManagementController.php:72
* @route '/sip-trunk/setup'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\TrunkManagementController::store
* @see app/Http/Controllers/TrunkManagementController.php:119
* @route '/sip-trunk/setup'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sip-trunk/setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::store
* @see app/Http/Controllers/TrunkManagementController.php:119
* @route '/sip-trunk/setup'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkManagementController::store
* @see app/Http/Controllers/TrunkManagementController.php:119
* @route '/sip-trunk/setup'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::store
* @see app/Http/Controllers/TrunkManagementController.php:119
* @route '/sip-trunk/setup'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::store
* @see app/Http/Controllers/TrunkManagementController.php:119
* @route '/sip-trunk/setup'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TrunkManagementController::show
* @see app/Http/Controllers/TrunkManagementController.php:222
* @route '/sip-trunk/{trunk}'
*/
export const show = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sip-trunk/{trunk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::show
* @see app/Http/Controllers/TrunkManagementController.php:222
* @route '/sip-trunk/{trunk}'
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
* @see \App\Http\Controllers\TrunkManagementController::show
* @see app/Http/Controllers/TrunkManagementController.php:222
* @route '/sip-trunk/{trunk}'
*/
show.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::show
* @see app/Http/Controllers/TrunkManagementController.php:222
* @route '/sip-trunk/{trunk}'
*/
show.head = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::show
* @see app/Http/Controllers/TrunkManagementController.php:222
* @route '/sip-trunk/{trunk}'
*/
const showForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::show
* @see app/Http/Controllers/TrunkManagementController.php:222
* @route '/sip-trunk/{trunk}'
*/
showForm.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::show
* @see app/Http/Controllers/TrunkManagementController.php:222
* @route '/sip-trunk/{trunk}'
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
* @see \App\Http\Controllers\TrunkManagementController::destroy
* @see app/Http/Controllers/TrunkManagementController.php:371
* @route '/sip-trunk/{trunk}'
*/
export const destroy = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sip-trunk/{trunk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::destroy
* @see app/Http/Controllers/TrunkManagementController.php:371
* @route '/sip-trunk/{trunk}'
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
* @see \App\Http\Controllers\TrunkManagementController::destroy
* @see app/Http/Controllers/TrunkManagementController.php:371
* @route '/sip-trunk/{trunk}'
*/
destroy.delete = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::destroy
* @see app/Http/Controllers/TrunkManagementController.php:371
* @route '/sip-trunk/{trunk}'
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
* @see \App\Http\Controllers\TrunkManagementController::destroy
* @see app/Http/Controllers/TrunkManagementController.php:371
* @route '/sip-trunk/{trunk}'
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
* @see \App\Http\Controllers\TrunkManagementController::setupStatus
* @see app/Http/Controllers/TrunkManagementController.php:282
* @route '/sip-trunk/{trunk}/setup-status'
*/
export const setupStatus = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupStatus.url(args, options),
    method: 'get',
})

setupStatus.definition = {
    methods: ["get","head"],
    url: '/sip-trunk/{trunk}/setup-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::setupStatus
* @see app/Http/Controllers/TrunkManagementController.php:282
* @route '/sip-trunk/{trunk}/setup-status'
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
* @see \App\Http\Controllers\TrunkManagementController::setupStatus
* @see app/Http/Controllers/TrunkManagementController.php:282
* @route '/sip-trunk/{trunk}/setup-status'
*/
setupStatus.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::setupStatus
* @see app/Http/Controllers/TrunkManagementController.php:282
* @route '/sip-trunk/{trunk}/setup-status'
*/
setupStatus.head = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setupStatus.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::setupStatus
* @see app/Http/Controllers/TrunkManagementController.php:282
* @route '/sip-trunk/{trunk}/setup-status'
*/
const setupStatusForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::setupStatus
* @see app/Http/Controllers/TrunkManagementController.php:282
* @route '/sip-trunk/{trunk}/setup-status'
*/
setupStatusForm.get = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::setupStatus
* @see app/Http/Controllers/TrunkManagementController.php:282
* @route '/sip-trunk/{trunk}/setup-status'
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

/**
* @see \App\Http\Controllers\TrunkManagementController::sync
* @see app/Http/Controllers/TrunkManagementController.php:301
* @route '/sip-trunk/{trunk}/sync'
*/
export const sync = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/sip-trunk/{trunk}/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::sync
* @see app/Http/Controllers/TrunkManagementController.php:301
* @route '/sip-trunk/{trunk}/sync'
*/
sync.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return sync.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkManagementController::sync
* @see app/Http/Controllers/TrunkManagementController.php:301
* @route '/sip-trunk/{trunk}/sync'
*/
sync.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::sync
* @see app/Http/Controllers/TrunkManagementController.php:301
* @route '/sip-trunk/{trunk}/sync'
*/
const syncForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::sync
* @see app/Http/Controllers/TrunkManagementController.php:301
* @route '/sip-trunk/{trunk}/sync'
*/
syncForm.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sync.url(args, options),
    method: 'post',
})

sync.form = syncForm

/**
* @see \App\Http\Controllers\TrunkManagementController::health
* @see app/Http/Controllers/TrunkManagementController.php:338
* @route '/sip-trunk/{trunk}/health'
*/
export const health = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: health.url(args, options),
    method: 'post',
})

health.definition = {
    methods: ["post"],
    url: '/sip-trunk/{trunk}/health',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrunkManagementController::health
* @see app/Http/Controllers/TrunkManagementController.php:338
* @route '/sip-trunk/{trunk}/health'
*/
health.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return health.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrunkManagementController::health
* @see app/Http/Controllers/TrunkManagementController.php:338
* @route '/sip-trunk/{trunk}/health'
*/
health.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: health.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::health
* @see app/Http/Controllers/TrunkManagementController.php:338
* @route '/sip-trunk/{trunk}/health'
*/
const healthForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: health.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TrunkManagementController::health
* @see app/Http/Controllers/TrunkManagementController.php:338
* @route '/sip-trunk/{trunk}/health'
*/
healthForm.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: health.url(args, options),
    method: 'post',
})

health.form = healthForm

const TrunkManagementController = { index, create, store, show, destroy, setupStatus, sync, health }

export default TrunkManagementController