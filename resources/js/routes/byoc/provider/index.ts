import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ByocTrunkController::add
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
export const add = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(args, options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/byoc/{trunk}/providers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::add
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
add.url = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return add.definition.url
            .replace('{trunk}', parsedArgs.trunk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::add
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
add.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::add
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
const addForm = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: add.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::add
* @see app/Http/Controllers/ByocTrunkController.php:199
* @route '/byoc/{trunk}/providers'
*/
addForm.post = (args: { trunk: number | { id: number } } | [trunk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: add.url(args, options),
    method: 'post',
})

add.form = addForm

/**
* @see \App\Http\Controllers\ByocTrunkController::update
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
export const update = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/byoc/providers/{target}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::update
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
update.url = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{target}', parsedArgs.target.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::update
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
update.put = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::update
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
const updateForm = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::update
* @see app/Http/Controllers/ByocTrunkController.php:238
* @route '/byoc/providers/{target}'
*/
updateForm.put = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\ByocTrunkController::deleteMethod
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
export const deleteMethod = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/byoc/providers/{target}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::deleteMethod
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
deleteMethod.url = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{target}', parsedArgs.target.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::deleteMethod
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
deleteMethod.delete = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::deleteMethod
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
const deleteMethodForm = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::deleteMethod
* @see app/Http/Controllers/ByocTrunkController.php:277
* @route '/byoc/providers/{target}'
*/
deleteMethodForm.delete = (args: { target: number | { id: number } } | [target: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteMethod.form = deleteMethodForm

const provider = {
    add: Object.assign(add, add),
    update: Object.assign(update, update),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default provider