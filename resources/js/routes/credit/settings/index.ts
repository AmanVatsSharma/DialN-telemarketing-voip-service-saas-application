import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/credit/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:165
* @route '/credit/settings'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

const settings = {
    update: Object.assign(update, update),
}

export default settings