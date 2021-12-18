import React from "react";
import styled from "@emotion/styled";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled("div")`
  margin: 8px;
  border-radius: 2px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  width: 230px;
  background: white;
`;
const Title = styled("h3")`
  padding: 8px;
`;

const TaskList = styled("div")`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  transition: background-color ease 0.2s;
  
`;
const Column = ({ tasks, column, index }) => {
    return (
        <Draggable draggableId={column.id} index={index} type="column">
            {provided => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Title>{column.title}</Title>
                    <Droppable droppableId={column.id} type="task">
                        {(provided, snapshot) => (
                            <TaskList
                                isDraggingOver={snapshot.isDraggingOver}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tasks.map((task, index) => (
                                    <Task key={task.id} task={task} index={index} />
                                ))}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
};

export default Column;
