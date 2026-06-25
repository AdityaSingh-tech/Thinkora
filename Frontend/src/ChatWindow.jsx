import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat, user, handleSignOut } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        if(!prompt.trim()) return;
        setLoading(true);
        setNewChat(false);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId,
                userId: user.uid
            })
        };

        try {
            const response = await fetch("https://thinkora-backend-cgyo.onrender.com/api/chat", options);
            const res = await response.json();
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }
        setPrompt("");
    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>Thinkora <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="profile" className="profilePic" />
                    ) : (
                        <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                    )}
                </div>
            </div>

            {isOpen &&
                <div className="dropDown">
                    <div className="dropDownItem userInfo">
                        <small>{user?.email}</small>
                    </div>
                    <div className="dropDownItem" onClick={handleSignOut}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            }

            <Chat />

            <ScaleLoader color="#fff" loading={loading} />

            <div className="chatInput">
                <div className="inputBox">
                    <input
                        placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    />
                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    Thinkora can make mistakes. Always verify important information.
                </p>
            </div>
        </div>
    );
}

export default ChatWindow;
