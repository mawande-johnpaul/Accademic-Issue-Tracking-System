import { useState } from "react";

const AdminPage = () => {

    const [show, setShow] = useState("splash");

    return (
        <>
                <section className="top">
                    <div className="sidebarlogo">ATIS admin</div>  
                </section>
                <section className="bottom">
                    <div className="leftpanel">
                        <button className="leftbuttons">Dashboard</button>
                        <button className="leftbuttons" onClick={ () => setShow("users")}>Users</button>
                        <button className="leftbuttons">Groups</button>
                        <button className="leftbuttons">Issues</button>
                        <button className="leftbuttons">Logs</button>
                        <button className="leftbuttons" style={{ marginTop: '180px' }}>Logout</button>
                    </div>
                    <div className="recentpanel">
                    <div className="headersection">
                        <h3> Recent actions</h3>
                        <button className="adminbutton">Admin username</button>
                    </div>
                    {show === "splash" ? (
                        <div className="recentcomp">
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
                        </div>
                    ) : show === "groups" ? (
                        <h1>Groups clicked</h1>
                    ) : show === "users" ? (
                        <h1>Users clicked</h1>
                    ) : show === "issues" ? (
                        <h1>Issues clicked</h1>
                    ) : show === "logs" ? (
                        <h1>Logs clicked</h1>
                    ) : (
                        <h1>Logout clicked</h1>
                    )}
                    
                    </div>
                </section>  
        </>
    );
};

export default AdminPage;