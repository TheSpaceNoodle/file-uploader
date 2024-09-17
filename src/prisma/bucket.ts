import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const bucket = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

export default bucket;
