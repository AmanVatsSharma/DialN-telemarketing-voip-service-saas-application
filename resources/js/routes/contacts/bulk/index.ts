import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ContactController::tag
* @see app/Http/Controllers/ContactController.php:678
* @route '/contacts/bulk/tag'
*/
export const tag = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tag.url(options),
    method: 'post',
})

tag.definition = {
    methods: ["post"],
    url: '/contacts/bulk/tag',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::tag
* @see app/Http/Controllers/ContactController.php:678
* @route '/contacts/bulk/tag'
*/
tag.url = (options?: RouteQueryOptions) => {
    return tag.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::tag
* @see app/Http/Controllers/ContactController.php:678
* @route '/contacts/bulk/tag'
*/
tag.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tag.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::tag
* @see app/Http/Controllers/ContactController.php:678
* @route '/contacts/bulk/tag'
*/
const tagForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: tag.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::tag
* @see app/Http/Controllers/ContactController.php:678
* @route '/contacts/bulk/tag'
*/
tagForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: tag.url(options),
    method: 'post',
})

tag.form = tagForm

/**
* @see \App\Http\Controllers\ContactController::list
* @see app/Http/Controllers/ContactController.php:720
* @route '/contacts/bulk/list'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: list.url(options),
    method: 'post',
})

list.definition = {
    methods: ["post"],
    url: '/contacts/bulk/list',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::list
* @see app/Http/Controllers/ContactController.php:720
* @route '/contacts/bulk/list'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::list
* @see app/Http/Controllers/ContactController.php:720
* @route '/contacts/bulk/list'
*/
list.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: list.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::list
* @see app/Http/Controllers/ContactController.php:720
* @route '/contacts/bulk/list'
*/
const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: list.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::list
* @see app/Http/Controllers/ContactController.php:720
* @route '/contacts/bulk/list'
*/
listForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: list.url(options),
    method: 'post',
})

list.form = listForm

/**
* @see \App\Http\Controllers\ContactController::deleteMethod
* @see app/Http/Controllers/ContactController.php:763
* @route '/contacts/bulk/delete'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteMethod.url(options),
    method: 'post',
})

deleteMethod.definition = {
    methods: ["post"],
    url: '/contacts/bulk/delete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::deleteMethod
* @see app/Http/Controllers/ContactController.php:763
* @route '/contacts/bulk/delete'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::deleteMethod
* @see app/Http/Controllers/ContactController.php:763
* @route '/contacts/bulk/delete'
*/
deleteMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::deleteMethod
* @see app/Http/Controllers/ContactController.php:763
* @route '/contacts/bulk/delete'
*/
const deleteMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::deleteMethod
* @see app/Http/Controllers/ContactController.php:763
* @route '/contacts/bulk/delete'
*/
deleteMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(options),
    method: 'post',
})

deleteMethod.form = deleteMethodForm

const bulk = {
    tag: Object.assign(tag, tag),
    list: Object.assign(list, list),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default bulk