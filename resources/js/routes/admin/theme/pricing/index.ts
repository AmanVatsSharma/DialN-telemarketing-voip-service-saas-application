import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/theme/pricing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
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
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/theme/pricing',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
export const update = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/theme/pricing/{pricing}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
update.url = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricing: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pricing: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pricing: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pricing: typeof args.pricing === 'object'
        ? args.pricing.id
        : args.pricing,
    }

    return update.definition.url
            .replace('{pricing}', parsedArgs.pricing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
update.put = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
const updateForm = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
updateForm.put = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
export const destroy = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/pricing/{pricing}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
destroy.url = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricing: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pricing: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pricing: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pricing: typeof args.pricing === 'object'
        ? args.pricing.id
        : args.pricing,
    }

    return destroy.definition.url
            .replace('{pricing}', parsedArgs.pricing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
destroy.delete = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
const destroyForm = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
destroyForm.delete = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const pricing = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default pricing