import { useEffect } from 'react';

import schema from '../../../graphql/schema';
import { supabase } from '../../../lib/supabase';

/**
 * 指定したroomのイベントを監視する
 * @param databaseId 監視するroomのid
 */
const useRoomEvent = (databaseId: string) => {
  useEffect(() => {
    const channel = supabase
      .channel(`room:${databaseId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room',
          filter: `id=eq.${databaseId}`,
        },
        (payload) => {
          console.log('room event', payload);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [databaseId]);

  useEffect(() => {
    const channel = supabase
      .channel(`room:${databaseId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room',
          filter: `id=eq.${databaseId}`,
        },
        (payload) => {
          console.log('room event', payload);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  });
};

export default useRoomEvent;
