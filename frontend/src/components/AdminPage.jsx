import { useState } from "react";
import Table from "./Table";

const GROUPS = {
    admin:['john', 'peter', 'paul'],
    students: ['skibidi', 'kizito', 'fred'],
    registrars: ['dan', 'kim', 'james'],
    lecturers: ['pierce', 'tracy', 'price']
}

const AdminPage = () => {

    const [show, setShow] = useState("splash");

    return (
        <>
                <section className="top">
                    <div className="sidebarlogo">ATIS admin</div>  
                </section>
                <section className="bottom">
                    <div className="leftpanel">
                        <button className="leftbuttons"onClick={ () => setShow("splash")}>Dashboard</button>
                        <button className="leftbuttons"onClick={ () => setShow("users")}>Users</button>
                        <button className="leftbuttons" onClick={ () => setShow("groups")}>Groups</button>
                        <button className="leftbuttons"onClick={ () => setShow("issues")}>Issues</button>
                        <button className="leftbuttons"onClick={ () => setShow("logs")}>Logs</button>
                        <button className="leftbuttons" style={{ marginTop: '180px' }}>Logout</button>
                    </div>
                    <div className="recentpanel">
                    <div className="headersection">
                        {show === 'users'? (
                            <h3>Users</h3>
                        ) : show === 'splash'? (
                            <h3>Recent actions</h3>
                        ) : show === "issues"? (
                            <h3>Issues</h3>
                        ) : show === "groups" ?(
                            <h3>Groups</h3>
                         ) :(
                            <h3>Logs</h3>
                         )}
                        <button className="adminbutton">Admin username</button>
                    </div>
                    <div className="recentcomp">
                    {show === "splash" ? (
                        <>
                            <div className="user">
                                <h2>Users</h2>
                                <div className="actioncontainer">Student skibidi logged in.</div>
                                <div className="actioncontainer">Lecturer umziky logged in.</div>
                                <div className="actioncontainer"> Student skibidi logged issue.</div>
                                <div className="actioncontainer">Registrar kizito logged in.</div>
                                <div className="actioncontainer">Registrar kizito logged out.</div>
                            </div>
                            <div className="user">
                                <h2>Issues</h2>
                                <div className="actioncontainer">Student skibidi logged in.</div>
                                <div className="actioncontainer">Lecturer umziky logged in.</div>
                                <div className="actioncontainer"> Student skibidi logged issue.</div>
                                <div className="actioncontainer">Registrar kizito logged in.</div>
                                <div className="actioncontainer">Registrar kizito logged out.</div>
                            </div>
                            <div className="user">
                                <h2>Log</h2>
                                <div className="actioncontainer">Student skibidi logged in.</div>
                                <div className="actioncontainer">Lecturer umziky logged in.</div>
                                <div className="actioncontainer"> Student skibidi logged issue.</div>
                                <div className="actioncontainer">Registrar kizito logged in.</div>
                                <div className="actioncontainer">Registrar kizito logged out.</div>
                            </div>
                        </>
                    ) : show === "groups" ? (
                        <div><Table data={GROUPS}/></div>
                    ) : show ===  "users" ? (
                        <div><Table data={GROUPS}/></div>
                    ) : show === "issues" ? (
                        <div><Table data={GROUPS}/></div>
                    ) : (
                        <div><Table data={GROUPS}/></div>
                    )}
                    </div>
                    
                    </div>
                </section>  
        </>
    );
};

export default AdminPage;