import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/theme/footer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::edit
* @see app/Http/Controllers/Admin/ThemeController.php:560
* @route '/admin/theme/footer'
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
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/theme/footer',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::update
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
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
* @see app/Http/Controllers/Admin/ThemeController.php:572
* @route '/admin/theme/footer'
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

const footer = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default footer