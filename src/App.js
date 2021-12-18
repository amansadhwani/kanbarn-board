import React, { useState, Fragment, useEffect } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "reset-css";
import initialData from "./InitialData";
import Column from "./Components/Column";
import nextId from "react-id-generator";
import './App.css';
const Container = styled("div")`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [subTask, setSubTask] = useState("");

  const creqteUniqueId = () => {
    return nextId();
  };

  const addSubModule = () => {
    if (subTask) {
      let id = creqteUniqueId();
      id = id + Math.random();
      let existingData = JSON.parse(JSON.stringify(data));
      debugger;
      existingData.tasks = { ...existingData.tasks, [id]: {} };
      existingData.tasks[id].id = id;
      existingData.tasks[id].content = subTask;
      existingData.columns["Todo"].taskIds.push(id);
      setSubTask("");
      setData(existingData);
    } else {
      alert("SubTask cannot be empty");
    }
  };

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];

    if (type === "column") {
      console.log(destination, source, draggableId);
      const newOrder = [...data.columnOrder];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        columnOrder: newOrder
      });
      return;
    }

    if (start === end) {
      const column = data.columns[source.droppableId];
      const taskIds = [...column.taskIds];
      taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        taskIds
      };
      setData({
        ...data,
        columns: {
          ...data.columns,
          [column.id]: newColumn
        }
      });
      return;
    }

    const startTaskIds = [...start.taskIds];
    const endTaskIds = [...end.taskIds];

    startTaskIds.splice(source.index, 1);
    endTaskIds.splice(destination.index, 0, draggableId);

    const newStartColumn = {
      ...start,
      taskIds: startTaskIds
    };
    const endTaskColumn = {
      ...end,
      taskIds: endTaskIds
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [start.id]: newStartColumn,
        [end.id]: endTaskColumn
      }
    });
    // console.log("new data", data);

    // console.log(destination, source, draggableId);
  };

  useEffect(() => {
    if (localStorage.getItem("data")) {
      let existingDataToSet = localStorage.getItem("data");
      setData(JSON.parse(existingDataToSet));
    }
  }, []);

  let searchedArray = data.columnOrder.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  let finalData = {};
  finalData.columnOrder = searchedArray;
  finalData.columns = data.columns;
  finalData.tasks = data.tasks;

  window.onbeforeunload = closingCode;
  function closingCode() {
    localStorage.setItem("data", JSON.stringify(data));
    return null;
  }


  return (
    <Fragment>
      <div className="container">
        <div className="row mb-5 mt-5">
          <div className="col-md-3 col-12">
            <input className="form-control" placeholder="Search by module" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="col-md-3 col-6 extra-margin">
            <input className="form-control" placeholder="Add sub module" value={subTask} onChange={(e) => setSubTask(e.target.value)} />
          </div>
          <div className="col-md-3 col-6 extra-margin">
            <button className="btn btn-primary" onClick={() => addSubModule()}>Add Sub Module </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="all-column" type="column" direction="horizontal">
                {(provided, snapshot) => (
                  <Container
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {finalData && finalData.columnOrder && finalData.columnOrder.map((columnId, index) => {
                      const column = data.columns[columnId];
                      const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                      return (
                        <Column
                          index={index}
                          key={column.id}
                          column={column}
                          tasks={tasks}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            </DragDropContext>
            {finalData && finalData.columnOrder && finalData.columnOrder.length === 0 ? <div>No Module Found</div> : ""}
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default App;