import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::previewQuality
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:22
* @route '/api/v1/contacts/quality/preview'
*/
export const previewQuality = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: previewQuality.url(options),
    method: 'post',
})

previewQuality.definition = {
    methods: ["post"],
    url: '/api/v1/contacts/quality/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::previewQuality
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:22
* @route '/api/v1/contacts/quality/preview'
*/
previewQuality.url = (options?: RouteQueryOptions) => {
    return previewQuality.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::previewQuality
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:22
* @route '/api/v1/contacts/quality/preview'
*/
previewQuality.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: previewQuality.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::previewQuality
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:22
* @route '/api/v1/contacts/quality/preview'
*/
const previewQualityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: previewQuality.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::previewQuality
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:22
* @route '/api/v1/contacts/quality/preview'
*/
previewQualityForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: previewQuality.url(options),
    method: 'post',
})

previewQuality.form = previewQualityForm

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::cleanBatch
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:149
* @route '/api/v1/contacts/quality/batch-clean'
*/
export const cleanBatch = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cleanBatch.url(options),
    method: 'post',
})

cleanBatch.definition = {
    methods: ["post"],
    url: '/api/v1/contacts/quality/batch-clean',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::cleanBatch
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:149
* @route '/api/v1/contacts/quality/batch-clean'
*/
cleanBatch.url = (options?: RouteQueryOptions) => {
    return cleanBatch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::cleanBatch
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:149
* @route '/api/v1/contacts/quality/batch-clean'
*/
cleanBatch.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cleanBatch.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::cleanBatch
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:149
* @route '/api/v1/contacts/quality/batch-clean'
*/
const cleanBatchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cleanBatch.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::cleanBatch
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:149
* @route '/api/v1/contacts/quality/batch-clean'
*/
cleanBatchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cleanBatch.url(options),
    method: 'post',
})

cleanBatch.form = cleanBatchForm

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::getStatistics
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:198
* @route '/api/v1/contacts/quality/statistics'
*/
export const getStatistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})

getStatistics.definition = {
    methods: ["get","head"],
    url: '/api/v1/contacts/quality/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::getStatistics
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:198
* @route '/api/v1/contacts/quality/statistics'
*/
getStatistics.url = (options?: RouteQueryOptions) => {
    return getStatistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::getStatistics
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:198
* @route '/api/v1/contacts/quality/statistics'
*/
getStatistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::getStatistics
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:198
* @route '/api/v1/contacts/quality/statistics'
*/
getStatistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::getStatistics
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:198
* @route '/api/v1/contacts/quality/statistics'
*/
const getStatisticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStatistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::getStatistics
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:198
* @route '/api/v1/contacts/quality/statistics'
*/
getStatisticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStatistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::getStatistics
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:198
* @route '/api/v1/contacts/quality/statistics'
*/
getStatisticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStatistics.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getStatistics.form = getStatisticsForm

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::checkContact
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:87
* @route '/api/v1/contacts/{contact}/quality/check'
*/
export const checkContact = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkContact.url(args, options),
    method: 'get',
})

checkContact.definition = {
    methods: ["get","head"],
    url: '/api/v1/contacts/{contact}/quality/check',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::checkContact
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:87
* @route '/api/v1/contacts/{contact}/quality/check'
*/
checkContact.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return checkContact.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::checkContact
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:87
* @route '/api/v1/contacts/{contact}/quality/check'
*/
checkContact.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkContact.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::checkContact
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:87
* @route '/api/v1/contacts/{contact}/quality/check'
*/
checkContact.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkContact.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::checkContact
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:87
* @route '/api/v1/contacts/{contact}/quality/check'
*/
const checkContactForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkContact.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::checkContact
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:87
* @route '/api/v1/contacts/{contact}/quality/check'
*/
checkContactForm.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkContact.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::checkContact
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:87
* @route '/api/v1/contacts/{contact}/quality/check'
*/
checkContactForm.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkContact.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

checkContact.form = checkContactForm

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::applySuggestions
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:118
* @route '/api/v1/contacts/{contact}/quality/apply-suggestions'
*/
export const applySuggestions = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applySuggestions.url(args, options),
    method: 'post',
})

applySuggestions.definition = {
    methods: ["post"],
    url: '/api/v1/contacts/{contact}/quality/apply-suggestions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::applySuggestions
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:118
* @route '/api/v1/contacts/{contact}/quality/apply-suggestions'
*/
applySuggestions.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return applySuggestions.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::applySuggestions
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:118
* @route '/api/v1/contacts/{contact}/quality/apply-suggestions'
*/
applySuggestions.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applySuggestions.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::applySuggestions
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:118
* @route '/api/v1/contacts/{contact}/quality/apply-suggestions'
*/
const applySuggestionsForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: applySuggestions.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::applySuggestions
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:118
* @route '/api/v1/contacts/{contact}/quality/apply-suggestions'
*/
applySuggestionsForm.post = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: applySuggestions.url(args, options),
    method: 'post',
})

applySuggestions.form = applySuggestionsForm

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::findDuplicates
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:220
* @route '/api/v1/contacts/{contact}/quality/duplicates'
*/
export const findDuplicates = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findDuplicates.url(args, options),
    method: 'get',
})

findDuplicates.definition = {
    methods: ["get","head"],
    url: '/api/v1/contacts/{contact}/quality/duplicates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::findDuplicates
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:220
* @route '/api/v1/contacts/{contact}/quality/duplicates'
*/
findDuplicates.url = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contact: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contact: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contact: typeof args.contact === 'object'
        ? args.contact.id
        : args.contact,
    }

    return findDuplicates.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::findDuplicates
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:220
* @route '/api/v1/contacts/{contact}/quality/duplicates'
*/
findDuplicates.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findDuplicates.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::findDuplicates
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:220
* @route '/api/v1/contacts/{contact}/quality/duplicates'
*/
findDuplicates.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: findDuplicates.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::findDuplicates
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:220
* @route '/api/v1/contacts/{contact}/quality/duplicates'
*/
const findDuplicatesForm = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findDuplicates.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::findDuplicates
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:220
* @route '/api/v1/contacts/{contact}/quality/duplicates'
*/
findDuplicatesForm.get = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findDuplicates.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\Admin\ContactQualityController::findDuplicates
* @see app/Http/Controllers/Api/Admin/ContactQualityController.php:220
* @route '/api/v1/contacts/{contact}/quality/duplicates'
*/
findDuplicatesForm.head = (args: { contact: number | { id: number } } | [contact: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: findDuplicates.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

findDuplicates.form = findDuplicatesForm

const ContactQualityController = { previewQuality, cleanBatch, getStatistics, checkContact, applySuggestions, findDuplicates }

export default ContactQualityController