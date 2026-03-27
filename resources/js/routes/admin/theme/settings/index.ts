import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/theme/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:54
* @route '/admin/theme/settings'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/theme/settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:66
* @route '/admin/theme/settings'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const settings = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default settings