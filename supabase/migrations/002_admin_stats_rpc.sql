-- Migration: Add RPC function for aggregated admin dashboard stats
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_requests', (SELECT count(*) FROM design_requests),
    'pending_requests', (SELECT count(*) FROM design_requests WHERE status IN ('submitted', 'in_review')),
    'in_progress_requests', (SELECT count(*) FROM design_requests WHERE status IN ('assigned', 'in_progress')),
    'awaiting_feedback', (SELECT count(*) FROM design_requests WHERE status = 'awaiting_feedback'),
    'total_orders', (SELECT count(*) FROM orders),
    'pending_orders', (SELECT count(*) FROM orders WHERE status = 'pending'),
    'total_bulk_requests', (SELECT count(*) FROM bulk_requests),
    'new_bulk_requests', (SELECT count(*) FROM bulk_requests WHERE status = 'new')
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
