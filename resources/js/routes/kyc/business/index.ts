import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/kyc/business',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KycController::store
* @see app/Http/Controllers/KycController.php:343
* @route '/settings/kyc/business'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const business = {
    store: Object.assign(store, store),
}

export default business