export async function GET() {
    return new Response(JSON.stringify({ message: "Hello from WiseTraveler API!" }), {
        headers: { "Content-Type": "application/json" },
        status: 200
    });
}
