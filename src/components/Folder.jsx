import { useState } from "react";

/* eslint-disable react/prop-types */
const Folder = ({ handleInsertNode, explorer }) => {
    console.log(explorer);

    const [expand, setExpand] = useState(false)
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    })

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation()
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder
        })

    }

    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            // Add the Logic
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({ ...showInput, visible: false })
        }
    }
    return (
        explorer.isFolder ? (

            <div style={{ marginTop: 5 }}>
                <div className="folder" style={{ cursor: "pointer", marginTop: 6, display: "flex", justifyContent: "space-between", padding: 3, width: 300, backgroundColor: "grey" }} onClick={() => setExpand(!expand)}>
                    <span style={{ margin: "0 5px 2px 0" }}>
                        📁{explorer.name}
                    </span>
                    <div>
                        <button onClick={(e) => handleNewFolder(e, true)} style={{ fontSize: 15, backgroundColor: "white", cursor: "pointer" }}>Folder +</button>
                        <button onClick={(e) => handleNewFolder(e, false)} style={{ fontSize: 15, backgroundColor: "white", cursor: "pointer" }}>File +</button>
                    </div>
                </div>

                <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                    {
                        showInput.visible && (
                            <div className="inputContainer">
                                <span>{showInput.isFolder ? "📂" : "🗄"}</span>
                                <input onKeyDown={onAddFolder} type="text" className="inputContainer__input" autoFocus onBlur={() => setShowInput({ ...showInput, visible: false })} />
                            </div>
                        )
                    }
                    {
                        explorer.items.map((exp) => (
                            // <span key={exp.id}>{exp.name}</span>
                            <Folder handleInsertNode={handleInsertNode} key={exp.id} explorer={exp} />
                        ))
                    }
                </div>
            </div>
        ) : (
            <span className="file" style={{ display: "block", marginTop: 5, paddingLeft: 5 }}>🗄 {explorer.name}</span>
        )
    )
}

export default Folder