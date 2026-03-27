import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
import webhook from './webhook'
import phoneNumbers from './phone-numbers'
import conversationsFa5bc0 from './conversations'
/**
* @see \App\Http\Controllers\SMS\SmsController::index
* @see app/Http/Controllers/SMS/SmsController.php:22
* @route '/sms'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::index
* @see app/Http/Controllers/SMS/SmsController.php:22
* @route '/sms'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::index
* @see app/Http/Controllers/SMS/SmsController.php:22
* @route '/sms'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::index
* @see app/Http/Controllers/SMS/SmsController.php:22
* @route '/sms'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::index
* @see app/Http/Controllers/SMS/SmsController.php:22
* @route '/sms'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::index
* @see app/Http/Controllers/SMS/SmsController.php:22
* @route '/sms'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::index
* @see app/Http/Controllers/SMS/SmsController.php:22
* @route '/sms'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\SMS\SmsController::compose
* @see app/Http/Controllers/SMS/SmsController.php:61
* @route '/sms/compose'
*/
export const compose = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compose.url(options),
    method: 'get',
})

compose.definition = {
    methods: ["get","head"],
    url: '/sms/compose',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::compose
* @see app/Http/Controllers/SMS/SmsController.php:61
* @route '/sms/compose'
*/
compose.url = (options?: RouteQueryOptions) => {
    return compose.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::compose
* @see app/Http/Controllers/SMS/SmsController.php:61
* @route '/sms/compose'
*/
compose.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compose.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::compose
* @see app/Http/Controllers/SMS/SmsController.php:61
* @route '/sms/compose'
*/
compose.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: compose.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::compose
* @see app/Http/Controllers/SMS/SmsController.php:61
* @route '/sms/compose'
*/
const composeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: compose.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::compose
* @see app/Http/Controllers/SMS/SmsController.php:61
* @route '/sms/compose'
*/
composeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: compose.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::compose
* @see app/Http/Controllers/SMS/SmsController.php:61
* @route '/sms/compose'
*/
composeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: compose.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

compose.form = composeForm

/**
* @see \App\Http\Controllers\SMS\SmsController::send
* @see app/Http/Controllers/SMS/SmsController.php:90
* @route '/sms/send'
*/
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/sms/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::send
* @see app/Http/Controllers/SMS/SmsController.php:90
* @route '/sms/send'
*/
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::send
* @see app/Http/Controllers/SMS/SmsController.php:90
* @route '/sms/send'
*/
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::send
* @see app/Http/Controllers/SMS/SmsController.php:90
* @route '/sms/send'
*/
const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::send
* @see app/Http/Controllers/SMS/SmsController.php:90
* @route '/sms/send'
*/
sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

send.form = sendForm

/**
* @see \App\Http\Controllers\SMS\SmsController::contactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
export const contactListNumbers = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: contactListNumbers.url(options),
    method: 'post',
})

contactListNumbers.definition = {
    methods: ["post"],
    url: '/sms/contact-list-numbers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::contactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
contactListNumbers.url = (options?: RouteQueryOptions) => {
    return contactListNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::contactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
contactListNumbers.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: contactListNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::contactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
const contactListNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: contactListNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::contactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
contactListNumbersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: contactListNumbers.url(options),
    method: 'post',
})

contactListNumbers.form = contactListNumbersForm

/**
* @see \App\Http\Controllers\SMS\SmsController::conversations
* @see app/Http/Controllers/SMS/SmsController.php:271
* @route '/sms/conversations/{phoneNumber?}'
*/
export const conversations = (args?: { phoneNumber?: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: conversations.url(args, options),
    method: 'get',
})

conversations.definition = {
    methods: ["get","head"],
    url: '/sms/conversations/{phoneNumber?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::conversations
* @see app/Http/Controllers/SMS/SmsController.php:271
* @route '/sms/conversations/{phoneNumber?}'
*/
conversations.url = (args?: { phoneNumber?: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { phoneNumber: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { phoneNumber: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            phoneNumber: args[0],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "phoneNumber",
    ])

    const parsedArgs = {
        phoneNumber: typeof args?.phoneNumber === 'object'
        ? args.phoneNumber.id
        : args?.phoneNumber,
    }

    return conversations.definition.url
            .replace('{phoneNumber?}', parsedArgs.phoneNumber?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::conversations
* @see app/Http/Controllers/SMS/SmsController.php:271
* @route '/sms/conversations/{phoneNumber?}'
*/
conversations.get = (args?: { phoneNumber?: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: conversations.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversations
* @see app/Http/Controllers/SMS/SmsController.php:271
* @route '/sms/conversations/{phoneNumber?}'
*/
conversations.head = (args?: { phoneNumber?: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: conversations.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversations
* @see app/Http/Controllers/SMS/SmsController.php:271
* @route '/sms/conversations/{phoneNumber?}'
*/
const conversationsForm = (args?: { phoneNumber?: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversations.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversations
* @see app/Http/Controllers/SMS/SmsController.php:271
* @route '/sms/conversations/{phoneNumber?}'
*/
conversationsForm.get = (args?: { phoneNumber?: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversations.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversations
* @see app/Http/Controllers/SMS/SmsController.php:271
* @route '/sms/conversations/{phoneNumber?}'
*/
conversationsForm.head = (args?: { phoneNumber?: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversations.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

conversations.form = conversationsForm

/**
* @see \App\Http\Controllers\SMS\SmsController::templates
* @see app/Http/Controllers/SMS/SmsController.php:364
* @route '/sms/templates'
*/
export const templates = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templates.url(options),
    method: 'get',
})

templates.definition = {
    methods: ["get","head"],
    url: '/sms/templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::templates
* @see app/Http/Controllers/SMS/SmsController.php:364
* @route '/sms/templates'
*/
templates.url = (options?: RouteQueryOptions) => {
    return templates.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::templates
* @see app/Http/Controllers/SMS/SmsController.php:364
* @route '/sms/templates'
*/
templates.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templates.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::templates
* @see app/Http/Controllers/SMS/SmsController.php:364
* @route '/sms/templates'
*/
templates.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: templates.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::templates
* @see app/Http/Controllers/SMS/SmsController.php:364
* @route '/sms/templates'
*/
const templatesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: templates.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::templates
* @see app/Http/Controllers/SMS/SmsController.php:364
* @route '/sms/templates'
*/
templatesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: templates.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::templates
* @see app/Http/Controllers/SMS/SmsController.php:364
* @route '/sms/templates'
*/
templatesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: templates.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

templates.form = templatesForm

/**
* @see \App\Http\Controllers\SMS\SmsController::analytics
* @see app/Http/Controllers/SMS/SmsController.php:376
* @route '/sms/analytics'
*/
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/sms/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::analytics
* @see app/Http/Controllers/SMS/SmsController.php:376
* @route '/sms/analytics'
*/
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::analytics
* @see app/Http/Controllers/SMS/SmsController.php:376
* @route '/sms/analytics'
*/
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::analytics
* @see app/Http/Controllers/SMS/SmsController.php:376
* @route '/sms/analytics'
*/
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::analytics
* @see app/Http/Controllers/SMS/SmsController.php:376
* @route '/sms/analytics'
*/
const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::analytics
* @see app/Http/Controllers/SMS/SmsController.php:376
* @route '/sms/analytics'
*/
analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::analytics
* @see app/Http/Controllers/SMS/SmsController.php:376
* @route '/sms/analytics'
*/
analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

analytics.form = analyticsForm

const sms = {
    webhook: Object.assign(webhook, webhook),
    index: Object.assign(index, index),
    compose: Object.assign(compose, compose),
    send: Object.assign(send, send),
    contactListNumbers: Object.assign(contactListNumbers, contactListNumbers),
    phoneNumbers: Object.assign(phoneNumbers, phoneNumbers),
    conversations: Object.assign(conversations, conversationsFa5bc0),
    templates: Object.assign(templates, templates),
    analytics: Object.assign(analytics, analytics),
}

export default sms