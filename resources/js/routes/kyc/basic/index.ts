import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/kyc/basic',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:71
* @route '/settings/kyc/basic'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const basic = {
    store: Object.assign(store, store),
}

export default basic