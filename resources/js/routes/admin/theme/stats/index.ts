import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/theme/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
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
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/theme/stats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
export const update = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/theme/stats/{stat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
update.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { stat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            stat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stat: typeof args.stat === 'object'
        ? args.stat.id
        : args.stat,
    }

    return update.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
update.put = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
const updateForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
updateForm.put = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
export const destroy = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/stats/{stat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
destroy.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { stat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            stat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stat: typeof args.stat === 'object'
        ? args.stat.id
        : args.stat,
    }

    return destroy.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
destroy.delete = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
const destroyForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
destroyForm.delete = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const stats = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default stats