import React, { useState } from 'react'
// import { Container, Button, Link } from 'react-floating-action-button'
import { MdAdd } from "react-icons/md";
import cn from "classnames";
import { FaTelegramPlane } from "react-icons/fa"

export default function TelegramFAB({ actions }) {
    const [open, setOpen] = useState(false);

  // Set open state to true if user hover over "ul" element 
  const mouseEnter = () => setOpen(true);

  // Set open state to false if user hover out of "ul" element 
  const mouseLeave = () => setOpen(false);

  const startChat = () => {
    console.log("starting chat")
    window.open("https://t.me/asri22_bot/start", '_blank')
  }

  return (
   <ul
      className="fab-container"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <li className="fab-button hover:bg-blue-800" onClick={()=>startChat()}>
        <FaTelegramPlane />
      </li>
      {/* {actions.map((action, index) => (
        <li
          style={{ transitionDelay: `${index * 25}ms` }}
          className={cn("fab-action", { open })}
          key={action.label}
          onClick={action.onClick}
        >
          {action.icon}
          <span className="tooltip">{action.label}</span>
        </li>
      ))} */}
    </ul>
  )
}
