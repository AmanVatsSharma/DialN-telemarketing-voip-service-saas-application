import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see routes/twilio.php:48
* @route '/api/twilio/token/refresh'
*/
export const refresh = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

refresh.definition = {
    methods: ["post"],
    url: '/api/twilio/token/refresh',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/twilio.php:48
* @route '/api/twilio/token/refresh'
*/
refresh.url = (options?: RouteQueryOptions) => {
    return refresh.definition.url + queryParams(options)
}

/**
* @see routes/twilio.php:48
* @route '/api/twilio/token/refresh'
*/
refresh.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

/**
* @see routes/twilio.php:48
* @route '/api/twilio/token/refresh'
*/
const refreshForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refresh.url(options),
    method: 'post',
})

/**
* @see routes/twilio.php:48
* @route '/api/twilio/token/refresh'
*/
refreshForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refresh.url(options),
    method: 'post',
})

refresh.form = refreshForm

const token = {
    refresh: Object.assign(refresh, refresh),
}

export default token