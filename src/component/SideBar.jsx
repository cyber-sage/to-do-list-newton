import React from 'react'
import { FaInbox,FaRegCalendarAlt,FaRegCalendar} from 'react-icons/fa';

const SideBar = ({selectedTab,setSelectedTab}) => {
    return (
        <div className="sidebar">
            <div className="active" onClick={()=> setSelectedTab("INBOX")}>
                <FaInbox className="icon"></FaInbox> 
                Index
            </div>
            <div onClick={()=> setSelectedTab("TODAY")}> 
                <FaRegCalendar className="icon" ></FaRegCalendar>
                Today
            </div>
            <div onClick={()=> setSelectedTab("NEXT_7")}>
                <FaRegCalendarAlt className="icon"></FaRegCalendarAlt>
                Next 7 days
            </div>
           
        </div>
    )
}

export default SideBar
