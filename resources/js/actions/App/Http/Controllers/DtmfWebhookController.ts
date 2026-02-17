import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DtmfWebhookController::handle
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
export const handle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

handle.definition = {
    methods: ["post"],
    url: '/twiml/dtmf',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DtmfWebhookController::handle
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
handle.url = (options?: RouteQueryOptions) => {
    return handle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DtmfWebhookController::handle
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
handle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DtmfWebhookController::handle
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
const handleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handle.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DtmfWebhookController::handle
* @see app/Http/Controllers/DtmfWebhookController.php:24
* @route '/twiml/dtmf'
*/
handleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handle.url(options),
    method: 'post',
})

handle.form = handleForm

const DtmfWebhookController = { handle }

export default DtmfWebhookController