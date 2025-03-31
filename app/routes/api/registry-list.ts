import { createAPIFileRoute } from '@tanstack/react-start/api'
import registry from '@/registry.json' with { type: 'json' }

export const APIRoute = createAPIFileRoute('/api/registry-list')({
  GET: ({ request, params }) => {
    const componentList = registry.items.map((item) => item.name).join('\n')
    return new Response(componentList, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  },
})
