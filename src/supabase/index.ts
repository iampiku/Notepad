import { createClient } from "@supabase/supabase-js";

import INote from "@/interface/INote";

export const supabase = createClient<INote>(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY
);
