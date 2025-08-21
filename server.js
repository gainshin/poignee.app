import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const server = await createServer({
    root: __dirname,
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173
      }
    },
    // Disable host checking for development
    configFile: false,
    plugins: [(await import('@vitejs/plugin-react')).default()],
  });

  await server.listen();
  
  const info = server.config.logger.info;
  
  info(
    `\n  VITE dev server running at:\n`,
    { clear: !server.config.logger.hasWarned }
  );
  
  server.printUrls();
}

startServer().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});