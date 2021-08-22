import React, { useState } from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";
import { div } from 'prelude-ls';

const FORMAT="dd/MM/yyyy";
const AddTask = ( {onCancel, onAddTask})=>{
   const [task,setTask] = useState("");
   const [date,setDate] = useState(null);

   function formatDate(date,format,locale){
       return dateFnsFormat(date,format,{locale});
   }

  
 return (
<div className="add-task-dialog">
                    <input value={task} onChange={(event)=> {
                        
                        setTask(event.target.value);
                       
                        }} />
                    <div className="add-task-actions-container">
                        <div className="btns-container">
                              <button className="add-btn" disabled={!task} onClick={()=>{ 
                                  onAddTask(task,date);
                                  setTask("");
                                  setDate(null);
                                  }} >Add Task</button>
                              <button className="cancel-btn" onClick={()=>onCancel()}> Cancel</button>
                        </div>
                        <div className="icon-container">
                               <DayPickerInput 
                               onDayChange={(day)=> setDate(day)} 
                               placeholder={`${dateFnsFormat(new Date(),FORMAT)}`}
                               formatDate={formatDate} format={FORMAT}
                               dayPickerProps={{
                                   modifiers:{
                                       disabled:[{before:new Date()}],
                                   },
                               }}
                               ></DayPickerInput>
                        </div>
                    </div>
                </div>

 );

}

const Tasks_header_Mapping ={
    INBOX:"Inbox",
    TODAY:"Today",
    NEXT_7:"Next 7 days"
};


const TaskItems =({selectedTab,tasks})=>{


if(selectedTab=== "TODAY"){
return 

(
    <div className="task-items-container">
    {tasks.filter(task=> isToday(task.date))
.map((task)=>(
    <div className="task-item">
                       <p>
                       {task.text}
                       </p>
                       <p>
                       {dateFnsFormat(new Date(task.date),FORMAT)}
                       </p>
               </div>
))
}
</div>
)


}

if(selectedTab=== "INBOX"){
    return (
        <div className="task-items-container">
            
        {tasks.map((task)=>(

               <div className="task-item">
                       <p>
                       {task.text}
                       </p>
                       <p>
                       {dateFnsFormat(new Date(task.date),FORMAT)}
                       </p>
               </div>
        
    ))}
    </div>
    );
    
    
    }

    if(selectedTab=== "NEXT_7"){
        return  (
            <div className="task-items-container">
                
               { tasks.filter((task)=> 
            isAfter(task.date,new Date())
            && isBefore(task.date,addDays(new Date(),7)))
        .map((task)=>(
            <div className="task-item">
            <p>
            {task.text}
            </p>
            <p>
            {dateFnsFormat(new Date(task.date),FORMAT)}
            </p>
    </div>
        ))
        }
        </div>
        ); 
        
        
        
       
        
        
        }




};


const Tasks = ( {selectedTab}) => {

    const [showInput, setShowInput] = useState(false);
        const [tasks,setTasks] = useState([]);
        
  const addNewTask =(text,date)=>{
      const newTaskItem = {text, date:date || new Date()}
         setTasks((prev)=> [...prev,newTaskItem]);

  }
    return (
        <div className="tasks">
            <h1>{Tasks_header_Mapping[selectedTab]}</h1>
            { selectedTab ==="INBOX" ? (<div className="add-task-btn" onClick={()=> setShowInput((prev)=> !prev)}>
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>

                
                
            </div>): null}
            { showInput && (<AddTask onAddTask={addNewTask} onCancel={()=> setShowInput(false)}/>)
            }
            
            
            

{tasks.length>0 ? 
            <TaskItems selectedTab={selectedTab} tasks={tasks}/>
            :<p>No task yet</p>}
            
        </div>
        )
    
}

export default Tasks
