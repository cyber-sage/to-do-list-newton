import React,{useState}from 'react'
import SideBar from './SideBar';
import Tasks from './Tasks';

const Content = () => {
     
    const [selectedTab,setSelectedTab] = useState("INBOX");
    return (
        <>
           <section className="content">
               <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
               <Tasks selectedTab={selectedTab}/>
           </section>
        </>
    )
}

export default Content
