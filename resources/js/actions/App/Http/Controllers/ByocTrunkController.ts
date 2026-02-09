import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\ByocTrunkController::setupWizard
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
export const setupWizard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupWizard.url(options),
    method: 'get',
})

setupWizard.definition = {
    methods: ["get","head"],
    url: '/byoc/setup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::setupWizard
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setupWizard.url = (options?: RouteQueryOptions) => {
    return setupWizard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::setupWizard
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setupWizard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: setupWizard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupWizard
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setupWizard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: setupWizard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupWizard
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
const setupWizardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupWizard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupWizard
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setupWizardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupWizard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setupWizard
* @see app/Http/Controllers/ByocTrunkController.php:22
* @route '/byoc/setup'
*/
setupWizardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: setupWizard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

setupWizard.form = setupWizardForm

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
export const setup = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(options),
    method: 'post',
})

setup.definition = {
    methods: ["post"],
    url: '/byoc/setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
setup.url = (options?: RouteQueryOptions) => {
    return setup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
setup.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
const setupForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setup.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::setup
* @see app/Http/Controllers/ByocTrunkController.php:45
* @route '/byoc/setup'
*/
setupForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setup.url(options),
    method: 'post',
})

setup.form = setupForm

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

/**
* @see \App\Http\Controllers\ByocTrunkController::addProvider
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
export const addProvider = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addProvider.url(args, options),
    method: 'post',
})

addProvider.definition = {
    methods: ["post"],
    url: '/byoc/{trunk}/providers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::addProvider
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
addProvider.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return addProvider.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::addProvider
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
addProvider.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addProvider.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::addProvider
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
const addProviderForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addProvider.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::addProvider
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
addProviderForm.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addProvider.url(args, options),
    method: 'post',
})

addProvider.form = addProviderForm

/**
* @see \App\Http\Controllers\ByocTrunkController::updateProvider
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
export const updateProvider = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProvider.url(args, options),
    method: 'put',
})

updateProvider.definition = {
    methods: ["put"],
    url: '/byoc/providers/{target}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::updateProvider
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
updateProvider.url = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { target: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { target: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            target: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        target: typeof args.target === 'object'
        ? args.target.id
        : args.target,
    }

    return updateProvider.definition.url
            .replace('{target}', parsedArgs.target.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::updateProvider
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
updateProvider.put = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProvider.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::updateProvider
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
const updateProviderForm = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateProvider.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::updateProvider
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
updateProviderForm.put = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateProvider.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateProvider.form = updateProviderForm

/**
* @see \App\Http\Controllers\ByocTrunkController::removeProvider
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
export const removeProvider = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeProvider.url(args, options),
    method: 'delete',
})

removeProvider.definition = {
    methods: ["delete"],
    url: '/byoc/providers/{target}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::removeProvider
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
removeProvider.url = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { target: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { target: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            target: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        target: typeof args.target === 'object'
        ? args.target.id
        : args.target,
    }

    return removeProvider.definition.url
            .replace('{target}', parsedArgs.target.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::removeProvider
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
removeProvider.delete = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeProvider.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::removeProvider
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
const removeProviderForm = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeProvider.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::removeProvider
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
removeProviderForm.delete = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeProvider.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

removeProvider.form = removeProviderForm

/**
* @see \App\Http\Controllers\ByocTrunkController::voiceWebhook
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
export const voiceWebhook = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voiceWebhook.url(args, options),
    method: 'post',
})

voiceWebhook.definition = {
    methods: ["post"],
    url: '/byoc/trunk/voice/{user}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::voiceWebhook
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
voiceWebhook.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return voiceWebhook.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::voiceWebhook
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
voiceWebhook.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voiceWebhook.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::voiceWebhook
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
const voiceWebhookForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voiceWebhook.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::voiceWebhook
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
voiceWebhookForm.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voiceWebhook.url(args, options),
    method: 'post',
})

voiceWebhook.form = voiceWebhookForm

const ByocTrunkController = { index, setupWizard, setup, show, destroy, setupStatus, addProvider, updateProvider, removeProvider, voiceWebhook }

export default ByocTrunkController