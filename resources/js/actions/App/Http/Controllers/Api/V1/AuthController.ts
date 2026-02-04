import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:50
* @route '/api/v1/auth/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/v1/auth/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:50
* @route '/api/v1/auth/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:50
* @route '/api/v1/auth/login'
*/
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:50
* @route '/api/v1/auth/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::login
* @see app/Http/Controllers/Api/V1/AuthController.php:50
* @route '/api/v1/auth/login'
*/
loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

login.form = loginForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:104
* @route '/api/v1/auth/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/v1/auth/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:104
* @route '/api/v1/auth/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:104
* @route '/api/v1/auth/register'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:104
* @route '/api/v1/auth/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::register
* @see app/Http/Controllers/Api/V1/AuthController.php:104
* @route '/api/v1/auth/register'
*/
registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

register.form = registerForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::user
* @see app/Http/Controllers/Api/V1/AuthController.php:140
* @route '/api/v1/auth/user'
*/
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::user
* @see app/Http/Controllers/Api/V1/AuthController.php:140
* @route '/api/v1/auth/user'
*/
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::user
* @see app/Http/Controllers/Api/V1/AuthController.php:140
* @route '/api/v1/auth/user'
*/
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::user
* @see app/Http/Controllers/Api/V1/AuthController.php:140
* @route '/api/v1/auth/user'
*/
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::user
* @see app/Http/Controllers/Api/V1/AuthController.php:140
* @route '/api/v1/auth/user'
*/
const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::user
* @see app/Http/Controllers/Api/V1/AuthController.php:140
* @route '/api/v1/auth/user'
*/
userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::user
* @see app/Http/Controllers/Api/V1/AuthController.php:140
* @route '/api/v1/auth/user'
*/
userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

user.form = userForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:156
* @route '/api/v1/auth/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/v1/auth/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:156
* @route '/api/v1/auth/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:156
* @route '/api/v1/auth/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:156
* @route '/api/v1/auth/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::logout
* @see app/Http/Controllers/Api/V1/AuthController.php:156
* @route '/api/v1/auth/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::createToken
* @see app/Http/Controllers/Api/V1/AuthController.php:180
* @route '/api/v1/auth/tokens'
*/
export const createToken = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createToken.url(options),
    method: 'post',
})

createToken.definition = {
    methods: ["post"],
    url: '/api/v1/auth/tokens',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::createToken
* @see app/Http/Controllers/Api/V1/AuthController.php:180
* @route '/api/v1/auth/tokens'
*/
createToken.url = (options?: RouteQueryOptions) => {
    return createToken.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::createToken
* @see app/Http/Controllers/Api/V1/AuthController.php:180
* @route '/api/v1/auth/tokens'
*/
createToken.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createToken.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::createToken
* @see app/Http/Controllers/Api/V1/AuthController.php:180
* @route '/api/v1/auth/tokens'
*/
const createTokenForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createToken.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::createToken
* @see app/Http/Controllers/Api/V1/AuthController.php:180
* @route '/api/v1/auth/tokens'
*/
createTokenForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createToken.url(options),
    method: 'post',
})

createToken.form = createTokenForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::listTokens
* @see app/Http/Controllers/Api/V1/AuthController.php:208
* @route '/api/v1/auth/tokens'
*/
export const listTokens = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listTokens.url(options),
    method: 'get',
})

listTokens.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/tokens',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::listTokens
* @see app/Http/Controllers/Api/V1/AuthController.php:208
* @route '/api/v1/auth/tokens'
*/
listTokens.url = (options?: RouteQueryOptions) => {
    return listTokens.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::listTokens
* @see app/Http/Controllers/Api/V1/AuthController.php:208
* @route '/api/v1/auth/tokens'
*/
listTokens.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listTokens.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::listTokens
* @see app/Http/Controllers/Api/V1/AuthController.php:208
* @route '/api/v1/auth/tokens'
*/
listTokens.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listTokens.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::listTokens
* @see app/Http/Controllers/Api/V1/AuthController.php:208
* @route '/api/v1/auth/tokens'
*/
const listTokensForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listTokens.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::listTokens
* @see app/Http/Controllers/Api/V1/AuthController.php:208
* @route '/api/v1/auth/tokens'
*/
listTokensForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listTokens.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::listTokens
* @see app/Http/Controllers/Api/V1/AuthController.php:208
* @route '/api/v1/auth/tokens'
*/
listTokensForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: listTokens.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

listTokens.form = listTokensForm

/**
* @see \App\Http\Controllers\Api\V1\AuthController::revokeToken
* @see app/Http/Controllers/Api/V1/AuthController.php:233
* @route '/api/v1/auth/tokens/{tokenId}'
*/
export const revokeToken = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revokeToken.url(args, options),
    method: 'delete',
})

revokeToken.definition = {
    methods: ["delete"],
    url: '/api/v1/auth/tokens/{tokenId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\AuthController::revokeToken
* @see app/Http/Controllers/Api/V1/AuthController.php:233
* @route '/api/v1/auth/tokens/{tokenId}'
*/
revokeToken.url = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tokenId: args }
    }

    if (Array.isArray(args)) {
        args = {
            tokenId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tokenId: args.tokenId,
    }

    return revokeToken.definition.url
            .replace('{tokenId}', parsedArgs.tokenId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AuthController::revokeToken
* @see app/Http/Controllers/Api/V1/AuthController.php:233
* @route '/api/v1/auth/tokens/{tokenId}'
*/
revokeToken.delete = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revokeToken.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::revokeToken
* @see app/Http/Controllers/Api/V1/AuthController.php:233
* @route '/api/v1/auth/tokens/{tokenId}'
*/
const revokeTokenForm = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revokeToken.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AuthController::revokeToken
* @see app/Http/Controllers/Api/V1/AuthController.php:233
* @route '/api/v1/auth/tokens/{tokenId}'
*/
revokeTokenForm.delete = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revokeToken.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

revokeToken.form = revokeTokenForm

const AuthController = { login, register, user, logout, createToken, listTokens, revokeToken }

export default AuthController