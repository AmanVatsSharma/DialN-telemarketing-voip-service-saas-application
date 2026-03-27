import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ThemeController::upload
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/admin/theme/logo/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::upload
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::upload
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::upload
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::upload
* @see app/Http/Controllers/Admin/ThemeController.php:598
* @route '/admin/theme/logo/upload'
*/
uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(options),
    method: 'post',
})

upload.form = uploadForm

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteMethod
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/admin/theme/logo',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteMethod
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteMethod
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteMethod
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
const deleteMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ThemeController::deleteMethod
* @see app/Http/Controllers/Admin/ThemeController.php:632
* @route '/admin/theme/logo'
*/
deleteMethodForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteMethod.form = deleteMethodForm

const logo = {
    upload: Object.assign(upload, upload),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default logo