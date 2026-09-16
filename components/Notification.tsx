"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const style: React.CSSProperties = {
    padding: "10px 16px",
    marginBottom: "10px",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    position: "fixed",
    top: "10px",
    left: "10px",
    right: "10px",
    maxWidth: "100%",    
    zIndex: 100,
    textAlign: "center",
    backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
  }

  return <div style={style}>{message}</div>
}