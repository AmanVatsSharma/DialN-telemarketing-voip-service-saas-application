import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:30
* @route '/admin/theme'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/theme',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:30
* @route '/admin/theme'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:30
* @route '/admin/theme'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:30
* @route '/admin/theme'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:30
* @route '/admin/theme'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:30
* @route '/admin/theme'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::index
* @see app/Http/Controllers/Admin/ThemeController.php:30
* @route '/admin/theme'
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
* @see \App\Http\Controllers\Admin\ThemeController::settingsEdit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
export const settingsEdit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settingsEdit.url(options),
    method: 'get',
})

settingsEdit.definition = {
    methods: ["get","head"],
    url: '/admin/theme/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsEdit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
settingsEdit.url = (options?: RouteQueryOptions) => {
    return settingsEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsEdit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
settingsEdit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settingsEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsEdit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
settingsEdit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settingsEdit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsEdit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
const settingsEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: settingsEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsEdit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
settingsEditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: settingsEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsEdit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
settingsEditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: settingsEdit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

settingsEdit.form = settingsEditForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
export const settingsUpdate = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: settingsUpdate.url(options),
    method: 'put',
})

settingsUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
settingsUpdate.url = (options?: RouteQueryOptions) => {
    return settingsUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
settingsUpdate.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: settingsUpdate.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
const settingsUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: settingsUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::settingsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
settingsUpdateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: settingsUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

settingsUpdate.form = settingsUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::uploadLogo
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
export const uploadLogo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

uploadLogo.definition = {
    methods: ["post"],
    url: '/admin/theme/logo/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::uploadLogo
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
uploadLogo.url = (options?: RouteQueryOptions) => {
    return uploadLogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::uploadLogo
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
uploadLogo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::uploadLogo
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
const uploadLogoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadLogo.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::uploadLogo
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
uploadLogoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadLogo.url(options),
    method: 'post',
})

uploadLogo.form = uploadLogoForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteLogo
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
export const deleteLogo = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteLogo.url(options),
    method: 'delete',
})

deleteLogo.definition = {
    methods: ["delete"],
    url: '/admin/theme/logo',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteLogo
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
deleteLogo.url = (options?: RouteQueryOptions) => {
    return deleteLogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteLogo
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
deleteLogo.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteLogo.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteLogo
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
const deleteLogoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteLogo.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteLogo
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
deleteLogoForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteLogo.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteLogo.form = deleteLogoForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroEdit
* @see app/Http/Controllers/Admin/ThemeController.php:107
* @route '/admin/theme/hero'
*/
export const heroEdit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: heroEdit.url(options),
    method: 'get',
})

heroEdit.definition = {
    methods: ["get","head"],
    url: '/admin/theme/hero',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroEdit
* @see app/Http/Controllers/Admin/ThemeController.php:107
* @route '/admin/theme/hero'
*/
heroEdit.url = (options?: RouteQueryOptions) => {
    return heroEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroEdit
* @see app/Http/Controllers/Admin/ThemeController.php:107
* @route '/admin/theme/hero'
*/
heroEdit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: heroEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroEdit
* @see app/Http/Controllers/Admin/ThemeController.php:107
* @route '/admin/theme/hero'
*/
heroEdit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: heroEdit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroEdit
* @see app/Http/Controllers/Admin/ThemeController.php:107
* @route '/admin/theme/hero'
*/
const heroEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: heroEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroEdit
* @see app/Http/Controllers/Admin/ThemeController.php:107
* @route '/admin/theme/hero'
*/
heroEditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: heroEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroEdit
* @see app/Http/Controllers/Admin/ThemeController.php:107
* @route '/admin/theme/hero'
*/
heroEditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: heroEdit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

heroEdit.form = heroEditForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:119
* @route '/admin/theme/hero'
*/
export const heroUpdate = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: heroUpdate.url(options),
    method: 'put',
})

heroUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/hero',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:119
* @route '/admin/theme/hero'
*/
heroUpdate.url = (options?: RouteQueryOptions) => {
    return heroUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:119
* @route '/admin/theme/hero'
*/
heroUpdate.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: heroUpdate.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:119
* @route '/admin/theme/hero'
*/
const heroUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: heroUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::heroUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:119
* @route '/admin/theme/hero'
*/
heroUpdateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: heroUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

heroUpdate.form = heroUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
export const statsIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statsIndex.url(options),
    method: 'get',
})

statsIndex.definition = {
    methods: ["get","head"],
    url: '/admin/theme/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
statsIndex.url = (options?: RouteQueryOptions) => {
    return statsIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
statsIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
statsIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statsIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
const statsIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
statsIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:150
* @route '/admin/theme/stats'
*/
statsIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statsIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

statsIndex.form = statsIndexForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsStore
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
export const statsStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: statsStore.url(options),
    method: 'post',
})

statsStore.definition = {
    methods: ["post"],
    url: '/admin/theme/stats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsStore
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
statsStore.url = (options?: RouteQueryOptions) => {
    return statsStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsStore
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
statsStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: statsStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsStore
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
const statsStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: statsStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsStore
* @see app/Http/Controllers/Admin/ThemeController.php:162
* @route '/admin/theme/stats'
*/
statsStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: statsStore.url(options),
    method: 'post',
})

statsStore.form = statsStoreForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
export const statsUpdate = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: statsUpdate.url(args, options),
    method: 'put',
})

statsUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/stats/{stat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
statsUpdate.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return statsUpdate.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
statsUpdate.put = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: statsUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
const statsUpdateForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: statsUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:182
* @route '/admin/theme/stats/{stat}'
*/
statsUpdateForm.put = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: statsUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

statsUpdate.form = statsUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
export const statsDestroy = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: statsDestroy.url(args, options),
    method: 'delete',
})

statsDestroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/stats/{stat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
statsDestroy.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return statsDestroy.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
statsDestroy.delete = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: statsDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
const statsDestroyForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: statsDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::statsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:202
* @route '/admin/theme/stats/{stat}'
*/
statsDestroyForm.delete = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: statsDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

statsDestroy.form = statsDestroyForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresIndex
* @see app/Http/Controllers/Admin/ThemeController.php:216
* @route '/admin/theme/features'
*/
export const featuresIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: featuresIndex.url(options),
    method: 'get',
})

featuresIndex.definition = {
    methods: ["get","head"],
    url: '/admin/theme/features',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresIndex
* @see app/Http/Controllers/Admin/ThemeController.php:216
* @route '/admin/theme/features'
*/
featuresIndex.url = (options?: RouteQueryOptions) => {
    return featuresIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresIndex
* @see app/Http/Controllers/Admin/ThemeController.php:216
* @route '/admin/theme/features'
*/
featuresIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: featuresIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresIndex
* @see app/Http/Controllers/Admin/ThemeController.php:216
* @route '/admin/theme/features'
*/
featuresIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: featuresIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresIndex
* @see app/Http/Controllers/Admin/ThemeController.php:216
* @route '/admin/theme/features'
*/
const featuresIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: featuresIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresIndex
* @see app/Http/Controllers/Admin/ThemeController.php:216
* @route '/admin/theme/features'
*/
featuresIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: featuresIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresIndex
* @see app/Http/Controllers/Admin/ThemeController.php:216
* @route '/admin/theme/features'
*/
featuresIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: featuresIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

featuresIndex.form = featuresIndexForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresStore
* @see app/Http/Controllers/Admin/ThemeController.php:228
* @route '/admin/theme/features'
*/
export const featuresStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: featuresStore.url(options),
    method: 'post',
})

featuresStore.definition = {
    methods: ["post"],
    url: '/admin/theme/features',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresStore
* @see app/Http/Controllers/Admin/ThemeController.php:228
* @route '/admin/theme/features'
*/
featuresStore.url = (options?: RouteQueryOptions) => {
    return featuresStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresStore
* @see app/Http/Controllers/Admin/ThemeController.php:228
* @route '/admin/theme/features'
*/
featuresStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: featuresStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresStore
* @see app/Http/Controllers/Admin/ThemeController.php:228
* @route '/admin/theme/features'
*/
const featuresStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: featuresStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresStore
* @see app/Http/Controllers/Admin/ThemeController.php:228
* @route '/admin/theme/features'
*/
featuresStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: featuresStore.url(options),
    method: 'post',
})

featuresStore.form = featuresStoreForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:250
* @route '/admin/theme/features/{feature}'
*/
export const featuresUpdate = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: featuresUpdate.url(args, options),
    method: 'put',
})

featuresUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/features/{feature}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:250
* @route '/admin/theme/features/{feature}'
*/
featuresUpdate.url = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { feature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { feature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            feature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        feature: typeof args.feature === 'object'
        ? args.feature.id
        : args.feature,
    }

    return featuresUpdate.definition.url
            .replace('{feature}', parsedArgs.feature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:250
* @route '/admin/theme/features/{feature}'
*/
featuresUpdate.put = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: featuresUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:250
* @route '/admin/theme/features/{feature}'
*/
const featuresUpdateForm = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: featuresUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:250
* @route '/admin/theme/features/{feature}'
*/
featuresUpdateForm.put = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: featuresUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

featuresUpdate.form = featuresUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:272
* @route '/admin/theme/features/{feature}'
*/
export const featuresDestroy = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: featuresDestroy.url(args, options),
    method: 'delete',
})

featuresDestroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/features/{feature}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:272
* @route '/admin/theme/features/{feature}'
*/
featuresDestroy.url = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { feature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { feature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            feature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        feature: typeof args.feature === 'object'
        ? args.feature.id
        : args.feature,
    }

    return featuresDestroy.definition.url
            .replace('{feature}', parsedArgs.feature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:272
* @route '/admin/theme/features/{feature}'
*/
featuresDestroy.delete = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: featuresDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:272
* @route '/admin/theme/features/{feature}'
*/
const featuresDestroyForm = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: featuresDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::featuresDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:272
* @route '/admin/theme/features/{feature}'
*/
featuresDestroyForm.delete = (args: { feature: number | { id: number } } | [feature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: featuresDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

featuresDestroy.form = featuresDestroyForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
export const benefitsIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: benefitsIndex.url(options),
    method: 'get',
})

benefitsIndex.definition = {
    methods: ["get","head"],
    url: '/admin/theme/benefits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
benefitsIndex.url = (options?: RouteQueryOptions) => {
    return benefitsIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
benefitsIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: benefitsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
benefitsIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: benefitsIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
const benefitsIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: benefitsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
benefitsIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: benefitsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:286
* @route '/admin/theme/benefits'
*/
benefitsIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: benefitsIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

benefitsIndex.form = benefitsIndexForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsStore
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
export const benefitsStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: benefitsStore.url(options),
    method: 'post',
})

benefitsStore.definition = {
    methods: ["post"],
    url: '/admin/theme/benefits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsStore
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
benefitsStore.url = (options?: RouteQueryOptions) => {
    return benefitsStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsStore
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
benefitsStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: benefitsStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsStore
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
const benefitsStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: benefitsStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsStore
* @see app/Http/Controllers/Admin/ThemeController.php:298
* @route '/admin/theme/benefits'
*/
benefitsStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: benefitsStore.url(options),
    method: 'post',
})

benefitsStore.form = benefitsStoreForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
export const benefitsUpdate = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: benefitsUpdate.url(args, options),
    method: 'put',
})

benefitsUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/benefits/{benefit}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
benefitsUpdate.url = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return benefitsUpdate.definition.url
            .replace('{benefit}', parsedArgs.benefit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
benefitsUpdate.put = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: benefitsUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
const benefitsUpdateForm = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: benefitsUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:318
* @route '/admin/theme/benefits/{benefit}'
*/
benefitsUpdateForm.put = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: benefitsUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

benefitsUpdate.form = benefitsUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
export const benefitsDestroy = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: benefitsDestroy.url(args, options),
    method: 'delete',
})

benefitsDestroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/benefits/{benefit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
benefitsDestroy.url = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return benefitsDestroy.definition.url
            .replace('{benefit}', parsedArgs.benefit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
benefitsDestroy.delete = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: benefitsDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
const benefitsDestroyForm = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: benefitsDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::benefitsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:338
* @route '/admin/theme/benefits/{benefit}'
*/
benefitsDestroyForm.delete = (args: { benefit: number | { id: number } } | [benefit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: benefitsDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

benefitsDestroy.form = benefitsDestroyForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesIndex
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
export const useCasesIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: useCasesIndex.url(options),
    method: 'get',
})

useCasesIndex.definition = {
    methods: ["get","head"],
    url: '/admin/theme/use-cases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesIndex
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
useCasesIndex.url = (options?: RouteQueryOptions) => {
    return useCasesIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesIndex
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
useCasesIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: useCasesIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesIndex
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
useCasesIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: useCasesIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesIndex
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
const useCasesIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: useCasesIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesIndex
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
useCasesIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: useCasesIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesIndex
* @see app/Http/Controllers/Admin/ThemeController.php:352
* @route '/admin/theme/use-cases'
*/
useCasesIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: useCasesIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

useCasesIndex.form = useCasesIndexForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesStore
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
export const useCasesStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: useCasesStore.url(options),
    method: 'post',
})

useCasesStore.definition = {
    methods: ["post"],
    url: '/admin/theme/use-cases',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesStore
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
useCasesStore.url = (options?: RouteQueryOptions) => {
    return useCasesStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesStore
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
useCasesStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: useCasesStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesStore
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
const useCasesStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: useCasesStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesStore
* @see app/Http/Controllers/Admin/ThemeController.php:364
* @route '/admin/theme/use-cases'
*/
useCasesStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: useCasesStore.url(options),
    method: 'post',
})

useCasesStore.form = useCasesStoreForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
export const useCasesUpdate = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: useCasesUpdate.url(args, options),
    method: 'put',
})

useCasesUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/use-cases/{useCase}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
useCasesUpdate.url = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return useCasesUpdate.definition.url
            .replace('{useCase}', parsedArgs.useCase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
useCasesUpdate.put = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: useCasesUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
const useCasesUpdateForm = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: useCasesUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:386
* @route '/admin/theme/use-cases/{useCase}'
*/
useCasesUpdateForm.put = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: useCasesUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

useCasesUpdate.form = useCasesUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
export const useCasesDestroy = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: useCasesDestroy.url(args, options),
    method: 'delete',
})

useCasesDestroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/use-cases/{useCase}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
useCasesDestroy.url = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return useCasesDestroy.definition.url
            .replace('{useCase}', parsedArgs.useCase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
useCasesDestroy.delete = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: useCasesDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
const useCasesDestroyForm = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: useCasesDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::useCasesDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:408
* @route '/admin/theme/use-cases/{useCase}'
*/
useCasesDestroyForm.delete = (args: { useCase: number | { id: number } } | [useCase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: useCasesDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

useCasesDestroy.form = useCasesDestroyForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingIndex
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
export const pricingIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pricingIndex.url(options),
    method: 'get',
})

pricingIndex.definition = {
    methods: ["get","head"],
    url: '/admin/theme/pricing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingIndex
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
pricingIndex.url = (options?: RouteQueryOptions) => {
    return pricingIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingIndex
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
pricingIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pricingIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingIndex
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
pricingIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pricingIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingIndex
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
const pricingIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pricingIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingIndex
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
pricingIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pricingIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingIndex
* @see app/Http/Controllers/Admin/ThemeController.php:422
* @route '/admin/theme/pricing'
*/
pricingIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pricingIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pricingIndex.form = pricingIndexForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingStore
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
export const pricingStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pricingStore.url(options),
    method: 'post',
})

pricingStore.definition = {
    methods: ["post"],
    url: '/admin/theme/pricing',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingStore
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
pricingStore.url = (options?: RouteQueryOptions) => {
    return pricingStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingStore
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
pricingStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pricingStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingStore
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
const pricingStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pricingStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingStore
* @see app/Http/Controllers/Admin/ThemeController.php:434
* @route '/admin/theme/pricing'
*/
pricingStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pricingStore.url(options),
    method: 'post',
})

pricingStore.form = pricingStoreForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
export const pricingUpdate = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: pricingUpdate.url(args, options),
    method: 'put',
})

pricingUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/pricing/{pricing}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
pricingUpdate.url = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return pricingUpdate.definition.url
            .replace('{pricing}', parsedArgs.pricing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
pricingUpdate.put = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: pricingUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
const pricingUpdateForm = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pricingUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:457
* @route '/admin/theme/pricing/{pricing}'
*/
pricingUpdateForm.put = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pricingUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

pricingUpdate.form = pricingUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
export const pricingDestroy = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: pricingDestroy.url(args, options),
    method: 'delete',
})

pricingDestroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/pricing/{pricing}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
pricingDestroy.url = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return pricingDestroy.definition.url
            .replace('{pricing}', parsedArgs.pricing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
pricingDestroy.delete = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: pricingDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
const pricingDestroyForm = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pricingDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::pricingDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:480
* @route '/admin/theme/pricing/{pricing}'
*/
pricingDestroyForm.delete = (args: { pricing: number | { id: number } } | [pricing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pricingDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

pricingDestroy.form = pricingDestroyForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:494
* @route '/admin/theme/faqs'
*/
export const faqsIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faqsIndex.url(options),
    method: 'get',
})

faqsIndex.definition = {
    methods: ["get","head"],
    url: '/admin/theme/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:494
* @route '/admin/theme/faqs'
*/
faqsIndex.url = (options?: RouteQueryOptions) => {
    return faqsIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:494
* @route '/admin/theme/faqs'
*/
faqsIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faqsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:494
* @route '/admin/theme/faqs'
*/
faqsIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: faqsIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:494
* @route '/admin/theme/faqs'
*/
const faqsIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: faqsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:494
* @route '/admin/theme/faqs'
*/
faqsIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: faqsIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsIndex
* @see app/Http/Controllers/Admin/ThemeController.php:494
* @route '/admin/theme/faqs'
*/
faqsIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: faqsIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

faqsIndex.form = faqsIndexForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsStore
* @see app/Http/Controllers/Admin/ThemeController.php:506
* @route '/admin/theme/faqs'
*/
export const faqsStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: faqsStore.url(options),
    method: 'post',
})

faqsStore.definition = {
    methods: ["post"],
    url: '/admin/theme/faqs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsStore
* @see app/Http/Controllers/Admin/ThemeController.php:506
* @route '/admin/theme/faqs'
*/
faqsStore.url = (options?: RouteQueryOptions) => {
    return faqsStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsStore
* @see app/Http/Controllers/Admin/ThemeController.php:506
* @route '/admin/theme/faqs'
*/
faqsStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: faqsStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsStore
* @see app/Http/Controllers/Admin/ThemeController.php:506
* @route '/admin/theme/faqs'
*/
const faqsStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: faqsStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsStore
* @see app/Http/Controllers/Admin/ThemeController.php:506
* @route '/admin/theme/faqs'
*/
faqsStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: faqsStore.url(options),
    method: 'post',
})

faqsStore.form = faqsStoreForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:526
* @route '/admin/theme/faqs/{faq}'
*/
export const faqsUpdate = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: faqsUpdate.url(args, options),
    method: 'put',
})

faqsUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/faqs/{faq}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:526
* @route '/admin/theme/faqs/{faq}'
*/
faqsUpdate.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { faq: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            faq: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        faq: typeof args.faq === 'object'
        ? args.faq.id
        : args.faq,
    }

    return faqsUpdate.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:526
* @route '/admin/theme/faqs/{faq}'
*/
faqsUpdate.put = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: faqsUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:526
* @route '/admin/theme/faqs/{faq}'
*/
const faqsUpdateForm = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: faqsUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:526
* @route '/admin/theme/faqs/{faq}'
*/
faqsUpdateForm.put = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: faqsUpdate.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

faqsUpdate.form = faqsUpdateForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:546
* @route '/admin/theme/faqs/{faq}'
*/
export const faqsDestroy = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: faqsDestroy.url(args, options),
    method: 'delete',
})

faqsDestroy.definition = {
    methods: ["delete"],
    url: '/admin/theme/faqs/{faq}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:546
* @route '/admin/theme/faqs/{faq}'
*/
faqsDestroy.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { faq: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            faq: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        faq: typeof args.faq === 'object'
        ? args.faq.id
        : args.faq,
    }

    return faqsDestroy.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:546
* @route '/admin/theme/faqs/{faq}'
*/
faqsDestroy.delete = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: faqsDestroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:546
* @route '/admin/theme/faqs/{faq}'
*/
const faqsDestroyForm = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: faqsDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::faqsDestroy
* @see app/Http/Controllers/Admin/ThemeController.php:546
* @route '/admin/theme/faqs/{faq}'
*/
faqsDestroyForm.delete = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: faqsDestroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

faqsDestroy.form = faqsDestroyForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerEdit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
export const footerEdit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: footerEdit.url(options),
    method: 'get',
})

footerEdit.definition = {
    methods: ["get","head"],
    url: '/admin/theme/footer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerEdit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
footerEdit.url = (options?: RouteQueryOptions) => {
    return footerEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerEdit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
footerEdit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: footerEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerEdit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
footerEdit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: footerEdit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerEdit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
const footerEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: footerEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerEdit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
footerEditForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: footerEdit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerEdit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
footerEditForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: footerEdit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

footerEdit.form = footerEditForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
export const footerUpdate = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: footerUpdate.url(options),
    method: 'put',
})

footerUpdate.definition = {
    methods: ["put"],
    url: '/admin/theme/footer',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
footerUpdate.url = (options?: RouteQueryOptions) => {
    return footerUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
footerUpdate.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: footerUpdate.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
const footerUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: footerUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::footerUpdate
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
footerUpdateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: footerUpdate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

footerUpdate.form = footerUpdateForm

const ThemeController = { index, settingsEdit, settingsUpdate, uploadLogo, deleteLogo, heroEdit, heroUpdate, statsIndex, statsStore, statsUpdate, statsDestroy, featuresIndex, featuresStore, featuresUpdate, featuresDestroy, benefitsIndex, benefitsStore, benefitsUpdate, benefitsDestroy, useCasesIndex, useCasesStore, useCasesUpdate, useCasesDestroy, pricingIndex, pricingStore, pricingUpdate, pricingDestroy, faqsIndex, faqsStore, faqsUpdate, faqsDestroy, footerEdit, footerUpdate }

export default ThemeController