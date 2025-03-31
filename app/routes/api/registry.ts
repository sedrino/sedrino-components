import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import registry from '@/registry.json' with { type: 'json' }

export const APIRoute = createAPIFileRoute('/api/registry')({
  GET: ({ request, params }) => {
    return json(registry)
  },
})
