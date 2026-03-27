import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ByocTrunkController::voice
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
export const voice = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voice.url(args, options),
    method: 'post',
})

voice.definition = {
    methods: ["post"],
    url: '/byoc/trunk/voice/{user}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ByocTrunkController::voice
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
voice.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return voice.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ByocTrunkController::voice
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
voice.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voice.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::voice
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
const voiceForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voice.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ByocTrunkController::voice
* @see app/Http/Controllers/ByocTrunkController.php:323
* @route '/byoc/trunk/voice/{user}'
*/
voiceForm.post = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: voice.url(args, options),
    method: 'post',
})

voice.form = voiceForm

const trunk = {
    voice: Object.assign(voice, voice),
}

export default trunk