import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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

const phoneNumbers = {
    assignAgent: Object.assign(assignAgent, assignAgent),
}

export default phoneNumbers