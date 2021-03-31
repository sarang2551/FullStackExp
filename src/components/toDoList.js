import React from "react";

export default function ToDoList(props) {
  const [toDoList, setToDoList] = React.useState(props.handler.toDoList);

  React.useEffect(() => {
    setToDoList(props.toDoList);
    console.log("ToDoList ", toDoList);
  }, [props.handler.toDoList]);

  function removeListItem(index) {
    setToDoList(
      toDoList.filter((item, i) => {
        return index !== i;
      })
    );
  }

  if (toDoList.length > 0) {
    return toDoList.map((content, index) => {
      return (
        <li key={index}>
          <input
            type="checkbox"
            onClick={() => {
              removeListItem(index);
            }}
          ></input>
          {content}
        </li>
      );
    });
  } else {
    return null;
  }
}
