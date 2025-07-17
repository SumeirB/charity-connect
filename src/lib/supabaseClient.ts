import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ldzlklksrzaorklhccuc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkemxrbGtzcnphb3JrbGhjY3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzI5MzIsImV4cCI6MjA2ODE0ODkzMn0.ZsAHgqp0G8DvzxG93qbu8cRPFSjRlx9nccxSkf6JLWo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
