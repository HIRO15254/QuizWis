import {
  Container,
  Group,
  Paper, Text,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { ScoreBoardRoomRole } from '../../../../graphql/generated/type';

type ScoreBoardUserListProps = {
  users : {
    role: ScoreBoardRoomRole
    userData: {
      name: string;
      databaseId: string;
      userId: string;
      iconUrl?: string | null;
    }
  }[]
};

const ScoreBoardUserList = (props: ScoreBoardUserListProps) => {
  const { users } = props;
  const [state, handlers] = useListState(users);

  useEffect(() => {
    handlers.setState(users);
  }, [users]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
      }}
    >
      <Droppable droppableId="userList" direction="vertical">
        {(provided) => (
          <Container mt="lg" w="100%">
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {state.map((user, index) => (
                <Draggable
                  key={user.userData.databaseId}
                  index={index}
                  draggableId={user.userData.databaseId}
                >
                  {(iProvided, iSnapshot) => (
                    <div
                      {...iProvided.draggableProps}
                      {...iProvided.dragHandleProps}
                      ref={iProvided.innerRef}
                    >
                      <Paper w="100%" p="sm" mb="sm" bg="gray">
                        <Text>{user.userData.name}</Text>
                      </Paper>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ScoreBoardUserList;
