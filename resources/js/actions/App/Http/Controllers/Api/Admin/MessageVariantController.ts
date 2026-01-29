import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::generateVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:23
* @route '/api/v1/campaigns/{campaign}/variants/generate'
*/
export const generateVariants = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateVariants.url(args, options),
    method: 'post',
})

generateVariants.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/variants/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::generateVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:23
* @route '/api/v1/campaigns/{campaign}/variants/generate'
*/
generateVariants.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return generateVariants.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::generateVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:23
* @route '/api/v1/campaigns/{campaign}/variants/generate'
*/
generateVariants.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateVariants.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::generateVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:23
* @route '/api/v1/campaigns/{campaign}/variants/generate'
*/
const generateVariantsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateVariants.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::generateVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:23
* @route '/api/v1/campaigns/{campaign}/variants/generate'
*/
generateVariantsForm.post = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateVariants.url(args, options),
    method: 'post',
})

generateVariants.form = generateVariantsForm

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::getVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:67
* @route '/api/v1/campaigns/{campaign}/variants'
*/
export const getVariants = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVariants.url(args, options),
    method: 'get',
})

getVariants.definition = {
    methods: ["get","head"],
    url: '/api/v1/campaigns/{campaign}/variants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::getVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:67
* @route '/api/v1/campaigns/{campaign}/variants'
*/
getVariants.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return getVariants.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::getVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:67
* @route '/api/v1/campaigns/{campaign}/variants'
*/
getVariants.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVariants.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::getVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:67
* @route '/api/v1/campaigns/{campaign}/variants'
*/
getVariants.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVariants.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::getVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:67
* @route '/api/v1/campaigns/{campaign}/variants'
*/
const getVariantsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVariants.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::getVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:67
* @route '/api/v1/campaigns/{campaign}/variants'
*/
getVariantsForm.get = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVariants.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::getVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:67
* @route '/api/v1/campaigns/{campaign}/variants'
*/
getVariantsForm.head = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVariants.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getVariants.form = getVariantsForm

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::selectWinner
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:89
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/select-winner'
*/
export const selectWinner = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selectWinner.url(args, options),
    method: 'post',
})

selectWinner.definition = {
    methods: ["post"],
    url: '/api/v1/campaigns/{campaign}/variants/{variant}/select-winner',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::selectWinner
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:89
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/select-winner'
*/
selectWinner.url = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
            variant: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
        variant: typeof args.variant === 'object'
        ? args.variant.id
        : args.variant,
    }

    return selectWinner.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace('{variant}', parsedArgs.variant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::selectWinner
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:89
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/select-winner'
*/
selectWinner.post = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selectWinner.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::selectWinner
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:89
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/select-winner'
*/
const selectWinnerForm = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: selectWinner.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::selectWinner
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:89
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/select-winner'
*/
selectWinnerForm.post = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: selectWinner.url(args, options),
    method: 'post',
})

selectWinner.form = selectWinnerForm

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::deleteVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:133
* @route '/api/v1/campaigns/{campaign}/variants'
*/
export const deleteVariants = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteVariants.url(args, options),
    method: 'delete',
})

deleteVariants.definition = {
    methods: ["delete"],
    url: '/api/v1/campaigns/{campaign}/variants',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::deleteVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:133
* @route '/api/v1/campaigns/{campaign}/variants'
*/
deleteVariants.url = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { campaign: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { campaign: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
    }

    return deleteVariants.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::deleteVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:133
* @route '/api/v1/campaigns/{campaign}/variants'
*/
deleteVariants.delete = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteVariants.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::deleteVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:133
* @route '/api/v1/campaigns/{campaign}/variants'
*/
const deleteVariantsForm = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteVariants.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::deleteVariants
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:133
* @route '/api/v1/campaigns/{campaign}/variants'
*/
deleteVariantsForm.delete = (args: { campaign: number | { id: number } } | [campaign: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteVariants.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteVariants.form = deleteVariantsForm

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::toggleActive
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:162
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/toggle-active'
*/
export const toggleActive = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/api/v1/campaigns/{campaign}/variants/{variant}/toggle-active',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::toggleActive
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:162
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/toggle-active'
*/
toggleActive.url = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            campaign: args[0],
            variant: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        campaign: typeof args.campaign === 'object'
        ? args.campaign.id
        : args.campaign,
        variant: typeof args.variant === 'object'
        ? args.variant.id
        : args.variant,
    }

    return toggleActive.definition.url
            .replace('{campaign}', parsedArgs.campaign.toString())
            .replace('{variant}', parsedArgs.variant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::toggleActive
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:162
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/toggle-active'
*/
toggleActive.patch = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::toggleActive
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:162
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/toggle-active'
*/
const toggleActiveForm = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\MessageVariantController::toggleActive
* @see app/Http/Controllers/Api/Admin/MessageVariantController.php:162
* @route '/api/v1/campaigns/{campaign}/variants/{variant}/toggle-active'
*/
toggleActiveForm.patch = (args: { campaign: number | { id: number }, variant: number | { id: number } } | [campaign: number | { id: number }, variant: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const MessageVariantController = { generateVariants, getVariants, selectWinner, deleteVariants, toggleActive }

export default MessageVariantController