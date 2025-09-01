export async function GET() {
  return Response.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    app: 'SMILEY Oral Care',
    version: '1.0.0'
  })
}
