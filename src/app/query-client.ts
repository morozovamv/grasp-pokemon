import { QueryCache, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      /**
       * INFO: might be a notification for error handler services like DataDog, AWS etc,
       * or just a notification for users
       */
      console.error(`Something went wrong: ${error.message}`)
    },
  }),
})
