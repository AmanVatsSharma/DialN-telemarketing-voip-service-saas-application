import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\InstallController::check
* @see app/Http/Controllers/InstallController.php:40
* @route '/install/requirements/check'
*/
export const check = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: check.url(options),
    method: 'post',
})

check.definition = {
    methods: ["post"],
    url: '/install/requirements/check',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstallController::check
* @see app/Http/Controllers/InstallController.php:40
* @route '/install/requirements/check'
*/
check.url = (options?: RouteQueryOptions) => {
    return check.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstallController::check
* @see app/Http/Controllers/InstallController.php:40
* @route '/install/requirements/check'
*/
check.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: check.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::check
* @see app/Http/Controllers/InstallController.php:40
* @route '/install/requirements/check'
*/
const checkForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: check.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InstallController::check
* @see app/Http/Controllers/InstallController.php:40
* @route '/install/requirements/check'
*/
checkForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: check.url(options),
    method: 'post',
})

check.form = checkForm

const requirements = {
    check: Object.assign(check, check),
}

export default requirements