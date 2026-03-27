import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/theme/use-cases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
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
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/theme/use-cases',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::store
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
export const update = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/theme/use-cases/{useCase}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
update.url = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { useCase: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { useCase: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            useCase: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        useCase: typeof args.useCase === 'object'
        ? args.useCase.id
        : args.useCase,
    }

    return update.definition.url
            .replace('{useCase}', parsedArgs.useCase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
update.put = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
const updateForm = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
updateForm.put = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
export const destroy = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/use-cases/{useCase}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
destroy.url = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { useCase: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { useCase: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            useCase: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        useCase: typeof args.useCase === 'object'
        ? args.useCase.id
        : args.useCase,
    }

    return destroy.definition.url
            .replace('{useCase}', parsedArgs.useCase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
destroy.delete = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::destroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
const destroyForm = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
destroyForm.delete = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const useCases = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default useCases