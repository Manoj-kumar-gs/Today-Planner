import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getDayName } from './navbar'
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
  const date = new Date().getDate();
  const day = getDayName();
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [Showfinished, setShowfinished] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let storage = localStorage.getItem("Todos");
    if (storage) {
      setTodos(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("Todos", JSON.stringify(Todos));
    } else {
      setHasMounted(true);
    }
  }, [Todos]);

  const handlerShowfinished = () => {
    setShowfinished(!Showfinished);
  };

  const handlerTask = (e) => {
    setTodo(e.target.value);
  };

  const handlerAdd = (e) => {
    if (Todo.trim() !== "") {
      setTodos([...Todos, { id: uuidv4(), task: Todo, isCompleted: false }]);
      setTodo("");
      toast.success("✅ Task Added!", {
        theme: "dark",
      });
    } else {
      toast.error("❌ Please enter a valid task", {
        theme: "dark",
      });
    }
  };

  const handlerKey = (e) => {
    if (e.key === "Enter") {
      handlerAdd();
    }
  };

  const handlerCheck = (e, id) => {
    const updatedTodos = Todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    toast.info("Task Status Changed!", {
      theme: "dark",
    });
  };

  const handlerDelete = (e, id) => {
    const c = confirm("Are you sure you want to delete this task?");
    if (!c) return;
    const updatedArr = Todos.filter(item => item.id !== id);
    setTodos(updatedArr);
    toast.success("🗑️ Task Deleted!", {
      theme: "dark",
    });
  };

  const handlerEdit = (e, id) => {
    let toEdit = Todos.find(item => item.id === id);
    setTodo(toEdit.task);
    setEditingId(toEdit.id);
  };

  const handlerUpdate = () => {
    if (Todo.trim() !== "") {
      const updatedTodos = Todos.map(item =>
        item.id === editingId ? { ...item, task: Todo } : item
      );
      setTodos(updatedTodos);
      setTodo("");
      setEditingId(null);
      toast.success("✅ Task Updated!", {
        theme: "dark",
      });
    } else {
      toast.error("❌ Please enter a valid task to update", {
        theme: "dark",
      });
    }
  };

  return (
    <div className='container max-w-none w-full h-[84.1vh] lg:h-[80.7vh] bg-green-100 flex justify-center items-center'>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="content w-[95%] md:w-[80%] lg:w-[60%] h-[75vh] bg-green-100 rounded-lg flex flex-col items-center justify-start gap-1">
        <div className='first w-[90%] h-[10%] flex justify-between items-center'>
          <div className='font-bold text-[23px] text-balance'>TO-DO List</div>
          <div className='w-20 h-10 bg-green-500 rounded-md text-white flex justify-center items-center font-medium cursor-pointer hover:shadow-inner hover:bg-green-700'>
            <div className='hover:text-[17px]'>{date} {day}</div>
          </div>
        </div>

        <div className="second w-[90%] h-[10%] flex flex-col justify-between items-start ">
          {editingId ? (<div className='font-medium text-[20px] text-balance'>Update to Tasks List</div>) : (<div className='font-medium text-[20px] text-balance'>Add To Tasks List</div>)}
          <div className='w-[90%] flex justify-center items-center gap-5  pt-2'>
            <input type="text" name="task" id="task" className='border border-gray-500 rounded-lg w-[90%] px-3 py-0.5' onChange={handlerTask} onKeyDown={handlerKey} value={Todo} />
            {editingId ? (
              <button className='bg-green-500 rounded-md w-15 h-8 text-white flex justify-center items-center font-medium cursor-pointer shadow-md active:scale-95 active:bg-green-700 active:shadow-inner transition-all duration-150 hover:shadow-inner hover:bg-green-700' onClick={handlerUpdate}>Update</button>
            ) : (
              <button className='bg-green-500 rounded-md w-15 h-8 text-white flex justify-center items-center font-medium cursor-pointer shadow-md active:scale-95 active:bg-green-600 active:shadow-inner transition-all duration-150 hover:shadow-inner hover:bg-green-700' onClick={handlerAdd}>Add</button>
            )}
          </div>
        </div>

        <div className="third w-[90%] h-[70%] overflow-y-auto hide-scrollbar">
          <div className='flex justify-between items-center my-5'>
            <div className='font-medium text-[20px] text-balance'>Today's Tasks</div>
            <div className='w-[50%] flex justify-end items-center gap-2'>
              <input type="checkbox" name="checkbox" id="checkbox" checked={Showfinished} onChange={handlerShowfinished} className='font-bold' />
              <div className='font-semibold'>Show Finished</div>
            </div>
          </div>

          {Todos.length === 0 ? (
            <div className='w-[90%] h-[80%] text-[20px] font-semibold flex justify-center items-center'>Currently no task to-do</div>
          ) : (
            Todos.map(item => (((Showfinished && item.isCompleted) || !item.isCompleted) && (
              <div className='w-[90%] flex justify-between items-center pl-1.5 mb-2' key={item.id}>
                <div className='flex justify-center items-center gap-1'>
                  <input type="checkbox" name="checkbox" id="checkbox" checked={item.isCompleted} onChange={(e) => handlerCheck(e, item.id)} />
                  <div className={`text-balance font-[500] ${item.isCompleted ? "line-through text-green-500" : "text-red-500"}`}>{item.task}</div>
                </div>
                <div className='flex justify-center items-center gap-1'>
                <button className='hover:cursor-pointer px-1'onClick={(e) => handlerEdit(e, item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ width: "17px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                            <button className='hover:cursor-pointer px-1' onClick={(e) => handlerDelete(e, item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "17px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                </div>
              </div>
            )))
          )}
        </div>

      </div>
    </div>
  )
}

export default Todo;
