import {useFetch, type UseFetchOptions} from "#app";
import {API_ENDPOINT} from "~/api/api";
import {$fetch} from "ofetch";


type HalResponseBody<Payload> = {
    _embedded: Payload
}

export type Companion = {
    id: string;
    name: string;
    background: string;
}

export type Message = {
    id: string;
    message: string;
    createdAt: string;
}

export type CompanionWithMessages = {
    companion: Companion
    messages: Message[]
}

export type ListCompanionsBody = HalResponseBody<{companions: Companion[]}>

export type GetCompanionMessagesBody = CompanionWithMessages

export const useListCompanions = (opts?: UseFetchOptions<ListCompanionsBody>) =>  useFetch<ListCompanionsBody>(API_ENDPOINT + "/companions", opts)

export const useGetCompanionWithMessages = (companionId: string ,opts?: UseFetchOptions<GetCompanionMessagesBody>) =>  useFetch<GetCompanionMessagesBody>(API_ENDPOINT + "/companions/" + companionId, {
    ...opts,
    query: {
        ...opts?.query,
        "projection": "messages"
    },
})

export const sendMessage = (companionId: string, message: string) => $fetch(API_ENDPOINT + "/companions/" + companionId + '/talk', {
    method: 'POST',
    body: {
        question: message
    }
})
