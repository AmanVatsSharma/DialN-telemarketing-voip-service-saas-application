import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/theme/benefits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
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
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/theme/benefits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
export const update = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/theme/benefits/{benefit}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
update.url = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { benefit: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { benefit: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            benefit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        benefit: typeof args.benefit === 'object'
        ? args.benefit.id
        : args.benefit,
    }

    return update.definition.url
            .replace('{benefit}', parsedArgs.benefit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
update.put = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
const updateForm = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
updateForm.put = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
export const destroy = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/benefits/{benefit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
destroy.url = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { benefit: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { benefit: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            benefit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        benefit: typeof args.benefit === 'object'
        ? args.benefit.id
        : args.benefit,
    }

    return destroy.definition.url
            .replace('{benefit}', parsedArgs.benefit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
destroy.delete = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
const destroyForm = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
destroyForm.delete = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const benefits = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default benefits