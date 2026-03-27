import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import inbound from './inbound'
import manual from './manual'
import aiAgent from './ai-agent'
import campaign from './campaign'
import webhook from './webhook'
/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
export const testCall = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testCall.url(options),
    method: 'get',
})

testCall.definition = {
    methods: ["get","post","head"],
    url: '/twiml/test-call',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
testCall.url = (options?: RouteQueryOptions) => {
    return testCall.definition.url + queryParams(options)
}

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
testCall.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testCall.url(options),
    method: 'get',
})

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
testCall.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testCall.url(options),
    method: 'post',
})

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
testCall.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: testCall.url(options),
    method: 'head',
})

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
const testCallForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: testCall.url(options),
    method: 'get',
})

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
testCallForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: testCall.url(options),
    method: 'get',
})

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
testCallForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: testCall.url(options),
    method: 'post',
})

/**
* @see routes/web.php:428
* @route '/twiml/test-call'
*/
testCallForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: testCall.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

testCall.form = testCallForm

const twiml = {
    testCall: Object.assign(testCall, testCall),
    inbound: Object.assign(inbound, inbound),
    manual: Object.assign(manual, manual),
    aiAgent: Object.assign(aiAgent, aiAgent),
    campaign: Object.assign(campaign, campaign),
    webhook: Object.assign(webhook, webhook),
}

export default twiml