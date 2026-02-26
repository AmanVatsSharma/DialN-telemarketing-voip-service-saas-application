import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\SMS\SmsController::getContactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
export const getContactListNumbers = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getContactListNumbers.url(options),
    method: 'post',
})

getContactListNumbers.definition = {
    methods: ["post"],
    url: '/sms/contact-list-numbers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::getContactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
getContactListNumbers.url = (options?: RouteQueryOptions) => {
    return getContactListNumbers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::getContactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
getContactListNumbers.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getContactListNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::getContactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
const getContactListNumbersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getContactListNumbers.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::getContactListNumbers
* @see app/Http/Controllers/SMS/SmsController.php:230
* @route '/sms/contact-list-numbers'
*/
getContactListNumbersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getContactListNumbers.url(options),
    method: 'post',
})

getContactListNumbers.form = getContactListNumbersForm

/**
* @see \App\Http\Controllers\SMS\SmsController::assignAgent
* @see app/Http/Controllers/SMS/SmsController.php:254
* @route '/sms/phone-numbers/{phoneNumber}/assign-agent'
*/
export const assignAgent = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAgent.url(args, options),
    method: 'post',
})

assignAgent.definition = {
    methods: ["post"],
    url: '/sms/phone-numbers/{phoneNumber}/assign-agent',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::assignAgent
* @see app/Http/Controllers/SMS/SmsController.php:254
* @route '/sms/phone-numbers/{phoneNumber}/assign-agent'
*/
assignAgent.url = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    const parsedArgs = {
        phoneNumber: typeof args.phoneNumber === 'object'
        ? args.phoneNumber.id
        : args.phoneNumber,
    }

    return assignAgent.definition.url
            .replace('{phoneNumber}', parsedArgs.phoneNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::assignAgent
* @see app/Http/Controllers/SMS/SmsController.php:254
* @route '/sms/phone-numbers/{phoneNumber}/assign-agent'
*/
assignAgent.post = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAgent.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::assignAgent
* @see app/Http/Controllers/SMS/SmsController.php:254
* @route '/sms/phone-numbers/{phoneNumber}/assign-agent'
*/
const assignAgentForm = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignAgent.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::assignAgent
* @see app/Http/Controllers/SMS/SmsController.php:254
* @route '/sms/phone-numbers/{phoneNumber}/assign-agent'
*/
assignAgentForm.post = (args: { phoneNumber: number | { id: number } } | [phoneNumber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignAgent.url(args, options),
    method: 'post',
})

assignAgent.form = assignAgentForm

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
* @see \App\Http\Controllers\SMS\SmsController::conversationMessages
* @see app/Http/Controllers/SMS/SmsController.php:296
* @route '/sms/conversations/{conversation}/messages'
*/
export const conversationMessages = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: conversationMessages.url(args, options),
    method: 'get',
})

conversationMessages.definition = {
    methods: ["get","head"],
    url: '/sms/conversations/{conversation}/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::conversationMessages
* @see app/Http/Controllers/SMS/SmsController.php:296
* @route '/sms/conversations/{conversation}/messages'
*/
conversationMessages.url = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { conversation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            conversation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        conversation: typeof args.conversation === 'object'
        ? args.conversation.id
        : args.conversation,
    }

    return conversationMessages.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::conversationMessages
* @see app/Http/Controllers/SMS/SmsController.php:296
* @route '/sms/conversations/{conversation}/messages'
*/
conversationMessages.get = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: conversationMessages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversationMessages
* @see app/Http/Controllers/SMS/SmsController.php:296
* @route '/sms/conversations/{conversation}/messages'
*/
conversationMessages.head = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: conversationMessages.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversationMessages
* @see app/Http/Controllers/SMS/SmsController.php:296
* @route '/sms/conversations/{conversation}/messages'
*/
const conversationMessagesForm = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversationMessages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversationMessages
* @see app/Http/Controllers/SMS/SmsController.php:296
* @route '/sms/conversations/{conversation}/messages'
*/
conversationMessagesForm.get = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversationMessages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::conversationMessages
* @see app/Http/Controllers/SMS/SmsController.php:296
* @route '/sms/conversations/{conversation}/messages'
*/
conversationMessagesForm.head = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversationMessages.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

conversationMessages.form = conversationMessagesForm

/**
* @see \App\Http\Controllers\SMS\SmsController::sendMessage
* @see app/Http/Controllers/SMS/SmsController.php:316
* @route '/sms/conversations/{conversation}/send'
*/
export const sendMessage = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage.url(args, options),
    method: 'post',
})

sendMessage.definition = {
    methods: ["post"],
    url: '/sms/conversations/{conversation}/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SMS\SmsController::sendMessage
* @see app/Http/Controllers/SMS/SmsController.php:316
* @route '/sms/conversations/{conversation}/send'
*/
sendMessage.url = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { conversation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            conversation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        conversation: typeof args.conversation === 'object'
        ? args.conversation.id
        : args.conversation,
    }

    return sendMessage.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SMS\SmsController::sendMessage
* @see app/Http/Controllers/SMS/SmsController.php:316
* @route '/sms/conversations/{conversation}/send'
*/
sendMessage.post = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::sendMessage
* @see app/Http/Controllers/SMS/SmsController.php:316
* @route '/sms/conversations/{conversation}/send'
*/
const sendMessageForm = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendMessage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SMS\SmsController::sendMessage
* @see app/Http/Controllers/SMS/SmsController.php:316
* @route '/sms/conversations/{conversation}/send'
*/
sendMessageForm.post = (args: { conversation: number | { id: number } } | [conversation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendMessage.url(args, options),
    method: 'post',
})

sendMessage.form = sendMessageForm

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

const SmsController = { index, compose, send, getContactListNumbers, assignAgent, conversations, conversationMessages, sendMessage, templates, analytics }

export default SmsController