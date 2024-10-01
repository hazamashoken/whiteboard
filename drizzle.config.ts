import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './schemas',
  out: './drizzle',
  dialect: 'postgresql', 
  dbCredentials: {
    url: `${process.env["POSTGRES_URI"]}`,
  },
  verbose: true,
  strict: true,
});