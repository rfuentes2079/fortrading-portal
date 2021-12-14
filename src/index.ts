import Server from './classes/server';
// Levantar Express
async function main() {
    const server = new Server();
    await server.start();
}

main();
