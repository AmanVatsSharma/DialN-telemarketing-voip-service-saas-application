import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\WidgetController::initiate
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
export const initiate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

initiate.definition = {
    methods: ["post"],
    url: '/api/widget/call/initiate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::initiate
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
initiate.url = (options?: RouteQueryOptions) => {
    return initiate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::initiate
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
initiate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::initiate
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
const initiateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::initiate
* @see app/Http/Controllers/Api/WidgetController.php:202
* @route '/api/widget/call/initiate'
*/
initiateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: initiate.url(options),
    method: 'post',
})

initiate.form = initiateForm

/**
* @see \App\Http\Controllers\Api\WidgetController::end
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
export const end = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: end.url(args, options),
    method: 'post',
})

end.definition = {
    methods: ["post"],
    url: '/api/widget/call/{callId}/end',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WidgetController::end
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
end.url = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { callId: args }
    }

    if (Array.isArray(args)) {
        args = {
            callId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        callId: args.callId,
    }

    return end.definition.url
            .replace('{callId}', parsedArgs.callId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WidgetController::end
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
end.post = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: end.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::end
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
const endForm = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: end.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\WidgetController::end
* @see app/Http/Controllers/Api/WidgetController.php:258
* @route '/api/widget/call/{callId}/end'
*/
endForm.post = (args: { callId: string | number } | [callId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: end.url(args, options),
    method: 'post',
})

end.form = endForm

const call = {
    initiate: Object.assign(initiate, initiate),
    end: Object.assign(end, end),
}

export default call